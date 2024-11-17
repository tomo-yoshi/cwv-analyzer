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


const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

interface PageSpeedRecord {
  id: string;
  display_name: string;
  url: string;
  records: {
    mobile: any[];
    desktop: any[];
  };
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
}

const AnalysisTypeToggle = ({ 
  analysisType, 
  onChange,
  onAskAI
}: { 
  analysisType: 'mean' | 'median';
  onChange: (type: 'mean' | 'median') => void;
  onAskAI: () => void;
}) => (
  <div className="flex space-x-2 mb-4">
    <Button
      variant={analysisType === 'mean' ? 'primary' : 'outline'}
      onClick={() => onChange('mean')}
      className="w-24 flex justify-center items-center"
    >
      Mean
    </Button>
    <Button
      variant={analysisType === 'median' ? 'primary' : 'outline'}
      onClick={() => onChange('median')}
      className="w-24 flex justify-center items-center"
    >
      Median
    </Button>
    <Button
      variant="primary"
      onClick={onAskAI}
      className="w-24 flex justify-center items-center bg-red-500 border-1 border-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-700"
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

    useEffect(() => {
    const updateUserPlan = async() => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user?.id);

      console.log(data);

      if(error) {
        console.error('Error fetching user\'s plan:', error);
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
    setRecords(prev => prev.filter(record => record.id !== recordId));
  };

  if (!selectedProject) {
    return (
      <div className="p-8 text-center">
        <p>Please select a project first</p>
      </div>
    );
  }

  const renderAnalysis = () => {
    if (!selectedRecord) {
      return <p>Please select a record to analyze</p>;
    }

    const recordData = records.find(r => r.id === selectedRecord)?.records || { mobile: [], desktop: [] };
    const displayName = records.find(r => r.id === selectedRecord)?.display_name || '';

    return (
      <div>
        <AnalysisTypeToggle 
          analysisType={analysisType} 
          onChange={setAnalysisType}
          onAskAI={() => setShowAIAnalysis(true)}
        />
        {analysisType === 'mean' ? (
          <PageSpeedMean data={recordData} displayName={displayName} />
        ) : (
          <PageSpeedMedian data={recordData} displayName={displayName} />
        )}
        {showAIAnalysis && (
          <PageSpeedAskAI
            data={recordData}
            onClose={() => setShowAIAnalysis(false)}
            isPro={isPro}
          />
        )}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <Split initialPrimarySize="400px" minPrimarySize="300px" minSecondarySize="500px">
        <div className="h-full overflow-auto p-4 pl-8">
          <h2 className="text-xl font-semibold mb-4">PageSpeed Records ({records.length})</h2>
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
                    selectedRecord === record.id
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
                        Mobile/Desktop Records: {record.records.mobile?.length || 0}
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
          {renderAnalysis()}
        </div>
      </Split>
    </div>
  );
}