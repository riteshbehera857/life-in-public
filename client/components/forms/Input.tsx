import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value: string | number;
  label?: string;
  name?: string;
  onChange: (e: React.ChangeEvent) => void;
  placeholder: string;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  label,
  name,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className={`relative`}>
      {label && (
        <label
          htmlFor={name}
          className={`absolute ${
            value
              ? "top-[22%] text-[14px] opacity-100"
              : "top-[48.5%] opacity-0"
          } ${
            error ? "text-red-600" : "text-[#9d9d9d]"
          } left-[22px] text-text-body font-bold transition-all duration-300`}
        >
          {label}
        </label>
      )}
      <input
        id={name && name}
        type={type}
        name={name && name}
        value={value}
        onChange={onChange}
        className={`py-padding-y-input w-full border-2  mt-2 ${
          error
            ? "border-red-700 text-red-600"
            : "border-accent-primary text-[#000]"
        }  rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input placeholder:text-[#9d9d9d] focus:outline-accent-primary`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
