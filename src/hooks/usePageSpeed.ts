'use client';

import { useState } from 'react';

interface PageSpeedMetric {
  title: string;
  description: string;
  score: number;
  numericValue: number;
  displayValue: string;
}

interface PageSpeedResult {
  timestamp: string;
  metrics: {
    [key: string]: PageSpeedMetric;
  };
  strategy: 'mobile' | 'desktop';
}

interface TestResults {
  mobile: PageSpeedResult[];
  desktop: PageSpeedResult[];
  isLoading: boolean;
  error: string | null;
}

export function usePageSpeedTest() {
  const [results, setResults] = useState<TestResults>({
    mobile: [],
    desktop: [],
    isLoading: false,
    error: null,
  });

  const runTests = async (url: string, numberOfRecords: number = 1) => {
    setResults(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const strategies = ['mobile', 'desktop'] as const;
      const allResults: { mobile: PageSpeedResult[], desktop: PageSpeedResult[] } = {
        mobile: [],
        desktop: []
      };

      for (const strategy of strategies) {
        const strategyResults: PageSpeedResult[] = [];

        for (let i = 0; i < numberOfRecords; i++) {
          const queryParams = new URLSearchParams({
            url: url,
            category: 'performance',
            strategy: strategy,
            key: process.env.NEXT_PUBLIC_PAGESPEED_API_KEY || '',
          });

          const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParams}`
          );

          if (!response.ok) {
            throw new Error(`PageSpeed API error: ${response.statusText}`);
          }

          const data = await response.json();

          // Format the results
          const metrics = Object.entries(data.lighthouseResult.audits).reduce((acc, [key, value]: [string, any]) => {
            if (value.numericValue !== undefined) {
              acc[key] = {
                title: value.title,
                description: value.description,
                score: value.score,
                numericValue: value.numericValue,
                displayValue: value.displayValue,
              };
            }
            return acc;
          }, {} as { [key: string]: PageSpeedMetric });

          const result: PageSpeedResult = {
            timestamp: data.analysisUTCTimestamp,
            metrics,
            strategy,
          };

          strategyResults.push(result);

          // Add delay between requests to avoid rate limiting
          if (i < numberOfRecords - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        allResults[strategy] = strategyResults;
      }

      setResults(prev => ({
        ...prev,
        ...allResults,
        isLoading: false,
      }));

      return allResults;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setResults(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  return {
    runTests,
    results: results.mobile,
    mobileResults: results.mobile,
    desktopResults: results.desktop,
    isLoading: results.isLoading,
    error: results.error,
  };
}