import { metricRanges } from '@/constants/metricRanges';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function isInRange(value: number, range: string): boolean {
  const [start, end] = range.split('~').map(n => n === '' ? null : Number(n));
  if (start === null) return value <= end!;
  if (end === null) return value > start;
  return value > start && value <= end;
}

interface MetricComparisonProps {
  data: any[];
  record1Name: string;
  record2Name: string;
  selectedMetric: string;
  viewType: 'bar' | 'table';
}

export function MetricComparison({ 
  data, 
  record1Name, 
  record2Name, 
  selectedMetric,
  viewType 
}: MetricComparisonProps) {
  if (viewType === 'bar') {
    // Use ranges based on selected metric
    const ranges = metricRanges[selectedMetric]?.ranges || [];

    const barData = ranges.map(range => ({
      name: range,
      [record1Name]: data.filter(d => {
        const value = d.record1Value;
        return isInRange(value, range);
      }).length,
      [record2Name]: data.filter(d => {
        const value = d.record2Value;
        return isInRange(value, range);
      }).length,
    }));

    const maxValue = Math.max(
      ...barData.map(d => Math.max(Number(d[record1Name]), Number(d[record2Name])))
    );
    console.log(data)
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxValue]} />
          <Tooltip />
          <Legend />
          <Bar dataKey={record1Name} fill="#8884d8" />
          <Bar dataKey={record2Name} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}