import { Bar, BarChart, CartesianGrid, Legend,XAxis, YAxis } from 'recharts';

import type { TbtItem } from "@/types/pagespeed";

interface TbtDistributionChartProps {
  previewData: TbtItem[];
  productionData: TbtItem[];
  previewSiteName: string;
  productionSiteName: string;
}

const SCORE_RANGES = [
  { min: 0, max: 2500, label: '~2500' },
  { min: 2501, max: 5000, label: '2501~5000' },
  { min: 5001, max: 7500, label: '5001~7500' },
  { min: 7501, max: 10000, label: '7501~10000' },
  { min: 10001, max: 12500, label: '10001~12500' },
  { min: 12501, max: 15000, label: '12501~15000' },
  { min: 15001, max: 17500, label: '15001~17500' },
  { min: 17501, max: 20000, label: '17501~20000' },
  { min: 20001, max: Infinity, label: '20001~' },
];

export const TbtDistributionChart = ({
  previewData,
  productionData,
}: TbtDistributionChartProps) => {
  const getDistribution = (data: TbtItem[]) => {
    const distribution = new Array(SCORE_RANGES.length).fill(0);
    
    data.forEach(item => {
      const score = Math.floor(item.result.numericValue);
      const rangeIndex = SCORE_RANGES.findIndex(
        range => score >= range.min && score <= range.max
      );
      if (rangeIndex !== -1) {
        distribution[rangeIndex]++;
      }
    });

    return distribution;
  };

  const previewDistribution = getDistribution(previewData);
  const productionDistribution = getDistribution(productionData);

  const chartData = SCORE_RANGES.map((range, index) => ({
    range: range.label,
    preview: previewDistribution[index],
    production: productionDistribution[index],
  }));

  return (
    <BarChart
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis domain={[0, 25]} />
      <Legend />
      <Bar
        dataKey="preview"
        name="[Prev] Num of Records"
        fill="#ff8787"
        barSize={20}
      />
      <Bar
        dataKey="production"
        name="[Prod] Num of Records"
        fill="#74c0fc"
        barSize={20}
      />
    </BarChart>
  );
};

export default TbtDistributionChart; 