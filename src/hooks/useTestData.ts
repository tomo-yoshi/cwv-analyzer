import { useCallback } from 'react';
import { usePageSpeedStore } from '@/store/usePageSpeedStore';
import type { TbtItem } from '@/types/pagespeed';

const generateMockTbtData = (count: number, isPreview = true): TbtItem[] => {
  // Define different ranges for more realistic distribution
  const ranges = [
    { min: 0, max: 2500, weight: 30 },      // 0-2.5s: common for fast sites
    { min: 2501, max: 5000, weight: 35 },    // 2.5-5s: moderate performance
    { min: 5001, max: 7500, weight: 20 },    // 5-7.5s: slower performance
    { min: 7501, max: 10000, weight: 10 },   // 7.5-10s: poor performance
    { min: 10001, max: 15000, weight: 5 }    // >10s: very poor performance
  ];

  // Function to get random value based on weighted ranges
  const getWeightedRandomValue = () => {
    const totalWeight = ranges.reduce((sum, range) => sum + range.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const range of ranges) {
      if (random < range.weight) {
        return range.min + Math.random() * (range.max - range.min);
      }
      random -= range.weight;
    }
    
    return ranges[0].min + Math.random() * (ranges[0].max - ranges[0].min);
  };

  // Generate data with timestamps
  // @ts-ignore
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - index);

    const numericValue = getWeightedRandomValue();
    // Scores are inversely proportional to TBT values
    const score = Math.max(0, Math.min(1, 1 - (numericValue / 15000)));

    return {
      timeStamp: date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Vancouver',
        timeZoneName: 'short',
      }),
      result: {
        id: 'total-blocking-time',
        title: 'Total Blocking Time',
        description: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/)',
        score,
        numericValue,
        displayValue: `${Math.round(numericValue)} ms`,
      },
    };
  });
};

export const useTestData = () => {
  const { setTbts1, setTbts2, setDisplayName1, setDisplayName2 } = usePageSpeedStore();

  const loadTestData = useCallback((count = 30) => {
    setTbts1(generateMockTbtData(count, true));
    setTbts2(generateMockTbtData(count, false));
    setDisplayName1('Preview Site');
    setDisplayName2('Production Site');
  }, [setTbts1, setTbts2, setDisplayName1, setDisplayName2]);

  return { loadTestData };
};