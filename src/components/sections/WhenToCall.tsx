"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  FlameKindling,
  AlertOctagon,
  ZapOff,
  Droplets,
  Cable,
  Volume2,
  TrendingUp,
  Bug,
  CalendarClock,
  Lightbulb,
  AlertTriangle,
  PhoneCall,
  Clock,
  ShieldAlert,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn, whenToCallTech, getWarningColor, getUrgencyColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/providers/motion";

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Zap,
  FlameKindling,
  AlertOctagon,
  ZapOff,
  Droplets,
  Cable,
  Volume2,
  TrendingUp,
  Bug,
  CalendarClock,
  Lightbulb,
};

const getDangerBadgeVariant = (
  danger: string
): "danger" | "warning" | "info" => {
  switch (danger) {
    case "Critical":
      return "danger";
    case "High":
      return "warning";
    default:
      return "info";
  }
};

type WhenToCall = (typeof whenToCallTech)[number];

const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function TimelineItem({
  item,
  index,
}: {
  item: WhenToCall;
  index: number;
}) {
  const isEmergency = item.urgency === "Emergency";
  const IconComponent = iconMap[item.icon] || AlertTriangle;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      custom={index}
      variants={timelineItemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center"
        )}
      >
        <div className={cn("lg:pr-6", !isEven && "lg:order-2 lg:pl-6 lg:pr-0")}>
          <Card
            className={cn(
              "relative overflow-hidden transition-all duration-500 hover:-translate-y-1",
              isEmergency
                ? "border-red-300/60 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/30 dark:via-transparent dark:to-rose-950/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:shadow-[0_0_50px_rgba(239,68,68,0.25)]"
                : "bg-card/70 hover:shadow-lift border-border/60"
            )}
          >
            {isEmergency && (
              <>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-red-400/20 animate-pulse-slow pointer-events-none" />
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-red-500/15 to-transparent rounded-bl-[100%]" />
              </>
            )}
            <div className="p-6 sm:p-7 space-y-4 relative">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 hover:scale-110",
                      item.danger === "Critical" &&
                        "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/30",
                      item.danger === "High" &&
                        "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-orange-500/30",
                      item.danger === "Medium" &&
                        "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-amber-500/30"
                    )}
                  >
                    <IconComponent className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
                      {item.issue}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant={getDangerBadgeVariant(item.danger)}>
                        <ShieldAlert className="h-3 w-3" />
                        {item.danger}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-semibold border-current/30",
                          getUrgencyColor(item.urgency)
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {item.urgency}
                      </Badge>
                    </div>
                  </div>
                </div>
                {isEmergency && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </div>
                    <span className="text-xs font-bold text-red-700 dark:text-red-400">
                      24/7 EMERGENCY
                    </span>
                  </div>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>

              <div
                className={cn(
                  "p-4 rounded-xl border",
                  item.danger === "Critical" &&
                    "bg-red-50/70 dark:bg-red-950/20 border-red-200/60 dark:border-red-900/40",
                  item.danger === "High" &&
                    "bg-orange-50/70 dark:bg-orange-950/20 border-orange-200/60 dark:border-orange-900/40",
                  item.danger === "Medium" &&
                    "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/40"
                )}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Recommended Action
                </p>
                <p className="font-bold text-sm sm:text-base flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{item.action}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div
          className={cn(
            "hidden lg:flex items-center",
            isEven ? "justify-start" : "justify-end lg:order-1"
          )}
        >
          <div className="relative w-full h-24 flex items-center">
            <div
              className={cn(
                "h-0.5 w-full bg-gradient-to-r",
                isEven
                  ? "from-transparent via-primary/30 to-transparent"
                  : "from-transparent via-primary/30 to-transparent"
              )}
            />
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-border/60 shadow-lg",
                isEven ? "left-0" : "right-0"
              )}
            >
              <span className="text-xs font-bold text-muted-foreground">
                Step #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhenToCall() {
  return (
    <section
      id="when-to-call"
      className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950/50 dark:via-transparent dark:to-slate-950/50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.05)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(11,95,255,0.05)_0%,_transparent_50%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <Badge variant="danger" className="mb-5 px-5 py-1.5 text-sm shadow-lg">
            <AlertTriangle className="h-4 w-4" />
            Your Safety Is Non-Negotiable
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            When to Call a{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
              Technician
            </span>{" "}
            <br className="hidden sm:block" />
            (Don't Risk It)
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Recognize these 12 danger signs and act accordingly. Some situations require
            immediate evacuation and a 24/7 emergency call — don't be a hero when dealing
            with deadly voltage.
          </p>
        </ScrollReveal>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden lg:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-red-400/0 via-red-400/60 to-blue-400/0 animate-pulse-slow" />
            </motion.div>
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-16 hidden lg:flex flex-col justify-between pointer-events-none z-10">
            {whenToCallTech.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="relative flex items-center justify-center h-0"
              >
                <div
                  className={cn(
                    "absolute w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 shadow-xl",
                    getWarningColor(item.danger)
                  )}
                />
                {item.urgency === "Emergency" && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "absolute w-6 h-6 rounded-full",
                        "bg-red-500/30"
                      )}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 3, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                      className={cn(
                        "absolute w-6 h-6 rounded-full",
                        "bg-red-500/20"
                      )}
                    />
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div className="space-y-8 sm:space-y-10">
            {whenToCallTech.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2} className="mt-20 sm:mt-28">
          <Card className="relative overflow-hidden max-w-4xl mx-auto border-0 shadow-lift bg-gradient-to-br from-red-500 via-rose-500 to-red-600 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25)_0%,_transparent_50%)]" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center shadow-2xl">
                  <PhoneCall className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                  Spot Any of These Red Flags?
                </h3>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl">
                  Don't wait for a disaster. Our certified technicians are on standby
                  24/7 — average response time under 45 minutes for emergencies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 shadow-xl shadow-black/10 w-full sm:w-auto text-base"
                >
                  <PhoneCall className="h-5 w-5" />
                  24/7 Emergency
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto text-base"
                >
                  Book Standard Service
                </Button>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
