export interface TbtResult {
  description: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).';
  displayValue: `${number} ms`;
  id: 'total-blocking-time';
  numericUnit: 'millisecond';
  numericValue: number;
  score: number;
  scoreDisplayMode: 'numeric';
  title: 'Total Blocking Time';
}

export interface PagespeedApiRes {
  analysisUTCTimestamp: string;
  id: string; // Website URL
  lighthouseResult: {
    timing: number;
    audits: {
      'total-blocking-time': TbtResult;
    };
  };
}

export interface TbtItem {
  timeStamp: string;
  result: TbtResult;
}