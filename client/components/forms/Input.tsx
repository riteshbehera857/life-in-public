import React from "react";

const Input = ({ type, value, label, name, onChange, placeholder }) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute ${
          value ? "top-[22%] text-[14px] opacity-100" : "top-[48.5%] opacity-0"
        } left-[22px] text-text-body font-bold text-[#9d9d9d] transition-all duration-300`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`py-padding-y-input w-full border-2  mt-2 border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#000] placeholder:text-[#9d9d9d] focus:outline-[#aa3eff]`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
