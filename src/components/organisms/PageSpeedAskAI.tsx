import { X } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/atoms/buttons/Button';

interface PageSpeedAskAIProps {
  data: any[];
  onClose: () => void;
  isPro: boolean;
}

const AVAILABLE_METRICS = [
  {
    id: 'first-contentful-paint',
    label: 'First Contentful Paint (FCP)',
  },
  {
    id: 'largest-contentful-paint',
    label: 'Largest Contentful Paint (LCP)',
  },
  {
    id: 'total-blocking-time',
    label: 'Total Blocking Time (TBT)',
  },
  {
    id: 'cumulative-layout-shift',
    label: 'Cumulative Layout Shift (CLS)',
  },
  {
    id: 'speed-index',
    label: 'Speed Index',
  },
  {
    id: 'interactive',
    label: 'Time to Interactive (TTI)',
  },
];

export default function PageSpeedAskAI({ data, onClose, isPro }: PageSpeedAskAIProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const formatMetricsData = () => {
    const metrics = (selectedMetrics.length > 0 ? selectedMetrics : AVAILABLE_METRICS.map(m => m.id))
      .reduce((acc, key) => {
        const values = data
          .map(item => item.metrics[key]?.numericValue)
          .filter(value => value !== undefined)
          .sort((a, b) => a - b);

        if (values.length === 0) return acc;

        acc[key] = {
          worst: values[values.length - 1],
          best: values[0],
          median: values[Math.floor(values.length / 2)],
          title: data[0]?.metrics[key]?.title || key
        };

        return acc;
      }, {} as Record<string, any>);

    return metrics;
  };

  const askAI = async () => {
    if (!isPro) {
      alert('This feature is only available for Pro plan users. Please upgrade to use AI analysis.');
      return;
    }
    
    if (selectedMetrics.length === 0) {
      alert('Please select at least one metric to analyze');
      return;
    }

    setLoading(true);
    try {
      const metrics = formatMetricsData();

      const focusMessage = `Please focus your analysis particularly on these metrics: ${
        selectedMetrics.map(id => AVAILABLE_METRICS.find(m => m.id === id)?.label).join(', ')
      }.`;

      const prompt = `
        Analyzing PageSpeed data with ${data.length} records.

        Metrics (showing best/median/worst values):
        ${Object.entries(metrics)
          .map(([key, value]: [string, any]) => 
            `${value.title}:
            - Best: ${value.best.toFixed(2)}
            - Median: ${value.median.toFixed(2)}
            - Worst: ${value.worst.toFixed(2)}`
          )
          .join('\n\n')}

        ${focusMessage}

        Please provide:
        1. A summary of the performance metrics
        2. Identify metrics that may indicate performance issues
        3. Suggest specific solutions for the identified problems
      `;

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { metrics },
          prompt
        }),
      });

      const result = await response.json();
      setAnalysis(result.analysis);
    } catch (error) {
      console.error('Error analyzing data:', error);
      setAnalysis('Failed to analyze data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <Button variant="ghost" onClick={onClose} className="hover:bg-gray-100 p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isPro ? (
          <div className="flex flex-col items-center justify-center px-8 pb-8 text-center space-y-4">
            <div className="text-xl font-semibold text-gray-900">Pro Plan Required</div>
            <p className="text-gray-600 max-w-md">
              AI Analysis is a premium feature available exclusively for Pro plan users. 
              Upgrade your plan to access detailed AI-powered insights about your performance metrics.
            </p>
            <Button 
              variant="primary"
              className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => {
                window.location.href = '/pricing';
              }}
            >
              Upgrade to Pro
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Select Metrics to Focus On:</h3>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_METRICS.map(metric => (
                  <Button
                    key={metric.id}
                    variant={selectedMetrics.includes(metric.id) ? 'primary' : 'outline'}
                    onClick={() => toggleMetric(metric.id)}
                    className="text-sm"
                  >
                    {metric.label}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {selectedMetrics.length === 0 
                  ? 'Please select at least one metric to analyze' 
                  : `Analysis will focus on ${selectedMetrics.length} selected metric${selectedMetrics.length === 1 ? '' : 's'}`
                }
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">AI Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  </div>
                ) : analysis ? (
                  <div className="prose prose-sm max-w-none bg-white p-6 rounded-lg shadow-sm">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 space-y-3">
                    <p className="text-sm text-gray-600">
                      {selectedMetrics.length === 0 
                        ? 'Please select metrics above to analyze' 
                        : 'Click the button below to generate an AI analysis of your selected metrics'
                      }
                    </p>
                    <Button 
                      onClick={askAI}
                      disabled={selectedMetrics.length === 0}
                      className={selectedMetrics.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Generate Analysis
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}