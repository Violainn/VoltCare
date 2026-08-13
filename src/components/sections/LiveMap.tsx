"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  Navigation,
  ZoomIn,
  ZoomOut,
  Search,
  Zap,
  Clock3,
  Star,
  ShieldCheck,
  Eye,
  Radio,
  Layers,
  Crosshair,
  TrendingUp,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { cn, electricians, formatCurrency, formatRating } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type ElectricianPin = {
  id: number;
  name: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  color: string;
};

const pinColors = [
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-rose-500",
];

function generatePins(): ElectricianPin[] {
  const positions = [
    { x: 28, y: 32 },
    { x: 65, y: 25 },
    { x: 45, y: 55 },
    { x: 78, y: 60 },
    { x: 35, y: 72 },
    { x: 58, y: 42 },
  ];
  return electricians.slice(0, 6).map((e, i) => ({
    id: e.id,
    name: e.name,
    x: positions[i].x,
    y: positions[i].y,
    baseX: positions[i].x,
    baseY: positions[i].y,
    color: pinColors[i % pinColors.length],
  }));
}

export function LiveMap() {
  const [pins] = useState<ElectricianPin[]>(() => generatePins());
  const [etas, setEtas] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    electricians.slice(0, 6).forEach((e, i) => {
      init[e.id] = 12 + i * 7;
    });
    return init;
  });
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchLoc, setSearchLoc] = useState("");
  const [showFastest, setShowFastest] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  useEffect(() => {
    const interval = setInterval(() => {
      setEtas((prev) => {
        const next: Record<number, number> = {};
        Object.entries(prev).forEach(([id, val]) => {
          const n = val - 1;
          next[Number(id)] = n <= 3 ? 12 + Math.floor(Math.random() * 15) : n;
        });
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPin((cur) => {
        const candidates = pins.map((p) => p.id);
        if (showFastest) {
          let minId = candidates[0];
          let minVal = etas[minId] ?? 99;
          candidates.forEach((id) => {
            if ((etas[id] ?? 99) < minVal) {
              minVal = etas[id];
              minVal = etas[id];
              minId = id;
            }
          });
          return minId;
        }
        return cur;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [showFastest, pins, etas]);

  const sortedElectricians = useMemo(() => {
    const list = electricians.slice(0, 6).map((e, idx) => ({
      ...e,
      pin: pins[idx],
      eta: etas[e.id] ?? 15,
    }));
    if (showFastest) {
      list.sort((a, b) => a.eta - b.eta);
    }
    return list;
  }, [pins, etas, showFastest]);

  return (
    <section
      id="live-map"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[750px] h-[750px] bg-gradient-to-bl from-cyan-500/10 via-primary/10 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/8 via-cyan-500/8 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-medium mb-4 sm:mb-5 shadow-glass">
            <Radio className="w-3.5 h-3.5 text-emerald-500">
              <motion.circle
                cx="6"
                cy="6"
                r="3"
                fill="currentColor"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Radio>
            <span className="text-muted-foreground">Real-time Tracking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            Live Electricians{" "}
            <span className="text-gradient">Near You</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            See verified electricians in your area with live ETA countdowns.
            Pick the fastest arrival or your preferred technician — tracked
            every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5">
          <div className="relative">
            <Card className="relative glass-strong shadow-glass border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 p-3 sm:p-4 border-b border-border/50 flex-wrap">
                  <div className="relative group flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                    <Input
                      placeholder="Search area, address, or landmark..."
                      value={searchLoc}
                      onChange={(e) => setSearchLoc(e.target.value)}
                      className="pl-10 h-10 text-sm rounded-xl border-border/60"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl glass border-border/50">
                    <Button
                      variant={viewMode === "map" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("map")}
                      className={cn(
                        "h-8 rounded-lg px-3 text-xs gap-1.5",
                        viewMode === "map" &&
                          "bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/25"
                      )}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Map
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "h-8 rounded-lg px-3 text-xs gap-1.5",
                        viewMode === "list" &&
                          "bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/25"
                      )}
                    >
                      <User className="w-3.5 h-3.5" />
                      List
                    </Button>
                  </div>
                  <Button
                    variant={showFastest ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowFastest((s) => !s)}
                    className={cn(
                      "h-10 rounded-xl text-xs gap-1.5 shrink-0",
                      showFastest
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 border-transparent text-white shadow-md shadow-emerald-500/25"
                        : ""
                    )}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Show Fastest
                  </Button>
                </div>

                <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                  <AnimatePresence mode="wait">
                    {viewMode === "map" ? (
                      <motion.div
                        key="map"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                        style={{
                          transform: `scale(${zoom})`,
                          transformOrigin: "center center",
                          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                      >
                        <svg
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          className="absolute inset-0 w-full h-full"
                        >
                          <defs>
                            <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
                              <stop offset="35%" stopColor="#DBEAFE" stopOpacity="0.9" />
                              <stop offset="70%" stopColor="#CCFBF1" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id="mapBgDark" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#0C4A6E" stopOpacity="0.5" />
                              <stop offset="50%" stopColor="#1E3A5F" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#134E4A" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="parkGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.7" />
                            </linearGradient>
                            <pattern
                              id="roads"
                              width="6"
                              height="6"
                              patternUnits="userSpaceOnUse"
                            >
                              <line
                                x1="0"
                                y1="3"
                                x2="6"
                                y2="3"
                                stroke="#F8FAFC"
                                strokeWidth="0.15"
                                opacity="0.6"
                              />
                              <line
                                x1="3"
                                y1="0"
                                x2="3"
                                y2="6"
                                stroke="#F8FAFC"
                                strokeWidth="0.15"
                                opacity="0.6"
                              />
                            </pattern>
                            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="1" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="url(#mapBg)"
                            className="dark:hidden"
                          />
                          <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="url(#mapBgDark)"
                            className="hidden dark:block"
                          />
                          <rect x="0" y="0" width="100" height="100" fill="url(#roads)" />

                          <path
                            d="M-10,35 Q30,25 45,40 T110,35"
                            stroke="#F1F5F9"
                            strokeWidth="3.2"
                            fill="none"
                            strokeLinecap="round"
                            className="dark:stroke-slate-600/50"
                          />
                          <path
                            d="M-10,35 Q30,25 45,40 T110,35"
                            stroke="#FEF3C7"
                            strokeWidth="1.2"
                            strokeDasharray="1,1.2"
                            fill="none"
                            opacity="0.7"
                          />

                          <path
                            d="M30,-10 Q35,30 50,50 T55,110"
                            stroke="#F1F5F9"
                            strokeWidth="2.8"
                            fill="none"
                            strokeLinecap="round"
                            className="dark:stroke-slate-600/50"
                          />
                          <path
                            d="M30,-10 Q35,30 50,50 T55,110"
                            stroke="#FEF3C7"
                            strokeWidth="1"
                            strokeDasharray="1,1.2"
                            fill="none"
                            opacity="0.7"
                          />

                          <path
                            d="M-10,72 Q25,60 60,68 T110,75"
                            stroke="#F1F5F9"
                            strokeWidth="2.2"
                            fill="none"
                            strokeLinecap="round"
                            className="dark:stroke-slate-600/50"
                          />

                          <path
                            d="M75,-10 Q72,30 70,55 Q68,80 72,110"
                            stroke="#F8FAFC"
                            strokeWidth="1.6"
                            fill="none"
                            opacity="0.7"
                            strokeLinecap="round"
                            className="dark:stroke-slate-500/40"
                          />
                          <path
                            d="M5,-10 Q10,20 12,45 Q15,70 8,110"
                            stroke="#F8FAFC"
                            strokeWidth="1.6"
                            fill="none"
                            opacity="0.7"
                            strokeLinecap="round"
                            className="dark:stroke-slate-500/40"
                          />

                          <ellipse
                            cx="15"
                            cy="15"
                            rx="12"
                            ry="8"
                            fill="url(#parkGrad)"
                            className="dark:opacity-60"
                          />
                          <ellipse
                            cx="88"
                            cy="82"
                            rx="10"
                            ry="7"
                            fill="url(#parkGrad)"
                            className="dark:opacity-60"
                          />
                          <ellipse
                            cx="62"
                            cy="12"
                            rx="6"
                            ry="5"
                            fill="url(#parkGrad)"
                            className="dark:opacity-50"
                          />

                          <path
                            d="M-10,88 Q15,85 30,92 Q45,98 60,90 Q75,82 90,90 T110,86"
                            stroke="url(#waterGrad)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.8"
                          />

                          <g className="dark:opacity-50">
                            {[
                              [20, 50, 6, 5],
                              [40, 20, 5, 4],
                              [55, 78, 7, 4.5],
                              [70, 30, 5, 6],
                              [82, 45, 6, 5],
                              [25, 85, 5, 4],
                              [8, 58, 4, 3.5],
                            ].map(([x, y, w, h], i) => (
                              <rect
                                key={i}
                                x={(x as number) - ((w as number) / 2)}
                                y={(y as number) - ((h as number) / 2)}
                                width={w as number}
                                height={h as number}
                                rx="0.4"
                                fill="#E2E8F0"
                                stroke="#CBD5E1"
                                strokeWidth="0.15"
                                className="dark:fill-slate-700 dark:stroke-slate-600"
                              />
                            ))}
                          </g>
                        </svg>

                        {sortedElectricians.map((tech) => {
                          const eta = tech.eta;
                          const isSelected = selectedPin === tech.id;
                          const isFastest = showFastest && eta === sortedElectricians[0].eta;
                          return (
                            <ElectricianMarker
                              key={tech.id}
                              tech={tech}
                              x={tech.pin.x}
                              y={tech.pin.y}
                              color={tech.pin.color}
                              eta={eta}
                              isSelected={isSelected}
                              isFastest={isFastest}
                              onClick={() => setSelectedPin(tech.id)}
                            />
                          );
                        })}

                        <UserPin x={50} y={50} />

                        {selectedPin && (
                          <SelectedCallout
                            tech={sortedElectricians.find((e) => e.id === selectedPin)!}
                            onClose={() => setSelectedPin(null)}
                          />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-3 sm:p-4 overflow-y-auto no-scrollbar space-y-2.5"
                      >
                        {sortedElectricians.map((tech, i) => (
                          <CompactTechCard
                            key={tech.id}
                            tech={tech}
                            index={i}
                            eta={tech.eta}
                            selected={selectedPin === tech.id}
                            onClick={() => setSelectedPin(tech.id)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 p-1.5 rounded-xl glass-strong border-white/20 shadow-xl z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoom((z) => Math.min(z + 0.25, 2))}
                    className="w-9 h-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoom((z) => Math.max(z - 0.25, 0.6))}
                    className="w-9 h-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <div className="h-px bg-border/60 mx-1.5 my-0.5" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                    onClick={() => setZoom(1)}
                  >
                    <Crosshair className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 right-4 glass-strong rounded-xl p-3 text-[11px] space-y-2 z-10 border-white/20 shadow-xl max-w-[180px]">
                  <div className="font-bold text-xs mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    Legend
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-white shadow-md" />
                    <span className="text-muted-foreground">Your Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 ring-2 ring-white shadow-md" />
                    <span className="text-muted-foreground">Available Tech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 ring-2 ring-white shadow-md flex items-center justify-center">
                      <Zap className="w-2 h-2 text-white fill-white" />
                    </div>
                    <span className="text-muted-foreground">Fastest Arrival</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 shrink-0 rounded-full bg-slate-400/30 backdrop-blur-sm border-2 border-dashed border-slate-500/40" />
                    <span className="text-muted-foreground">Parks / Water</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Card className="glass-strong shadow-glass border-white/20 overflow-hidden">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary" />
                    <h4 className="font-bold text-sm">
                      {showFastest ? "Fastest Nearby" : "Nearby Electricians"}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-2 py-0.5 gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {sortedElectricians.length} Live
                  </Badge>
                </div>

                <div className="space-y-3 max-h-[540px] overflow-y-auto no-scrollbar pr-1">
                  {sortedElectricians.map((tech, idx) => (
                    <ElectricianInfoCard
                      key={tech.id}
                      tech={tech}
                      index={idx}
                      eta={tech.eta}
                      selected={selectedPin === tech.id}
                      onClick={() => {
                        setSelectedPin(tech.id);
                        setViewMode("map");
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function UserPin({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute z-30"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.8, 1], opacity: [0.5, 0, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/40"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0.4, 0, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/30"
        />
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary via-blue-600 to-secondary ring-[3px] ring-white shadow-2xl shadow-primary/60 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <svg
            viewBox="0 0 28 34"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2.5"
            fill="#0B5FFF"
          >
            <path d="M14 34 L0 14 Q14 0 28 14 Z" opacity="0" />
          </svg>
        </motion.div>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="px-2 py-1 rounded-lg glass text-[10px] font-bold shadow-md border-white/20 bg-white/80 dark:bg-black/60">
            <MapPin className="w-2.5 h-2.5 inline mr-1 text-primary" />
            You are here
          </div>
        </div>
      </div>
    </div>
  );
}

function ElectricianMarker({
  tech,
  x,
  y,
  color,
  eta,
  isSelected,
  isFastest,
  onClick,
}: {
  tech: (typeof electricians)[0];
  x: number;
  y: number;
  color: string;
  eta: number;
  isSelected: boolean;
  isFastest: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="absolute z-20 cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -100%)",
      }}
      onClick={onClick}
    >
      <motion.div
        animate={{
          x: [0, 1.5, -1, 0.5, 0],
          y: [0, -0.5, 0.8, -0.3, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {isFastest && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: [0, 1.9, 1], opacity: [0.7, 0, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-400/40"
              />
              <motion.div
                className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md border border-white"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Zap className="w-3 h-3 fill-white" />
              </motion.div>
            </>
          )}
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: [0, 1.6, 1], opacity: [0.6, 0, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full ring-2 ring-primary/40"
            />
          )}

          <motion.div
            animate={isSelected ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative"
          >
            <div
              className={cn(
                "relative w-11 h-11 rounded-full ring-[3px] ring-white shadow-xl flex items-center justify-center overflow-hidden",
                `bg-gradient-to-br ${color}`,
                isSelected && "ring-primary shadow-2xl scale-110"
              )}
            >
              <img
                src={tech.photo}
                alt={tech.name}
                className="w-full h-full object-cover relative z-10"
                loading="lazy"
              />
              {tech.verified && (
                <div className="absolute bottom-0 right-0 z-20 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center border border-white shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>

            <div
              className={cn(
                "absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[9px] font-black whitespace-nowrap shadow-lg border border-white",
                eta <= 10
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                  : eta <= 20
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                  : "bg-white/90 dark:bg-slate-800/90 text-foreground backdrop-blur-sm"
              )}
            >
              <Clock3 className="w-2 h-2 inline mr-0.5 -mt-0.5" />
              {eta} min
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SelectedCallout({
  tech,
  onClose,
}: {
  tech: (typeof electricians)[0] & { eta: number; pin: ElectricianPin };
  onClose: () => void;
}) {
  const etaPct = Math.min(100, ((35 - tech.eta) / 35) * 100);
  return (
    <div
      className="absolute z-40"
      style={{
        left: `${tech.pin.x}%`,
        top: `${tech.pin.y}%`,
        transform: "translate(-50%, -100%) translateY(-60px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -5, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-56 sm:w-64 glass-strong rounded-2xl shadow-2xl border-white/30 p-3 sm:p-3.5 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-muted/70 hover:bg-rose-500 hover:text-white flex items-center justify-center text-muted-foreground transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2 L10 10 M10 2 L2 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="flex items-start gap-2.5">
          <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white shadow-md shrink-0">
            <img src={tech.photo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 pr-5">
            <div className="flex items-center gap-1">
              <h5 className="font-bold text-xs truncate">{tech.name}</h5>
              {tech.verified && (
                <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mt-0.5">
              <Star className="w-2.5 h-2.5 fill-current" />
              {formatRating(tech.rating)}{" "}
              <span className="text-muted-foreground font-normal">
                ({tech.reviews})
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-primary" />
              {tech.distance} · {formatCurrency(tech.priceHour)}/hr
            </div>
          </div>
        </div>
        <div className="mt-2.5 pt-2.5 border-t border-border/50">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="font-semibold text-muted-foreground flex items-center gap-1">
              <Clock3 className="w-2.5 h-2.5 text-emerald-500" />
              ETA to you
            </span>
            <span className="font-black text-emerald-500">{tech.eta} min</span>
          </div>
          <Progress
            value={etaPct}
            className="h-1.5"
            indicatorClassName={cn(
              etaPct > 70
                ? "from-emerald-500 to-green-500"
                : etaPct > 40
                ? "from-amber-400 to-orange-500"
                : "from-rose-500 to-red-500"
            )}
          />
        </div>
        <Button
          size="sm"
          className="mt-2.5 w-full h-8 text-xs gap-1 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-md shadow-primary/25 bg-[length:200%_auto] animate-gradient-shift"
        >
          <Eye className="w-3 h-3" />
          View Profile
        </Button>
      </motion.div>
    </div>
  );
}

function ElectricianInfoCard({
  tech,
  index,
  eta,
  selected,
  onClick,
}: {
  tech: (typeof electricians)[0];
  index: number;
  eta: number;
  selected: boolean;
  onClick: () => void;
}) {
  const etaPct = Math.min(100, ((35 - eta) / 35) * 100);
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -2, x: 3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 overflow-hidden",
        selected
          ? "border-primary/50 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent shadow-xl shadow-primary/15 ring-1 ring-primary/20"
          : "border-border/60 bg-background/40 hover:border-primary/30 hover:bg-background/70 hover:shadow-md"
      )}
    >
      {index === 0 && showFastest && (
        <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl-xl rounded-tr-xl bg-gradient-to-r from-amber-400 to-orange-500 text-[9px] font-black text-white shadow-md">
          <Zap className="w-2.5 h-2.5 inline mr-0.5 fill-white" />
          FASTEST
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-border/60 shadow-md">
            <img
              src={tech.photo}
              alt={tech.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {tech.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md border-2 border-background">
              <CheckCircle2 className="w-3 h-3 stroke-[3]" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <div>
              <div className="flex items-center gap-1.5">
                <h5 className="font-bold text-sm tracking-tight truncate">
                  {tech.name}
                </h5>
                <Badge
                  variant="outline"
                  className="text-[9px] px-1.5 py-0 h-4 gap-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                >
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {formatRating(tech.rating)}
                </Badge>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <User className="w-2.5 h-2.5" />
                  {tech.completed}+ jobs
                </span>
                <span>·</span>
                <span>{tech.experience}</span>
              </div>
            </div>
            <motion.div
              animate={
                eta <= 10
                  ? { scale: [1, 1.08, 1] }
                  : {}
              }
              transition={{ duration: 1.4, repeat: Infinity }}
              className={cn(
                "shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md",
                eta <= 10
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/30"
                  : eta <= 20
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-amber-500/25"
                  : "bg-muted text-foreground"
              )}
            >
              <Clock3 className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />
              {eta} min
            </motion.div>
          </div>

          <div className="mt-2 mb-2.5">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="text-muted-foreground font-medium">
                Live arrival progress
              </span>
              <span className="text-muted-foreground">
                {tech.distance} away
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-muted/80 overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${etaPct}%`,
                  background:
                    etaPct > 70
                      ? "linear-gradient(90deg,#10b981,#22c55e)"
                      : etaPct > 40
                      ? "linear-gradient(90deg,#f59e0b,#f97316)"
                      : "linear-gradient(90deg,#f43f5e,#ef4444)",
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-2 h-full bg-white/60 rounded-r-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white shadow-md border-2 flex items-center justify-center"
                  style={{
                    borderColor:
                      etaPct > 70
                        ? "#10b981"
                        : etaPct > 40
                        ? "#f59e0b"
                        : "#f43f5e",
                  }}
                >
                  <Navigation
                    className="w-2.5 h-2.5"
                    style={{
                      color:
                        etaPct > 70
                          ? "#10b981"
                          : etaPct > 40
                          ? "#f59e0b"
                          : "#f43f5e",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40">
            <div className="flex items-center gap-1 flex-wrap min-w-0">
              {tech.skills.slice(0, 2).map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="text-[9px] px-1.5 py-0.5 h-4 bg-primary/5 border-primary/15 text-primary/80 truncate"
                >
                  {s}
                </Badge>
              ))}
              {tech.skills.length > 2 && (
                <span className="text-[9px] text-muted-foreground font-bold">
                  +{tech.skills.length - 2}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground leading-none">
                  Rate
                </div>
                <div className="font-black text-sm text-gradient tracking-tight leading-tight">
                  {formatCurrency(tech.priceHour)}
                </div>
              </div>
              <Button
                size="sm"
                className={cn(
                  "h-8 rounded-xl text-[11px] px-3 gap-1 shadow-md",
                  selected
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-transparent shadow-emerald-500/25"
                    : "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-primary/25 bg-[length:200%_auto] animate-gradient-shift"
                )}
              >
                {selected ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Picked
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    View
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function CompactTechCard({
  tech,
  index,
  eta,
  selected,
  onClick,
}: {
  tech: (typeof electricians)[0] & { pin: ElectricianPin };
  index: number;
  eta: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={cn(
        "relative w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-3",
        selected
          ? "border-primary/50 bg-gradient-to-r from-primary/10 to-cyan-500/5 shadow-md shadow-primary/15"
          : "border-border/50 bg-background/50 hover:border-primary/30 hover:bg-background/80"
      )}
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 ring-2 ring-border/50">
        <img
          src={tech.photo}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h5 className="font-bold text-xs truncate">{tech.name}</h5>
          <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-current" />
            {formatRating(tech.rating)}
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground">
          {tech.distance} · {formatCurrency(tech.priceHour)}/hr
        </div>
      </div>
      <Badge
        variant="default"
        className={cn(
          "text-[10px] px-2 py-0.5 h-5 shadow-sm",
          eta <= 10
            ? "bg-gradient-to-r from-emerald-500 to-green-600"
            : eta <= 20
            ? "bg-gradient-to-r from-amber-400 to-orange-500"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Clock3 className="w-2.5 h-2.5" />
        {eta}m
      </Badge>
    </motion.button>
  );
}
