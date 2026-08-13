"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BadgeCheck,
  Quote,
  MessageSquare,
  Users,
  ThumbsUp,
  Images,
  type LucideIcon,
  Zap,
  Home,
  Wrench,
} from "lucide-react";
import { cn, reviews, formatRating } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/providers/motion";

type FilterKey =
  | "All"
  | "5★"
  | "4★"
  | "Smart Home"
  | "Emergency"
  | "Installation";

const filterChips: { key: FilterKey; icon?: LucideIcon }[] = [
  { key: "All", icon: MessageSquare },
  { key: "5★", icon: Star },
  { key: "4★", icon: Star },
  { key: "Smart Home", icon: Home },
  { key: "Emergency", icon: Zap },
  { key: "Installation", icon: Wrench },
];

function categorizeJob(job: string): "Smart Home" | "Emergency" | "Installation" {
  const j = job.toLowerCase();
  if (j.includes("smart")) return "Smart Home";
  if (j.includes("emergency") || j.includes("outage")) return "Emergency";
  return "Installation";
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "transition-all duration-300",
            i < Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/20 fill-muted-foreground/10"
          )}
          style={{ width: size, height: size }}
          strokeWidth={2.2}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number];
}) {
  const category = categorizeJob(review.job);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border border-border/60 bg-card/70 hover:border-primary/30 hover:shadow-lift transition-all duration-500 backdrop-blur-sm">
        <div className="absolute top-6 right-6 opacity-5 pointer-events-none">
          <Quote className="w-20 h-20 text-primary" />
        </div>

        <CardContent className="p-6 sm:p-7 relative">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-primary/20 shadow-md">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {review.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-md"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold tracking-tight leading-none text-base">
                    {review.name}
                  </h4>
                  {review.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className="text-[11px] h-5 px-2 font-medium">
                    {review.job}
                  </Badge>
                  <Badge
                    variant={
                      category === "Emergency"
                        ? "danger"
                        : category === "Smart Home"
                        ? "info"
                        : "outline"
                    }
                    className="text-[10px] h-5 px-2"
                  >
                    {category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-right">
              <Stars rating={review.rating} />
              <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">
                {review.date}
              </p>
            </div>
          </div>

          <div className="relative mb-5">
            <Quote className="absolute -top-2 -left-1 w-5 h-5 text-primary/20" />
            <p className="text-sm leading-relaxed text-foreground/85 pl-4 font-medium">
              {review.comment}
            </p>
          </div>

          {review.photos && review.photos.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Images className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Job photos
                </span>
              </div>
              <div className="flex gap-2.5">
                {review.photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="relative group flex-shrink-0"
                  >
                    <img
                      src={photo}
                      alt={`Job photo ${i + 1}`}
                      className="w-28 h-20 object-cover rounded-xl border border-border/60 shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <span className="text-[10px] text-white font-semibold">
                        View full
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <Badge variant="success" className="shadow-sm text-[11px] h-6 px-2.5">
              <CheckCircle2 className="w-3 h-3" />
              Verified Order
            </Badge>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Helpful</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  iconBg,
  delay,
}: {
  icon: LucideIcon;
  value: number | string;
  suffix?: string;
  label: string;
  iconBg: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-strong rounded-2xl p-5 sm:p-6 shadow-lift relative overflow-hidden group"
    >
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      <div className="relative flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={cn(
            "flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg",
            iconBg
          )}
        >
          <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white" />
        </motion.div>
        <div className="min-w-0">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none">
            {value}
            {suffix && (
              <span className="text-primary font-bold text-lg sm:text-xl ml-0.5">
                {suffix}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CustomerReviews() {
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("All");

  const autoplayRef = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const filteredReviews = React.useMemo(() => {
    return reviews.filter((r) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "5★") return r.rating === 5;
      if (activeFilter === "4★") return r.rating === 4;
      return categorizeJob(r.job) === activeFilter;
    });
  }, [activeFilter]);

  return (
    <section
      id="customer-reviews"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] via-transparent to-primary/[0.03]" />
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <Badge variant="warning" className="mb-5 px-5 py-1.5 text-sm shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Rated #1 Electrical Service Platform
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
            Loved by{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              50,000+ Homeowners
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Real stories from real homes. Every review is tied to a verified job
            completed by our certified electricians — no fake reviews, ever.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mb-12 sm:mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            <StatCard
              icon={Star}
              value={formatRating(4.9)}
              suffix="/5"
              label="Overall Rating (12,847 reviews)"
              iconBg="bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25"
              delay={0}
            />
            <StatCard
              icon={MessageSquare}
              value={12847}
              suffix="+"
              label="Total Verified Reviews"
              iconBg="bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/25"
              delay={0.1}
            />
            <StatCard
              icon={Users}
              value={98}
              suffix="%"
              label="Would Recommend VoltCare"
              iconBg="bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/25"
              delay={0.2}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip.key;
              const Icon = chip.icon;
              return (
                <motion.button
                  key={chip.key}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveFilter(chip.key)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-lg shadow-primary/30 scale-105"
                      : "glass text-muted-foreground hover:text-foreground hover:bg-primary/5 border border-border/50"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "w-3.5 h-3.5 sm:w-4 sm:h-4",
                        isActive && "fill-white/20"
                      )}
                    />
                  )}
                  {chip.key}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {filteredReviews.length > 0
                ? filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0 min-w-0 sm:min-w-[50%] lg:min-w-[33.333%] px-2.5 sm:px-3"
                    >
                      <div className="px-1">
                        <ReviewCard review={review} />
                      </div>
                    </div>
                  ))
                : reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0 min-w-0 sm:min-w-[50%] lg:min-w-[33.333%] px-2.5 sm:px-3"
                    >
                      <div className="px-1">
                        <ReviewCard review={review} />
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={scrollPrev}
                aria-label="Previous review"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl glass-strong border border-border/60 flex items-center justify-center shadow-md hover:shadow-lift hover:border-primary/40 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={scrollNext}
                aria-label="Next review"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl glass-strong border border-border/60 flex items-center justify-center shadow-md hover:shadow-lift hover:border-primary/40 transition-all duration-300 group bg-gradient-to-br from-primary/5 to-cyan-500/5"
              >
                <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </motion.button>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground ml-1 sm:ml-2">
                <span className="text-foreground font-bold">
                  {selectedIndex + 1}
                </span>{" "}
                / {Math.max(scrollSnaps.length, 1)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "w-8 h-3 bg-gradient-to-r from-primary to-cyan-500 shadow-md shadow-primary/30"
                      : "w-3 h-3 bg-muted hover:bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto h-11 px-5 border-2 border-border/60 hover:border-primary/40"
            >
              <MessageSquare className="w-4 h-4" />
              Read All 12,847 Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
