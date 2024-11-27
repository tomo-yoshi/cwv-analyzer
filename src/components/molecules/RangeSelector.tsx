import { useState, useEffect } from 'react';
import { Slider } from '@/components/atoms/Slider';
import { formatMetricValue } from '@/config/metrics';

interface RangeSelectorProps {
  metricKey: string;
  defaultMin: number;
  defaultMax: number;
  unit: string;
  onRangeChange: (min: number, max: number) => void;
}

export function RangeSelector({
  metricKey,
  defaultMin,
  defaultMax,
  unit,
  onRangeChange
}: RangeSelectorProps) {
  const [range, setRange] = useState<[number, number]>([defaultMin, defaultMax]);

  const handleRangeChange = (newRange: [number, number]) => {
    setRange(newRange);
    onRangeChange(newRange[0], newRange[1]);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatMetricValue(metricKey, range[0])}</span>
        <span>{formatMetricValue(metricKey, range[1])}</span>
      </div>
      <Slider
        min={defaultMin}
        max={defaultMax}
        step={(defaultMax - defaultMin) / 100}
        value={range}
        onChange={handleRangeChange}
      />
    </div>
  );
}