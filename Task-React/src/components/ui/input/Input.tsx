// "use client";
// import * as React from "react";
// import { cn } from "../../../lib/cn.js";

// export type InputVariant =
//   | "default"
//   | "outline"
//   | "filled"
//   | "floating"
//   | "minimal"
//   | "glass"
//   | "modern"
//   | "rounded";

// export type InputSize = "lg" | "xl";

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   variant?: InputVariant;
//   inputSize?: InputSize;
//   ref?: any
//   error?: boolean;
//   success?: boolean;
//   disabled?: boolean;
//   loading?: boolean;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   label?: string;
//   helperText?: string;
//   errorMessage?: string;
//   fullWidth?: boolean;
//   rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
//   shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
//   focusRing?: boolean;
//   transition?: boolean;
// }

// const sizeClasses: Record<InputSize, string> = {
//   lg: "h-12 px-4 text-base",
//   xl: "h-14 px-4 text-lg",
// };

// const roundedClasses = {
//   none: "rounded-none",
//   sm: "rounded-sm",
//   md: "rounded-md",
//   lg: "rounded-lg",
//   xl: "rounded-xl",
//   full: "rounded-full",
// };

// const shadowClasses = {
//   none: "",
//   sm: "shadow-sm",
//   md: "shadow-md",
//   lg: "shadow-lg",
//   xl: "shadow-xl",
//   inner: "shadow-inner",
// };
// export function Input({
//   className,
//   type = "text",
//   variant = "outline",
//   inputSize = "lg",
//   error = false,
//   success = false,
//   disabled = false,
//   loading = false,
//   leftIcon,
//   rightIcon,
//   label,
//   helperText,
//   errorMessage,
//   fullWidth = true,
//   rounded = "lg",
//   shadow = "none",
//   focusRing = false,
//   transition = true,
//   id,
//   value,
//   onChange,
//   ref,
//   ...rest
// }: InputProps) {
//   const inputId = id || React.useId();

//   const [hasValue, setHasValue] = React.useState(!!value);

//   React.useEffect(() => {
//     setHasValue(!!value);
//   }, [value]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (onChange) {
//       onChange(e);
//     }
//     setHasValue(e.target.value.length > 0);
//   };

//   const variantClasses: Record<InputVariant, string> = {
//     default: "bg-white border border-gray-300 text-gray-900",
//     outline: `bg-transparent border-[.5px] ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-600 text-neutral-600 hover:border-gray-600 hover:bg-gray-50 hover:text-neutral-700 focus:border-brand-600 focus:text-gray-700"}`,
//     filled: "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100",
//     floating: ` bg-white border border-gray-50  ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-400 text-neutral-600  focus:border-brand-600 focus:text-gray-700"} peer`,
//     minimal: "bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none",
//     glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-gray-900",
//     modern: "bg-white border-l-4 border-blue-500 text-gray-900",
//     rounded: "bg-white border border-gray-300 text-gray-900 rounded-full",
//   };
//   const baseClasses = cn(
//     "flex items-center min-w-0 outline-none",
//     variantClasses[variant],
//     sizeClasses[inputSize],
//     roundedClasses[rounded],
//     shadowClasses[shadow],
//     focusRing && "focus:ring-2 focus:ring-blue-500 focus:border-brand-500",
//     transition && "transition-all duration-200",
//     error && "border-red-500 focus:border-brand500 focus:ring-red-500",
//     success && "border-green-500 focus:border-brandn-500 focus:ring-green-500",
//     fullWidth && "w-full",
//     loading && "animate-pulse bg-gray-200",
//     className
//   );

//   const floatingLabelClasses = cn(
//     `absolute ${rightIcon ? "mr-5" : ""}  right-4 -top-[8px] text-xs text-gray-400 transition-all duration-200 origin-[0] pointer-events-none bg-white px-1 ${error ? "text-red-500" : ""}`,
//     !hasValue && "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500",
//     "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black",

