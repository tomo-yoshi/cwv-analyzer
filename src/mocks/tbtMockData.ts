import { TbtItem } from '@/types/pagespeed';

const generateMockTimestamp = (index: number): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - index);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Vancouver',
    timeZoneName: 'short',
  });
};

// Distribution similar to your image
const PREVIEW_DISTRIBUTION = [
  { range: [0, 2500], count: 0 },
  { range: [2501, 5000], count: 0 },
  { range: [5001, 7500], count: 4 },
  { range: [7501, 10000], count: 17 },
  { range: [10001, 12500], count: 12 },
  { range: [12501, 15000], count: 5 },
  { range: [15001, 17500], count: 0 },
  { range: [17501, 20000], count: 0 },
  { range: [20001, 25000], count: 2 },
];

const PRODUCTION_DISTRIBUTION = [
  { range: [0, 2500], count: 0 },
  { range: [2501, 5000], count: 0 },
  { range: [5001, 7500], count: 1 },
  { range: [7501, 10000], count: 21 },
  { range: [10001, 12500], count: 10 },
  { range: [12501, 15000], count: 2 },
  { range: [15001, 17500], count: 0 },
  { range: [17501, 20000], count: 1 },
  { range: [20001, 25000], count: 5 },
];

const generateValueFromDistribution = (distribution: typeof PREVIEW_DISTRIBUTION): number => {
  const totalCount = distribution.reduce((sum, item) => sum + item.count, 0);
  let random = Math.floor(Math.random() * totalCount);
  
  for (const item of distribution) {
    if (random < item.count) {
      const [min, max] = item.range;
      return Math.floor(Math.random() * (max - min) + min);
    }
    random -= item.count;
  }
  
  return distribution[0].range[0];
};

export const generateMockTbtData = (count: number, isPreview: boolean): TbtItem[] => {
  const distribution = isPreview ? PREVIEW_DISTRIBUTION : PRODUCTION_DISTRIBUTION;
  
  // @ts-ignore
  return Array.from({ length: count }, (_, index) => ({
    timeStamp: generateMockTimestamp(index),
    result: {
      numericValue: generateValueFromDistribution(distribution),
      score: Math.random(),
      displayValue: '',
      scoreDisplayMode: 'numeric',
      numericUnit: 'millisecond',
      id: 'total-blocking-time',
      title: 'Total Blocking Time',
      description: 'Mock TBT data'
    }
  }));
};

// Example mock data sets
export const mockPreviewData = generateMockTbtData(30, true);
export const mockProductionData = generateMockTbtData(30, false); 