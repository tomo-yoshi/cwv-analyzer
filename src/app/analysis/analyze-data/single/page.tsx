'use client';

import { Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import Button from '@/components/atoms/buttons/Button';
import PageSpeedAskAI from '@/components/organisms/PageSpeedAskAI';
import PageSpeedMean from '@/components/organisms/PageSpeedMean';
import PageSpeedMedian from '@/components/organisms/PageSpeedMedian';

import { useOrgAndProjStore } from '@/store/orgAndProjStore';

import { Search } from 'lucide-react';
import Input from '@/components/atoms/inputs/Input';
import Select from '@/components/atoms/selects/Select';

const Split = dynamic(
  () => import('@geoffcox/react-splitter').then((mod) => mod.Split),
  { ssr: false }
);

interface PageSpeedRecord {
  id: string;
  display_name: string;
  url: string;
  records: any[];
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
  strategy: 'mobile' | 'desktop';
}

const AnalysisTypeToggle = ({
  analysisType,
  onChange,
  onAskAI,
}: {
  analysisType: 'mean' | 'median';
  onChange: (type: 'mean' | 'median') => void;
  onAskAI: () => void;
}) => (
  <div className='flex space-x-2 mb-4'>
    <Button
      variant={analysisType === 'mean' ? 'primary' : 'outline'}
      onClick={() => onChange('mean')}
      className='w-24 flex justify-center items-center'
    >
      Mean
    </Button>
    <Button
      variant={analysisType === 'median' ? 'primary' : 'outline'}
      onClick={() => onChange('median')}
      className='w-24 flex justify-center items-center'
    >
      Median
    </Button>
    <Button
      variant='primary'
      onClick={onAskAI}
      className='w-24 flex justify-center items-center bg-red-500 border-1 border-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-700'
    >
      Ask AI
    </Button>
  </div>
);

export default function AnalyzeSingleDataPage() {
  const { selectedProject } = useOrgAndProjStore();
  const [records, setRecords] = useState<PageSpeedRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisType, setAnalysisType] = useState<'mean' | 'median'>('mean');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [urlFilter, setUrlFilter] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      if (!selectedProject) return;

      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from('pagespeed_records')
        .select(
          `
          *,
          profiles (
            first_name,
            last_name
          )
        `
        )
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

  useEffect(() => {
    const updateUserPlan = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user?.id);

      console.log(data);

      if (error) {
        console.error("Error fetching user's plan:", error);
      } else {
        const plan = data[0]?.plan.toLowerCase();
        setIsPro(plan === 'pro');
      }
    };
    updateUserPlan();
  }, []);

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecord(selectedRecord === recordId ? null : recordId);
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

    // Remove from selected record if it was selected
    if (selectedRecord === recordId) {
      setSelectedRecord(null);
    }
    // Remove from records list
    setRecords((prev) => prev.filter((record) => record.id !== recordId));
  };

  // Get unique creators from records
  const uniqueCreators = Array.from(
    new Set(
      records.map((record) =>
        `${record.profiles.first_name || ''} ${
          record.profiles.last_name || ''
        }`.trim()
      )
    )
  ).filter(Boolean);

  const creatorOptions = [
    { value: '', label: 'All creators' },
    ...uniqueCreators.map((creator) => ({
      value: creator,
      label: creator,
    })),
  ];

  const sortOptions = [
    { value: 'desc', label: 'Newest first' },
    { value: 'asc', label: 'Oldest first' },
  ];

  // Filter and sort records
  const filteredAndSortedRecords = records
    .filter((record) => {
      const matchesUrl = record.url
        .toLowerCase()
        .includes(urlFilter.toLowerCase());
      const creatorName = `${record.profiles.first_name || ''} ${
        record.profiles.last_name || ''
      }`.trim();
      const matchesCreator = !creatorFilter || creatorName === creatorFilter;
      return matchesUrl && matchesCreator;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  if (!selectedProject) {
    return (
      <div className='p-8 text-center'>
        <p>Please select a project first</p>
      </div>
    );
  }

  const renderAnalysis = () => {
    if (!selectedRecord) {
      return <p>Please select a record to analyze</p>;
    }

    const record = records.find((r) => r.id === selectedRecord);
    if (!record) return null;

    return (
      <div>
        <AnalysisTypeToggle
          analysisType={analysisType}
          onChange={setAnalysisType}
          onAskAI={() => setShowAIAnalysis(true)}
        />
        {analysisType === 'mean' ? (
          <PageSpeedMean
            data={record.records}
            displayName={`${record.display_name} (${record.strategy})`}
          />
        ) : (
          <PageSpeedMedian
            data={record.records}
            displayName={`${record.display_name} (${record.strategy})`}
          />
        )}
        {showAIAnalysis && (
          <PageSpeedAskAI
            data={record.records}
            onClose={() => setShowAIAnalysis(false)}
            isPro={isPro}
          />
        )}
      </div>
    );
  };

  return (
    <div className='h-[calc(100vh-4rem)]'>
      <Split
        initialPrimarySize='400px'
        minPrimarySize='300px'
        minSecondarySize='500px'
      >
        <div className='h-full overflow-auto p-4 pl-8'>
          <h2 className='text-xl font-semibold mb-4'>
            PageSpeed Records ({records.length})
          </h2>

          {/* Filters and Sort */}
          <div className='space-y-4 mb-6'>
            <div className='flex items-center space-x-2'>
              <div className='flex-1'>
                <div className='relative'>
                  {/* <Search className="absolute right-2 top-[12px] h-4 w-4 text-gray-500" /> */}
                  <Input
                    placeholder='Filter by URL'
                    value={urlFilter}
                    onChange={(e) => setUrlFilter(e.target.value)}
                    className='pl-8'
                  />
                </div>
              </div>
              <Select
                label=''
                value={sortOrder}
                onChange={(value) => setSortOrder(value as 'desc' | 'asc')}
                options={sortOptions}
              />
            </div>

            <Select
              label='Filter by creator'
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
            <div className='space-y-2'>
              {filteredAndSortedRecords.map((record) => (
                <div
                  key={record.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRecord === record.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className='flex justify-between items-start'>
                    <div
                      className='flex-1'
                      onClick={() => handleRecordSelect(record.id)}
                    >
                      <h3 className='font-medium'>{record.display_name}</h3>
                      <p className='text-sm'>
                        {new Date(record.created_at).toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-600'>{record.url}</p>
                      <p className='text-sm text-gray-500'>
                        Strategy: {record.strategy}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Records: {record.records.length}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Created by: {record.profiles.first_name || ''}{' '}
                        {record.profiles.last_name || ''}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      className='text-gray-500 hover:text-red-500'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecord(record.id);
                      }}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='h-full overflow-auto p-4'>{renderAnalysis()}</div>
      </Split>
    </div>
  );
}
