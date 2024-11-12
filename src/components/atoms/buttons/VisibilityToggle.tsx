import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  label: string;
}

export function VisibilityToggle({ isVisible, onToggle, label }: VisibilityToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      aria-label={`Toggle ${label} visibility`}
    >
      {isVisible ? (
        <EyeIcon className="w-5 h-5" />
      ) : (
        <EyeSlashIcon className="w-5 h-5" />
      )}
      <span className="text-sm">{label}</span>
    </button>
  );
}