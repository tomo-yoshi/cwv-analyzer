import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import type { TbtItem } from "@/types/pagespeed";

interface TbtDistributionPieChartsProps {
  previewData: TbtItem[];
  productionData: TbtItem[];
  previewSiteName: string;
  productionSiteName: string;
}

const SCORE_RANGES = [
  { min: 5001, max: 7500, label: '5001~7500' },
  { min: 7501, max: 10000, label: '7501~10000' },
  { min: 10001, max: 12500, label: '10001~12500' },
  { min: 12501, max: 15000, label: '12501~15000' },
  { min: 17501, max: 20000, label: '17501~20000' },
  { min: 20001, max: Infinity, label: '20001~' },
];

const COLORS = ['#E8E8E8', '#D3D3D3', '#BEBEBE', '#A9A9A9', '#808080', '#696969'];

export const TbtDistributionPieCharts = ({
  previewData,
  productionData,
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

  const previewDistribution = getDistributionData(previewData);
  const productionDistribution = getDistributionData(productionData);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <h3 className="text-center mb-2 text-base">Preview Site / Num of Records Ratio</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
            <Pie
              data={previewDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {previewDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full">
        <h3 className="text-center mb-2 text-base">Production Site / Num of Records Ratio</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
            <Pie
              data={productionDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {productionDistribution.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TbtDistributionPieCharts; 