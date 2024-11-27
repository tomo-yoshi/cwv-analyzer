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

  const runStrategy = async (
    strategy: 'mobile' | 'desktop',
    url: string,
    numberOfTests: number,
    onProgress: (completed: number) => void,
    signal?: AbortSignal
  ) => {
    const results = [];
    
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
      onProgress(i + 1);

      if (i < numberOfTests - 1) {
        await new Promise(resolve => setTimeout(resolve, 63000));
      }
    }

    return results;
  };

  const runTests = async (
    url: string,
    numberOfRecords = 1,
    onProgress?: (completedTests: number) => void,
    signal?: AbortSignal
  ) => {
    setResults(prev => ({ ...prev, isLoading: true, error: null }));
    let mobileCompleted = 0;
    let desktopCompleted = 0;
    const totalTests = numberOfRecords * 2; // Total for both mobile and desktop

    try {
      const mobilePromise = runStrategy('mobile', url, numberOfRecords, 
        (completed) => {
          mobileCompleted = completed;
          // Calculate total progress as a percentage of all tests
          const totalCompleted = mobileCompleted + desktopCompleted;
          onProgress?.(totalCompleted);
        }, 
        signal
      );

      const desktopPromise = runStrategy('desktop', url, numberOfRecords,
        (completed) => {
          desktopCompleted = completed;
          // Calculate total progress as a percentage of all tests
          const totalCompleted = mobileCompleted + desktopCompleted;
          onProgress?.(totalCompleted);
        },
        signal
      );

      const [mobileResults, desktopResults] = await Promise.all([mobilePromise, desktopPromise]);

      const allResults = {
        mobile: mobileResults,
        desktop: desktopResults,
      };

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