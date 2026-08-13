"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Zap,
  MapPin,
  MessageCircle,
  FileText,
  Gift,
  WifiOff,
  Headphones,
  Bell,
  Download,
  QrCode,
  CalendarCheck,
  Clock,
  Star,
  Home as HomeIcon,
  CalendarDays,
  Search,
  User,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const appFeatures = [
  {
    icon: Zap,
    title: "One-tap booking",
    description: "Book any service in under 30 seconds with saved preferences and smart suggestions.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    borderColor: "border-amber-500/20",
  },
  {
    icon: MapPin,
    title: "Live tracking",
    description: "Real-time map view of your technician en route with ETA and live updates.",
    color: "from-primary/20 to-cyan-500/20",
    iconColor: "text-primary",
    borderColor: "border-primary/20",
  },
  {
    icon: MessageCircle,
    title: "In-app chat",
    description: "Message your technician directly, share photos of the issue for faster diagnosis.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: FileText,
    title: "Digital invoices",
    description: "All receipts, itemized bills, and payment history stored securely in one place.",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Gift,
    title: "Rewards points",
    description: "Earn points on every booking, reviews, and referrals. Redeem for free services.",
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    borderColor: "border-rose-500/20",
  },
  {
    icon: WifiOff,
    title: "Offline mode",
    description: "Access DIY guides, booking history, and saved electricians without internet.",
    color: "from-slate-500/20 to-zinc-500/20",
    iconColor: "text-slate-600 dark:text-slate-400",
    borderColor: "border-slate-500/20",
  },
];

const floatingChips = [
  {
    icon: Headphones,
    label: "24/7 Support",
    delay: 0,
    top: "8%",
    right: "-8%",
    bg: "from-emerald-500 to-teal-500",
  },
  {
    icon: Bell,
    label: "Instant Notifications",
    delay: 1,
    bottom: "12%",
    left: "-10%",
    bg: "from-violet-500 to-indigo-500",
  },
];

