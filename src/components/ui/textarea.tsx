"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm transition-all duration-300 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface FloatingLabelTextareaProps extends TextareaProps {
  label: string;
}

const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(({ className, label, id, placeholder, ...props }, ref) => {
  const inputId = id || React.useId();
  return (
    <div className="relative floating-label">
      <textarea
        id={inputId}
        ref={ref}
        placeholder={placeholder || " "}
        className={cn(
          "peer w-full min-h-[120px] px-4 pt-7 pb-3 rounded-xl border border-input bg-background/50 text-sm outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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
FloatingLabelTextarea.displayName = "FloatingLabelTextarea";

export { Textarea, FloatingLabelTextarea };
