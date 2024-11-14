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

  const runTests = async (
    url: string, 
    numberOfRecords = 1,
    onProgress?: (completedTests: number) => void,
    signal?: AbortSignal
  ) => {
    setResults(prev => ({ ...prev, isLoading: true, error: null }));
    let completedTests = 0;

    try {
      const strategies = ['mobile', 'desktop'] as const;
      const allResults: { mobile: PageSpeedResult[], desktop: PageSpeedResult[] } = {
        mobile: [],
        desktop: []
      };

      for (const strategy of strategies) {
        const strategyResults: PageSpeedResult[] = [];

        for (let i = 0; i < numberOfRecords; i++) {
          // Check if cancelled
          if (signal?.aborted) {
            throw new Error('Test cancelled');
          }

          const queryParams = new URLSearchParams({
            url: url,
            category: 'performance',
            strategy: strategy,
            key: process.env.NEXT_PUBLIC_PAGESPEED_API_KEY || '',
          });

          const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParams}`,
            { signal }
          );

          if (!response.ok) {
            throw new Error(`PageSpeed API error: ${response.statusText}`);
          }

          const data = await response.json();
          
          // Format the results and add to array
          const metrics = Object.entries(data.lighthouseResult.audits)
            .reduce((acc, [key, value]: [string, any]) => {
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
          
          // Update progress
          completedTests++;
          onProgress?.(completedTests);

          // Add delay between requests
          if (i < numberOfRecords - 1) {
            await new Promise(resolve => setTimeout(resolve, 63000));
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