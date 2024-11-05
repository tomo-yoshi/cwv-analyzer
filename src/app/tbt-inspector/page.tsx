"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePageSpeedStore } from '@/stores/usePageSpeedStore';
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
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TBT Inspector</h1>
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
          <TbtAnalytics
            url1Data={tbts1}
            url2Data={tbts2}
            url1Name={displayName1}
            url2Name={displayName2}
          />
        </Split>
      </main>
    </div>
  );
};

export default TbtDashboard;