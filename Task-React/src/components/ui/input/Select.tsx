"use client";
import * as React from "react";
import { cn } from "../../../lib/cn.js";
import type { InputSize, InputVariant } from "./Input.js";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
  focusRing?: boolean;
  transition?: boolean;
  options?: Array<{ value: string; label: string }>;
  colorGroup?: "primary" | "secondary" | "input";
  placeholder?: string;
}

const sizeClasses: Record<InputSize, string> = {
  lg: "h-12 px-4 text-base",
  xl: "h-14 px-4 text-lg",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  inner: "shadow-inner",
};

export function Select({
  className,
  variant = "outline",
  inputSize = "lg",
  error = false,
  success = false,
  disabled = false,
  loading = false,
  label,
  helperText,
  errorMessage,
  fullWidth = true,
  rounded = "lg",
  shadow = "none",
  focusRing = false,
  transition = true,
  options = [],
  id,
  colorGroup = "input",
  name,
  value: controlledValue,
  onChange,
  placeholder = "انتخاب کنید",
  ...rest
}: SelectProps) {
  const selectId = id || React.useId();

  const [hasValue, setHasValue] = React.useState(!!controlledValue);

  React.useEffect(() => {
    setHasValue(!!controlledValue);
  }, [controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setHasValue(newValue.length > 0);
    onChange?.(e);
  };

  const variantClasses: Record<InputVariant, string> = {
    default: `bg-white border ${colorGroup === "primary" ? "border-primary-300 text-primary-900" : colorGroup === "secondary" ? "border-secondary-300 text-secondary-900" : "border-input-300 text-input-900"}`,
    outline: `bg-transparent border-[.5px] border-neutral-500 text-neutral-500 hover:text-neutral-900 ${colorGroup === "primary" ? "focus:text-primary-700 hover:bg-primary-50 focus:border-brand-700" : colorGroup === "secondary" ? "focus:text-secondary-700 hover:bg-secondary-50 focus:border-secondary-700" : "focus:text-input-700 hover:bg-input-50 focus:border-input-700"} peer`,
    filled: `border ${colorGroup === "primary" ? "bg-primary-50 border-primary-200 text-primary-900 hover:bg-primary-100" : colorGroup === "secondary" ? "bg-secondary-50 border-secondary-200 text-secondary-900 hover:bg-secondary-100" : "bg-input-50 border-input-200 text-input-900 hover:bg-input-100"}`,
    floating: `bg-gray-50 border  border-gray-50 text-gray-900 hover:bg-gray-100 ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-400 text-neutral-600 hover:border-gray-600 hover:bg-gray-50 hover:text-neutral-700 focus:border-gray-600 focus:text-gray-700"} peer`,
    minimal: `bg-transparent border-b ${colorGroup === "primary" ? "border-primary-300 text-primary-900" : colorGroup === "secondary" ? "border-secondary-300 text-secondary-900" : "border-input-300 text-input-900"}`,
    glass: `bg-white/20 backdrop-blur-sm border border-white/30 ${colorGroup === "primary" ? "text-primary-900" : colorGroup === "secondary" ? "text-secondary-900" : "text-input-900"}`,
    modern: `bg-white border-l-4 border-blue-500 ${colorGroup === "primary" ? "text-primary-900" : colorGroup === "secondary" ? "text-secondary-900" : "text-input-900"}`,
    rounded: `bg-white border rounded-full ${colorGroup === "primary" ? "border-primary-300 text-primary-900" : colorGroup === "secondary" ? "border-secondary-300 text-secondary-900" : "border-input-300 text-input-900"}`,
  };

  const baseClasses = cn(
    "flex items-center justify-between min-w-0 outline-none appearance-none cursor-pointer",
    variantClasses[variant],
    sizeClasses[inputSize],
    roundedClasses[rounded],
    shadowClasses[shadow],
    focusRing && "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    transition && "transition-all duration-200",
    error && "border-red-500 focus:border-red-500 focus:ring-red-500",
    success && "border-green-500 focus:border-green-500 focus:ring-green-500",
    disabled && "opacity-50 cursor-not-allowed",
    fullWidth && "w-full",
    loading && "animate-pulse",
    className
  );

  const floatingLabelClasses = cn(
    "absolute right-4 -top-[8px] text-xs text-gray-400 transition-all duration-200 origin-[0] pointer-events-none bg-white px-1",
    !hasValue && "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500",
    "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black",

    error && "peer-focus:text-red-600"
  );

  return (
    <div className={cn("flex flex-col gap-1 relative", fullWidth && "w-full")}>

      {variant !== "floating" && label && (
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium mb-1 block",
            error ? "text-red-600" : "text-neutral-500",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          name={name}
          value={controlledValue}
          onChange={handleChange}
          disabled={disabled || loading}
          className={cn(
            baseClasses,
            variant === "minimal" && "px-0",
          )}
          {...(variant === "floating" ? { placeholder: " " } : {})}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute left-3 pointer-events-none text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {variant === "floating" && label && (
          <label
            htmlFor={selectId}
            className={floatingLabelClasses}
          >
            {label}
          </label>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p
          className={cn(
            "text-xs mt-1",
            error ? "text-red-600" : "text-neutral-500"
          )}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
}