export interface MetricConfig {
  title: string;
  description: string;
  enabled: boolean;
  category: string;
  ranges: string[];
  unit: string;
}

export const metricsConfig: Record<string, MetricConfig> = {
  // Core Web Vitals
  'largest-contentful-paint': {
    title: 'Largest Contentful Paint',
    description: 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
    enabled: true,
    category: 'Core Web Vitals',
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~10000', '10001~12000', '12001~14000', '14001~16000', '16001~18000', '18001~'],
    unit: 'ms'
  },
  'first-contentful-paint': {
    title: 'First Contentful Paint',
    description: 'First Contentful Paint marks the time at which the first text or image is painted.',
    enabled: false,
    category: 'Core Web Vitals',
    ranges: ['0~1000', '1001~2000', '2001~3000', '3001~4000', '4001~'],
    unit: 'ms'
  },
  'cumulative-layout-shift': {
    title: 'Cumulative Layout Shift',
    description: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
    enabled: true,
    category: 'Core Web Vitals',
    ranges: ['0~0.05', '0.051~1.00', '1.01~1.50', '1.51~2', '2.01~'],
    unit: ''
  },

  // Performance Metrics
  'speed-index': {
    title: 'Speed Index',
    description: 'Speed Index shows how quickly the contents of a page are visibly populated.',
    enabled: true,
    category: 'Performance',
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~10000', '10001~'],
    unit: 'ms'
  },
  'total-blocking-time': {
    title: 'Total Blocking Time',
    description: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms.',
    enabled: true,
    category: 'Performance',
    ranges: ['0~2500', '2501~5000', '5001~7500', '7501~10000', '10001~12500','12501~15000','15001~17500','17501~20000', '20001~'],
    unit: 'ms'
  },
  'interactive': {
    title: 'Time to Interactive',
    description: 'Time to Interactive is the amount of time it takes for the page to become fully interactive.',
    enabled: false,
    category: 'Performance',
    ranges: ['0~3500', '3501~7500', '7501~12500', '12501~17500', '17501~'],
    unit: 'ms'
  },
  'max-potential-fid': {
    title: 'Max Potential First Input Delay',
    description: 'The maximum potential First Input Delay that your users could experience.',
    enabled: false,
    category: 'Performance',
    ranges: ['0~100', '101~250', '251~500', '501~1000', '1001~'],
    unit: 'ms'
  },

  // Resource Metrics
  'bootup-time': {
    title: 'JavaScript Execution Time',
    description: 'Consider reducing the time spent parsing, compiling, and executing JS.',
    enabled: false,
    category: 'Resource',
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~'],
    unit: 'ms'
  },
  'mainthread-work-breakdown': {
    title: 'Main Thread Work',
    description: 'Consider reducing the time spent parsing, compiling and executing JS.',
    enabled: false,
    category: 'Resource',
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~'],
    unit: 'ms'
  },
  'dom-size': {
    title: 'DOM Size',
    description: 'A large DOM will increase memory usage and produce costly layout reflows.',
    enabled: false,
    category: 'Resource',
    ranges: ['0~300', '301~600', '601~900', '901~1500', '1501~'],
    unit: 'elements'
  },
  'total-byte-weight': {
    title: 'Total Byte Weight',
    description: 'Large network payloads cost users real money and are highly correlated with long load times.',
    enabled: false,
    category: 'Resource',
    ranges: ['0~500', '501~1000', '1001~2000', '2001~4000', '4001~'],
    unit: 'KiB'
  },

  // Network Metrics
  'server-response-time': {
    title: 'Server Response Time',
    description: 'Keep the server response time for the main document short because all other requests depend on it.',
    enabled: true,
    category: 'Network',
    ranges: ['0~100', '101~200', '201~500', '501~1000', '1001~'],
    unit: 'ms'
  },
  'network-rtt': {
    title: 'Network Round Trip Times',
    description: 'Network round trip times (RTT) have a large impact on performance.',
    enabled: false,
    category: 'Network',
    ranges: ['0~50', '51~100', '101~200', '201~500', '501~'],
    unit: 'ms'
  },
  'network-server-latency': {
    title: 'Server Backend Latencies',
    description: 'Server latencies can impact web performance.',
    enabled: false,
    category: 'Network',
    ranges: ['0~100', '101~200', '201~400', '401~800', '801~'],
    unit: 'ms'
  },

  // Resource Optimization
  'unused-css-rules': {
    title: 'Unused CSS Rules',
    description: 'Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'unused-javascript': {
    title: 'Unused JavaScript',
    description: 'Reduce unused JavaScript and defer loading scripts until they are required.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~200', '201~400', '401~600', '601~800', '801~'],
    unit: 'KiB'
  },
  'unminified-css': {
    title: 'Unminified CSS',
    description: 'Minifying CSS files can reduce network payload sizes.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~10', '11~50', '51~100', '101~200', '201~'],
    unit: 'KiB'
  },
  'unminified-javascript': {
    title: 'Unminified JavaScript',
    description: 'Minifying JavaScript files can reduce payload sizes and script parse time.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~10', '11~50', '51~100', '101~200', '201~'],
    unit: 'KiB'
  },
  'legacy-javascript': {
    title: 'Legacy JavaScript',
    description: 'Avoid serving legacy JavaScript to modern browsers.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~50', '51~100', '101~200', '201~300', '301~'],
    unit: 'KiB'
  },
  'duplicated-javascript': {
    title: 'Duplicated JavaScript',
    description: 'Remove large, duplicate JavaScript modules from bundles.',
    enabled: false,
    category: 'Optimization',
    ranges: ['0~50', '51~100', '101~200', '201~300', '301~'],
    unit: 'KiB'
  },

  // Cache and Compression
  'uses-long-cache-ttl': {
    title: 'Cache TTL',
    description: 'A long cache lifetime can speed up repeat visits to your page.',
    enabled: false,
    category: 'Cache',
    ranges: ['0~24', '25~48', '49~72', '73~168', '169~'],
    unit: 'hours'
  },
  'uses-text-compression': {
    title: 'Text Compression',
    description: 'Text-based resources should be served with compression to minimize total network bytes.',
    enabled: false,
    category: 'Cache',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },

  // Image Optimization
  'modern-image-formats': {
    title: 'Modern Image Formats',
    description: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG.',
    enabled: false,
    category: 'Images',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'uses-optimized-images': {
    title: 'Optimized Images',
    description: 'Optimized images load faster and consume less cellular data.',
    enabled: false,
    category: 'Images',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'uses-responsive-images': {
    title: 'Responsive Images',
    description: 'Serve images that are appropriately-sized to save cellular data and improve load time.',
    enabled: false,
    category: 'Images',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'offscreen-images': {
    title: 'Offscreen Images',
    description: 'Consider lazy-loading offscreen and hidden images after all critical resources have finished loading.',
    enabled: false,
    category: 'Images',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'efficient-animated-content': {
    title: 'Efficient Animated Content',
    description: 'Large GIFs are inefficient for delivering animated content.',
    enabled: false,
    category: 'Images',
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },

  // Other
  'redirects': {
    title: 'Redirects',
    description: 'Redirects introduce additional delays before the page can be loaded.',
    enabled: false,
    category: 'Other',
    ranges: ['0', '1', '2', '3', '4~'],
    unit: 'count'
  },
  'render-blocking-resources': {
    title: 'Render-Blocking Resources',
    description: 'Resources are blocking the first paint of your page.',
    enabled: false,
    category: 'Other',
    ranges: ['0', '1~2', '3~4', '5~6', '7~'],
    unit: 'count'
  },
  'prioritize-lcp-image': {
    title: 'Prioritize LCP Image',
    description: 'Preload the LCP image to improve LCP time.',
    enabled: false,
    category: 'Other',
    ranges: ['0', '1', '2', '3', '4~'],
    unit: 'count'
  }
};

// Helper function to get the range for a specific value
export function getMetricRange(metricKey: string, value: number): string {
  const metric = metricsConfig[metricKey];
  if (!metric) return '';

  for (const range of metric.ranges) {
    const [min, max] = range.split('~').map(v => v === '' ? Infinity : parseFloat(v));
    if (value >= min && (max === Infinity || value <= max)) {
      return range;
    }
  }
  return '';
}

// Helper function to format value with unit
export function formatMetricValue(metricKey: string, value: number): string {
  const metric = metricsConfig[metricKey];
  if (!metric) return value.toString();

  // Special formatting for specific units
  switch (metric.unit) {
    case 'ms':
      return `${(value / 1000).toFixed(2)}s`;
    case 'KiB':
      return `${(value / 1024).toFixed(2)} KiB`;
    case '':
      return value.toString();
    default:
      return `${value}${metric.unit}`;
  }
}