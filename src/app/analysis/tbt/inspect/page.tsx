"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePageSpeedStore } from '@/store/usePageSpeedStore';
import DualURLTBTConfig from '@/components/organisms/DualURLTBTConfig';
import TbtAnalytics from '@/components/organisms/TbtAnalytics';

const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

const TbtDashboard = () => {
  const [splitPosition, setSplitPosition] = useState(50);
  const { tbts1, tbts2, displayName1, displayName2 } = usePageSpeedStore();

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">TBT Inspector</h1>
              <p className="mt-1 text-sm text-gray-500">
                Compare and analyze Total Blocking Time metrics between two URLs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50">
        <Split
          // @ts-ignore
          initialPosition={splitPosition}
          onPositionChanged={setSplitPosition}
          splitterSize="4px"
          className="h-full"
        >
          <div className="h-full overflow-auto bg-white">
            <div className="max-w-3xl mx-auto p-6">
              <DualURLTBTConfig 
                heading="Configuration"
              />
            </div>
          </div>
          <div className="h-full overflow-auto bg-white">
            <div className="max-w-4xl mx-auto p-6">
              <TbtAnalytics
                url1Data={tbts1}
                url2Data={tbts2}
                url1Name={displayName1}
                url2Name={displayName2}
              />
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default TbtDashboard;