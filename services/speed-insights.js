// Vercel Speed Insights initialization for static HTML site
// This loads and initializes Speed Insights analytics

import { injectSpeedInsights } from './speed-insights-bundle.mjs';

// Initialize Speed Insights when the page loads
// This tracks Core Web Vitals and page performance metrics
injectSpeedInsights({
  debug: false, // Set to true for development debugging
});
