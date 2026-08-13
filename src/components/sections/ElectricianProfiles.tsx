"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  Search,
  Heart,
  Star,
  MapPin,
  CheckCircle2,
  Award,
  Clock,
  Briefcase,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Users,
  Award as AwardIcon,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Filter,
} from "lucide-react";
import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn, electricians, formatCurrency, formatRating } from "@/lib/utils";

const skillFilters = [
  "Smart Home",
  "EV Chargers",
  "Rewiring",
  "Solar",
  "Emergency",
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "nearest", label: "Nearest" },
  { value: "rating", label: "Rating" },
  { value: "price", label: "Price low-high" },
  { value: "experience", label: "Experience" },
];

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  inView: boolean;
}

function StatCounter({ end, label, suffix = "", icon: Icon, inView }: StatCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-cyan-500/10 to-amber-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass rounded-2xl p-5 sm:p-6 shadow-glass border border-white/10">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-cyan-500/15 border border-primary/20 flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-cyan-500 transition-all duration-500">
            <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
              {inView ? (
                <CountUp end={end} duration={2} suffix={suffix} />
              ) : (
                <span>0{suffix}</span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              {label}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ElectricianCardProps {
  electrician: typeof electricians[0];
  index: number;
}

function ElectricianCard({ electrician, index }: ElectricianCardProps) {
  const [favorited, setFavorited] = useState(false);
  const extraSkills = electrician.skills.length > 3 ? electrician.skills.length - 3 : 0;
  const displayedSkills = electrician.skills.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 via-cyan-500/30 to-amber-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 -z-10 group-hover:-translate-y-2" />
      <Card className="relative h-full overflow-hidden bg-card/80 backdrop-blur-sm border-border/60 group-hover:border-primary/30 transition-all duration-500">
        <div
          className="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,95,255,0.5) 0%, rgba(0,194,255,0.4) 50%, rgba(255,193,7,0.4) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={electrician.photo}
            alt={electrician.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {electrician.verified && (
            <div className="absolute top-3 left-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 backdrop-blur-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>PLN Certified & Background Checked</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setFavorited(!favorited);
            }}
            className={cn(
              "absolute top-3 right-12 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg",
              favorited
                ? "bg-rose-500 text-white scale-110 shadow-rose-500/40"
                : "bg-white/80 text-muted-foreground hover:bg-white hover:text-rose-500 hover:scale-105"
            )}
          >
            <Heart className={cn("w-4 h-4", favorited && "fill-current")} />
          </button>

          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm border-0 text-foreground font-semibold shadow-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {electrician.distance}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                {electrician.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5 bg-amber-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-xs font-bold text-white">
                    {formatRating(electrician.rating)}
                  </span>
                </div>
                <span className="text-xs text-white/80 font-medium">
                  ({electrician.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
            <Badge variant="info" className="bg-primary/90 backdrop-blur-sm border-0 text-white font-semibold shadow-sm">
              <AwardIcon className="w-3 h-3 mr-1" />
              {electrician.experience}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-muted/60 border border-border/50">
              <Briefcase className="w-4 h-4 mx-auto mb-1 text-primary" />
              <div className="text-sm sm:text-base font-bold">{electrician.completed.toLocaleString()}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Jobs Done</div>
            </div>
            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-muted/60 border border-border/50">
              <Clock className="w-4 h-4 mx-auto mb-1 text-cyan-500" />
              <div className="text-sm sm:text-base font-bold">{electrician.responseTime}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Response</div>
            </div>
            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-muted/60 border border-border/50">
              <DollarSign className="w-4 h-4 mx-auto mb-1 text-amber-500" />
              <div className="text-sm sm:text-base font-bold">{formatCurrency(electrician.priceHour).replace(",00", "")}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Per Hour</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {displayedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs font-medium border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                  {skill}
                </Badge>
              ))}
              {extraSkills > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-xs font-medium border-border bg-muted/50 cursor-help">
                        +{extraSkills} more
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {electrician.skills.slice(3).map((s) => (
                          <div key={s} className="text-xs font-medium">{s}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {electrician.certificates.map((cert) => (
                <TooltipProvider key={cert}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border-amber-800/40 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                        <Award className="w-3 h-3" />
                        {cert}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Official Certification: {cert}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-medium mr-1">Languages:</span>
              {electrician.languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="text-[10px] px-2 py-0.5 font-bold bg-slate-100 dark:bg-slate-800/60 border-0">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-xl font-semibold group/btn border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              View Profile
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              size="sm"
              className="flex-1 rounded-xl font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all bg-[length:200%_auto] animate-gradient-shift btn-ripple"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ElectricianProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [statsInView, setStatsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredElectricians = electricians.filter((e) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.some((f) =>
        e.skills.some((s) => s.toLowerCase().includes(f.toLowerCase()))
      );
    return matchesSearch && matchesFilter;
  });

  return (
    <TooltipProvider>
      <section
        ref={sectionRef}
        id="electricians"
        className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/8 via-primary/5 to-transparent rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

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
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">Certified & Vetted</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
              Meet Our{" "}
              <span className="text-gradient block sm:inline">Certified Electricians</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked, PLN-certified technicians with verified backgrounds,
              years of experience, and thousands of successful jobs in your area.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14"
          >
            <StatCounter end={500} label="Verified Techs" suffix="+" icon={Users} inView={statsInView} />
            <StatCounter end={12} label="Avg Years Experience" icon={Award} inView={statsInView} />
            <StatCounter end={98} label="Verified Rating" suffix="%" icon={ShieldCheck} inView={statsInView} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-3xl p-4 sm:p-5 lg:p-6 shadow-glass border-white/10 mb-8 sm:mb-10"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search electrician name or skill (e.g., 'smart home', 'solar')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 rounded-xl bg-background/70 border-border/60 hover:border-primary/20 focus:border-primary/40 transition-all"
                />
              </div>

              <div className="w-full lg:w-56">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 rounded-xl bg-background/70 border-border/60 hover:border-primary/20">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border/40">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Filter by expertise
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillFilters.map((filter) => {
                  const isActive = activeFilters.includes(filter);
                  return (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleFilter(filter)}
                      className={cn(
                        "relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300",
                        isActive
                          ? "text-white shadow-lg shadow-primary/25 bg-[length:200%_auto] animate-gradient-shift"
                          : "text-foreground/80 hover:text-foreground bg-background/70 border border-border/60 hover:border-primary/25 hover:bg-primary/5"
                      )}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
                      )}
                      <span className="relative">{filter}</span>
                    </motion.button>
                  );
                })}
                {activeFilters.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveFilters([])}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-destructive bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-all"
                  >
                    Clear all
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="min-h-[500px]">
            {filteredElectricians.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredElectricians.map((electrician, index) => (
                    <ElectricianCard
                      key={electrician.id}
                      electrician={electrician}
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
                    <Users className="w-10 h-10 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  No electricians match your filters
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5">
                  Try adjusting your search or clearing some filters to see more technicians.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveFilters([]);
                    setSearchQuery("");
                  }}
                  className="rounded-xl"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 sm:mt-14 text-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 rounded-2xl font-semibold border-border/80 hover:border-primary/40 hover:bg-primary/5 text-base group/btn shadow-lg transition-all"
            >
              Load More Electricians
              <ChevronDown className="w-5 h-5 ml-2 group-hover/btn:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
}
