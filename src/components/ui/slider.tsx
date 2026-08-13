"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, trackClassName, rangeClassName, thumbClassName, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-2.5 w-full grow overflow-hidden rounded-full bg-muted/80 backdrop-blur-sm",
        trackClassName
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-150 ease-out",
          rangeClassName
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-6 w-6 rounded-full border-2 border-primary bg-background shadow-lg ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 hover:shadow-xl active:scale-95 cursor-grab active:cursor-grabbing",
        thumbClassName
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
