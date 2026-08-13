"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  GripVertical,
  type LucideIcon,
} from "lucide-react";
import { cn, beforeAfterGallery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/providers/motion";

type Entry = (typeof beforeAfterGallery)[number];

const serviceIcons: Record<number, LucideIcon> = {
  1: Zap,
  2: Sparkles,
  3: Zap,
  4: Sparkles,
};

function BeforeAfterComparison({ entry }: { entry: Entry }) {
  const x = useMotionValue(50);
  const xSpring = useSpring(x, {
    stiffness: 250,
    damping: 28,
    mass: 0.4,
  });
  const clipLeft = useTransform(xSpring, (v) => `${v}%`);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [entry.id]);

  const handleDrag = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newX = ((event.clientX - rect.left) / rect.width) * 100;
      x.set(Math.max(0.5, Math.min(99.5, newX)));
    },
    [x]
  );

  React.useEffect(() => {
    x.set(50);
  }, [entry.id, x]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-border/60 cursor-ew-resize select-none group"
      onPointerMove={(e) => {
        if (isDragging) handleDrag(e);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <img
        src={entry.after}
        alt={`After: ${entry.title}`}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: useTransform(clipLeft, (v) => `inset(0 ${100 - parseFloat(v)}% 0 0)`) }}
      >
        <img
          src={entry.before}
          alt={`Before: ${entry.title}`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <Badge
          variant="destructive"
          className="shadow-lg shadow-red-500/30 px-3.5 py-1.5 text-xs font-bold backdrop-blur-sm bg-red-600/90"
        >
          BEFORE
        </Badge>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <Badge
          variant="success"
          className="shadow-lg shadow-emerald-500/30 px-3.5 py-1.5 text-xs font-bold backdrop-blur-sm bg-emerald-600/90"
        >
          AFTER
        </Badge>
      </div>

      <motion.div
        className="absolute top-0 bottom-0 z-30 touch-none"
        style={{
          left: xSpring,
          width: 2,
          translateX: "-50%",
        }}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_16px_rgba(255,255,255,0.7)]" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 -ml-10 cursor-ew-resize" />

        <motion.div
          onPointerDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          drag={false}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            y: isDragging ? 0 : [0, -4, 0],
          }}
          transition={{
            y: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center border-4 border-white/50 dark:border-slate-800/50 z-40 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-cyan-500/15 to-amber-400/20 animate-pulse-slow" />
          <div className="relative flex items-center gap-1">
            <ChevronLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary" strokeWidth={3} />
            <GripVertical className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-foreground/60" />
            <ChevronRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary" strokeWidth={3} />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-7 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none"
      >
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <Badge
              variant="default"
              className="bg-gradient-to-r from-primary to-cyan-500 text-white border-0 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              VoltCare Transformation
            </Badge>
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              Project #{entry.id.toString().padStart(4, "0")}
            </Badge>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight mb-2.5">
            {entry.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4 max-w-xl">
            {entry.description}
          </p>
          <div className="pointer-events-auto flex flex-wrap gap-3">
            <Button
              size="sm"
              className="h-10 sm:h-11 px-5 sm:px-6 shadow-xl shadow-white/10 bg-white text-foreground hover:bg-white/95 hover:-translate-y-0.5 transition-all duration-300"
            >
              View This Service
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-10 sm:h-11 px-5 sm:px-6 bg-white/10 backdrop-blur-sm border-white/25 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              See Similar Jobs
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(11,95,255,0.08), transparent 40%)",
        }}
      />
    </div>
  );
}

function Thumbnail({
  entry,
  index,
  isActive,
  onClick,
}: {
  entry: Entry;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ServiceIcon = serviceIcons[entry.id] || Zap;

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "group relative flex-shrink-0 w-36 sm:w-44 lg:w-52 rounded-2xl overflow-hidden transition-all duration-400",
        isActive
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl shadow-primary/25 -translate-y-1"
          : "border border-border/60 hover:border-primary/30 opacity-75 hover:opacity-100"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 flex">
          <img
            src={entry.before}
            alt="Before thumbnail"
            className="w-1/2 h-full object-cover"
          />
          <img
            src={entry.after}
            alt="After thumbnail"
            className="w-1/2 h-full object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-2 left-2">
          <Badge
            variant="destructive"
            className="text-[9px] h-5 px-1.5 py-0.5 font-bold bg-red-600/90 shadow-sm"
          >
            B4
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant="success"
            className="text-[9px] h-5 px-1.5 py-0.5 font-bold bg-emerald-600/90 shadow-sm"
          >
            AFT
          </Badge>
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cyan-500 border-2 border-white dark:border-slate-900 shadow-lg flex items-center justify-center z-10"
          >
            <ServiceIcon className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-white/95 line-clamp-1">
              {entry.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                style={{ width: isActive ? "100%" : "0%" }}
              />
            </div>
            <span className="text-[9px] text-white/75 font-bold">#{index + 1}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function BeforeAfter() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeEntry = beforeAfterGallery[activeIndex];

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + beforeAfterGallery.length) % beforeAfterGallery.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % beforeAfterGallery.length);

  return (
    <section
      id="before-after"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/[0.06] via-transparent to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge
            variant="success"
            className="mb-5 px-5 py-1.5 text-sm shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Transformations Gallery · Real Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            Before &amp; After{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            See the VoltCare difference. Drag the slider on each project to reveal
            the dangerous "before" and the safe, professional "after".
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="max-w-6xl mx-auto mb-10 sm:mb-12">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-primary rounded-[1.75rem] blur-lg opacity-30 animate-gradient-shift bg-[length:200%_auto]" />
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEntry.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BeforeAfterComparison entry={activeEntry} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h4 className="font-bold text-lg tracking-tight">
                Choose a Project
              </h4>
              <p className="text-sm text-muted-foreground">
                Click thumbnails to switch · Drag the comparison handle
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={goPrev}
                aria-label="Previous project"
                className="w-11 h-11 rounded-xl glass-strong border border-border/60 flex items-center justify-center shadow-md hover:shadow-lift hover:border-primary/40 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary" />
              </motion.button>
              <div className="px-3 py-1.5 rounded-lg bg-muted/70 text-sm font-bold tabular-nums">
                <span className="text-primary">{activeIndex + 1}</span>
                <span className="text-muted-foreground mx-1">/</span>
                {beforeAfterGallery.length}
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={goNext}
                aria-label="Next project"
                className="w-11 h-11 rounded-xl glass-strong border border-border/60 flex items-center justify-center shadow-md hover:shadow-lift hover:border-primary/40 transition-all duration-300 group bg-gradient-to-br from-primary/5 to-cyan-500/5"
              >
                <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary" />
              </motion.button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 -mx-1 px-1">
            {beforeAfterGallery.map((entry, i) => (
              <Thumbnail
                key={entry.id}
                entry={entry}
                index={i}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="h-14 px-8 text-base shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/35 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:-translate-y-0.5 transition-all duration-300 bg-[length:200%_auto] hover:bg-[position:right_center]"
            >
              <Sparkles className="w-5 h-5" />
              Get Your Transformation Quote
              <ArrowRight className="w-4.5 h-4.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base border-2 border-border/60 hover:border-primary/40"
            >
              Browse All 500+ Projects
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
