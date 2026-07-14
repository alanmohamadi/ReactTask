import * as React from "react";
import { cn } from "../../../core/lib/cn";
import { Loader2 } from "lucide-react";
export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";
export type ButtonColor = "primary" | "danger" | "success" | "warning" | "neutral" | "sky";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full" | "xxl";
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 w-full text-sm ",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  xxl: "rounded-2xl",
  full: "rounded-full",
};

const colorClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 focus:ring-brand-500",
    outline: "border border-gray-600 text--600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-bg-100 bg-neutral-600 hover:bg-neutral-700 focus:ring-brand-500",
    soft: "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500",
    link: "text-brand-700 underline hover:text-brand-500",
  },
  danger: {
    solid: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
    outline: "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    ghost: "text-red-600 hover:bg-red-50 focus:ring-red-500",
    soft: "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500",
    link: "text-brand-700 underline hover:text-brand-500",
  },
  success: {
    solid: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500",
    outline: "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
    ghost: "text-green-600 hover:bg-green-50 focus:ring-green-500",
    soft: "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500",
    link: "text-success-700 underline hover:text-success-500",
  },
  warning: {
    solid: "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus:ring-amber-500",
    outline: "border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
    ghost: "text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
    soft: "bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-amber-500",
    link: "text-warning-700 underline hover:text-warning-500",
  },
  neutral: {
    solid: "bg-neutral-600 text-white hover:bg-neutral-900 active:bg-black focus:ring-neutral-500",
    outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500",
    ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500",
    soft: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:ring-neutral-500",
    link: "text-neutral-700 underline hover:text-neutral-500",
  },
  sky: {
    solid: "bg-sky-600 text-white hover:bg-sky-900 active:bg-black focus:ring-sky-500",
    outline: "border border-sky-300 text-sky-700 hover:bg-sky-50 focus:ring-sky-500",
    ghost: "text-sky-700 hover:bg-sky-100 focus:ring-sky-500",
    soft: "bg-sky-100 text-sky-700 hover:bg-sky-200 focus:ring-sky-500",
    link: "text-sky-700 underline hover:text-sky-500",
  },

};

export function Button({
  className,
  variant = "solid",
  color = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  rounded = "lg",
  disabled,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center  font-medium transition-all duration-200 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        sizeClasses[size],
        roundedClasses[rounded],
        colorClasses[color][variant],
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {!loading && leftIcon && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      {!loading && children && (
        <span>{children}</span>
      )}
      {!loading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
}


interface FabProps extends Omit<
  ButtonProps,
  "children" | "size" | "rounded" | "shadow"
> {
  icon: React.ReactNode;
  label: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}
interface ButtonToggleProps {
  isTrue: boolean,
  offPrimaryColor?: string,
  onPrimary?: string,
  offSecoundryColor?: string,
  disabled?: boolean
  onSecoundryColor?: string,
  onToggle: () => void
}
export const ButtonToggle = ({ isTrue,
  offPrimaryColor = 'bg-black',
  onPrimary = 'bg-purple-600',
  disabled = false,
  offSecoundryColor = 'bg-white',
  onSecoundryColor = 'bg-white',

  onToggle
}: ButtonToggleProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        isTrue ? onPrimary : offPrimaryColor,
        'relative flex items-center justify-center disabled:cursor-not-allowed disabled:bg-neutral-300 rounded-full h-[32px] w-[56px] transition-colors duration-500 ease-in-out'
      )}
      type="button"
      onClick={onToggle}
    >
      <div
        className={cn(
          disabled && '!bg-neutral-200',
          isTrue ? 'translate-x-[50%]' : '-translate-x-[50%]',
          isTrue ? onSecoundryColor : offSecoundryColor,
          'rounded-full w-6 h-6 transition-transform duration-500 ease-in-out'
        )}
      ></div>
    </button >

  )

}
export const Fab = ({
  icon,
  label,
  position = "bottom-right",
  ...props
}: FabProps) => {
  const positions: Record<NonNullable<FabProps["position"]>, string> = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <Button
      {...props}
      size="xl"
      rounded="full"
      className={`
        
        ${positions[position]}
        p-0
        w-14 h-14 z-50
        flex items-center  justify-center
        ${props.className || ""}
      `}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
};