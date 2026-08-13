"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  ToggleLeft,
  PlugZap,
  LampCeiling,
  Ribbon,
  Smartphone,
  BellRing,
  Fan,
  Wind,
  ZapOff,
  CircuitBoard,
  PanelLeft,
  ClipboardCheck,
  Cable,
  ShieldCheck,
  Battery,
  Sun,
  BatteryFull,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn, servicesData, formatCurrency, getDifficultyColor } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  ToggleLeft,
  PlugZap,
  LampCeiling,
  Ribbon,
  Smartphone,
  BellRing,
  Fan,
  Wind,
  ZapOff,
  CircuitBoard,
  PanelLeft,
  ClipboardCheck,
  Cable,
  ShieldCheck,
  CarBattery: Battery,
  Sun,
  BatteryFull,
};

const filterTabs = [
  { name: "All", value: "All", icon: Sparkles },
  { name: "Basic", value: "Basic", icon: Lightbulb },
  { name: "Installation", value: "Installation", icon: PlugZap },
  { name: "Smart Home", value: "Smart Home", icon: Smartphone },
  { name: "Repair", value: "Repair", icon: ZapOff },
  { name: "Maintenance", value: "Maintenance", icon: ClipboardCheck },
  { name: "Major", value: "Major", icon: PanelLeft },
  { name: "Safety", value: "Safety", icon: ShieldCheck },
  { name: "EV", value: "EV", icon: Battery },
  { name: "Green Energy", value: "Green Energy", icon: Sun },
];

interface ServiceCardProps {
  service: typeof servicesData[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Lightbulb;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: (index % 6) * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative text-left w-full"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 via-cyan-500/30 to-amber-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
      <div className="relative h-full glass rounded-2xl p-5 sm:p-6 shadow-glass border-white/10 transition-all duration-500 overflow-hidden">
        <div
          className="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,95,255,0.5) 0%, rgba(0,194,255,0.5) 50%, rgba(255,193,7,0.5) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

        <div className="relative flex flex-col h-full gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-cyan-500/30 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/15 flex items-center justify-center group-hover:from-primary group-hover:to-cyan-500 transition-all duration-500 shadow-lg shadow-primary/0 group-hover:shadow-primary/25">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/80 text-[11px] sm:text-xs font-medium text-muted-foreground border border-border/50">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{service.duration}</span>
              </div>
              <div
                className={cn(
                  "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold",
                  getDifficultyColor(service.difficulty)
                )}
              >
                {service.difficulty}
              </div>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <h3 className="text-base sm:text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          <div className="pt-2 sm:pt-3 mt-auto border-t border-border/40 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-0.5">
                Start from
              </div>
              <div className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {formatCurrency(service.price)}
              </div>
            </div>
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-muted/60 text-muted-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 shrink-0 shadow-lg shadow-primary/0 group-hover:shadow-primary/25">
              <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function Services() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        activeFilter === "All" || service.category === activeFilter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: servicesData.length };
    filterTabs.slice(1).forEach((tab) => {
      counts[tab.value] = servicesData.filter(
        (s) => s.category === tab.value
      ).length;
    });
    return counts;
  }, []);

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary/8 to-transparent rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-medium mb-4 sm:mb-5 shadow-glass"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Our Services</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            What Can We Help You With{" "}
            <span className="text-gradient block sm:inline">Today?</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            From quick bulb replacements to full house rewiring and EV charger
            installations — certified electricians, transparent pricing, and a
            90-day guarantee on every job.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto mb-6 sm:mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search services (e.g., 'smart switch', 'EV charger')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 sm:py-4 rounded-2xl glass border border-border/60 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all shadow-glass"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <SlidersHorizontal className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              Filter by category
            </span>
          </div>
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeFilter === tab.value;
              return (
                <motion.button
                  key={tab.value}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(tab.value)}
                  className={cn(
                    "relative flex-shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "text-white shadow-xl shadow-primary/30 bg-[length:200%_auto] animate-gradient-shift"
                      : "text-foreground/80 hover:text-foreground glass border border-border/50 hover:border-primary/20"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
                  )}
                  <span className="relative flex items-center gap-2">
                    <TabIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>{tab.name}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold transition-all duration-300",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {categoryCounts[tab.value] || 0}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="min-h-[400px]">
          {filteredServices.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl py-16 sm:py-20 text-center shadow-glass"
            >
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-xl" />
                <div className="relative w-full h-full rounded-2xl bg-muted/60 border border-border flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                No services found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5">
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Show all services
              </button>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 sm:mt-14 glass rounded-3xl p-6 sm:p-8 lg:p-10 shadow-glass relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/15 via-cyan-500/10 to-amber-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-center">
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-2 sm:mb-3">
                Not sure which service you need?{" "}
                <span className="text-gradient">Get a free diagnostic.</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                Our Smart Troubleshooter asks a few targeted questions and
                recommends the exact service or DIY guide you need — no
                guesswork, no unnecessary costs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all btn-ripple bg-[length:200%_auto] animate-gradient-shift whitespace-nowrap"
              >
                <Sparkles className="w-4.5 h-4.5" />
                Smart Troubleshooter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-foreground border-2 border-border hover:border-primary/40 bg-background/60 hover:bg-primary/5 backdrop-blur-sm transition-all whitespace-nowrap"
              >
                <ZapOff className="w-4.5 h-4.5 text-rose-500" />
                Emergency? Call Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
