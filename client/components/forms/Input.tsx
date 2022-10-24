import React from "react";

const Input = ({ type, value, label, name, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor="caption" className="text-[18px] text-[#363636]">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="py-padding-y-input w-full border-2  mt-2 border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#000] placeholder:text-[#9d9d9d] focus:outline-[#aa3eff]"
        placeholder="Caption"
      />
    </div>
  );
};

export default Input;
