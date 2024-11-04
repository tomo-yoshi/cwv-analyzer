interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  )
}

export default Label;