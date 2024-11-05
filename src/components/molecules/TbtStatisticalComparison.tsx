import { useMemo } from 'react';
import type { TbtItem } from "@/types/pagespeed";

interface TbtStatisticalComparisonProps {
  url1Data: TbtItem[];
  url2Data: TbtItem[];
  url1Name: string;
  url2Name: string;
}

export const TbtStatisticalComparison = ({
  url1Data,
  url2Data,
  url1Name,
  url2Name,
}: TbtStatisticalComparisonProps) => {
  // Helper function for normal CDF
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  };

  const stats = useMemo(() => {
    if (url1Data.length === 0 || url2Data.length === 0) {
      return null;
    }

    // Extract numeric values
    const url1Values = url1Data.map(item => item.result.numericValue);
    const url2Values = url2Data.map(item => item.result.numericValue);

    // Calculate means
    const url1Mean = url1Values.reduce((a, b) => a + b, 0) / url1Values.length;
    const url2Mean = url2Values.reduce((a, b) => a + b, 0) / url2Values.length;

    // Calculate variances
    const url1Variance = url1Values.reduce((a, b) => a + Math.pow(b - url1Mean, 2), 0) / (url1Values.length - 1);
    const url2Variance = url2Values.reduce((a, b) => a + Math.pow(b - url2Mean, 2), 0) / (url2Values.length - 1);

    // Calculate t-statistic
    const pooledStandardError = Math.sqrt(
      (url1Variance / url1Values.length) + (url2Variance / url2Values.length)
    );
    const tStat = Math.abs(url1Mean - url2Mean) / pooledStandardError;

    // Calculate degrees of freedom (Welch–Satterthwaite equation)
    const df = Math.floor(
      Math.pow(url1Variance / url1Values.length + url2Variance / url2Values.length, 2) /
      (
        Math.pow(url1Variance / url1Values.length, 2) / (url1Values.length - 1) +
        Math.pow(url2Variance / url2Values.length, 2) / (url2Values.length - 1)
      )
    );

    // Calculate p-value (using normal distribution approximation)
    const pValue = 2 * (1 - normalCDF(tStat));

    return {
      url1Mean,
      url2Mean,
      pValue,
      sampleSize: Math.min(url1Values.length, url2Values.length),
    };
  }, [url1Data, url2Data]);

  // Recommended sample size calculation (for 80% power, alpha = 0.05, medium effect size)
  const recommendedSampleSize = 30;

  if (!stats) {
    return (
      <div className="p-4 border-2 mb-4">
        <h2 className="text-lg font-semibold mb-2">Statistical Comparison</h2>
        <p className="text-gray-600">No data available for comparison.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-2 mb-4">
      <h2 className="text-lg font-semibold mb-2">Statistical Comparison</h2>
      
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">{url1Name}</p>
            <p className="text-gray-600">Mean: {stats.url1Mean.toFixed(1)} ms</p>
          </div>
          <div>
            <p className="font-medium">{url2Name}</p>
            <p className="text-gray-600">Mean: {stats.url2Mean.toFixed(1)} ms</p>
          </div>
        </div>

        <div className="mt-2">
          <p className="font-medium">Statistical Significance</p>
          <p className="text-gray-600">p-value: {stats.pValue.toExponential(2)}</p>
          <p className="text-gray-600">
            {stats.pValue < 0.05 
              ? "There is a statistically significant difference between the two sites."
              : "There is no statistically significant difference between the two sites."}
          </p>
        </div>

        {stats.sampleSize < recommendedSampleSize && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-700">
              <span className="font-medium">Warning:</span> Current sample size ({stats.sampleSize}) is smaller than recommended.
              For reliable statistical comparison, consider collecting at least {recommendedSampleSize} samples per site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TbtStatisticalComparison; 