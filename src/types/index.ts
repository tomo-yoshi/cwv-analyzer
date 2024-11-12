export interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'narrow' | 'short' | 'long';
  era?: 'narrow' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  formatMatcher?: 'best fit' | 'basic';
  hour12?: boolean;
  timeZone?: string;
}

export interface TbtRecord {
  id: string;
  display_name: string;
  url: string;
  records: Array<{
    timeStamp: string;
    result: {
      numericValue: number;
    };
  }>;
  strategy: 'mobile' | 'desktop';
  created_at: string;
  project_id: string;
  profile_id: string;
}