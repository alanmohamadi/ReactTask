"use client";
import * as React from "react";
import { cn } from "../../../lib/cn.js";
import type { InputSize, InputVariant } from "./Input.js";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: InputVariant;
    size?: InputSize;
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
    rows?: number;
    resizable?: boolean;
}

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

export function TextArea({
    className,
    variant = "outline",
    size = "xl",
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
    rows = 3,
    resizable = true,
    id,
    value,
    onChange,
    ...rest
}: TextAreaProps) {
    const textareaId = id || React.useId();

    const [hasValue, setHasValue] = React.useState(!!value);

    React.useEffect(() => {
        setHasValue(!!value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        }
        setHasValue(e.target.value.length > 0);
    };

    const variantClasses: Record<InputVariant, string> = {
        default: "bg-white border border-input-300 text-input-900",
        outline: `bg-transparent border-[.5px]  ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-600 text-neutral-600 hover:border-input-600 hover:bg-input-50 hover:text-neutral-700 focus:border-input-600 focus:text-input-700"}`,
        filled: "bg-input-50 border border-input-200 text-input-900 hover:bg-input-100",
        floating: `bg-white border  border-gray-50 text-gray-900  ${disabled ? "border-neutral-300 text-neutral-300 cursor-not-allowed" : "border-neutral-400 text-neutral-600  hover:text-neutral-700 focus:border-gray-600 focus:text-gray-700"} peer`,
        minimal: "bg-transparent border-b-2 border-input-300 text-input-900 rounded-none",
        glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-input-900",
        modern: "bg-white border-l-4 border-blue-500 text-input-900",
        rounded: "bg-white border border-input-300 text-input-900 rounded-full",
    };

    const baseClasses = cn(
        "min-w-0 outline-none px-4 py-3 text-base w-full",
        variantClasses[variant],
        size === "lg" && "min-h-[3rem]", 
        size === "xl" && "min-h-[3.5rem]", 
        roundedClasses[rounded],
        shadowClasses[shadow],
        focusRing && "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        transition && "transition-all duration-200",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        success && "border-green-500 focus:border-green-500 focus:ring-green-500",
        fullWidth && "w-full",
        loading && "animate-pulse bg-input-200",
        !resizable && "resize-none",
        className
    );

    const floatingLabelClasses = cn(
        "absolute right-4 -top-[8px] text-xs text-gray-400 transition-all duration-200 origin-[0] pointer-events-none bg-white px-1",
        !hasValue && "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500",
        "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black",
        error && "peer-focus:text-red-600"
    );

    return (
        <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
            <div className={cn("relative", fullWidth && "w-full")}>
                {variant !== "floating" && label && (
                    <label
                        htmlFor={textareaId}
                        className={cn(
                            "text-sm font-medium mb-1 block",
                            error ? "text-red-600" : "text-input-700"
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className="relative flex items-center">
                    <textarea
                        id={textareaId}
                        value={value}
                        onChange={handleChange}
                        className={baseClasses}
                        rows={rows}
                        disabled={disabled || loading}
                        placeholder={variant === "floating" ? " " : rest.placeholder}
                        {...rest}
                    />

                    {variant === "floating" && label && (
                        <label
                            htmlFor={textareaId}
                            className={floatingLabelClasses}
                        >
                            {label}
                        </label>
                    )}
                </div>
            </div>

            {(helperText || errorMessage) && (
                <p
                    className={cn(
                        "text-xs mt-1",
                        error ? "text-red-600" : "text-input-500"
                    )}
                >
                    {error ? errorMessage : helperText}
                </p>
            )}


        </div>
    );
}