//     error && "peer-focus:text-red-600"
//   );

//   const renderInput = () => (
//     <div className={cn("relative", fullWidth && "w-full")}>
//       {variant !== "floating" && label && (
//         <label
//           htmlFor={inputId}
//           className={cn(
//             "text-sm font-medium  block",
//             error ? "text-red-600" : "text-gray-700"
//           )}
//         >
//           {label}
//         </label>
//       )}

//       <div className="relative flex items-center">
//         {leftIcon && (
//           <div className="absolute left-3 text-gray-500 z-20 flex items-center  ">
//             {leftIcon}
//           </div>
//         )}

//         <input
//           id={inputId}
//           ref={ref}
//           type={type}
//           value={value}
//           onChange={handleChange}
//           className={cn(
//             baseClasses,
//             leftIcon && "pl-10",
//             rightIcon && "pr-10",
//             variant === "minimal" && "px-0",
//           )}
//           disabled={disabled || loading}
//           placeholder={variant === "floating" ? " " : rest.placeholder}
//           {...rest}
//         />

//         {variant === "floating" && label && (
//           <label
//             htmlFor={inputId}
//             className={floatingLabelClasses}
//           >
//             {label}
//           </label>
//         )}

//         {rightIcon && (
//           <div className="absolute right-3 z-20 flex items-center pointer-events-none ">
//             {rightIcon}
//           </div>
//         )}

//         {loading && (
//           <div className="absolute right-3 z-20">
//             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
//       {renderInput()}

//       {(helperText || errorMessage) && (
//         <p
//           className={cn(
//             "text-xs mt-1",
//             error ? "text-red-600" : "text-gray-500"
//           )}
//         >
//           {error ? errorMessage : helperText}
//         </p>
//       )}

//     </div>
//   );
// }

"use client";
import * as React from "react";
import { cn } from "../../../core/lib/cn";

export type InputVariant =
  | "default"
  | "outline"
  | "filled"
  | "floating"
  | "minimal"
  | "glass"
  | "modern"
  | "rounded";

export type InputSize = "lg" | "xl";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  BlueLabel?: boolean;
  ref?: any;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
  focusRing?: boolean;
  transition?: boolean;
  isPrice?: boolean;
  field?: any;
  form?: any;
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

const toEnglishNumber = (str: string): string => {
  const persianNumbers: any = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicNumbers: any = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persianNumbers[i], 'g'), String(i));
    result = result.replace(new RegExp(arabicNumbers[i], 'g'), String(i));
  }
  return result;
};

const formatPrice = (value: string | number | undefined): string => {
  if (!value && value !== 0) return "";
  const numbers = toEnglishNumber(String(value)).replace(/\D/g, "");
  if (!numbers) return "";

  const num = parseInt(numbers, 10);
  if (isNaN(num)) return "";

  return new Intl.NumberFormat("fa-IR").format(num);
};

