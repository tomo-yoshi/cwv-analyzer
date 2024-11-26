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

export interface DistributionData {
  range: string;
  record1Count: number;
  record2Count: number;
  record1Percentage: number;
  record2Percentage: number;
}

interface MetricComparisonProps {
  data: any[];
  distributionData: DistributionData[];
  record1Name: string;
  record2Name: string;
  selectedMetric: string;
  viewType: 'bar' | 'table';
}

export function MetricComparison({ 
  data,
  distributionData,
  record1Name, 
  record2Name, 
  selectedMetric,
  viewType 
}: MetricComparisonProps) {
  if (viewType === 'bar') {
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
    
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart 
          data={barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 120
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            interval={0}
            angle={-45}
            textAnchor="end" 
            height={100}
            tick={{
              fontSize: 12,
              dy: 25
            }}
          />
          <YAxis domain={[0, maxValue]} />
          <Tooltip />
          <Legend />
          <Bar dataKey={record1Name} fill="#74c0fc" />
          <Bar dataKey={record2Name} fill="#ff8787" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  if (viewType === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left border">Range</th>
              <th className="p-2 text-left border" colSpan={2}>{record1Name}</th>
              <th className="p-2 text-left border" colSpan={2}>{record2Name}</th>
            </tr>
            <tr className="bg-gray-50">
              <th className="p-2 text-left border"></th>
              <th className="p-2 text-left border">Count</th>
              <th className="p-2 text-left border">Percentage</th>
              <th className="p-2 text-left border">Count</th>
              <th className="p-2 text-left border">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {distributionData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{row.range}</td>
                <td className="p-2 border">{row.record1Count}</td>
                <td className="p-2 border">{row.record1Percentage.toFixed(2)}%</td>
                <td className="p-2 border">{row.record2Count}</td>
                <td className="p-2 border">{row.record2Percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}