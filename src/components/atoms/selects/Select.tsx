interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const Select = ({ label, value, onChange, options, disabled }: SelectProps) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23424242%22%20d%3D%22M10.293%203.293%206%207.586%201.707%203.293A1%201%200%20000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%20000-1.414%201%201%200%2000-1.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_1rem] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;