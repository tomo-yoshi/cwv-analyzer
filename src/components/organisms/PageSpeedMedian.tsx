import { useMemo } from 'react';

interface Metric {
  title: string;
  description: string;
  score: number;
  numericValue: number;
  displayValue: string;
}

interface PageSpeedMedianProps {
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

export default function PageSpeedMedian({ data, displayName }: PageSpeedMedianProps) {
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

  const medianMetrics = useMemo(() => {
    const calculateMedian = (metricKey: string) => {
      const values = data
        .map(item => item.metrics[metricKey]?.numericValue)
        .filter(value => value !== undefined)
        .sort((a, b) => a - b);
      
      if (values.length === 0) return null;
      
      let median: number;
      const mid = Math.floor(values.length / 2);
      
      if (values.length % 2 === 0) {
        median = (values[mid - 1] + values[mid]) / 2;
      } else {
        median = values[mid];
      }

      const sampleMetric = data[0]?.metrics[metricKey];
      
      // Calculate the score as the median of scores
      const scores = data
        .map(item => item.metrics[metricKey]?.score)
        .filter(score => score !== undefined)
        .sort((a, b) => a - b);
      
      const medianScore = scores.length % 2 === 0
        ? (scores[Math.floor(scores.length / 2) - 1] + scores[Math.floor(scores.length / 2)]) / 2
        : scores[Math.floor(scores.length / 2)];
      
      return {
        title: sampleMetric?.title || metricKey,
        value: median,
        displayValue: formatDisplayValue(metricKey, median),
        score: medianScore || 0
      };
    };

    return Object.fromEntries(
      KEY_METRICS.map(key => [key, calculateMedian(key)])
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
            All values shown below are medians calculated from the collected data.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {KEY_METRICS.map(key => {
          const metric = medianMetrics[key];
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