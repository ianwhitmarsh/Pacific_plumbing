const MAX_BODY_SIZE = 1024 * 1024;
const SERVICE_ZIPS = new Set([
  "74103",
  "74104",
  "74105",
  "74106",
  "74107",
  "74108",
  "74110",
  "74112",
  "74114",
  "74115",
  "74116",
  "74117",
  "74119",
  "74120",
  "74126",
  "74127",
  "74128",
  "74129",
  "74130",
  "74131",
  "74132",
  "74133",
  "74134",
  "74135",
  "74136",
  "74137",
  "74145",
  "74146",
  "74147",
  "74008",
  "74011",
  "74012",
  "74013",
  "74014",
  "74015",
  "74017",
  "74018",
  "74019",
  "74021",
  "74033",
  "74037",
  "74055",
  "74063",
  "74066",
  "74067",
]);

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function isJsonRequest(req) {
  return String(req.headers["content-type"] || "").includes("application/json");
}

function wantsJson(req) {
  return String(req.headers.accept || "").includes("application/json");
}

function collectRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function parseBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const rawBody = typeof req.body === "string" ? req.body : await collectRequestBody(req);
  if (!rawBody) return {};

  if (isJsonRequest(req)) {
    return JSON.parse(rawBody);
  }

  return Object.fromEntries(new URLSearchParams(rawBody));
}

function clean(value) {
  return String(value || "").trim();
}

function normalizeSubmission(body, req) {
  const firstName = clean(body.first_name || body.firstName);
  const lastName = clean(body.last_name || body.lastName);
  const zip = clean(body.zip).replace(/\D/g, "").slice(0, 5);

  return {
    firstName,
    lastName,
    name: [firstName, lastName].filter(Boolean).join(" "),
    email: clean(body.email),
    phone: clean(body.phone),
    service: clean(body.service),
    zip,
    formName: clean(body.form_name || body._source || "Pacific Plumbing website"),
    source: clean(body._source || "Pacific Plumbing website"),
    pageUrl: clean(body.page_url || req.headers.referer),
    submittedAt: clean(body.submitted_at) || new Date().toISOString(),
  };
}

function validateSubmission(submission) {
  const missing = [];
  if (!submission.firstName) missing.push("first_name");
  if (!submission.lastName) missing.push("last_name");
  if (!submission.email) missing.push("email");
  if (!submission.phone) missing.push("phone");
  if (!submission.service) missing.push("service");
  if (!submission.zip || submission.zip.length !== 5) missing.push("zip");
  if (submission.zip && submission.zip.length === 5 && !SERVICE_ZIPS.has(submission.zip)) {
    missing.push("service_area_zip");
  }
  return missing;
}

async function forwardToHighLevel(submission) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Missing GHL_WEBHOOK_URL environment variable.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Pacific-Plumbing-Website/1.0",
    },
    body: JSON.stringify({
      ...submission,
      tags: ["Website Lead", "Book Online"],
      company: "Pacific Plumbing",
    }),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(`HighLevel webhook returned ${response.status}: ${responseText.slice(0, 240)}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    const body = await parseBody(req);
    const redirect = clean(body._redirect) || "/thank-you.html";
    const submission = normalizeSubmission(body, req);
    const missing = validateSubmission(submission);

    if (missing.length) {
      return sendJson(res, 400, {
        ok: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    await forwardToHighLevel(submission);

    if (!wantsJson(req)) {
      res.statusCode = 303;
      res.setHeader("Location", redirect);
      return res.end();
    }

    return sendJson(res, 200, {
      ok: true,
      redirect,
    });
  } catch (error) {
    console.error("Booking webhook error", error);
    return sendJson(res, 500, {
      ok: false,
      message: "Booking request could not be sent.",
    });
  }
};
