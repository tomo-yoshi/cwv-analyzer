import { Switch as HeadlessSwitch } from '@headlessui/react';

import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label': string;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, 'aria-label': ariaLabel, disabled }: SwitchProps) => {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-blue-600' : 'bg-gray-200'
      )}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </HeadlessSwitch>
  );
};