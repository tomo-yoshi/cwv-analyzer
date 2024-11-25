type MetricRange = {
  [key: string]: {
    ranges: string[];
    unit: string;
  };
};

export const metricRanges: MetricRange = {
  // Core Web Vitals
  'first-contentful-paint': {
    ranges: ['0~1000', '1001~2000', '2001~3000', '3001~4000', '4001~'],
    unit: 'ms'
  },
  'largest-contentful-paint': {
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~10000', '10001~12000', '12001~14000', '14001~16000', '16001~18000', '18001~'],
    unit: 'ms'
  },
  'cumulative-layout-shift': {
    ranges: ['0~0.05', '0.051~1.00', '1.01~1.50', '1.51~2', '2.01~'],
    unit: ''
  },
  'total-blocking-time': {
    ranges: ['0~2500', '2501~5000', '5001~7500', '7501~10000', '10001~12500','12501~15000','15001~17500','17501~20000', '20001~'],
    unit: 'ms'
  },
  
  // Performance Metrics
  'speed-index': {
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~10000', '10001~'],
    unit: 'ms'
  },
  'interactive': {
    ranges: ['0~3500', '3501~7500', '7501~12500', '12501~17500', '17501~'],
    unit: 'ms'
  },
  'max-potential-fid': {
    ranges: ['0~100', '101~250', '251~500', '501~1000', '1001~'],
    unit: 'ms'
  },
  
  // Resource Metrics
  'bootup-time': {
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~'],
    unit: 'ms'
  },
  'mainthread-work-breakdown': {
    ranges: ['0~2000', '2001~4000', '4001~6000', '6001~8000', '8001~'],
    unit: 'ms'
  },
  'dom-size': {
    ranges: ['0~300', '301~600', '601~900', '901~1500', '1501~'],
    unit: 'elements'
  },
  'total-byte-weight': {
    ranges: ['0~500', '501~1000', '1001~2000', '2001~4000', '4001~'],
    unit: 'KiB'
  },
  
  // Network Metrics
  'server-response-time': {
    ranges: ['0~100', '101~200', '201~500', '501~1000', '1001~'],
    unit: 'ms'
  },
  'network-rtt': {
    ranges: ['0~50', '51~100', '101~200', '201~500', '501~'],
    unit: 'ms'
  },
  'network-server-latency': {
    ranges: ['0~100', '101~200', '201~400', '401~800', '801~'],
    unit: 'ms'
  },

  // Resource Optimization
  'unused-css-rules': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'unused-javascript': {
    ranges: ['0~200', '201~400', '401~600', '601~800', '801~'],
    unit: 'KiB'
  },
  'unminified-css': {
    ranges: ['0~10', '11~50', '51~100', '101~200', '201~'],
    unit: 'KiB'
  },
  'unminified-javascript': {
    ranges: ['0~10', '11~50', '51~100', '101~200', '201~'],
    unit: 'KiB'
  },
  'legacy-javascript': {
    ranges: ['0~50', '51~100', '101~200', '201~300', '301~'],
    unit: 'KiB'
  },
  'duplicated-javascript': {
    ranges: ['0~50', '51~100', '101~200', '201~300', '301~'],
    unit: 'KiB'
  },

  // Cache and Compression
  'uses-long-cache-ttl': {
    ranges: ['0~24', '25~48', '49~72', '73~168', '169~'],
    unit: 'hours'
  },
  'uses-text-compression': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },

  // Image Optimization
  'modern-image-formats': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'uses-optimized-images': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'uses-responsive-images': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'offscreen-images': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },
  'efficient-animated-content': {
    ranges: ['0~100', '101~200', '201~300', '301~400', '401~'],
    unit: 'KiB'
  },

  // Other
  'redirects': {
    ranges: ['0', '1', '2', '3', '4~'],
    unit: 'count'
  },
  'render-blocking-resources': {
    ranges: ['0', '1~2', '3~4', '5~6', '7~'],
    unit: 'count'
  },
  'prioritize-lcp-image': {
    ranges: ['0', '1', '2', '3', '4~'],
    unit: 'count'
  }
};