export function Input({
  className,
  BlueLabel = false,
  type = "text",
  variant = "outline",
  inputSize = "lg",
  error = false,
  success = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  label,
  helperText,
  errorMessage,
  fullWidth = true,
  rounded = "lg",
  shadow = "none",
  focusRing = false,
  transition = true,
  id,
  value,
  onChange,
  isPrice = false,
  field,
  form,
  ...rest
}: InputProps) {
  const inputId = id || React.useId();

  const actualValue = field?.value ?? value;
  const actualOnChange = field?.onChange ?? onChange;
  const actualOnBlur = field?.onBlur;

  const [displayValue, setDisplayValue] = React.useState<string>(() => {
    if (isPrice && actualValue) {
      return formatPrice(actualValue);
    }
    return String(actualValue || "");
  });

  const isInternalChange = React.useRef(false);

  React.useEffect(() => {
    if (!isInternalChange.current) {
      if (isPrice && actualValue !== undefined && actualValue !== null) {
        setDisplayValue(formatPrice(actualValue));
      } else if (!isPrice) {
        setDisplayValue(String(actualValue || ""));
      }
    }
    isInternalChange.current = false;
  }, [actualValue, isPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isPrice) {
      const englishNumbers = toEnglishNumber(newValue);
      const numbersOnly = englishNumbers.replace(/[^\d]/g, "");

      if (numbersOnly === "") {
        setDisplayValue("");
        isInternalChange.current = true;

        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: "" },
        };

        if (actualOnChange) {
          actualOnChange(syntheticEvent);
        }
        return;
      }

      const formattedValue = formatPrice(numbersOnly);
      setDisplayValue(formattedValue);
      isInternalChange.current = true;

      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: field?.name || rest.name,
          value: numbersOnly,
        },
      };

      if (actualOnChange) {
        actualOnChange(syntheticEvent);
      }
    } else {
      setDisplayValue(newValue);
      isInternalChange.current = true;

      if (actualOnChange) {
        actualOnChange(e);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (actualOnBlur) {
      actualOnBlur(e);
    }
  };

  const variantClasses: Record<InputVariant, string> = {
    default: "bg-white border border-gray-300 text-gray-900",
    outline: `bg-transparent border-[.5px] ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-600 text-neutral-600 hover:border-gray-600 hover:bg-gray-50 hover:text-neutral-700 focus:border-brand-600 focus:text-gray-700"}`,
    filled: "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100",
    floating: ` bg-white border border-gray-50  ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-400 text-neutral-600  focus:border-brand-600 focus:text-gray-700"} peer`,
    minimal: "bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none",
    glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-gray-900",
    modern: "bg-white border-l-4 border-blue-500 text-gray-900",
    rounded: "bg-white border border-gray-300 text-gray-900 rounded-full",
  };

  const baseClasses = cn(
    "flex items-center min-w-0 outline-none",
    variantClasses[variant],
    sizeClasses[inputSize],
    roundedClasses[rounded],
    shadowClasses[shadow],
    focusRing && "focus:ring-2 focus:ring-blue-500 focus:border-brand-500",
    transition && "transition-all duration-200",
    error && "border-red-500 focus:border-brand500 focus:ring-red-500",
    success && "border-green-500 focus:border-brandn-500 focus:ring-green-500",
    fullWidth && "w-full",
    loading && "animate-pulse bg-gray-200",
    className
  );

  const hasValueState = React.useMemo(() => {
    if (isPrice) {
      return !!displayValue && displayValue !== "";
    }
    return !!actualValue;
  }, [displayValue, actualValue, isPrice]);

  const floatingLabelClasses = cn(
    `absolute ${rightIcon ? "mr-5" : ""} ${disabled ? "text-neutral-300" : ""} right-4 -top-[8px] text-xs text-gray-400 transition-all duration-200 origin-[0] pointer-events-none bg-white px-1 ${error ? "text-red-500" : ""}`,
    !hasValueState && "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500",
    `peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:bg-white peer-focus:text-xs ${BlueLabel ? "peer-focus:text-brand-700" : ""} `,
    error && "peer-focus:text-red-600"
  );

  const renderInput = () => (
    <div className={cn("relative", fullWidth && "w-full")}>
      {variant !== "floating" && label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium block",
            error ? "text-red-600" : "text-gray-700"
          )}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-gray-500 z-20 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            baseClasses,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            variant === "minimal" && "px-0",
          )}
          disabled={disabled || loading}
          placeholder={variant === "floating" ? " " : rest.placeholder}
          {...rest}
        />

        {variant === "floating" && label && (
          <label htmlFor={inputId} className={floatingLabelClasses}>
            {label}
          </label>
        )}

        {rightIcon && (
          <div className="absolute right-3 z-20 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}

        {loading && (
          <div className="absolute right-3 z-20">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
      {renderInput()}
      {(helperText || errorMessage) && (
        <p className={cn("text-xs mt-1", error ? "text-red-600" : "text-gray-500")}>
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
}