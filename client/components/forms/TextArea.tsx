import React from 'react'

interface InputProps {
    value?: string;
    onChange: (e) => void;
    rows: number;
    label: string;
    className?: string;
    placeholder?: string;
}

const TextArea = ({value, onChange, rows, label, className, placeholder}: InputProps) => {
  return (
    <div className={className}>
          <label htmlFor="textarea" className="text-[18px]">
            {label}
          </label>
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id="textarea"
            rows={rows}
            className="border-2 p-4 text-[1.5rem] mt-2 focus:ring-2 focus:ring-accent-primary focus:outline-none border-slate-200 w-full rounded-[8px]"
          />
        </div>
  )
}

export default TextArea