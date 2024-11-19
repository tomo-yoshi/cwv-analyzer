'use client';

import { useState } from 'react';

interface PageSpeedMetric {
  title: string;
  description: string;
  score: number;
  numericValue: number;
  displayValue: string;
}

export type TestStrategy = 'mobile' | 'desktop' | 'both';

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
    strategy: TestStrategy = 'both',
    onProgress?: (completedTests: number) => void,
    signal?: AbortSignal
  ) => {
    setResults(prev => ({ ...prev, isLoading: true, error: null }));
    let mobileCompleted = 0;
    let desktopCompleted = 0;

    try {
      let mobileInterval: NodeJS.Timer | null = null;
      let desktopInterval: NodeJS.Timer | null = null;
      let mobileResults: PageSpeedResult[] = [];
      let desktopResults: PageSpeedResult[] = [];
      let isTestComplete = false;

      const checkCompletion = () => {
        if (strategy === 'both') {
          if (mobileCompleted >= numberOfRecords && desktopCompleted >= numberOfRecords && !isTestComplete) {
            isTestComplete = true;
            if (mobileInterval) clearInterval(mobileInterval);
            if (desktopInterval) clearInterval(desktopInterval);
            
            setResults(prev => ({
              ...prev,
              mobile: mobileResults,
              desktop: desktopResults,
              isLoading: false,
            }));
            return true;
          }
        }
        else if (strategy === 'mobile' && mobileCompleted >= numberOfRecords && !isTestComplete) {
          isTestComplete = true;
          if (mobileInterval) clearInterval(mobileInterval);
          
          setResults(prev => ({
            ...prev,
            mobile: mobileResults,
            desktop: [],
            isLoading: false,
          }));
          return true;
        }
        else if (strategy === 'desktop' && desktopCompleted >= numberOfRecords && !isTestComplete) {
          isTestComplete = true;
          if (desktopInterval) clearInterval(desktopInterval);
          
          setResults(prev => ({
            ...prev,
            mobile: [],
            desktop: desktopResults,
            isLoading: false,
          }));
          return true;
        }
        
        return false;
      };

      const runMobileTest = async () => {
        if (mobileCompleted >= numberOfRecords) {
          if (mobileInterval) clearInterval(mobileInterval);
          checkCompletion();
          return;
        }

        try {
          const result = await runStrategy('mobile', url, 1, 
            () => {
              mobileCompleted++;
              const totalCompleted = mobileCompleted + desktopCompleted;
              onProgress?.(totalCompleted);
              setResults(prev => ({
                ...prev,
                mobile: [...mobileResults],
              }));
              checkCompletion();
            }, 
            signal
          );
          mobileResults = [...mobileResults, ...result];
        } catch (error) {
          if (mobileInterval) clearInterval(mobileInterval);
          throw error;
        }
      };

      const runDesktopTest = async () => {
        if (desktopCompleted >= numberOfRecords) {
          if (desktopInterval) clearInterval(desktopInterval);
          checkCompletion();
          return;
        }

        try {
          const result = await runStrategy('desktop', url, 1,
            () => {
              desktopCompleted++;
              const totalCompleted = mobileCompleted + desktopCompleted;
              onProgress?.(totalCompleted);
              setResults(prev => ({
                ...prev,
                desktop: [...desktopResults],
              }));
              checkCompletion();
            },
            signal
          );
          desktopResults = [...desktopResults, ...result];
        } catch (error) {
          if (desktopInterval) clearInterval(desktopInterval);
          throw error;
        }
      };

      // Start initial tests
      if (strategy === 'mobile' || strategy === 'both') {
        await runMobileTest();
        mobileInterval = setInterval(runMobileTest, 63000);
      }

      if (strategy === 'desktop' || strategy === 'both') {
        await runDesktopTest();
        desktopInterval = setInterval(runDesktopTest, 63000);
      }

      // Return results and cleanup function
      return {
        results: {
          mobile: mobileResults,
          desktop: desktopResults,
        },
        cleanup: () => {
          if (mobileInterval) clearInterval(mobileInterval);
          if (desktopInterval) clearInterval(desktopInterval);
        }
      };

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