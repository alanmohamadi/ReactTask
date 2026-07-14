"use client";

import { cn } from "../../../core/lib/cn";
interface RadioProps {
  id: string;
  checked: boolean;
  onChange: any;
  size?: "lg" | "xl";
  disabled?: boolean;
  label?: string;
  error?: boolean;
  name?:string
}

const inputSizeClasses = {
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

const labelSizeClasses = {
  lg: "text-lg",
  xl: "text-xl",
};
const borderSizeClasses = {
  lg: "border-[8px]",
  xl: "border-[10px]",
};
function Radio({
  id,
  checked,
  onChange,
  size = "lg",
  disabled = false,
  label,
  error = false ,
  name,
  ...rest
}: RadioProps) {

  const inputClasses = cn(
    "transition rounded-full cursor-pointer",
    checked ? `bg-brand-50 ${borderSizeClasses[size]} border-brand-700 `: "bg-white border-[4px] border-neutral-300",
    inputSizeClasses[size],
    disabled
      ? "bg-neutral-100 border-neutral-300"
      : error
      ? "border-red-600 hover:bg-brand-50"
      : " hover:border-brand-600 hover:bg-brand-50"
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className={inputClasses}></label>

        {label && (
          <label
            htmlFor={id}
            className={cn(
              "font-medium cursor-pointer",
              labelSizeClasses[size],
              disabled
                ? "text-neutral-300"
                : checked
                ? "text-brand-800"
                : "text-neutral-900"
            )}
          >
            {label}
          </label>
        )}
      </div>
      <input
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{display:"none"}}
        name={name}
        {...rest}
      />   
    </div>
  );
}

export default Radio;