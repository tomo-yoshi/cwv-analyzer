'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import TbtAnalytics from '@/components/organisms/TbtAnalytics';
import { Trash2 } from 'lucide-react';
import Button from '@/components/atoms/buttons/Button';

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
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
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
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
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

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('tbt_records')
      .delete()
      .eq('id', recordId);

    if (error) {
      console.error('Error deleting record:', error);
      return;
    }

    // Remove from selected records if it was selected
    setSelectedRecords(prev => prev.filter(id => id !== recordId));
    // Remove from records list
    setRecords(prev => prev.filter(record => record.id !== recordId));
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
          <h2 className="text-xl font-semibold mb-4">TBT Records ({records.length})</h2>
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
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1" onClick={() => handleRecordSelect(record.id)}>
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
                      <p className="text-sm text-gray-500">
                        Created by: {record.profiles.first_name || ''} {record.profiles.last_name || ''}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecord(record.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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