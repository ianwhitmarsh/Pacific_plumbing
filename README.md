# Pacific_plumbing
Pacific Plumbing Repository

## GoHighLevel booking webhook

The booking modal posts to `/api/booking`, which forwards the lead payload to GoHighLevel through the `GHL_WEBHOOK_URL` environment variable.

Required Vercel environment variable:

```text
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
```

After adding or changing the environment variable in Vercel, redeploy the site so the function can read it.
