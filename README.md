# CrUX Historical Data 🚧

The CrUX historical data dashboard is intended to surface trends in core web vitals over time.

## What is this?

This project is a small collection of charts that shows CrUX (Chrome User Experience Report) historical data. The API provides a number of metrics, all of which are displayed in the dashboard:

- CLS (Cumulative layout shift)
- TTFB (Time to first byte)
- FCP (First contentful paint)
- LCP (Largest contentful paint)
- FID (First input delay)
- INP (Interaction to next paint)

For more info on what CrUX data entails and how it's gathered, see: [https://developer.chrome.com/docs/crux](https://developer.chrome.com/docs/crux).

## How to interpret the charts

Each chart is a histogram spanning the past 25 weeks. Each "week" on the chart is actually the last date of a 28-day rolling window. The bins into which the histogram is divided (red = bad, yellow = okay, green = good) are defined by Google and hard coded in their API response.

The unit of measurement for all charts is milliseconds, except for CLS, which uses a scoring system.

As of March 28 2024, the TTFB metric is still considered experimental.

❗IMPORTANT❗ - Note that the Y-axis on the graph is logarithmically scaled. This ensures that changes in "bad" and "okay" user groups are amplified. Since these charts are meant to show change over time rather than raw magnitudes, do not assume that a big red bar necessarily means a high percentage of users with a bad experience.

## Rate limits

The CrUX history API has a rate limit of 150 requests/minute. This should be sufficient, but if you find yourself getting limited, feel free to deploy your own:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcrux-history&env=GOOGLE_API_KEY&envDescription=Key%20to%20access%20the%20CrUX%20API)

See [this page](https://developer.chrome.com/docs/crux/history-api#crux_api_key) for instructions on creating an API key. The API is provided at no cost, but the key is required. Once you have it, set the `GOOGLE_API_KEY` environment variable for your project.
