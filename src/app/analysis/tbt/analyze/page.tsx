'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import TbtAnalytics from '@/components/organisms/TbtAnalytics';

const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

interface TbtRecord {
  id: string;
  display_name: string;
  url: string;
  records: Array<{
    timeStamp: string;
    result: {
      numericValue: number;
    };
  }>;
  strategy: 'mobile' | 'desktop';
  created_at: string;
}

export default function AnalyzePage() {
  const { selectedProject } = useOrgAndProjStore();
  const [records, setRecords] = useState<TbtRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedProject) return;

      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('tbt_records')
        .select('*')
        .eq('project_id', selectedProject.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching records:', error);
      } else {
        setRecords(data as TbtRecord[]);
      }
      setLoading(false);
    };

    fetchRecords();
  }, [selectedProject]);

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecords(prev => {
      if (prev.includes(recordId)) {
        return prev.filter(id => id !== recordId);
      }
      if (prev.length >= 2) {
        return [prev[1], recordId];
      }
      return [...prev, recordId];
    });
  };

  if (!selectedProject) {
    return (
      <div className="p-8 text-center">
        <p>Please select a project first</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <Split initialPrimarySize="400px" minPrimarySize="300px" minSecondarySize="500px">
        <div className="h-full overflow-auto p-4 pl-8">
          <h2 className="text-xl font-semibold mb-4">TBT Records</h2>
          {loading ? (
            <p>Loading records...</p>
          ) : records.length === 0 ? (
            <p>No records found</p>
          ) : (
            <div className="space-y-2">
              {records.map(record => (
                <div
                  key={record.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRecords.includes(record.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleRecordSelect(record.id)}
                >
                  <h3 className="font-medium">{record.display_name}</h3>
                  <p className="text-sm">
                    {new Date(record.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{record.url}</p>
                  <p className="text-sm text-gray-500">
                    Strategy: {record.strategy}
                  </p>
                  <p className="text-sm text-gray-500">
                    Records: {record.records.length}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-full overflow-auto p-4">
          {selectedRecords.length === 2 ? (
          <TbtAnalytics
            url1Data={records.find(r => r.id === selectedRecords[0])?.records || []}
            url2Data={records.find(r => r.id === selectedRecords[1])?.records || []}
            url1Name={records.find(r => r.id === selectedRecords[0])?.display_name || ''}
            url2Name={records.find(r => r.id === selectedRecords[1])?.display_name || ''}
          />
        ) : (
          <p>Please select two records to compare</p>
        )}
        </div>
      </Split>
    </div>
  );
}