"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePageSpeedStore } from '@/stores/usePageSpeedStore';
import { useTestData } from '@/hooks/useTestData';

// Dynamically import the Split component with ssr disabled
const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

import TbtDistributionChart from '@/components/molecules/TbtDistributionChart';
import TbtDistributionPieCharts from '@/components/molecules/TbtDistributionPieCharts';
// Assuming you have a Switch component
import TbtDistributionTable from '@/components/molecules/TbtDistributionTable';
import DualURLTBTConfig from '@/components/organisms/DualURLTBTConfig';
import TbtStatisticalComparison from '@/components/molecules/TbtStatisticalComparison';

const TbtDashboard = () => {
  const [splitPosition, setSplitPosition] = useState(50);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showPieCharts, setShowPieCharts] = useState(false);

  const { loadTestData } = useTestData();
  const { tbts1, tbts2, displayName1, displayName2 } = usePageSpeedStore();

  // Load test data in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      loadTestData();
    }
  }, [loadTestData]);

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TBT Inspector</h1>
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="flex gap-2">
              <button
                onClick={() => loadTestData(10)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Load 10 Records
              </button>
              <button
                onClick={() => loadTestData(30)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Load 30 Records
              </button>
              <button
                onClick={() => loadTestData(50)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Load 50 Records
              </button>
            </div>
          )} */}
        </div>
      </header>

      <main className="flex-1">
        <Split
          // @ts-ignore
          initialPosition={splitPosition}
          onPositionChanged={setSplitPosition}
          splitterSize="4px"
          className="h-full"
        >
          <div className="h-full overflow-auto p-4">
            <DualURLTBTConfig heading="Configuration" />
          </div>
          <div className="h-full p-4 space-y-4">
            <TbtStatisticalComparison
              previewData={tbts1}
              productionData={tbts2}
              previewSiteName={displayName1}
              productionSiteName={displayName2}
            />
            
            <div className='border-b-2 pb-4'>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Distribution Table</h2>
                <button 
                  onClick={() => setShowTable(!showTable)}
                  className="px-2 py-1 text-lg font-bold"
                >
                  {showTable ? '−' : '+'}
                </button>
              </div>
              {showTable && (
                <TbtDistributionTable
                  previewData={tbts1}
                  productionData={tbts2}
                  previewSiteName={displayName1}
                  productionSiteName={displayName2}
                />
              )}
            </div>

            <div className='border-b-2 pb-4'>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Distribution Chart</h2>
                <button 
                  onClick={() => setShowChart(!showChart)}
                  className="px-2 py-1 text-lg font-bold"
                >
                  {showChart ? '−' : '+'}
                </button>
              </div>
              {showChart && (
                <div className="px-4">
                  <TbtDistributionChart
                    previewData={tbts1}
                    productionData={tbts2}
                    previewSiteName={displayName1}
                    productionSiteName={displayName2}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Distribution Pie Charts</h2>
                <button 
                  onClick={() => setShowPieCharts(!showPieCharts)}
                  className="px-2 py-1 text-lg font-bold"
                >
                  {showPieCharts ? '−' : '+'}
                </button>
              </div>
              {showPieCharts && (
                <TbtDistributionPieCharts
                  previewData={tbts1}
                  productionData={tbts2}
                  previewSiteName={displayName1}
                  productionSiteName={displayName2}
                />
              )}
            </div>
          </div>
        </Split>
      </main>
    </div>
  );
};

export default TbtDashboard;