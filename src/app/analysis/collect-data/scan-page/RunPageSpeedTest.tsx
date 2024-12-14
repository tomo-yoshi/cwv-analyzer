/* eslint-disable @typescript-eslint/no-inferrable-types */
// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePageSpeedTest } from '@/hooks/usePageSpeed';
import Button from '@/components/atoms/buttons/Button';
import Input from '@/components/atoms/inputs/Input';
import { Plus, Trash2, Play, ChevronDown, StopCircle } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

type Strategy = 'mobile' | 'desktop';

interface TestInstance {
  id: string;
  url: string;
  numberOfRecords: number;
  strategy: Strategy; // Add this field
  results: {
    mobile: any[];
    desktop: any[];
  } | null;
}

export default function RunPageSpeedTest() {
  const [testInstances, setTestInstances] = useState<TestInstance[]>([
    {
      id: '1',
      url: '',
      numberOfRecords: 1,
      strategy: 'mobile',
      results: null,
    },
  ]);

  const addTestInstance = () => {
    setTestInstances((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        url: '',
        numberOfRecords: 1,
        strategy: 'mobile',
        results: null,
      },
    ]);
  };

  const removeTestInstance = (id: string) => {
    setTestInstances((prev) => prev.filter((instance) => instance.id !== id));
  };

  const updateTestInstance = (id: string, updates: Partial<TestInstance>) => {
    setTestInstances((prev) =>
      prev.map((instance) =>
        instance.id === id ? { ...instance, ...updates } : instance
      )
    );
  };

  return (
    <div className='space-y-6'>
      {testInstances.map((instance) => (
        <TestInstanceComponent
          key={instance.id}
          instance={instance}
          onRemove={() => removeTestInstance(instance.id)}
          onUpdate={(updates) => updateTestInstance(instance.id, updates)}
        />
      ))}

      <Button onClick={addTestInstance} variant='outline' className='w-full'>
        <Plus className='w-4 h-4 mr-2' />
        Add Another Test
      </Button>
    </div>
  );
}

interface TestInstanceComponentProps {
  instance: TestInstance;
  onRemove: () => void;
  onUpdate: (updates: Partial<TestInstance>) => void;
}

interface TestInstanceComponentProps {
  instance: TestInstance;
  onRemove: () => void;
  onUpdate: (updates: Partial<TestInstance>) => void;
}

