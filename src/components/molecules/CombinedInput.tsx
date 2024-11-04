import Input from "../atoms/inputs/Input";
import Label from "../atoms/labels/Label";

interface CombinedInputProps {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const CombinedInput = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  min,
  max,
  disabled
}: CombinedInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (type === 'number') {
      if (newValue === '' || (min !== undefined && max !== undefined && 
          parseInt(newValue, 10) >= min && parseInt(newValue, 10) <= max)) {
        onChange(newValue)
      }
    } else {
      onChange(newValue)
    }
  }

  return (
    <div className="mb-4">
      <Label htmlFor={label.toLowerCase().replace(' ', '-')}>
        {label}
      </Label>
      <Input
        type={type}
        id={label.toLowerCase().replace(' ', '-')}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        min={type === 'number' ? min : undefined}
        max={type === 'number' ? max : undefined}
        disabled={disabled}
      />
    </div>
  )
}

export default CombinedInput;