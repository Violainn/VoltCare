"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Baby,
  Flame,
  Cable,
  Leaf,
  CloudLightning,
  CircuitBoard,
  ArrowDownToLine,
  CheckSquare,
  type LucideIcon,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn, safetyTopics } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollReveal } from "@/components/providers/motion";

const iconMap: Record<string, LucideIcon> = {
  ShieldAlert,
  Baby,
  Flame,
  Cable,
  Leaf,
  CloudLightning,
  CircuitBoard,
  ArrowDownToLine,
  CheckSquare,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SafetyCard({
  topic,
  index,
}: {
  topic: (typeof safetyTopics)[number];
  index: number;
}) {
  const IconComponent = iconMap[topic.icon] || Zap;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative"
    >
      <Card className="h-full overflow-hidden border bg-card/60 hover:border-primary/40 transition-all duration-500">
        <div
          className={cn(
            "h-24 bg-gradient-to-br relative",
            topic.color
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_60%)]" />
          <motion.div
            whileHover={{ rotate: -8, scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute -bottom-8 left-5 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-foreground border-4 border-white dark:border-slate-900"
          >
            <IconComponent className="w-8 h-8" strokeWidth={2.2} />
          </motion.div>
        </div>

        <div className="pt-10 px-5 pb-5 space-y-4">
          <h3 className="text-lg font-bold tracking-tight leading-snug pr-2">
            {topic.title}
          </h3>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden group-hover:overflow-visible"
            style={{ height: 0 }}
          >
            <motion.ul
              className="space-y-2 pt-1"
              initial="hidden"
              whileHover="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {topic.points.map((point, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-gradient-to-br flex items-center justify-center",
                      topic.color
                    )}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="pt-1 flex items-center justify-between text-xs font-medium text-muted-foreground/70 group-hover:text-primary/80 transition-colors duration-300">
            <span>{index + 1}. Safety Topic</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function MiniCalendar() {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const highlightedDays = [3, 7, 10, 14, 17, 21, 24, 28];

  return (
    <div className="w-full">
      <button
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-cyan-950/30 border border-indigo-100/60 dark:border-indigo-900/40 hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white group-hover:scale-110 transition-transform duration-300">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-foreground">30-Day Home Safety Rhythm</h4>
            <p className="text-sm text-muted-foreground">
              {calendarOpen ? "Tap to collapse" : "Tap to expand visual calendar"}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: calendarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 rounded-full bg-white/70 dark:bg-slate-900/70 flex items-center justify-center shadow-sm"
        >
          <ChevronDown className="w-4.5 h-4.5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {calendarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="font-semibold">Current Month — Safety Check-Ins</h5>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Highlighted days = scheduled quick visual checks (10 min each)
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500" />
                    Scheduled
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-1.5"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 2 }, (_, i) => (
                  <div key={`pad-${i}`} className="aspect-square" />
                ))}
                {days.map((day) => {
                  const isHighlighted = highlightedDays.includes(day);
                  const isCompleted = day < 18;
                  return (
                    <TooltipProvider key={day}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            className={cn(
                              "aspect-square rounded-lg text-xs font-medium relative transition-all duration-200",
                              isCompleted && isHighlighted
                                ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/25"
                                : isHighlighted
                                ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/25"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            )}
                          >
                            {day}
                            {isCompleted && isHighlighted && (
                              <Check className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-white" strokeWidth={4} />
                            )}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs font-medium">
                            {isHighlighted
                              ? isCompleted
                                ? `Day ${day}: Quick check — completed ✓`
                                : `Day ${day}: 10-min visual check scheduled`
                              : `Day ${day}: No check`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">8 of 12</span> quick checks
                  completed this month
                </div>
                <Badge variant="success" className="shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  On Track · Safety Score 94%
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SafetyEducation() {
  return (
    <section
      id="safety-education"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <Badge variant="info" className="mb-5 px-5 py-1.5 text-sm shadow-lg">
            <ShieldCheck className="h-4 w-4" />
            Safety Education Center · Learn & Protect
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            Know the{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Safety Rules
            </span>{" "}
            That Save Lives
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            9 essential home electrical safety topics — hover each card to reveal
            the critical checklist points. Protect your family, prevent fires,
            and save on energy bills.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="max-w-4xl mx-auto mb-12 sm:mb-14">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative">
              <MiniCalendar />
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {safetyTopics.map((topic, index) => (
            <SafetyCard key={topic.id} topic={topic} index={index} />
          ))}
        </motion.div>

        <ScrollReveal delay={0.2} className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-cyan-500/5 dark:from-primary/10 dark:via-slate-900 dark:to-cyan-900/10 p-8 sm:p-10 lg:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-400/10 to-rose-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative grid lg:grid-cols-[1fr_auto] items-center gap-8">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="success" className="shadow-lg shadow-emerald-500/20 px-4 py-1.5 text-sm">
                    <Sparkles className="w-4 h-4" />
                    Limited Time · 20% OFF All Inspections
                  </Badge>
                  <Badge variant="warning" className="px-4 py-1.5 text-sm">
                    <Zap className="w-4 h-4" />
                    90-Day Guarantee
                  </Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 leading-tight">
                  Want Complete Peace of Mind?
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  Book a certified VoltCare safety inspector for a comprehensive
                  80-point check of your entire home electrical system — including
                  thermal imaging, load testing, RCD verification, and a detailed
                  PDF safety report with photo evidence.
                </p>

                <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
                  {[
                    "80-point comprehensive checklist",
                    "Thermal imaging for hidden hotspots",
                    "RCD/ELCB live test + report",
                    "PDF report with photo evidence",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[260px]">
                <Button
                  size="lg"
                  className="h-14 sm:h-16 px-8 text-base shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Book Full Safety Inspection
                  <ArrowRight className="w-4.5 h-4.5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 sm:h-16 px-8 text-base border-2 border-border/60 hover:border-primary/40"
                >
                  <CheckSquare className="w-5 h-5" />
                  Download Printable Checklist
                </Button>
                <p className="text-xs text-center text-muted-foreground font-medium">
                  Avg. inspection takes <span className="text-primary font-bold">2.5 hrs</span> · Rated <span className="text-amber-600 font-bold">4.9★</span> by 12,000+ homes
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
