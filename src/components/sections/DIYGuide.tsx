"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircuitBoard,
  Lightbulb,
  PlugZap,
  Activity,
  Cable,
  Power,
  BookOpen,
  AlertTriangle,
  Clock,
  Wrench,
  ShieldCheck,
  ShieldAlert,
  Play,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn, diyGuides, getDifficultyColor, getWarningColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollReveal } from "@/components/providers/motion";

const iconMap: Record<string, LucideIcon> = {
  CircuitBoard,
  Lightbulb,
  PlugZap,
  Activity,
  Cable,
  Power,
  BookOpen,
  AlertTriangle,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type DIYGuide = (typeof diyGuides)[number];

function GuideCard({
  guide,
  onOpen,
  index,
}: {
  guide: DIYGuide;
  onOpen: (guide: DIYGuide) => void;
  index: number;
}) {
  const IconComponent = iconMap[guide.icon] || Zap;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 0.97 }}
      className="group relative"
    >
      <Card
        onClick={() => onOpen(guide)}
        className={cn(
          "h-full cursor-pointer overflow-hidden border bg-card/60 hover:border-primary/40 hover:shadow-lift transition-all duration-500",
          !guide.safe &&
            "border-red-200/60 hover:border-red-400/60 bg-red-50/30 dark:bg-red-950/10"
        )}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
            guide.safe
              ? "from-voltcare-blue via-voltcare-cyan to-voltcare-blue"
              : "from-red-500 via-rose-500 to-red-500"
          )}
          style={{ backgroundSize: "200% 100%" }}
        />
        <CardContent className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                guide.safe
                  ? "bg-gradient-to-br from-blue-50 to-cyan-50 text-voltcare-blue dark:from-blue-950/50 dark:to-cyan-950/50 shadow-lg shadow-blue-500/10"
                  : "bg-gradient-to-br from-red-50 to-rose-50 text-red-600 dark:from-red-950/50 dark:to-rose-950/50 shadow-lg shadow-red-500/10"
              )}
            >
              <IconComponent className="h-7 w-7" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex h-3 w-3 rounded-full shadow-lg ring-2 ring-white dark:ring-slate-900",
                  getWarningColor(guide.warning)
                )}
                title={`Warning: ${guide.warning}`}
              />
              <Badge
                variant={guide.safe ? "success" : "danger"}
                className="shadow-sm"
              >
                {guide.safe ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    SAFE
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    NOT SAFE
                  </>
                )}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
              {guide.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className={cn("font-medium", getDifficultyColor(guide.difficulty))}
              >
                {guide.difficulty}
              </Badge>
              <Badge variant="outline" className="font-medium">
                <Clock className="h-3.5 w-3.5" />
                {guide.time}
              </Badge>
              <Badge variant="outline" className="font-medium">
                <Wrench className="h-3.5 w-3.5" />
                {guide.tools.length} tool{guide.tools.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground">
              {guide.steps.length} steps
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
              View Guide
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function GuideDialog({
  guide,
  open,
  onOpenChange,
}: {
  guide: DIYGuide | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!guide) return null;
  const IconComponent = iconMap[guide.icon] || Zap;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-2xl">
        <div
          className={cn(
            "relative p-8 pb-6 overflow-hidden",
            guide.safe
              ? "bg-gradient-to-br from-blue-50/80 via-transparent to-cyan-50/60 dark:from-blue-950/30 dark:to-cyan-950/20"
              : "bg-gradient-to-br from-red-50/80 via-transparent to-rose-50/60 dark:from-red-950/30 dark:to-rose-950/20"
          )}
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
          <DialogHeader className="relative p-0 space-y-4">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl",
                  guide.safe
                    ? "bg-gradient-to-br from-voltcare-blue to-voltcare-cyan text-white shadow-blue-500/30"
                    : "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/30"
                )}
              >
                <IconComponent className="h-8 w-8" strokeWidth={2.2} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={guide.safe ? "success" : "danger"}
                    className="shadow-sm"
                  >
                    {guide.safe ? (
                      <>
                        <ShieldCheck className="h-3.5 w-3.5" />
                        SAFE DIY GUIDE
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5" />
                        DO NOT DIY - CALL PRO
                      </>
                    )}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={cn("font-medium", getDifficultyColor(guide.difficulty))}
                  >
                    {guide.difficulty}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl leading-tight">
                  {guide.title}
                </DialogTitle>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/60 border border-border/40">
                <Clock className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Est. Time</span>
                <span className="font-bold text-sm">{guide.time}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/60 border border-border/40">
                <Wrench className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Tools</span>
                <span className="font-bold text-sm">{guide.tools.length}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/60 border border-border/40">
                <AlertTriangle
                  className={cn("h-4 w-4 mb-1", {
                    "text-emerald-500": guide.warning === "Low",
                    "text-amber-500": guide.warning === "Medium",
                    "text-orange-500": guide.warning === "High",
                    "text-red-500": guide.warning === "Critical",
                  })}
                />
                <span className="text-xs text-muted-foreground">Warning</span>
                <span className="font-bold text-sm">{guide.warning}</span>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 space-y-6 py-6 max-h-[45vh] overflow-y-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 aspect-video flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(11,95,255,0.15)_0%,_transparent_70%)]" />
            <div className="relative flex flex-col items-center gap-3 z-10">
              <div className="h-16 w-16 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="h-7 w-7 text-voltcare-blue ml-1" fill="currentColor" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Watch Video Walkthrough
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                2:45 min · Professionally narrated
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Required Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {guide.tools.map((tool, i) => (
                <Badge key={i} variant="outline" className="px-4 py-1.5 font-medium">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              {guide.safe ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
              {guide.safe ? "Step-by-Step Instructions" : "Critical Warnings — DO NOT PROCEED"}
            </h4>
            <ol className="space-y-3">
              <AnimatePresence>
                {guide.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className={cn(
                      "flex gap-4 p-4 rounded-xl border transition-all",
                      guide.safe
                        ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100/60 dark:border-emerald-900/30"
                        : "bg-red-50/50 dark:bg-red-950/10 border-red-100/60 dark:border-red-900/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md",
                        guide.safe
                          ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white"
                          : "bg-gradient-to-br from-red-500 to-rose-600 text-white"
                      )}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed pt-1 font-medium">
                      {step}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </div>

          {guide.safe && (
            <div className="p-4 rounded-xl border border-amber-200/60 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-900/40">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Safety First:</strong> If at any point you feel unsure, something smells,
                  sparks, or feels wrong — stop immediately and book a technician. Electricity is
                  unforgiving, and there's no shame in asking for professional help.
                </span>
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant={guide.safe ? "outline" : "default"}
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            <PhoneCall className="h-4 w-4" />
            Book Technician Instead
          </Button>
          {guide.safe && (
            <Button
              variant="success"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              <CheckCircle2 className="h-4 w-4" />
              I Can Do This
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DIYGuide() {
  const [open, setOpen] = React.useState(false);
  const [selectedGuide, setSelectedGuide] = React.useState<DIYGuide | null>(null);

  const handleOpen = (guide: DIYGuide) => {
    setSelectedGuide(guide);
    setOpen(true);
  };

  return (
    <section id="diy-center" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-voltcare-blue/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 h-96 w-96 rounded-full bg-voltcare-cyan/5 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <Badge variant="info" className="mb-5 px-5 py-1.5 text-sm shadow-lg">
            <BookOpen className="h-4 w-4" />
            Knowledge Center · Free Access
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            DIY <span className="bg-gradient-to-r from-voltcare-blue via-voltcare-cyan to-voltcare-blue bg-clip-text text-transparent">Safe Repair</span> Center
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Free, professionally-reviewed guides for simple fixes you can safely do at home.
            Always know your limits — when in doubt, we're just one click away.
          </p>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {diyGuides.map((guide, index) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onOpen={handleOpen}
              index={index}
            />
          ))}
        </motion.div>

        <GuideDialog
          guide={selectedGuide}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </section>
  );
}
