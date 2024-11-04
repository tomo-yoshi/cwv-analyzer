import type { TbtItem } from "@/types/pagespeed";

interface TbtDistributionTableProps {
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

export const TbtDistributionTable = ({
  previewData,
  productionData,
  previewSiteName,
  productionSiteName,
}: TbtDistributionTableProps) => {
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

    const total = distribution.reduce((sum, count) => sum + count, 0);
    const percentages = distribution.map(count => 
      total > 0 ? (count / total * 100).toFixed(1) : '0.0'
    );

    return { distribution, percentages };
  };

  const preview = getDistribution(previewData);
  const production = getDistribution(productionData);

  return (
    <div className="border-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2">
            <th className="p-1 border-r-2">{previewSiteName}</th>
            <th className="p-1 border-r" colSpan={2}>Num of Records</th>
            <th className="p-1 border-r-2">{productionSiteName}</th>
            <th className="p-1" colSpan={2}>Num of Records</th>
          </tr>
        </thead>
        <tbody>
          {SCORE_RANGES.map((range, index) => (
            <tr key={range.label} className="border-b last:border-b-0">
              <td className="p-1 border-r-2">{range.label}</td>
              <td className="p-1 border-r text-center">
                {preview.distribution[index]}
              </td>
              <td className="p-1 border-r text-center text-gray-500">
                {preview.percentages[index]}%
              </td>
              <td className="p-1 border-r-2">{range.label}</td>
              <td className="p-1 border-r text-center">
                {production.distribution[index]}
              </td>
              <td className="p-1 text-center text-gray-500">
                {production.percentages[index]}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TbtDistributionTable;