const bottomNavItems = [
  { icon: HomeIcon, label: "Home", active: true },
  { icon: Search, label: "Services", active: false },
  { icon: CalendarDays, label: "Bookings", active: false },
  { icon: User, label: "Profile", active: false },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-cyan-500/20 to-amber-500/20 rounded-[3.5rem] blur-3xl opacity-60" />
      <div className="relative rounded-[3rem] bg-slate-900 p-2.5 shadow-[0_50px_100px_-20px_rgba(11,95,255,0.35)]">
        <div className="relative rounded-[2.4rem] overflow-hidden bg-slate-950" style={{ aspectRatio: "9/19" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-16 h-3.5 bg-slate-800 rounded-full flex items-center px-1.5 gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 h-7 z-40 flex items-center justify-between px-7 pt-1 text-white/90 text-[11px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-1 rounded-full bg-white/80" />
                <div className="w-1 h-1.5 rounded-full bg-white/80" />
                <div className="w-1 h-2 rounded-full bg-white/80" />
                <div className="w-1 h-2.5 rounded-full bg-white/90" />
              </div>
              <svg viewBox="0 0 16 12" className="w-4 h-3 fill-current">
                <rect x="0" y="6" width="2.5" height="6" rx="0.5" />
                <rect x="4" y="4" width="2.5" height="8" rx="0.5" />
                <rect x="8" y="2" width="2.5" height="10" rx="0.5" />
                <rect x="12" y="0" width="2.5" height="12" rx="0.5" opacity="0.5" />
              </svg>
              <div className="relative w-6 h-3 border border-white/60 rounded-[3px] ml-0.5">
                <div className="absolute inset-0.5 w-4/5 bg-white/90 rounded-[1.5px]" />
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/40 rounded-r" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pt-8 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/60" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/15 to-cyan-500/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />
            <div className="absolute bottom-40 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-full blur-2xl" />

            <div className="relative h-full overflow-y-auto no-scrollbar px-4 pt-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Good morning 👋</div>
                  <div className="text-sm font-bold text-slate-800 leading-tight">Alex Johnson</div>
                </div>
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-600" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </div>
              </div>

              <div className="relative mb-4 rounded-2xl p-4 overflow-hidden" style={{
                background: "linear-gradient(135deg, #0B5FFF 0%, #00C2FF 50%, #0B5FFF 100%)",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 6s ease infinite",
              }}>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
                <div className="relative">
                  <div className="text-[10px] font-medium text-white/80 uppercase tracking-wider mb-1">Your Balance</div>
                  <div className="text-2xl font-black text-white tracking-tight mb-3">Rp 245,000</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl py-2">
                      <div className="text-lg font-bold text-white">12</div>
                      <div className="text-[8px] text-white/80 font-medium">Bookings</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl py-2">
                      <div className="text-lg font-bold text-white">4.9</div>
                      <div className="flex items-center justify-center gap-0.5">
                        <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
                      </div>
                      <div className="text-[8px] text-white/80 font-medium">Rating</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl py-2">
                      <div className="text-lg font-bold text-white">850</div>
                      <div className="text-[8px] text-white/80 font-medium">Points</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-xs font-bold text-slate-800">Upcoming Appointment</div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <Card className="p-3 rounded-xl border-border/40 bg-white/70 backdrop-blur-sm shadow-soft">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 flex items-center justify-center shrink-0">
                      <CalendarCheck className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">Smart Switch Installation</div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Tomorrow, 10:00 AM</span>
                      </div>
                    </div>
                    <Badge variant="success" className="text-[9px] px-2 py-0.5 rounded-full font-semibold">
                      Confirmed
                    </Badge>
                  </div>
                </Card>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800 mb-2.5">Quick Actions</div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: Zap, label: "Emergency", bg: "from-rose-500 to-red-500" },
                    { icon: Sparkles, label: "Diagnostic", bg: "from-primary to-cyan-500" },
                    { icon: Gift, label: "Rewards", bg: "from-amber-500 to-orange-500" },
                    { icon: MessageCircle, label: "Support", bg: "from-emerald-500 to-teal-500" },
                  ].map((action) => {
                    const ActionIcon: LucideIcon = action.icon;
                    return (
                      <div key={action.label} className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                          "w-11 h-11 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg shadow-primary/10",
                          action.bg
                        )}>
                          <ActionIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-600">{action.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 z-40">
            <div className="h-full grid grid-cols-4 items-center px-2">
              {bottomNavItems.map((item) => {
                const NavIcon: LucideIcon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-0.5">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                      item.active
                        ? "bg-gradient-to-br from-primary to-cyan-500 shadow-lg shadow-primary/30 scale-110"
                        : "text-slate-400"
                    )}>
                      <NavIcon className={cn("w-4 h-4", item.active ? "text-white" : "")} />
                    </div>
                    <span className={cn(
                      "text-[8px] font-semibold",
                      item.active ? "text-primary" : "text-slate-400"
                    )}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {floatingChips.map((chip, i) => {
        const ChipIcon: LucideIcon = chip.icon;
        return (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -14, 0] }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay * 0.5,
              },
              opacity: { delay: 0.2 + i * 0.1 },
              scale: { delay: 0.2 + i * 0.1 },
            }}
            className={cn(
              "absolute z-50 glass-strong rounded-2xl px-3.5 py-2.5 shadow-2xl flex items-center gap-2",
              chip.top && `top-[${chip.top}]`,
              chip.right && `right-[${chip.right}]`,
              chip.bottom && `bottom-[${chip.bottom}]`,
              chip.left && `left-[${chip.left}]`
            )}
            style={{
              top: chip.top,
              right: chip.right,
              bottom: chip.bottom,
              left: chip.left,
            }}
          >
            <div className={cn(
              "w-7 h-7 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              chip.bg
            )}>
              <ChipIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-foreground leading-none">{chip.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function AppPromo() {
  return (
    <section id="app" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 via-cyan-500/8 to-transparent rounded-full blur-[120px] -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-amber-500/10 via-rose-500/6 to-transparent rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-glass"
            >
              <Smartphone className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">Mobile App</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 sm:mb-6 leading-tight">
              Manage Everything from{" "}
              <span className="text-gradient block">Our Mobile App</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mb-7 sm:mb-9 leading-relaxed">
              The VoltCare app puts certified electricians, real-time tracking, and your entire service history right in your pocket. Built for speed, safety, and convenience.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {appFeatures.map((feature, i) => {
                const FeatureIcon: LucideIcon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="group relative"
                  >
                    <Card className={cn(
                      "h-full p-4 sm:p-5 transition-all duration-300 border",
                      feature.borderColor,
                      "hover:shadow-lift hover:bg-white dark:hover:bg-slate-900/50"
                    )}>
                      <div className={cn(
                        "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl scale-95",
                        feature.color
                      )} />
                      <div className="relative flex items-start gap-3.5">
                        <div className={cn(
                          "relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                          feature.color
                        )}>
                          <FeatureIcon className={cn("w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0", feature.iconColor)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-foreground mb-1 leading-tight">
                            {feature.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="group relative inline-flex items-center gap-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/20 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-70 font-medium">Download on the</span>
                    <span className="text-base font-bold tracking-tight">App Store</span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="group relative inline-flex items-center gap-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/20 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 fill-current">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-70 font-medium">Get it on</span>
                    <span className="text-base font-bold tracking-tight">Google Play</span>
                  </div>
                </motion.a>
              </div>

              <div className="flex items-center gap-3 glass rounded-2xl p-3 sm:p-3.5 shadow-glass">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-1.5 shadow-inner shrink-0">
                  <div className="w-full h-full rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 gap-[1px]">
                      {Array.from({ length: 49 }).map((_, i) => {
                        const isFinder = i < 7 || i >= 42 || i % 7 === 0 || i % 7 === 6;
                        const hasFinderPattern = [0, 6, 42, 48].includes(i);
                        if (hasFinderPattern) {
                          return (
                            <div key={i} className="relative bg-slate-900">
                              <div className="absolute inset-[15%] bg-white" />
                              <div className="absolute inset-[30%] bg-slate-900" />
                            </div>
                          );
                        }
                        if (isFinder) {
                          return <div key={i} className="bg-white" />;
                        }
                        return <div key={i} className={(Math.sin(i * 3.7) > 0 ? "bg-slate-900" : "bg-white")} />;
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <QrCode className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-bold text-foreground leading-none">Scan to Download</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Point your camera at this code for instant app download link.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative z-10 py-8">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
