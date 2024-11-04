import { useMemo } from 'react';
import type { TbtItem } from "@/types/pagespeed";

interface TbtStatisticalComparisonProps {
  previewData: TbtItem[];
  productionData: TbtItem[];
  previewSiteName: string;
  productionSiteName: string;
}

export const TbtStatisticalComparison = ({
  previewData,
  productionData,
  previewSiteName,
  productionSiteName,
}: TbtStatisticalComparisonProps) => {
  // Helper function for normal CDF
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  };

  const stats = useMemo(() => {
    if (previewData.length === 0 || productionData.length === 0) {
      return null;
    }

    // Extract numeric values
    const preview = previewData.map(item => item.result.numericValue);
    const production = productionData.map(item => item.result.numericValue);

    // Calculate means
    const previewMean = preview.reduce((a, b) => a + b, 0) / preview.length;
    const productionMean = production.reduce((a, b) => a + b, 0) / production.length;

    // Calculate variances
    const previewVariance = preview.reduce((a, b) => a + Math.pow(b - previewMean, 2), 0) / (preview.length - 1);
    const productionVariance = production.reduce((a, b) => a + Math.pow(b - productionMean, 2), 0) / (production.length - 1);

    // Calculate t-statistic
    const pooledStandardError = Math.sqrt(
      (previewVariance / preview.length) + (productionVariance / production.length)
    );
    const tStat = Math.abs(previewMean - productionMean) / pooledStandardError;

    // Calculate degrees of freedom (Welch–Satterthwaite equation)
    const df = Math.floor(
      Math.pow(previewVariance / preview.length + productionVariance / production.length, 2) /
      (
        Math.pow(previewVariance / preview.length, 2) / (preview.length - 1) +
        Math.pow(productionVariance / production.length, 2) / (production.length - 1)
      )
    );

    // Calculate p-value (using normal distribution approximation)
    const pValue = 2 * (1 - normalCDF(tStat));

    return {
      previewMean,
      productionMean,
      pValue,
      sampleSize: Math.min(preview.length, production.length),
    };
  }, [previewData, productionData]);

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
            <p className="font-medium">{previewSiteName}</p>
            <p className="text-gray-600">Mean: {stats.previewMean.toFixed(1)} ms</p>
          </div>
          <div>
            <p className="font-medium">{productionSiteName}</p>
            <p className="text-gray-600">Mean: {stats.productionMean.toFixed(1)} ms</p>
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