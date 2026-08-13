"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import {
  Zap,
  ShieldCheck,
  Wrench,
  Star,
  Clock,
  PhoneCall,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  endValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
  iconBg: string;
  decimals?: number;
}

function StatCard({ icon, endValue, suffix, prefix, label, delay, iconBg, decimals = 0 }: StatCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "glass rounded-2xl p-4 sm:p-5 shadow-glass relative overflow-hidden group"
      )}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      <div className="relative flex items-start gap-3 sm:gap-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={cn(
            "flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg",
            iconBg
          )}
        >
          {icon}
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-none">
            {prefix}
            {inView ? (
              <CountUp
                end={endValue}
                duration={2.2}
                delay={delay * 0.3}
                separator=","
                decimals={decimals}
              />
            ) : (
              0
            )}
            {suffix}
          </div>
          <div className="mt-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ElectricLineAnimation() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#00C2FF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#0B5FFF" stopOpacity="1" />
          <stop offset="80%" stopColor="#00C2FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="15%" stopColor="#FFC107" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FFC107" stopOpacity="0.9" />
          <stop offset="85%" stopColor="#FFC107" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B5FFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0B5FFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="200"
        r="300"
        fill="url(#bgGlow1)"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="1000"
        cy="600"
        r="350"
        fill="url(#bgGlow2)"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.circle
        cx="850"
        cy="150"
        r="200"
        fill="url(#bgGlow1)"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {[
        { d: "M -100 300 C 200 150 500 450 900 250 S 1400 350 1300 200", gradient: "url(#lineGradient1)", duration: 8, dash: 300 },
        { d: "M -100 500 C 250 650 550 350 950 550 S 1400 450 1300 600", gradient: "url(#lineGradient1)", duration: 10, dash: 250, delay: 1 },
        { d: "M -80 150 C 300 80 600 280 1000 120 S 1350 180 1300 80", gradient: "url(#lineGradient2)", duration: 12, dash: 200, delay: 0.5 },
        { d: "M -50 650 C 200 720 500 520 850 680 S 1300 580 1300 720", gradient: "url(#lineGradient2)", duration: 9, dash: 280, delay: 1.5 },
        { d: "M 400 -50 C 450 250 250 500 500 700 S 800 850 800 900", gradient: "url(#lineGradient1)", duration: 11, dash: 220, delay: 0.3 },
      ].map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          fill="none"
          stroke={line.gradient}
          strokeWidth={line.gradient.includes("Gradient2") ? 2 : 2.5}
          strokeLinecap="round"
          strokeDasharray={`${line.dash} 1000`}
          initial={{ strokeDashoffset: line.dash + 1000 }}
          animate={{ strokeDashoffset: [line.dash + 1000, -(line.dash + 1000)] }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "linear",
            delay: (line as any).delay || 0,
          }}
        />
      ))}

      {[
        { cx: 200, cy: 300, delay: 0 },
        { cx: 500, cy: 450, delay: 0.5 },
        { cx: 900, cy: 250, delay: 1 },
        { cx: 250, cy: 650, delay: 1.5 },
        { cx: 950, cy: 550, delay: 0.7 },
        { cx: 700, cy: 150, delay: 2 },
        { cx: 1050, cy: 680, delay: 1.2 },
      ].map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="28"
            fill="url(#nodeGlow)"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
          />
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="5"
            fill="#00C2FF"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
          />
        </g>
      ))}
    </svg>
  );
}

function HouseCircuitIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto aspect-square"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-amber-500/10 rounded-[3rem] blur-3xl animate-pulse-slow" />
      <div className="relative w-full h-full">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B5FFF" />
              <stop offset="100%" stopColor="#00C2FF" />
            </linearGradient>
            <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--card))" />
            </linearGradient>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#0B5FFF" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M 200 40 L 60 160 L 340 160 Z"
            fill="url(#roofGrad)"
            stroke="#0B5FFF"
            strokeWidth="2"
            strokeLinejoin="round"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ filter: "drop-shadow(0 10px 30px rgba(11,95,255,0.3))" }}
          />
          <motion.path
            d="M 200 40 L 200 10 L 200 40"
            stroke="#0B5FFF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <motion.rect
            x="192"
            y="0"
            width="16"
            height="12"
            rx="2"
            fill="#FFC107"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="animate-pulse-slow"
          />

          <motion.rect
            x="75"
            y="160"
            width="250"
            height="180"
            rx="16"
            fill="url(#houseGrad)"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <motion.rect
            x="175"
            y="250"
            width="50"
            height="90"
            rx="8"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            style={{ transformOrigin: "bottom" }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <motion.circle
            cx="215"
            cy="295"
            r="3"
            fill="#FFC107"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          />

          {[
            { x: 95, y: 185, w: 50, h: 45, id: 1 },
            { x: 255, y: 185, w: 50, h: 45, id: 2 },
            { x: 95, y: 250, w: 50, h: 45, id: 3 },
            { x: 255, y: 250, w: 50, h: 45, id: 4 },
          ].map((win, i) => (
            <motion.g key={win.id}>
              <motion.rect
                x={win.x}
                y={win.y}
                width={win.w}
                height={win.h}
                rx="6"
                fill={`rgba(0,194,255,${0.08 + i * 0.02})`}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              />
              <motion.line
                x1={win.x + win.w / 2}
                y1={win.y}
                x2={win.x + win.w / 2}
                y2={win.y + win.h}
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              />
              <motion.line
                x1={win.x}
                y1={win.y + win.h / 2}
                x2={win.x + win.w}
                y2={win.y + win.h / 2}
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              />
              <motion.rect
                x={win.x + 5}
                y={win.y + 5}
                width={win.w - 10}
                height={win.h / 2 - 7}
                rx="3"
                fill="rgba(255,193,7,0.3)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, delay: 1.2 + i * 0.2, repeat: Infinity }}
              />
            </motion.g>
          ))}

          <g filter="url(#softGlow)">
            <motion.path
              d="M 200 75 L 200 160 L 95 160 L 95 185"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            />
            <motion.path
              d="M 95 185 L 95 228 L 120 228"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            />
            <motion.path
              d="M 95 228 L 95 295 L 120 295"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            />
            <motion.path
              d="M 200 160 L 305 160 L 305 185"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.path
              d="M 305 185 L 305 228 L 280 228"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            />
            <motion.path
              d="M 305 228 L 305 295 L 280 295"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            />
            <motion.path
              d="M 200 160 L 200 250"
              fill="none"
              stroke="url(#circuitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            />
          </g>

          {[
            { cx: 200, cy: 75, delay: 2 },
            { cx: 95, cy: 160, delay: 2.2 },
            { cx: 305, cy: 160, delay: 2.3 },
            { cx: 120, cy: 228, delay: 2.5 },
            { cx: 280, cy: 228, delay: 2.6 },
            { cx: 120, cy: 295, delay: 2.7 },
            { cx: 280, cy: 295, delay: 2.8 },
          ].map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="12"
                fill="#00C2FF"
                initial={{ opacity: 0.1 }}
                animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: node.delay - 2 }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="#0B5FFF"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: node.delay - 2 }}
              />
            </g>
          ))}

          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            style={{ transformOrigin: "200px 340px" }}
          >
            <circle cx="200" cy="340" r="40" fill="none" stroke="rgba(11,95,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
          </motion.g>
        </svg>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-strong rounded-2xl p-2.5 sm:p-3 shadow-lift"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-4 -left-2 sm:-left-6 glass-strong rounded-2xl p-2.5 sm:p-3 shadow-lift"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
            <div className="text-[10px] sm:text-xs">
              <div className="font-bold leading-none">Safe</div>
              <div className="text-muted-foreground">Certified</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 -left-4 sm:-left-8 glass-strong rounded-2xl p-2.5 sm:p-3 shadow-lift"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Wrench className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
            <div className="text-[10px] sm:text-xs">
              <div className="font-bold leading-none">Fast Fix</div>
              <div className="text-muted-foreground">15-30 min</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20 overflow-hidden"
    >
      <ElectricLineAnimation />

      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-5 sm:mb-7 shadow-glass"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-foreground/90">
                24/7 Emergency Service Available
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-5 sm:mb-7"
            >
              <span className="block">Professional Home</span>
              <span className="block">
                <span className="text-gradient">Electrical Services</span>
              </span>
              <span className="block">in Minutes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-7 sm:mb-10"
            >
              Book certified electricians for safe installations, repairs, and
              smart home upgrades. Get transparent pricing, 24/7 emergency
              support, and a 90-day workmanship guarantee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 btn-ripple bg-[length:200%_auto] animate-gradient-shift"
              >
                <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-white shrink-0" />
                <span>Book Technician</span>
                <ArrowRight className="w-4.5 h-4.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none opacity-60" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold text-foreground border-2 border-border hover:border-primary/40 bg-background/60 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
              >
                <PlayCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>Learn Safe DIY</span>
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl">
              <StatCard
                icon={<Wrench className="w-5.5 h-5.5 text-white" />}
                endValue={10000}
                suffix="+"
                label="Repairs Done"
                delay={0}
                iconBg="bg-gradient-to-br from-primary to-blue-600 shadow-primary/30"
              />
              <StatCard
                icon={<ShieldCheck className="w-5.5 h-5.5 text-white" />}
                endValue={500}
                suffix="+"
                label="Certified Electricians"
                delay={0.1}
                iconBg="bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
              />
              <StatCard
                icon={<Star className="w-5.5 h-5.5 text-white fill-white" />}
                endValue={4.9}
                decimals={1}
                label="Avg. Customer Rating"
                delay={0.2}
                iconBg="bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-500/30"
              />
              <StatCard
                icon={
                  <div className="relative">
                    <Clock className="w-5.5 h-5.5 text-white" />
                    <PhoneCall className="w-3 h-3 text-white absolute -bottom-0.5 -right-0.5 bg-rose-500 rounded-full p-0.5" />
                  </div>
                }
                endValue={24}
                suffix="/7"
                label="Emergency Support"
                delay={0.3}
                iconBg="bg-gradient-to-br from-rose-500 to-pink-500 shadow-rose-500/30"
              />
            </div>
          </div>

          <div className="relative">
            <HouseCircuitIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
