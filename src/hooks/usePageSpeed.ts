// @ts-nocheck
'use client';

import { useState } from 'react';

interface PageSpeedMetric {
  title: string;
  description: string;
  score: number;
  numericValue: number;
  displayValue: string;
}

export type Strategy = 'mobile' | 'desktop';

interface PageSpeedResult {
  timestamp: string;
  metrics: {
    [key: string]: PageSpeedMetric;
  };
  strategy: Strategy;
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

  const runStrategy = async (
    strategy: Strategy,
    url: string,
    numberOfTests: number,
    onProgress: (completed: number, currentResults: PageSpeedResult[]) => void,
    signal?: AbortSignal
  ) => {
    const results: PageSpeedResult[] = [];
    
    for (let i = 0; i < numberOfTests; i++) {
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

      results.push(result);
      onProgress(i + 1, results); // Pass current results array

      if (i < numberOfTests - 1) {
        await new Promise(resolve => setTimeout(resolve, 63000));
      }
    }

    return results;
  };

  const runTests = async (
    url: string,
    numberOfRecords = 1,
    strategy: Strategy,
    onProgress?: (completedTests: number, currentResults: { mobile: PageSpeedResult[], desktop: PageSpeedResult[] }) => void,
    signal?: AbortSignal
  ) => {
    setResults(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const finalResults = await runStrategy(
        strategy,
        url,
        numberOfRecords,
        (completed, currentResults) => {
          // Update progress with current results
          onProgress?.(
            completed,
            {
              mobile: strategy === 'mobile' ? currentResults : [],
              desktop: strategy === 'desktop' ? currentResults : []
            }
          );
        },
        signal
      );

      setResults(prev => ({ ...prev, isLoading: false }));

      return {
        results: {
          mobile: strategy === 'mobile' ? finalResults : [],
          desktop: strategy === 'desktop' ? finalResults : []
        },
        cleanup: () => {
          setResults(prev => ({ ...prev, isLoading: false }));
        }
      };

    } catch (error) {
      setResults(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
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