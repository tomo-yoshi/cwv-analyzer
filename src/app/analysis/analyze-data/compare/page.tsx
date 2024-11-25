'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import { BarChart3, Search, TableIcon, Trash2 } from 'lucide-react';
import Button from '@/components/atoms/buttons/Button';
import Input from '@/components/atoms/inputs/Input';
import Select from '@/components/atoms/selects/Select';
import { MetricComparison } from '@/components/organisms/MetricComparison';

const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

interface PageSpeedRecord {
  id: string;
  display_name: string;
  url: string;
  records: any[];  // Single array of records
  created_at: string;
  strategy: 'mobile' | 'desktop';
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
}

interface ComparisonData {
  timestamp: string;
  record1Value: number;
  record2Value: number;
}

export default function CompareTwoDataPage() {
  const { selectedProject } = useOrgAndProjStore();
  const [records, setRecords] = useState<PageSpeedRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [urlFilter, setUrlFilter] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [viewType, setViewType] = useState<'bar' | 'table'>('bar');

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedProject) return;

      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('pagespeed_records')
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
        setRecords(data as PageSpeedRecord[]);
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
      .from('pagespeed_records')
      .delete()
      .eq('id', recordId);

    if (error) {
      console.error('Error deleting record:', error);
      return;
    }

    setSelectedRecords(prev => prev.filter(id => id !== recordId));
    setRecords(prev => prev.filter(record => record.id !== recordId));
  };

  const getAvailableMetrics = () => {
    const record = records.find(r => r.id === selectedRecords[0]);
    if (!record || !record.records.length) return [];

    const firstTest = record.records[0];
    if (!firstTest || !firstTest.metrics) return [];

    return Object.entries(firstTest.metrics)
      .filter(([_, value]: [string, any]) => value.numericValue !== undefined)
      .map(([key, value]: [string, any]) => ({
        value: key,
        label: value.title || key
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  const prepareComparisonData = () => {
    if (selectedRecords.length !== 2 || !selectedMetric) return [];

    const record1 = records.find(r => r.id === selectedRecords[0]);
    const record2 = records.find(r => r.id === selectedRecords[1]);

    if (!record1 || !record2) return [];

    // Check if strategies match
    if (record1.strategy !== record2.strategy) {
      console.warn('Cannot compare records with different strategies');
      return [];
    }

    const data: ComparisonData[] = [];
    const maxLength = Math.max(
      record1.records.length,
      record2.records.length
    );

    for (let i = 0; i < maxLength; i++) {
      const timestamp = new Date(
        record1.records[i]?.timestamp || 
        record2.records[i]?.timestamp
      ).toLocaleTimeString();

      const value1 = record1.records[i]?.metrics[selectedMetric]?.numericValue;
      const value2 = record2.records[i]?.metrics[selectedMetric]?.numericValue;

      data.push({
        timestamp,
        record1Value: value1,
        record2Value: value2
      });
    }

    return data;
  };

  // Get unique creators
  const uniqueCreators = Array.from(new Set(records.map(record => 
    `${record.profiles.first_name || ''} ${record.profiles.last_name || ''}`.trim()
  ))).filter(Boolean);

  const creatorOptions = [
    { value: '', label: 'All creators' },
    ...uniqueCreators.map(creator => ({
      value: creator,
      label: creator
    }))
  ];

  const sortOptions = [
    { value: 'desc', label: 'Newest first' },
    { value: 'asc', label: 'Oldest first' }
  ];

  // Filter and sort records
  const filteredAndSortedRecords = records
    .filter(record => {
      const matchesUrl = record.url.toLowerCase().includes(urlFilter.toLowerCase());
      const creatorName = `${record.profiles.first_name || ''} ${record.profiles.last_name || ''}`.trim();
      const matchesCreator = !creatorFilter || creatorName === creatorFilter;
      return matchesUrl && matchesCreator;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="h-[calc(100vh-4rem)]">
      <Split initialPrimarySize="400px" minPrimarySize="300px" minSecondarySize="500px">
        <div className="h-full overflow-auto p-4 pl-8">
          <h2 className="text-xl font-semibold mb-4">PageSpeed Records ({records.length})</h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Filter by URL..."
                    value={urlFilter}
                    onChange={(e) => setUrlFilter(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute right-2 top-[12px] h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Select
                label=""
                value={sortOrder}
                onChange={(value) => setSortOrder(value as 'desc' | 'asc')}
                options={sortOptions}
              />
            </div>

            <Select
              label="Filter by creator"
              value={creatorFilter}
              onChange={setCreatorFilter}
              options={creatorOptions}
            />
          </div>

          {loading ? (
            <p>Loading records...</p>
          ) : filteredAndSortedRecords.length === 0 ? (
            <p>No records found</p>
          ) : (
            <div className="space-y-2">
              {filteredAndSortedRecords.map(record => (
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
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Compare Metrics</h2>
                
                <div className="flex-1">
                  <Select
                    label="Metric"
                    value={selectedMetric}
                    onChange={setSelectedMetric}
                    options={getAvailableMetrics()}
                  />
                </div>

                {selectedRecords.length === 2 && 
                  records.find(r => r.id === selectedRecords[0])?.strategy !==
                  records.find(r => r.id === selectedRecords[1])?.strategy && (
                  <div className="text-yellow-600 bg-yellow-50 p-3 rounded">
                    Warning: Cannot compare records with different strategies
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant={viewType === 'bar' ? 'primary' : 'outline'}
                    onClick={() => setViewType('bar')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Bar
                  </Button>
                  {/* <Button
                    variant={viewType === 'table' ? 'primary' : 'outline'}
                    onClick={() => setViewType('table')}
                  >
                    <TableIcon className="h-4 w-4 mr-2" />
                    Table
                  </Button> */}
                </div>
              </div>

              {selectedMetric && (
                <MetricComparison
                  data={prepareComparisonData()}
                  record1Name={records.find(r => r.id === selectedRecords[0])?.display_name || ''}
                  record2Name={records.find(r => r.id === selectedRecords[1])?.display_name || ''}
                  selectedMetric={selectedMetric}
                  viewType={viewType}
                />
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Selected Records:</h3>
                {selectedRecords.map(recordId => {
                  const record = records.find(r => r.id === recordId);
                  return (
                    <div key={recordId} className="p-2 bg-gray-50 rounded">
                      <p className="font-medium">{record?.display_name}</p>
                      <p className="text-sm text-gray-600">{record?.url}</p>
                      <p className="text-sm text-gray-500">Strategy: {record?.strategy}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Please select two records with the same strategy to compare
              </p>
            </div>
          )}
        </div>
      </Split>
    </div>
  );
}