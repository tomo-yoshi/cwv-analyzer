import { useMemo } from 'react';

interface PageSpeedMeanProps {
  data: any[];  // Single array of records
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
  const formatDisplayValue = (metricKey: string, value: number): string => {
    switch (metricKey) {
      case 'first-contentful-paint':
      case 'largest-contentful-paint':
      case 'speed-index':
      case 'interactive':
        return `${(value / 1000).toFixed(1)} s`;
      case 'total-blocking-time':
        return `${Math.round(value)} ms`;
      case 'cumulative-layout-shift':
        return value.toFixed(3);
      default:
        return value.toFixed(2);
    }
  };

  const meanMetrics = useMemo(() => {
    const calculateMean = (metricKey: string) => {
      const values = data
        .map(item => item.metrics[metricKey]?.numericValue)
        .filter(value => value !== undefined);
      
      if (values.length === 0) return null;
      
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sampleMetric = data[0]?.metrics[metricKey];
      
      // Calculate the mean score
      const scores = data
        .map(item => item.metrics[metricKey]?.score)
        .filter(score => score !== undefined);
      
      const meanScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      
      return {
        title: sampleMetric?.title || metricKey,
        value: avg,
        displayValue: formatDisplayValue(metricKey, avg),
        score: meanScore || 0
      };
    };

    return Object.fromEntries(
      KEY_METRICS.map(key => [key, calculateMean(key)])
    );
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
          <p>Analysis based on {data.length} test{data.length !== 1 ? 's' : ''}</p>
          <p className="mt-1 italic">
            All values shown below are means calculated from the collected data.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {KEY_METRICS.map(key => {
          const metric = meanMetrics[key];
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
  );
}