import React, { ButtonHTMLAttributes, useRef } from "react";
import cn from "clsx";
import s from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "contained" | "outlined";
  active?: boolean;
  w?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    variant = "contained",
    children,
    active,
    w,
    loading = false,
    disabled = false,
    style = {},
    ...rest
  } = props;
  const rootClassName = cn(
    s.root,
    w === "full" ? "w-full" : `w-${w}`,
    {
      [s.contained]: variant === "contained",
    },
    {
      [s.outlined]: variant === "outlined",
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      disabled={disabled}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
