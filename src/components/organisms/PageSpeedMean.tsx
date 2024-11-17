import { useMemo } from 'react';

interface Metric {
  title: string;
  description: string;
  score: number;
  numericValue: number;
  displayValue: string;
}

interface PageSpeedData {
  metrics: {
    [key: string]: Metric;
  };
}

interface PageSpeedMeanProps {
  data: {
    mobile: PageSpeedData[];
    desktop: PageSpeedData[];
  };
  displayName: string;
}

const KEY_METRICS = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive'
];

export default function PageSpeedMean({ data, displayName }: PageSpeedMeanProps) {
  const meanMetrics = useMemo(() => {
    const calculateMean = (deviceData: PageSpeedData[], metricKey: string) => {
      const values = deviceData
        .map(item => item.metrics[metricKey]?.numericValue)
        .filter(value => value !== undefined);
      
      if (values.length === 0) return null;
      
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sampleMetric = deviceData[0]?.metrics[metricKey];
      
      return {
        title: sampleMetric?.title || metricKey,
        value: avg,
        displayValue: sampleMetric?.displayValue || `${avg.toFixed(2)}`,
        score: sampleMetric?.score || 0
      };
    };

    return {
      mobile: Object.fromEntries(
        KEY_METRICS.map(key => [key, calculateMean(data.mobile, key)])
      ),
      desktop: Object.fromEntries(
        KEY_METRICS.map(key => [key, calculateMean(data.desktop, key)])
      )
    };
  }, [data]);

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.5) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{displayName}</h2>
        <div className="text-sm text-gray-600">
          <p>Analysis based on:</p>
          <ul className="list-disc list-inside ml-2">
            <li>{data.mobile.length} mobile test{data.mobile.length !== 1 ? 's' : ''}</li>
            <li>{data.desktop.length} desktop test{data.desktop.length !== 1 ? 's' : ''}</li>
          </ul>
          <p className="mt-1 italic">
            All values shown below are means calculated from the collected data.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Mobile Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Mobile</h3>
          <div className="space-y-3">
            {KEY_METRICS.map(key => {
              const metric = meanMetrics.mobile[key];
              if (!metric) return null;
              
              return (
                <div key={key} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.title}</span>
                    <span className={getScoreColor(metric.score)}>
                      {(metric.score * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {metric.displayValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Desktop</h3>
          <div className="space-y-3">
            {KEY_METRICS.map(key => {
              const metric = meanMetrics.desktop[key];
              if (!metric) return null;
              
              return (
                <div key={key} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.title}</span>
                    <span className={getScoreColor(metric.score)}>
                      {(metric.score * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {metric.displayValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}