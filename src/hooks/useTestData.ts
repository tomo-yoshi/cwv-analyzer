import { useCallback, useState } from 'react';
import { usePageSpeedStore } from '@/stores/usePageSpeedStore';
import type { TbtItem } from '@/types/pagespeed';

const generateMockTbtData = (count: number, isPreview = true): TbtItem[] => {
  const baseValue = isPreview ? 8000 : 12000; // Preview site is generally faster
  const variance = 3000; // Amount of random variation

  // @ts-ignore
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - index); // Each record is 1 minute apart

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
        description: 'Sum of all time periods between FCP and Time to Interactive',
        score: Math.random(),
        numericValue: baseValue + (Math.random() - 0.5) * variance,
        displayValue: `${Math.floor(baseValue + (Math.random() - 0.5) * variance)} ms`,
      },
    };
  });
};

export const useTestData = () => {
  const { setTbts1, setTbts2, setDisplayName1, setDisplayName2 } = usePageSpeedStore();

  const [isLoading, setIsLoading] = useState(false);

  const loadTestData = useCallback((count = 30) => {
    setTbts1(generateMockTbtData(count, true));
    setTbts2(generateMockTbtData(count, false));
    setDisplayName1('Preview Site');
    setDisplayName2('Production Site');
  }, [setTbts1, setTbts2, setDisplayName1, setDisplayName2]);

  return { loadTestData };
}; 