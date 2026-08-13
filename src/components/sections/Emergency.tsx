"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  ZapOff,
  Flame,
  Droplets,
  AlertTriangle,
  HeartPulse,
  Clock,
  ShieldCheck,
  BadgeCheck,
  Tag,
  CheckCircle2,
  Star,
  Quote,
  Send,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn, reviews, electricians } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ScenarioItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glow: string;
}

const scenarios: ScenarioItem[] = [
  {
    title: "Power Outage",
    description: "Complete or partial blackout with no apparent cause",
    icon: ZapOff,
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/40",
  },
  {
    title: "Sparks & Burning",
    description: "Visible sparks, flames, or burning plastic smell",
    icon: Flame,
    color: "from-red-500 to-rose-600",
    glow: "shadow-red-500/50",
  },
  {
    title: "Water Damage",
    description: "Flood, pipe leak, or moisture near electrical panels",
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/40",
  },
  {
    title: "Exposed Wires",
    description: "Cut, frayed, or bare wires accessible to touch",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/40",
  },
  {
    title: "Electrocution",
    description: "Shock received from appliance, switch, or outlet",
    icon: HeartPulse,
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/50",
  },
];

const reassuranceBadges = [
  { icon: Clock, label: "24/7/365", sub: "Always on call", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
  { icon: ZapOff, label: "15 min", sub: "Avg. response", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: BadgeCheck, label: "Certified", sub: "PLN licensed techs", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: Tag, label: "No hidden", sub: "Transparent pricing", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
];

function useCountdown(targetMinutes: number) {
  const [remaining, setRemaining] = useState(targetMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 0) return targetMinutes * 60;
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMinutes]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = 1 - remaining / (targetMinutes * 60);
  return { minutes, seconds, progress, remaining };
}

function ETAProgressCircle({ targetMinutes, size = 180 }: { targetMinutes: number; size?: number }) {
  const { minutes, seconds, progress } = useCountdown(targetMinutes);
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="etaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="etaGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#etaGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          filter="url(#etaGlow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={`${minutes}:${seconds}`}
          initial={{ scale: 1.1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent leading-none">
            {minutes}
            <span className="text-2xl sm:text-3xl">:{seconds.toString().padStart(2, "0")}</span>
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1.5">
            until dispatch
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AvgArrivalCircle({ targetMinutes = 30, size = 200 }: { targetMinutes?: number; size?: number }) {
  const { progress } = useCountdown(targetMinutes);
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);
  const displayMin = Math.floor((1 - progress) * targetMinutes);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-red-500/20 via-orange-500/20 to-amber-500/20 blur-2xl animate-pulse-slow" />
      <svg width={size} height={size} className="-rotate-90 relative">
        <defs>
          <linearGradient id="arrivalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#arrivalGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10px] sm:text-xs font-bold text-white/60 uppercase tracking-[0.15em] mb-1.5">
          Avg. arrival in
        </div>
        <motion.div
          key={displayMin}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
            {displayMin}
          </span>
          <span className="absolute -right-6 top-2 sm:top-3 text-base sm:text-lg font-bold text-white/70">
            min
          </span>
        </motion.div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
          <MapPin className="w-3 h-3 text-red-400 shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-white/80">
            Nearest tech {electricians[0].distance}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Emergency() {
  const [bookingPhase, setBookingPhase] = useState<"idle" | "countdown" | "dispatched">("idle");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (bookingPhase !== "countdown") return;
    if (countdown <= 0) {
      setBookingPhase("dispatched");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [bookingPhase, countdown]);

  const emergencyReview = reviews.find((r) => r.job.includes("Emergency")) || reviews[2];

  const startDispatch = () => {
    setCountdown(3);
    setBookingPhase("countdown");
  };

  const resetDispatch = () => {
    setBookingPhase("idle");
    setCountdown(3);
  };

  return (
    <section id="emergency" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-rose-950/30 to-orange-950/40 dark:from-red-950/60 dark:via-rose-950/50 dark:to-orange-950/50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-gradient-to-b from-red-600/15 via-rose-500/10 to-transparent blur-[120px] rounded-[50%] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/15 via-red-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.07] dark:opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 backdrop-blur-sm mb-4 sm:mb-5 shadow-lg shadow-red-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-red-100 dark:text-red-200">
              LIVE — Emergency Teams Ready
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5 text-white">
            24/7 Emergency{" "}
            <span className="block sm:inline bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              Electrical Service
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/70 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t risk it. Sparks, burning smells, exposed wires, or shock —
            every second counts. Our certified emergency electricians are
            minutes away, fully equipped, and ready 24/7 including holidays.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="absolute -inset-1 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 blur-3xl opacity-30 animate-pulse-slow pointer-events-none" />
          <div className="absolute -inset-0.5 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-red-500/60 via-rose-500/60 to-orange-500/60 animate-glow" style={{ animationDuration: "2.5s" }} />
          <Card className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border-0 shadow-2xl bg-gradient-to-br from-red-600 via-rose-600 to-orange-600 dark:from-red-700 dark:via-rose-700 dark:to-orange-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="relative p-5 sm:p-8 lg:p-10 xl:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center">
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                    <Badge className="bg-white/15 border-white/20 text-white backdrop-blur-sm gap-1.5 text-xs sm:text-sm py-1 px-3">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Certified Emergency Response
                    </Badge>
                    <Badge className="bg-amber-400/20 border-amber-300/30 text-amber-100 backdrop-blur-sm gap-1.5 text-xs sm:text-sm py-1 px-3">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      4.9 Emergency Rating
                    </Badge>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <div className="text-[11px] sm:text-xs font-bold text-white/60 uppercase tracking-[0.2em] mb-2.5 sm:mb-3">
                      Call Our Emergency Hotline
                    </div>
                    <motion.a
                      href="tel:150086582273"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="group relative inline-flex items-center gap-3 sm:gap-4 text-white"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-white/30 blur-xl animate-pulse-slow" />
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl">
                          <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white/20" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-none">
                          1-500-VOLTCARE
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 mt-1 sm:mt-1.5 font-medium">
                          Tap to call · Anytime · Anywhere
                        </div>
                      </div>
                    </motion.a>
                  </div>

                  <AnimatePresence mode="wait">
                    {bookingPhase === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={startDispatch}
                          className="group relative w-full inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4.5 sm:py-5 rounded-2xl text-sm sm:text-base lg:text-lg font-bold text-red-700 dark:text-red-800 bg-white hover:bg-amber-50 shadow-2xl transition-all btn-ripple overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white via-amber-50 to-white bg-[length:200%_auto] animate-gradient-shift" />
                          <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-300/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                          <div className="relative flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30"
                            >
                              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            </motion.div>
                            <span>Send Nearest Electrician NOW</span>
                            <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                          </div>
                        </motion.button>
                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center text-white/70 font-medium">
                          No account needed · {electricians[0].name} is {electricians[0].distance} away
                        </p>
                      </motion.div>
                    )}

                    {bookingPhase === "countdown" && (
                      <motion.div
                        key="countdown"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 sm:p-6"
                      >
                        <div className="flex items-center gap-4 sm:gap-5">
                          <ETAProgressCircle targetMinutes={3} size={120} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] sm:text-xs font-bold text-white/60 uppercase tracking-wider mb-1">
                              Dispatching in
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
                              Confirming {electricians[0].name}
                            </div>
                            <div className="text-xs sm:text-sm text-white/75 leading-relaxed">
                              {electricians[0].completed}+ jobs · {electricians[0].rating}⭐ · {electricians[0].responseTime}
                            </div>
                            <button
                              onClick={resetDispatch}
                              className="mt-3 text-[11px] sm:text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors"
                            >
                              Cancel dispatch
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {bookingPhase === "dispatched" && (
                      <motion.div
                        key="dispatched"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative bg-emerald-500/15 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-5 sm:p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 shrink-0">
                            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 mb-2">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                              </span>
                              <span className="text-[11px] sm:text-xs font-bold text-emerald-200">
                                DISPATCHED
                              </span>
                            </div>
                            <div className="text-lg sm:text-xl font-black text-white mb-1 leading-tight">
                              {electricians[0].name} is on the way
                            </div>
                            <div className="text-xs sm:text-sm text-white/75 leading-relaxed">
                              ETA {electricians[0].distance} · {electricians[0].responseTime} to arrive · You&apos;ll receive SMS updates shortly.
                            </div>
                            <button
                              onClick={resetDispatch}
                              className="mt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white/80 hover:bg-white/15 hover:text-white transition-all"
                            >
                              <Clock className="w-3 h-3" />
                              Book different time
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <AvgArrivalCircle targetMinutes={30} size={220} />
                </div>
              </div>
            </div>

            <div className="relative px-5 sm:px-8 lg:px-10 xl:px-12 pb-5 sm:pb-8 lg:pb-10 xl:pb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5 sm:mb-8" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {reassuranceBadges.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="relative group"
                    >
                      <div className={cn(
                        "flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:shadow-2xl",
                        b.bg
                      )}>
                        <div className={cn(
                          "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110",
                          "bg-white/15"
                        )}>
                          <Icon className={cn("w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0", b.color)} />
                        </div>
                        <div className="text-sm sm:text-base font-black text-white leading-tight mb-0.5">
                          {b.label}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight">
                          {b.sub}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-10 sm:mb-14 lg:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4 border-border/60">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span>If you see any of these —</span>
              <span className="font-bold text-red-600 dark:text-red-400">Call us immediately</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              5 Scenarios That Can&apos;t Wait
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {scenarios.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={cn(
                    "relative glass rounded-2xl p-4 sm:p-5 shadow-glass border-border/60 group overflow-hidden"
                  )}
                >
                  <div className={cn(
                    "absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-br",
                    s.color
                  )} />
                  <div className="relative flex flex-col h-full gap-3 sm:gap-4">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                        className={cn(
                          "absolute inset-0 rounded-2xl bg-gradient-to-br blur-md",
                          s.color,
                          "opacity-40"
                        )}
                      />
                      <div className={cn(
                        "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl",
                        s.color,
                        s.glow
                      )}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold mb-1 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {s.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-1">
                      <Badge variant="danger" className="gap-1.5 text-[10px] sm:text-xs py-0.5">
                        <AlertTriangle className="w-3 h-3" />
                        Critical · Emergency Only
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative glass rounded-2xl p-4 sm:p-5 shadow-glass border-dashed border-2 border-red-400/40 group bg-gradient-to-br from-red-500/5 to-orange-500/5 overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="gap-1 text-[10px] sm:text-xs py-0.5 animate-pulse">
                  DANGER
                </Badge>
              </div>
              <div className="flex flex-col h-full gap-3 sm:gap-4 justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-black mb-1 tracking-tight text-red-700 dark:text-red-400">
                    Not sure? Still call us.
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Better safe than sorry. If something feels wrong — buzzing,
                    flickering, warmth, unusual noises — call. We&apos;d rather
                    come out and say it&apos;s nothing than have you risk it.
                  </p>
                </div>
                <a
                  href="tel:150086582273"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:gap-2.5 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call hotline now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-strong border-0 shadow-lift overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 animate-gradient-shift bg-[length:200%_auto]" />
            <div className="relative p-5 sm:p-7 lg:p-9">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 lg:gap-8 items-start sm:items-center">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-500/30 blur-xl animate-pulse-slow" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-rose-400 to-red-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 shrink-0" />
                    ))}
                    <Badge variant="success" className="text-[10px] sm:text-xs py-0.5 gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Emergency Job
                    </Badge>
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      {emergencyReview.date}
                    </span>
                  </div>
                  <blockquote className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed mb-3 sm:mb-4 font-medium">
                    &ldquo;{emergencyReview.comment}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <img
                      src={emergencyReview.avatar}
                      alt={emergencyReview.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-border shadow-md"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {emergencyReview.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                        {emergencyReview.job}
                      </div>
                    </div>
                    <Badge variant="info" className="text-[10px] sm:text-xs py-0.5 gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      25 min response
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
