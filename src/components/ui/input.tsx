"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface FloatingLabelInputProps extends InputProps {
  label: string;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, id, placeholder, ...props }, ref) => {
  const inputId = id || React.useId();
  return (
    <div className="relative floating-label">
      <input
        id={inputId}
        ref={ref}
        placeholder={placeholder || " "}
        className={cn(
          "peer w-full h-14 px-4 pt-6 pb-2 rounded-xl border border-input bg-background/50 text-sm outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="absolute left-4 top-4 text-sm text-muted-foreground pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { Input, FloatingLabelInput };
