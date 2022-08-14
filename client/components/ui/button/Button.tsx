import React, { ButtonHTMLAttributes, useRef } from "react";
import cn from "clsx";
import s from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "slim" | "ghost" | "naked";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    ...rest
  } = props;
  const rootClassName = cn(
    s.root,
    {
      [s.something]: variant === "flat",
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
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
