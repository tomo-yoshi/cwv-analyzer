// One record => 31.12KB
const data = {
    "mobile": [
        {
            "timestamp": "2024-11-16T22:49:52.921Z",
            "metrics": {
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.72,
                    "numericValue": 3217.012015511254,
                    "displayValue": "3.2 s"
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 29.509515,
                    "displayValue": "30 ms"
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1393162,
                    "displayValue": "Total size was 1,361 KiB"
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.52,
                    "numericValue": 5671.559469959793,
                    "displayValue": "5.7 s"
                },
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.00013416491307439513,
                    "displayValue": "0"
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 368 KiB"
                },
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.01,
                    "numericValue": 23204.437076050446,
                    "displayValue": "23.2 s"
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 10.5,
                    "displayValue": "10 ms"
                },
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 18166.83199999998,
                    "displayValue": "18.2 s"
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 119793.8581471136,
                    "displayValue": "34 resources found"
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 23604.016000000043,
                    "displayValue": "23.6 s"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0,
                    "numericValue": 150,
                    "displayValue": "Potential savings of 27 KiB"
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 47,
                    "displayValue": "Root document took 50 ms"
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0,
                    "numericValue": 3551,
                    "displayValue": "3,550 ms"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 0.96,
                    "numericValue": 1455.0035339738984,
                    "displayValue": "1.5 s"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0,
                    "numericValue": 14261.492638668657,
                    "displayValue": "14,260 ms"
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 23204
                }
            },
            "strategy": "mobile"
        }
    ],
    "desktop": [
        {
            "timestamp": "2024-11-16T22:50:23.339Z",
            "metrics": {
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0.06,
                    "numericValue": 542.9999999999998,
                    "displayValue": "540 ms"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 1,
                    "numericValue": 352.00165748670076,
                    "displayValue": "0.4 s"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 40,
                    "displayValue": "Root document took 40 ms"
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.002766157412008597,
                    "displayValue": "0.003"
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 4167
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                },
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 29.980394999999994,
                    "displayValue": "30 ms"
                },
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                },
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 36.5,
                    "displayValue": "40 ms"
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.76,
                    "numericValue": 1624.008287433504,
                    "displayValue": "1.6 s"
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 118773.71648044694,
                    "displayValue": "33 resources found"
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0.02,
                    "numericValue": 1332.999999999999,
                    "displayValue": "1,330 ms"
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1524774,
                    "displayValue": "Total size was 1,489 KiB"
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.56,
                    "numericValue": 4166.964729664277,
                    "displayValue": "4.2 s"
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.83,
                    "numericValue": 1499.2426209851112,
                    "displayValue": "1.5 s"
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 4383.567999999966,
                    "displayValue": "4.4 s"
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 3136.7410000000004,
                    "displayValue": "3.1 s"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0,
                    "numericValue": 160,
                    "displayValue": "Potential savings of 367 KiB"
                }
            },
            "strategy": "desktop"
        }
    ]
}

