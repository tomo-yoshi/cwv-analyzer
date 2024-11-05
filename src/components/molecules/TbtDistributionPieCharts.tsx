import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import type { TbtItem } from "@/types/pagespeed";

interface TbtDistributionPieChartsProps {
  url1Data: TbtItem[];
  url2Data: TbtItem[];
  url1Name: string;
  url2Name: string;
}

const SCORE_RANGES = [
  { min: 5001, max: 7500, label: '5001~7500' },
  { min: 7501, max: 10000, label: '7501~10000' },
  { min: 10001, max: 12500, label: '10001~12500' },
  { min: 12501, max: 15000, label: '12501~15000' },
  { min: 17501, max: 20000, label: '17501~20000' },
  { min: 20001, max: Infinity, label: '20001~' },
];

const URL1_COLORS = [
  '#e7f5ff',  // Lightest blue
  '#d0ebff',
  '#a5d8ff',
  '#74c0fc',
  '#4dabf7',
  '#339af0',  // Darkest blue
];

const URL2_COLORS = [
  '#fff5f5',  // Lightest red
  '#ffe3e3',
  '#ffc9c9',
  '#ffa8a8',
  '#ff8787',
  '#ff6b6b',  // Darkest red
];

export const TbtDistributionPieCharts = ({
  url1Data,
  url2Data,
  url1Name,
  url2Name,
}: TbtDistributionPieChartsProps) => {
  const getDistributionData = (data: TbtItem[]) => {
    const distribution = SCORE_RANGES.map(range => ({
      name: range.label,
      value: 0,
    }));
    
    data.forEach(item => {
      const score = Math.floor(item.result.numericValue);
      const rangeIndex = SCORE_RANGES.findIndex(
        range => score >= range.min && score <= range.max
      );
      if (rangeIndex !== -1) {
        distribution[rangeIndex].value++;
      }
    });

    // Convert to percentages
    const total = distribution.reduce((sum, item) => sum + item.value, 0);
    return distribution.map(item => ({
      ...item,
      value: (item.value / total) * 100,
    }));
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index,
    name,
    value
  }: any) => {
    const radius = outerRadius * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const textAnchor = x > cx ? 'start' : 'end';
    const verticalOffset = Math.abs(Math.sin(midAngle * RADIAN)) < 0.1 ? 20 : 0;
    const adjustedY = y + verticalOffset;

    return (
      <g>
        <text
          x={x}
          y={adjustedY}
          fill="gray"
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{ fontSize: '12px' }}
        >
          {`${name}`}
        </text>
        <text
          x={x}
          y={adjustedY + 15}
          fill="gray"
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{ fontSize: '12px' }}
        >
          {`${value.toFixed(1)}%`}
        </text>
      </g>
    );
  };

  const url1Distribution = getDistributionData(url1Data);
  const url2Distribution = getDistributionData(url2Data);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <h3 className="text-center mb-2 text-base font-medium text-gray-800">
          {url1Name} / Num of Records Ratio
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
            <Pie
              data={url1Distribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {url1Distribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={URL1_COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full">
        <h3 className="text-center mb-2 text-base font-medium text-gray-800">
          {url2Name} / Num of Records Ratio
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
            <Pie
              data={url2Distribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {url2Distribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={URL2_COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TbtDistributionPieCharts; 