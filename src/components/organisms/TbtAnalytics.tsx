import { useState } from 'react';
import TbtDistributionChart from '@/components/molecules/TbtDistributionChart';
import TbtDistributionPieCharts from '@/components/molecules/TbtDistributionPieCharts';
import TbtDistributionTable from '@/components/molecules/TbtDistributionTable';
import TbtStatisticalComparison from '@/components/molecules/TbtStatisticalComparison';
import type { TbtItem } from "@/types/pagespeed";
// import { useTestData } from '@/hooks/useTestData';

interface TbtAnalyticsProps {
  url1Data: TbtItem[];
  url2Data: TbtItem[];
  url1Name: string;
  url2Name: string;
}

const TbtAnalytics = ({
  url1Data,
  url2Data,
  url1Name,
  url2Name,
}: TbtAnalyticsProps) => {
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showPieCharts, setShowPieCharts] = useState(false);

  // const { loadTestData } = useTestData();
  
  // useEffect(() => {
  //   loadTestData(30)
  // }, [])

  return (
    <div className="h-full p-4 space-y-4">
      <TbtStatisticalComparison
        url1Data={url1Data}
        url2Data={url2Data}
        url1Name={url1Name}
        url2Name={url2Name}
      />
      
      <div className='pb-4'>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer rounded-md px-3 py-2 hover:bg-primary-50 transition-colors" 
          onClick={() => setShowTable(!showTable)}
        >
          <h2 className="text-lg font-semibold text-gray-800">Distribution Table</h2>
          <button className="px-2 py-1 text-lg font-bold text-primary-500 hover:text-primary-600 transition-colors">
            {showTable ? '−' : '+'}
          </button>
        </div>
        <div className={`transition-all duration-200 ease-in-out ${
          showTable ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <TbtDistributionTable
            url1Data={url1Data}
            url2Data={url2Data}
            url1Name={url1Name}
            url2Name={url2Name}
          />
        </div>
      </div>

      <div className='pb-4'>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer rounded-md px-3 py-2 hover:bg-primary-50 transition-colors"
          onClick={() => setShowChart(!showChart)}
        >
          <h2 className="text-lg font-semibold text-gray-800">Distribution Chart</h2>
          <button className="px-2 py-1 text-lg font-bold text-primary-500 hover:text-primary-600 transition-colors">
            {showChart ? '−' : '+'}
          </button>
        </div>
        <div className={`transition-all duration-200 ease-in-out ${
          showChart ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-4 overflow-x-scroll">
            <TbtDistributionChart
              url1Data={url1Data}
              url2Data={url2Data}
              url1Name={url1Name}
              url2Name={url2Name}
            />
          </div>
        </div>
      </div>

      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer rounded-md px-3 py-2 hover:bg-primary-50 transition-colors"
          onClick={() => setShowPieCharts(!showPieCharts)}
        >
          <h2 className="text-lg font-semibold text-gray-800">Distribution Pie Charts</h2>
          <button className="px-2 py-1 text-lg font-bold text-primary-500 hover:text-primary-600 transition-colors">
            {showPieCharts ? '−' : '+'}
          </button>
        </div>
        <div className={`transition-all duration-200 ease-in-out ${
          showPieCharts ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <TbtDistributionPieCharts
            url1Data={url1Data}
            url2Data={url2Data}
            url1Name={url1Name}
            url2Name={url2Name}
          />
        </div>
      </div>
    </div>
  );
};

export default TbtAnalytics; 