const data2 = {
    "mobile": [
        {
            "timestamp": "2024-11-16T22:52:07.647Z",
            "metrics": {
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                },
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 18518.088000000032,
                    "displayValue": "18.5 s"
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 23,
                    "displayValue": "Root document took 20 ms"
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1384103,
                    "displayValue": "Total size was 1,352 KiB"
                },
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 14212.951999999985,
                    "displayValue": "14.2 s"
                },
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.00013416491307439513,
                    "displayValue": "0"
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0,
                    "numericValue": 460,
                    "displayValue": "Potential savings of 368 KiB"
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0,
                    "numericValue": 10439.994560844088,
                    "displayValue": "10,440 ms"
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.46,
                    "numericValue": 6001.903371331939,
                    "displayValue": "6.0 s"
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 22,
                    "displayValue": "20 ms"
                },
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 29.287844999999997,
                    "displayValue": "30 ms"
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.04,
                    "numericValue": 17554.034808216613,
                    "displayValue": "17.6 s"
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.07,
                    "numericValue": 6828.526136667554,
                    "displayValue": "6.8 s"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0,
                    "numericValue": 150,
                    "displayValue": "Potential savings of 27 KiB"
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 0.98,
                    "numericValue": 1351.0053030919678,
                    "displayValue": "1.4 s"
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0,
                    "numericValue": 1442,
                    "displayValue": "1,440 ms"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 17554
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 117473.9569366853,
                    "displayValue": "32 resources found"
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                }
            },
            "strategy": "mobile"
        },
        {
            "timestamp": "2024-11-16T22:53:38.622Z",
            "metrics": {
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 40.55184,
                    "displayValue": "40 ms"
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 65.5,
                    "displayValue": "70 ms"
                },
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.00013416491307439513,
                    "displayValue": "0"
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1412578,
                    "displayValue": "Total size was 1,379 KiB"
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0,
                    "numericValue": 150,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.02,
                    "numericValue": 20374.910119948207,
                    "displayValue": "20.4 s"
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0,
                    "numericValue": 10012.497827092524,
                    "displayValue": "10,010 ms"
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 40,
                    "displayValue": "Root document took 40 ms"
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0,
                    "numericValue": 450,
                    "displayValue": "Potential savings of 368 KiB"
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                },
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.23,
                    "numericValue": 5218.026074889745,
                    "displayValue": "5.2 s"
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 20375
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 15928.90799999998,
                    "displayValue": "15.9 s"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 119782.4081471136,
                    "displayValue": "34 resources found"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 0.98,
                    "numericValue": 1351.0076051761757,
                    "displayValue": "1.4 s"
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 20808.999999999894,
                    "displayValue": "20.8 s"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0,
                    "numericValue": 150,
                    "displayValue": "Potential savings of 27 KiB"
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0,
                    "numericValue": 1317,
                    "displayValue": "1,320 ms"
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.68,
                    "numericValue": 4739.441997121039,
                    "displayValue": "4.7 s"
                },
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                }
            },
            "strategy": "mobile"
        }
    ],
    "desktop": [
        {
            "timestamp": "2024-11-16T22:54:10.111Z",
            "metrics": {
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.77,
                    "numericValue": 3166.285087085337,
                    "displayValue": "3.2 s"
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 7.5,
                    "displayValue": "10 ms"
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0.02,
                    "numericValue": 1231.000000000001,
                    "displayValue": "1,230 ms"
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.9,
                    "numericValue": 1284.9518671911546,
                    "displayValue": "1.3 s"
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0.3,
                    "numericValue": 323.9999999999998,
                    "displayValue": "320 ms"
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0,
                    "numericValue": 40,
                    "displayValue": "Potential savings of 367 KiB"
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 119776.6319366853,
                    "displayValue": "34 resources found"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 1,
                    "numericValue": 334.0051733565442,
                    "displayValue": "0.3 s"
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 3306.6599999999726,
                    "displayValue": "3.3 s"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 46,
                    "displayValue": "Root document took 50 ms"
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 2239.4619999999927,
                    "displayValue": "2.2 s"
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.002766157412008597,
                    "displayValue": "0.003"
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1503691,
                    "displayValue": "Total size was 1,468 KiB"
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 3166
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.9,
                    "numericValue": 1165.019658754868,
                    "displayValue": "1.2 s"
                },
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 21.39966,
                    "displayValue": "20 ms"
                }
            },
            "strategy": "desktop"
        },
        {
            "timestamp": "2024-11-16T22:55:39.014Z",
            "metrics": {
                "cumulative-layout-shift": {
                    "title": "Cumulative Layout Shift",
                    "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
                    "score": 1,
                    "numericValue": 0.002766157412008597,
                    "displayValue": "0.003"
                },
                "efficient-animated-content": {
                    "title": "Use video formats for animated content",
                    "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)",
                    "score": 1,
                    "numericValue": 0
                },
                "unminified-css": {
                    "title": "Minify CSS",
                    "description": "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).",
                    "score": 1,
                    "numericValue": 0
                },
                "uses-responsive-images": {
                    "title": "Properly size images",
                    "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "network-rtt": {
                    "title": "Network Round Trip Times",
                    "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                    "score": 1,
                    "numericValue": 37.78276499999999,
                    "displayValue": "40 ms"
                },
                "interactive": {
                    "title": "Time to Interactive",
                    "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
                    "score": 0.39,
                    "numericValue": 5112.33325266887,
                    "displayValue": "5.1 s"
                },
                "redirects": {
                    "title": "Avoid multiple page redirects",
                    "description": "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/).",
                    "score": 1,
                    "numericValue": 0
                },
                "dom-size": {
                    "title": "Avoid an excessive DOM size",
                    "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
                    "score": 0,
                    "numericValue": 1201,
                    "displayValue": "1,201 elements"
                },
                "prioritize-lcp-image": {
                    "title": "Preload Largest Contentful Paint image",
                    "description": "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-blocking-time": {
                    "title": "Total Blocking Time",
                    "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
                    "score": 0,
                    "numericValue": 2485.498905724887,
                    "displayValue": "2,490 ms"
                },
                "unused-css-rules": {
                    "title": "Reduce unused CSS",
                    "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "render-blocking-resources": {
                    "title": "Eliminate render-blocking resources",
                    "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/).",
                    "score": 1,
                    "numericValue": 0
                },
                "metrics": {
                    "title": "Metrics",
                    "description": "Collects all available metrics.",
                    "score": 1,
                    "numericValue": 5112
                },
                "mainthread-work-breakdown": {
                    "title": "Minimize main-thread work",
                    "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
                    "score": 0,
                    "numericValue": 5266.710000000007,
                    "displayValue": "5.3 s"
                },
                "legacy-javascript": {
                    "title": "Avoid serving legacy JavaScript to modern browsers",
                    "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn how to use modern JavaScript](https://web.dev/articles/publish-modern-javascript)",
                    "score": 0.5,
                    "numericValue": 0,
                    "displayValue": "Potential savings of 24 KiB"
                },
                "uses-optimized-images": {
                    "title": "Efficiently encode images",
                    "description": "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "total-byte-weight": {
                    "title": "Avoids enormous network payloads",
                    "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
                    "score": 1,
                    "numericValue": 1508105,
                    "displayValue": "Total size was 1,473 KiB"
                },
                "server-response-time": {
                    "title": "Initial server response time was short",
                    "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
                    "score": 1,
                    "numericValue": 44,
                    "displayValue": "Root document took 40 ms"
                },
                "speed-index": {
                    "title": "Speed Index",
                    "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
                    "score": 0.86,
                    "numericValue": 1419.796967936514,
                    "displayValue": "1.4 s"
                },
                "uses-text-compression": {
                    "title": "Enable text compression",
                    "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/).",
                    "score": 1,
                    "numericValue": 0
                },
                "modern-image-formats": {
                    "title": "Serve images in next-gen formats",
                    "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "largest-contentful-paint": {
                    "title": "Largest Contentful Paint",
                    "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
                    "score": 0.71,
                    "numericValue": 1773.0179972617416,
                    "displayValue": "1.8 s"
                },
                "first-contentful-paint": {
                    "title": "First Contentful Paint",
                    "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
                    "score": 1,
                    "numericValue": 370.0035288748513,
                    "displayValue": "0.4 s"
                },
                "max-potential-fid": {
                    "title": "Max Potential First Input Delay",
                    "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
                    "score": 0.02,
                    "numericValue": 671,
                    "displayValue": "670 ms"
                },
                "unused-javascript": {
                    "title": "Reduce unused JavaScript",
                    "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).",
                    "score": 0,
                    "numericValue": 200,
                    "displayValue": "Potential savings of 367 KiB"
                },
                "unminified-javascript": {
                    "title": "Minify JavaScript",
                    "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).",
                    "score": 1,
                    "numericValue": 0
                },
                "offscreen-images": {
                    "title": "Defer offscreen images",
                    "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/).",
                    "score": 1,
                    "numericValue": 0
                },
                "bootup-time": {
                    "title": "Reduce JavaScript execution time",
                    "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
                    "score": 0,
                    "numericValue": 3770.9439999999945,
                    "displayValue": "3.8 s"
                },
                "network-server-latency": {
                    "title": "Server Backend Latencies",
                    "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                    "score": 1,
                    "numericValue": 131,
                    "displayValue": "130 ms"
                },
                "uses-long-cache-ttl": {
                    "title": "Serve static assets with an efficient cache policy",
                    "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
                    "score": 0.5,
                    "numericValue": 119694.51648044692,
                    "displayValue": "34 resources found"
                },
                "duplicated-javascript": {
                    "title": "Remove duplicate modules in JavaScript bundles",
                    "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                    "score": 1,
                    "numericValue": 0
                }
            },
            "strategy": "desktop"
        }
    ]
}