function TestInstanceComponent({
  instance,
  onRemove,
  onUpdate,
}: TestInstanceComponentProps) {
  const { runTests, isLoading, error } = usePageSpeedTest();
  const { selectedProject } = useOrgAndProjStore();
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const totalTests = instance.numberOfRecords * 2;

  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  const handleRunTest = async () => {
    if (!instance.url) return;

    // Initialize empty results
    onUpdate({
      results: {
        mobile: [],
        desktop: [],
      },
    });

    setProgress(0);
    setIsCancelled(false);
    setIsCompleted(false);
    setElapsedTime(0);
    abortControllerRef.current = new AbortController();

    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    try {
      const { results } = await runTests(
        instance.url,
        instance.numberOfRecords,
        instance.strategy,
        (completedTests, currentResults) => {
          setProgress((completedTests / instance.numberOfRecords) * 100);
          onUpdate({ results: currentResults });
        },
        abortControllerRef.current.signal
      );

      // Update final results
      onUpdate({ results });

      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsCompleted(true);
      setIsOpen(true);
    } catch (error) {
      if (!isCancelled) {
        console.error('Test failed:', error);
      }
      // Clear timer and reset state on error
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsCompleted(false);

      // Reset results on error
      onUpdate({
        results: {
          mobile: [],
          desktop: [],
        },
      });
    }
  };

  const handleStop = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to stop the test? The current results may be lost and you may need to start from the beginning.'
    );

    if (confirmed) {
      setIsCancelled(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsCompleted(false);
      // Clear results when stopped
      onUpdate({
        results: {
          mobile: [],
          desktop: [],
        },
      });
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSaveRecord = async () => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }

    if (!instance.results) {
      alert('No results to save');
      return;
    }

    // Generate default display name
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    // Extract domain from URL
    const domain = new URL(instance.url).hostname.replace('www.', '');
    const defaultName = `${domain} - ${formattedDate} ${formattedTime}`;

    // Prompt with pre-filled name
    const displayName = window.prompt(
      'Please enter a display name for these results:',
      defaultName
    );
    if (!displayName) {
      alert('Display name is required');
      return;
    }

    try {
      setIsSaving(true);
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to save records');
        return;
      }

      const { error } = await supabase.from('pagespeed_records').insert({
        display_name: displayName,
        url: instance.url,
        records:
          instance.strategy === 'mobile'
            ? instance.results.mobile
            : instance.results.desktop,
        project_id: selectedProject.id,
        profile_id: user.id,
        strategy: instance.strategy,
      });

      if (error) throw error;
      setIsSaved(true);
      alert('Records saved successfully!');
    } catch (error) {
      console.error('Error saving records:', error);
      alert('Failed to save records');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='border rounded-lg p-4 space-y-4'>
      <div className='flex justify-between items-start'>
        <div className='flex-1 space-y-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium mb-1'>URL</label>
              <Input
                type='url'
                value={instance.url}
                onChange={(e) => onUpdate({ url: e.target.value })}
                placeholder='https://example.com'
                disabled={isLoading || isCompleted || isCancelled}
              />
            </div>
            <div className='w-32'>
              <label className='block text-sm font-medium mb-1'>
                # of Tests
              </label>
              <Input
                type='number'
                min={1}
                max={100}
                value={instance.numberOfRecords}
                onChange={(e) =>
                  onUpdate({ numberOfRecords: Number(e.target.value) })
                }
                disabled={isLoading || isCompleted || isCancelled}
              />
            </div>
          </div>

          {error && <div className='error-message text-red-500'>{error}</div>}

          <div className='flex gap-4'>
            <div className='flex items-center gap-4'>
              <label className='text-sm font-medium'>Strategy:</label>
              <div className='flex gap-2'>
                <Button
                  variant={
                    instance.strategy === 'mobile' ? 'primary' : 'outline'
                  }
                  onClick={() => onUpdate({ strategy: 'mobile' })}
                  disabled={isLoading || isCompleted || isCancelled}
                  className='px-4'
                >
                  Mobile
                </Button>
                <Button
                  variant={
                    instance.strategy === 'desktop' ? 'primary' : 'outline'
                  }
                  onClick={() => onUpdate({ strategy: 'desktop' })}
                  disabled={isLoading || isCompleted || isCancelled}
                  className='px-4'
                >
                  Desktop
                </Button>
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            {isLoading ? (
              <Button onClick={handleStop}>
                <StopCircle className='w-4 h-4 mr-2' />
                Stop
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleRunTest}
                  disabled={!instance.url || isCompleted}
                >
                  <Play className='w-4 h-4 mr-2' />
                  {isCompleted
                    ? 'Completed'
                    : isCancelled
                    ? 'Restart'
                    : 'Run Test'}
                </Button>
                {isCompleted && selectedProject?.id && (
                  <Button
                    onClick={handleSaveRecord}
                    disabled={isSaving || isSaved}
                    variant='outline'
                  >
                    {isSaving
                      ? 'Saving...'
                      : isSaved
                      ? 'Saved'
                      : 'Save Results'}
                  </Button>
                )}
              </>
            )}
            <Button onClick={onRemove} disabled={isLoading}>
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>

          {(isLoading || isCompleted) && (
            <div className='space-y-2'>
              <div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className={`h-full transition-all duration-200 ${
                    isLoading ? 'progress-bar-striped' : ''
                  } ${isCompleted ? 'bg-green-500' : 'bg-primary-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className='text-sm text-gray-500 text-right'>
                {elapsedTime}s{' • '}
                {isCompleted ? 'Complete' : `${Math.round(progress)}% Complete`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}
 */}
      {instance.results && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='w-full flex justify-between items-center'
            >
              View Results
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='transition-all'>
            <div className='mt-4'>
              <div>
                <h3 className='font-medium mb-2'>
                  {instance.strategy === 'mobile' ? 'Mobile' : 'Desktop'}{' '}
                  Results
                </h3>
                <div className='space-y-2'>
                  {instance.results[instance.strategy].map((result, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant='ghost'
                          className='w-full flex justify-between items-center text-sm text-gray-500 h-auto py-2'
                        >
                          Test {index + 1} -{' '}
                          {new Date(result.timestamp).toLocaleString()}
                          <ChevronDown className='w-4 h-4 transition-transform duration-200' />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='border rounded p-4 mt-1 space-y-4'>
                        {/* Core Web Vitals Section */}
                        <div>
                          <h4 className='font-medium text-sm mb-2'>
                            Core Web Vitals
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {Object.entries(result.metrics)
                              .filter(([key]) =>
                                [
                                  'first-contentful-paint',
                                  'largest-contentful-paint',
                                  'cumulative-layout-shift',
                                  'total-blocking-time',
                                ].includes(key)
                              )
                              .map(([key, metric]) => (
                                <div
                                  key={key}
                                  className='text-sm p-2 bg-gray-50 rounded'
                                >
                                  <div className='font-medium'>
                                    {metric.title}
                                  </div>
                                  <div className='flex justify-between items-center'>
                                    <span>{metric.displayValue}</span>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        metric.score >= 0.9
                                          ? 'bg-green-100 text-green-800'
                                          : metric.score >= 0.5
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {Math.round(metric.score * 100)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Performance Metrics Section */}
                        <div>
                          <h4 className='font-medium text-sm mb-2'>
                            Performance Metrics
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {Object.entries(result.metrics)
                              .filter(([key]) =>
                                [
                                  'speed-index',
                                  'interactive',
                                  'max-potential-fid',
                                  'bootup-time',
                                ].includes(key)
                              )
                              .map(([key, metric]) => (
                                <div
                                  key={key}
                                  className='text-sm p-2 bg-gray-50 rounded'
                                >
                                  <div className='font-medium'>
                                    {metric.title}
                                  </div>
                                  <div className='flex justify-between items-center'>
                                    <span>{metric.displayValue}</span>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        metric.score >= 0.9
                                          ? 'bg-green-100 text-green-800'
                                          : metric.score >= 0.5
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {Math.round(metric.score * 100)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Resource Optimization Section */}
                        <div>
                          <h4 className='font-medium text-sm mb-2'>
                            Resource Optimization
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {Object.entries(result.metrics)
                              .filter(([key]) =>
                                [
                                  'total-byte-weight',
                                  'unused-css-rules',
                                  'unused-javascript',
                                  'dom-size',
                                  'unminified-css',
                                  'unminified-javascript',
                                ].includes(key)
                              )
                              .map(([key, metric]) => (
                                <div
                                  key={key}
                                  className='text-sm p-2 bg-gray-50 rounded'
                                >
                                  <div className='font-medium'>
                                    {metric.title}
                                  </div>
                                  <div className='flex justify-between items-center'>
                                    <span>{metric.displayValue}</span>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        metric.score >= 0.9
                                          ? 'bg-green-100 text-green-800'
                                          : metric.score >= 0.5
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {Math.round(metric.score * 100)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Network Performance Section */}
                        <div>
                          <h4 className='font-medium text-sm mb-2'>
                            Network Performance
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {Object.entries(result.metrics)
                              .filter(([key]) =>
                                [
                                  'server-response-time',
                                  'network-rtt',
                                  'network-server-latency',
                                  'uses-long-cache-ttl',
                                  'uses-text-compression',
                                ].includes(key)
                              )
                              .map(([key, metric]) => (
                                <div
                                  key={key}
                                  className='text-sm p-2 bg-gray-50 rounded'
                                >
                                  <div className='font-medium'>
                                    {metric.title}
                                  </div>
                                  <div className='flex justify-between items-center'>
                                    <span>{metric.displayValue}</span>
                                    <span
                                      className={`px-2 py-1 rounded text-xs ${
                                        metric.score >= 0.9
                                          ? 'bg-green-100 text-green-800'
                                          : metric.score >= 0.5
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {Math.round(metric.score * 100)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
