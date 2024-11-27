interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function Slider({ min, max, step, value, onChange }: SliderProps) {
  return (
    <div className="relative h-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        className="absolute w-full"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="absolute w-full"
      />
    </div>
  );
}