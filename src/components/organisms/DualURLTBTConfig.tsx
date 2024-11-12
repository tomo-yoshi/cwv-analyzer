import { useEffect, useState } from 'react';

import Button from '@/components/atoms/buttons/Button';
import Select from '@/components/atoms/selects/Select'; 
import { Switch } from '@/components/atoms/switches/Switch';
import { VisibilityToggle } from '@/components/atoms/buttons/VisibilityToggle';
import CombinedInput from '@/components/molecules/CombinedInput';

import type{ DateTimeFormatOptions } from '@/types';
import type { PagespeedApiRes, TbtItem } from '@/types/pagespeed';
import { usePageSpeedStore } from '@/store/usePageSpeedStore';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

interface DualURLTBTConfigProps {
  heading?: string;
}

export const DualURLTBTConfig = ({ heading }: DualURLTBTConfigProps) => {
  const { 
    tbts1, 
    tbts2, 
    displayName1, 
    displayName2, 
    addTbt1,
    addTbt2,
    setDisplayName1, 
    setDisplayName2, 
    resetTbts 
  } = usePageSpeedStore();
  const { selectedProject } = useOrgAndProjStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [isDualMode, setIsDualMode] = useState(true);
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [timer, setTimer] = useState(0);
  const [scan, setScan] = useState(false);
  const [numOfRecords, setNumOfRecords] = useState(30);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    number: true,
    url1: true,
    url2: true
  });  
  const [isSaving1, setIsSaving1] = useState(false);
  const [isSaving2, setIsSaving2] = useState(false);

  const handleSaveRecord = async (
    displayName: string,
    url: string,
    records: TbtItem[],
    setSaving: (saving: boolean) => void
  ) => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }

    try {
      setSaving(true);
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to save records');
        return;
      }

      const { error } = await supabase
        .from('tbt_records')
        .insert({
          display_name: displayName,
          url: url,
          records: records,
          strategy: strategy,
          project_id: selectedProject.id,
          profile_id: user.id
        });

      if (error) throw error;
      alert('Records saved successfully!');
    } catch (error) {
      console.error('Error saving records:', error);
      alert('Failed to save records');
    } finally {
      setSaving(false);
    }
  };

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleResetRecords = () => {
    if (window.confirm('Are you sure you want to reset all records?')) {
      resetTbts();
      setTimer(0);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    if (!scan) return;
    if (!numOfRecords) {
      alert('Invalid Number of Records');
      return;
    }
    if (!url1 && !url2) {
      alert('At least one URL is required');
      return;
    }

    const getTbt = async (url: string, addTbt: (tbt: TbtItem) => void) => {
      const queryOptions = {
        url: url,
        category: 'performance',
        strategy: strategy,
      };

      const queryParams = new URLSearchParams(queryOptions);

      try {
        const result: PagespeedApiRes = await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParams}`
        ).then((res) => res.json());

        const timestamp = result.analysisUTCTimestamp;
        const date = new Date(timestamp);
        const timestampOptions: DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Vancouver',
          timeZoneName: 'short',
        };
        const vancouverTime = date.toLocaleString('en-US', timestampOptions);

        const tbtResult = {
          timeStamp: vancouverTime,
          result: result.lighthouseResult.audits['total-blocking-time'],
        };

        addTbt(tbtResult);
      } catch (error) {
        console.error(error);
      }
    };

    let getTbtInterval1: NodeJS.Timeout | undefined = undefined;
    let getTbtInterval2: NodeJS.Timeout | undefined = undefined;

    if (url1 && tbts1.length < numOfRecords) {
      getTbt(url1, addTbt1);
      getTbtInterval1 = setInterval(() => {
        if (tbts1.length >= numOfRecords) {
          clearInterval(getTbtInterval1);
        } else {
          getTbt(url1, addTbt1);
        }
      }, 63000);
    }

    if (url2 && tbts2.length < numOfRecords) {
      getTbt(url2, addTbt2);
      getTbtInterval2 = setInterval(() => {
        if (tbts2.length >= numOfRecords) {
          clearInterval(getTbtInterval2);
        } else {
          getTbt(url2, addTbt2);
        }
      }, 63000);
    }

    const initTimer = () => setTimer((prev) => prev + 1);
    const timerInterval = scan ? setInterval(initTimer, 1000) : undefined;

    const shouldStopScan = 
      (!url1 || tbts1.length >= numOfRecords) && 
      (!url2 || tbts2.length >= numOfRecords);

    if (shouldStopScan) {
      clearInterval(timerInterval);
      setScan(false);
    }

    return () => {
      clearInterval(getTbtInterval1);
      clearInterval(getTbtInterval2);
      clearInterval(timerInterval);
    };
  }, [tbts1, tbts2, scan, numOfRecords, strategy, url1, url2, addTbt1, addTbt2]);

  const canStartScan = isDualMode 
    ? (url1.trim() !== '' && url2.trim() !== '') // Both URLs required in dual mode
    : (url1.trim() !== ''); // Only URL1 required in single mode

  return (
    <div className='p-4'>
      {heading && <h2 className='text-xl font-semibold mb-4'>{heading}</h2>}

      <div className='flex items-center justify-end gap-2 mb-4'>
        <Switch
          checked={isDualMode}
          onChange={setIsDualMode}
          aria-label="Toggle dual mode"
          disabled={scan}
        />
        <span className='text-sm'>{isDualMode ? 'Single URL Mode' : 'Dual URL Mode'}</span>
      </div>

      <div className='mb-4 grid gap-1'>
        <div className={isDualMode ? 'grid grid-cols-2 gap-4' : ''}>
          <div>
            <CombinedInput
              label="Display Name"
              placeholder="Enter display name"
              value={displayName1}
              onChange={(value) => setDisplayName1(String(value))}
              type="text"
              disabled={scan}
            />
            <CombinedInput
              label={isDualMode ? "URL 1" : "URL Input"}
              placeholder="Enter URL"
              value={url1}
              onChange={(value) => setUrl1(String(value))}
              type="text"
              disabled={scan}
            />
          </div>
          {isDualMode && (
            <div>
              <CombinedInput
                label="Display Name"
                placeholder="Enter display name"
                value={displayName2}
                onChange={(value) => setDisplayName2(String(value))}
                type="text"
                disabled={scan}
              />
              <CombinedInput
                label="URL 2"
                placeholder="Enter second URL"
                value={url2}
                onChange={(value) => setUrl2(String(value))}
                type="text"
                disabled={scan}
              />
            </div>
          )}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <CombinedInput
            label="Number of Records (1-100)"
            placeholder="Enter a number"
            value={numOfRecords}
            onChange={(value) => setNumOfRecords(Number(value))}
            type="number"
            min={1}
            max={100}
            disabled={scan}
          />
          <Select
            label="Strategy"
            value={strategy}
            onChange={(value) => setStrategy(value as 'mobile' | 'desktop')}
            options={[
              { value: 'mobile', label: 'Mobile' },
              { value: 'desktop', label: 'Desktop' }
            ]}
            disabled={scan}
          />
        </div>
      </div>

      <div className='mb-4 grid gap-4'>
        <div className='flex gap-4'>
          <Button
            variant='primary'
            isLoading={scan}
            disabled={scan || !canStartScan}
            onClick={() => setScan(true)}
          >
            Start the Scan
          </Button>
          <Button
            variant='outline'
            disabled={!scan}
            onClick={() => setScan(false)}
          >
            Stop the Scan
          </Button>
          <Button
            variant='outline'
            disabled={tbts1.length === 0 && tbts2.length === 0}
            onClick={handleResetRecords}
          >
            Reset Records
          </Button>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Switch
              checked={showTimestamp}
              onChange={setShowTimestamp}
              aria-label="Toggle timestamp"
            />
            <span className='text-sm'>{showTimestamp ? 'Hide Timestamp' : 'Show Timestamp'}</span>
          </div>
        </div>
      </div>

    <div className='mb-4 grid gap-4'>
      {isLoggedIn && (
        <div className='flex gap-4'>
          {tbts1.length > 0 && (
            <Button
              variant='outline'
              isLoading={isSaving1}
              onClick={() => handleSaveRecord(displayName1, url1, tbts1, setIsSaving1)}
            >
              Save {displayName1} Records
            </Button>
          )}
          
          {isDualMode && tbts2.length > 0 && (
            <Button
              variant='outline'
              isLoading={isSaving2}
              onClick={() => handleSaveRecord(displayName2, url2, tbts2, setIsSaving2)}
            >
              Save {displayName2} Records
            </Button>
          )}
        </div>
      )}
    </div>

      <div className='mb-4 flex items-center gap-4'>
        {/* <div className='flex items-center gap-2'>
          <Switch
            checked={showTimestamp}
            onChange={setShowTimestamp}
            aria-label="Toggle timestamp"
          />
          <span className='text-sm'>{showTimestamp ? 'Hide Timestamp' : 'Show Timestamp'}</span>
        </div> */}
        
        <div className='flex items-center gap-4 ml-4'>
          <VisibilityToggle
            isVisible={columnVisibility.number}
            onToggle={() => toggleColumn('number')}
            label="#"
          />
          
          <VisibilityToggle
            isVisible={columnVisibility.url1}
            onToggle={() => toggleColumn('url1')}
            label={isDualMode ? displayName1 : 'Results'}
          />
          
          {isDualMode && (
            <VisibilityToggle
              isVisible={columnVisibility.url2}
              onToggle={() => toggleColumn('url2')}
              label={displayName2}
            />
          )}
        </div>
      </div>

      <div className='mb-4 border-2'>
        <div className='max-h-[400px] overflow-auto'>
          <table className='w-full'>
            <thead className='sticky top-0 bg-white'>
              <tr className='border-b-2'>
                {columnVisibility.number && (
                  <th className='border-r-2 w-16'>#</th>
                )}
                {columnVisibility.url1 && (
                  <th colSpan={showTimestamp ? 2 : 1} className='border-r-2'>
                    {isDualMode ? displayName1 : 'Results'}
                  </th>
                )}
                {isDualMode && columnVisibility.url2 && (
                  <th colSpan={showTimestamp ? 2 : 1}>{displayName2}</th>
                )}
              </tr>
              <tr className='border-b-2'>
                {columnVisibility.number && (
                  <th className='border-r-2'></th>
                )}
                {columnVisibility.url1 && (
                  <>
                    {showTimestamp && <th className='border-r'>Timestamp</th>}
                    <th className={isDualMode ? 'border-r-2' : ''}>TBT (ms)</th>
                  </>
                )}
                {isDualMode && columnVisibility.url2 && (
                  <>
                    {showTimestamp && <th className='border-r'>Timestamp</th>}
                    <th>TBT (ms)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.max(tbts1.length, isDualMode ? tbts2.length : 0) }).map((_, index) => (
                <tr key={index} className='border-b'>
                  {columnVisibility.number && (
                    <td className='border-r-2 text-center text-gray-500'>{index + 1}</td>
                  )}
                  {columnVisibility.url1 && (
                    <>
                      {showTimestamp && <td className='border-r text-center'>{tbts1[index]?.timeStamp}</td>}
                      <td className={isDualMode ? 'border-r-2 text-center' : 'text-center'}>
                        {Math.floor(tbts1[index]?.result.numericValue) || '-'}
                      </td>
                    </>
                  )}
                  {isDualMode && columnVisibility.url2 && (
                    <>
                      {showTimestamp && <td className='border-r text-center'>{tbts2[index]?.timeStamp}</td>}
                      <td className='text-center'>{Math.floor(tbts2[index]?.result.numericValue) || '-'}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {scan && (
        <div className='grid gap-2'>
          <p>{displayName1} Progress: {`[${tbts1.length}/${numOfRecords}]`}</p>
          {isDualMode && (
            <p>{displayName2} Progress: {`[${tbts2.length}/${numOfRecords}]`}</p>
          )}
          <p>Scanning for {timer} sec</p>
        </div>
      )}

      {(tbts1.length > 0 || (isDualMode && tbts2.length > 0)) && !scan && (
        <div className='grid justify-center gap-2 border-2 p-4'>
          <p>
            Took {timer} seconds to get records
            {` (${displayName1}: ${tbts1.length})`}
            {isDualMode && ` (${displayName2}: ${tbts2.length})`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DualURLTBTConfig;