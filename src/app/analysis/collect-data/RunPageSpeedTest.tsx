'use client';

import { useState } from 'react';
import { usePageSpeedTest } from '@/hooks/usePageSpeed';
import Button from '@/components/atoms/buttons/Button';
import Input from '@/components/atoms/inputs/Input';
import { Plus, Trash2, Play, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";


interface TestInstance {
  id: string;
  url: string;
  numberOfRecords: number;
  results: {
    mobile: any[];
    desktop: any[];
  } | null;
}

export default function RunPageSpeedTest() {
  const [testInstances, setTestInstances] = useState<TestInstance[]>([
    { id: '1', url: '', numberOfRecords: 1, results: null }
  ]);
  
  const addTestInstance = () => {
    setTestInstances(prev => [
      ...prev,
      { 
        id: String(Date.now()),
        url: '',
        numberOfRecords: 1,
        results: null
      }
    ]);
  };

  const removeTestInstance = (id: string) => {
    setTestInstances(prev => prev.filter(instance => instance.id !== id));
  };

  const updateTestInstance = (id: string, updates: Partial<TestInstance>) => {
    setTestInstances(prev => prev.map(instance => 
      instance.id === id ? { ...instance, ...updates } : instance
    ));
  };

  return (
    <div className="space-y-6">
      {testInstances.map((instance) => (
        <TestInstanceComponent
          key={instance.id}
          instance={instance}
          onRemove={() => removeTestInstance(instance.id)}
          onUpdate={(updates) => updateTestInstance(instance.id, updates)}
        />
      ))}

      <Button
        onClick={addTestInstance}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
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

function TestInstanceComponent({ instance, onRemove, onUpdate }: TestInstanceComponentProps) {
  const { runTests, isLoading, error, mobileResults, desktopResults } = usePageSpeedTest();
  const [isOpen, setIsOpen] = useState(false);

  const handleRunTest = async () => {
    if (!instance.url) return;
    
    try {
      const results = await runTests(instance.url, instance.numberOfRecords);
      onUpdate({ results });
      setIsOpen(true); // Open the results when test completes
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                type="url"
                value={instance.url}
                onChange={(e) => onUpdate({ url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium mb-1"># of Tests</label>
              <Input
                type="number"
                min={1}
                max={10}
                value={instance.numberOfRecords}
                onChange={(e) => onUpdate({ numberOfRecords: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleRunTest}
              disabled={isLoading || !instance.url}
            >
              <Play className="w-4 h-4 mr-2" />
              {isLoading ? 'Running...' : 'Run Test'}
            </Button>
            <Button
              // variant="destructive"
              onClick={onRemove}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}

      {instance.results && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full flex justify-between items-center"
            >
              View Results
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all">
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Mobile Results</h3>
                <div className="space-y-2">
                  {mobileResults.map((result, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full flex justify-between items-center text-sm text-gray-500 h-auto py-2"
                        >
                          Test {index + 1} - {new Date(result.timestamp).toLocaleString()}
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border rounded p-2 mt-1">
                        <div className="space-y-1">
                          {Object.entries(result.metrics).map(([key, metric]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{metric.title}:</span>{' '}
                              {metric.displayValue}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Desktop Results</h3>
                <div className="space-y-2">
                  {desktopResults.map((result, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full flex justify-between items-center text-sm text-gray-500 h-auto py-2"
                        >
                          Test {index + 1} - {new Date(result.timestamp).toLocaleString()}
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border rounded p-2 mt-1">
                        <div className="space-y-1">
                          {Object.entries(result.metrics).map(([key, metric]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{metric.title}:</span>{' '}
                              {metric.displayValue}
                            </div>
                          ))}
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