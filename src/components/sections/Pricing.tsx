"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  ShieldCheck,
  Tag,
  Wrench,
  Zap,
  Calculator,
  CalendarClock,
  Moon,
  Car,
  ArrowRight,
  CheckCircle2,
  Info,
  Star,
  Sparkles,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { cn, pricingData, formatCurrency } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface PricingItem {
  name: string;
  price: number | string;
  duration: string;
  details: string[];
}

const mostBookedMap: Record<string, string[]> = {
  Inspection: ["Comprehensive Inspection"],
  Installation: ["Smart Switch (per unit)", "Ceiling Fan"],
  Repair: ["Power Outage Diagnosis"],
  "Emergency & Premium": ["24/7 Emergency Callout"],
};

const categoryIcons: Record<string, LucideIcon> = {
  Inspection: ClipboardCheck,
  Installation: Wrench,
  Repair: Zap,
  "Emergency & Premium": ShieldCheck,
};

function categoryTotal(category: PricingItem[]): number {
  return category.reduce((sum, item) => {
    const p = typeof item.price === "number" ? item.price : 0;
    return sum + p;
  }, 0);
}

interface RowProps {
  item: PricingItem;
  index: number;
  isMostBooked: boolean;
  selected: boolean;
  onToggleSelect: (name: string, price: number | string) => void;
}

function PricingRow({ item, index, isMostBooked, selected, onToggleSelect }: RowProps) {
  const [expanded, setExpanded] = useState(false);
  const priceNum = typeof item.price === "number" ? item.price : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      className="relative"
    >
      <div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none",
          isMostBooked && "opacity-100"
        )}
        style={{
          background:
            "linear-gradient(135deg, rgba(11,95,255,0.6) 0%, rgba(0,194,255,0.6) 50%, rgba(255,193,7,0.6) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
          transform: "translateZ(0)",
          border: "2px solid transparent",
        }}
      />
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative glass rounded-2xl shadow-glass overflow-hidden transition-all duration-300",
          isMostBooked && "ring-2 ring-primary/30 shadow-lift"
        )}
      >
        <button
          onClick={() => {
            setExpanded((e) => !e);
            if (!selected && typeof item.price === "number") {
              onToggleSelect(item.name, item.price);
            } else if (selected) {
              onToggleSelect(item.name, 0);
            }
          }}
          className="w-full text-left"
        >
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <div
                className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300",
                  selected
                    ? "bg-gradient-to-br from-primary to-cyan-500 border-transparent shadow-lg shadow-primary/30"
                    : "border-muted-foreground/30 hover:border-primary/50"
                )}
              >
                {selected && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h3 className="text-sm sm:text-base font-bold tracking-tight truncate">
                  {item.name}
                </h3>
                {isMostBooked && (
                  <Badge variant="default" className="gap-1 text-[10px] sm:text-xs py-0.5 animate-gradient-shift bg-[length:200%_auto]">
                    <Star className="w-3 h-3 fill-white" />
                    Most Booked
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{item.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="text-right">
                <div className="text-sm sm:text-xs text-muted-foreground font-medium">
                  {typeof item.price === "number" ? "From" : ""}
                </div>
                <div className={cn(
                  "text-base sm:text-lg font-black tracking-tight",
                  isMostBooked
                    ? "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent"
                    : "text-foreground"
                )}>
                  {typeof item.price === "number" ? formatCurrency(item.price) : item.price}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted/70 flex items-center justify-center shrink-0"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                <div className="border-t border-border/40 pt-4">
                  <div className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                    What&apos;s included
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {item.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const infoBadges = [
  {
    icon: ShieldCheck,
    title: "90-Day Guarantee",
    desc: "Workmanship warranty on all services",
    color: "from-emerald-500 to-teal-500",
    bg: "from-emerald-500/15 to-teal-500/15",
  },
  {
    icon: Tag,
    title: "Price Match Promise",
    desc: "Beat any written quote by 10%",
    color: "from-primary to-cyan-500",
    bg: "from-primary/15 to-cyan-500/15",
  },
  {
    icon: Wrench,
    title: "Parts Warranty",
    desc: "Full manufacturer warranty honored",
    color: "from-amber-400 to-orange-500",
    bg: "from-amber-400/15 to-orange-500/15",
  },
];

const footnotes = [
  {
    q: "What does the service fee cover?",
    a: "The flat service fee includes: technician dispatch, full diagnosis of the issue, a detailed written quote, and cleanup of the work area. If you proceed with the recommended repair, the service fee is deducted from your final invoice.",
  },
  {
    q: "How are parts priced?",
    a: "Standard replacement parts (outlets, switches, bulbs, breakers up to 63A) are stocked in our vans and billed at retail cost + 10% handling. Specialty parts (smart devices, EV chargers, fixtures) can be supplied by you or purchased through VoltCare — you always choose. Parts receipts are always provided.",
  },
  {
    q: "What if the job takes longer than estimated?",
    a: "For fixed-price services, you pay exactly the quoted price regardless of actual time spent. For time-and-materials work (complex diagnostics, major repairs), we cap charges at 120% of the estimate without written approval — you'll always be contacted before exceeding the quote.",
  },
  {
    q: "Is there a minimum call-out charge?",
    a: "No! Unlike many services, we don't have a mandatory minimum. If we arrive and the issue is a simple 5-minute fix, you only pay the standard 30-min diagnostic fee. That's our No Ripoff Guarantee.",
  },
  {
    q: "Which payment methods are accepted onsite?",
    a: "All technicians carry mobile POS terminals and accept: Visa/Mastercard/Amex/JCB, GoPay/OVO/DANA/ShopeePay e-wallets, and cash with printed receipt. Bank transfer is available with QRIS. Installments via Kredivo/Traveloka PayLater for orders above Rp 1M.",
  },
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState("Inspection");
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [urgency, setUrgency] = useState(false);
  const [nightWeekend, setNightWeekend] = useState(false);
  const [travelKm, setTravelKm] = useState(7);

  const toggleSelect = (name: string, price: number | string) => {
    setSelectedServices((prev) => {
      const next = { ...prev };
      if (typeof price !== "number" || price === 0) {
        delete next[name];
        return next;
      }
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = price;
      }
      return next;
    });
  };

  const calculations = useMemo(() => {
    const subtotal = Object.values(selectedServices).reduce((a, b) => a + b, 0);
    const urgencyFee = urgency ? Math.round(subtotal * 0.25) : 0;
    const nightFee = nightWeekend ? Math.round(subtotal * 0.3) : 0;
    const extraKm = Math.max(0, travelKm - 5);
    const travelFee = Math.min(extraKm * 15000, 150000);
    const total = subtotal + urgencyFee + nightFee + travelFee;
    return { subtotal, urgencyFee, nightFee, travelFee, total };
  }, [selectedServices, urgency, nightWeekend, travelKm]);

  const selectedCount = Object.keys(selectedServices).length;

  return (
    <section id="pricing" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/8 via-cyan-500/6 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/6 via-primary/4 to-transparent rounded-full blur-[120px] pointer-events-none" />
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
            <span className="text-muted-foreground">Upfront Pricing</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            Transparent Pricing,{" "}
            <span className="text-gradient block sm:inline">No Surprises</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every price is shown before you book. No hidden fees, no
            mysterious add-ons, no last-minute upsells. Select services to
            build your instant estimate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          {infoBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <Card className="glass overflow-hidden h-full border-0 shadow-glass">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={cn(
                        "relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br shadow-lg",
                        badge.bg,
                      )}>
                        <div className={cn(
                          "absolute inset-0 rounded-xl bg-gradient-to-br opacity-15",
                          badge.color
                        )} />
                        <Icon className={cn(
                          "w-5.5 h-5.5 sm:w-6 sm:h-6 relative bg-gradient-to-br bg-clip-text",
                          "text-transparent"
                        )}
                          style={{
                            backgroundImage: badge.color.includes("emerald")
                              ? "linear-gradient(135deg,#10b981,#14b8a6)"
                              : badge.color.includes("amber")
                                ? "linear-gradient(135deg,#f59e0b,#f97316)"
                                : "linear-gradient(135deg,#0B5FFF,#00C2FF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold mb-1">{badge.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{badge.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 xl:gap-10">
          <div className="min-w-0 order-2 lg:order-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                  {pricingData.map((cat) => {
                    const Icon = categoryIcons[cat.category];
                    const isActive = activeTab === cat.category;
                    return (
                      <TabsTrigger
                        key={cat.category}
                        value={cat.category}
                        className={cn(
                          "flex-shrink-0 !rounded-xl !px-4 sm:!px-5 gap-2",
                          isActive && "!bg-gradient-to-r !from-primary !via-blue-600 !to-cyan-500 !text-white !shadow-xl !shadow-primary/30 animate-gradient-shift bg-[length:200%_auto]"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{cat.category}</span>
                      </TabsTrigger>
                    );
                  })}
                </div>
              </motion.div>

              {pricingData.map((cat) => (
                <TabsContent key={cat.category} value={cat.category} className="!mt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between mb-4 sm:mb-5"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                        {cat.category} Services
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        From {formatCurrency(Math.min(...cat.items.map(i => typeof i.price === "number" ? i.price : Infinity)))}
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1.5 text-[11px] sm:text-xs">
                      <Calculator className="w-3 h-3" />
                      {cat.items.length} services
                    </Badge>
                  </motion.div>

                  <div className="space-y-3 sm:space-y-3.5">
                    {cat.items.map((item, idx) => (
                      <PricingRow
                        key={item.name}
                        item={item}
                        index={idx}
                        isMostBooked={mostBookedMap[cat.category]?.includes(item.name) ?? false}
                        selected={!!selectedServices[item.name]}
                        onToggleSelect={toggleSelect}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 sm:mt-14"
            >
              <div className="flex items-center gap-2 mb-5 sm:mb-6">
                <Info className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-primary" />
                <h3 className="text-base sm:text-lg font-bold tracking-tight">
                  Pricing FAQs — What&apos;s included
                </h3>
              </div>
              <Accordion type="single" collapsible className="!space-y-2.5 sm:!space-y-3">
                {footnotes.map((fn, i) => (
                  <AccordionItem key={fn.q} value={`footnote-${i}`}>
                    <AccordionTrigger className="!py-4 !text-sm sm:!text-base font-semibold">
                      {fn.q}
                    </AccordionTrigger>
                    <AccordionContent className="!pb-5 leading-relaxed">
                      {fn.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-cyan-500/25 to-amber-500/30 blur-xl opacity-60 animate-pulse-slow pointer-events-none" />
                <Card className="relative glass-strong shadow-lift overflow-hidden border-0">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-500 to-amber-500 animate-gradient-shift bg-[length:200%_auto]" />
                  <CardContent className="p-5 sm:p-6 lg:p-7">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan-500/15 flex items-center justify-center">
                        <Calculator className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight">
                          Booking Estimator
                        </h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          Live price calculator
                        </p>
                      </div>
                      {selectedCount > 0 && (
                        <Badge variant="success" className="text-[10px] sm:text-xs py-0.5 gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {selectedCount}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
                      <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-muted/40 border border-border/50">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary shrink-0" />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold leading-tight">Services</div>
                            <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                              {selectedCount === 0 ? "Click services to add" : `${selectedCount} selected`}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-bold tracking-tight">
                          {formatCurrency(calculations.subtotal)}
                        </div>
                      </div>

                      {selectedCount > 0 && (
                        <div className="max-h-32 overflow-y-auto no-scrollbar space-y-1.5 pr-1">
                          {Object.entries(selectedServices).map(([name, price]) => (
                            <div key={name} className="flex items-center justify-between text-xs sm:text-sm pl-1">
                              <span className="text-muted-foreground truncate pr-2">{name}</span>
                              <span className="font-semibold shrink-0">{formatCurrency(price)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="h-px bg-border/60 my-1" />

                      <div className="flex items-center justify-between gap-3 px-0.5">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <CalendarClock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-semibold leading-tight">Urgent Dispatch</div>
                            <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                              +25% fee, priority queue
                            </div>
                          </div>
                        </div>
                        <Switch checked={urgency} onCheckedChange={setUrgency} />
                      </div>
                      {urgency && calculations.urgencyFee > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between pl-6 text-xs sm:text-sm"
                        >
                          <span className="text-amber-600 dark:text-amber-400">Urgency surcharge</span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400">
                            +{formatCurrency(calculations.urgencyFee)}
                          </span>
                        </motion.div>
                      )}

                      <div className="flex items-center justify-between gap-3 px-0.5">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-500 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-semibold leading-tight">Night / Weekend</div>
                            <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                              18:00–08:00, Sat-Sun/holiday
                            </div>
                          </div>
                        </div>
                        <Switch checked={nightWeekend} onCheckedChange={setNightWeekend} />
                      </div>
                      {nightWeekend && calculations.nightFee > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex items-center justify-between pl-6 text-xs sm:text-sm"
                        >
                          <span className="text-indigo-600 dark:text-indigo-400">After-hours surcharge</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            +{formatCurrency(calculations.nightFee)}
                          </span>
                        </motion.div>
                      )}

                      <div className="pt-1">
                        <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-rose-500 shrink-0" />
                            <div>
                              <div className="text-xs sm:text-sm font-semibold leading-tight">Travel Distance</div>
                              <div className="text-[10px] sm:text-[11px] text-muted-foreground">
                                First 5km included · capped Rp 150K
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-bold">{travelKm} km</div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={travelKm}
                          onChange={(e) => setTravelKm(Number(e.target.value))}
                          className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer accent-primary"
                          style={{
                            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((travelKm) / 30) * 100}%, hsl(var(--muted)) ${((travelKm) / 30) * 100}%, hsl(var(--muted)) 100%)`,
                          }}
                        />
                        <div className="flex justify-between mt-1.5 text-[10px] sm:text-[11px] text-muted-foreground px-0.5">
                          <span>0 km</span>
                          <span>5 km free</span>
                          <span>30 km</span>
                        </div>
                      </div>
                      {calculations.travelFee > 0 && (
                        <div className="flex items-center justify-between pl-6 text-xs sm:text-sm">
                          <span className="text-rose-600 dark:text-rose-400">Travel fee ({Math.max(0, travelKm - 5)} km × Rp 15K)</span>
                          <span className="font-semibold text-rose-600 dark:text-rose-400">
                            +{formatCurrency(calculations.travelFee)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5 sm:mb-6" />

                    <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground font-medium mb-0.5">
                          Total Estimate
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-muted-foreground/80">
                          Final price confirmed onsite
                        </div>
                      </div>
                      <motion.div
                        key={calculations.total}
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-right"
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                          {formatCurrency(calculations.total)}
                        </div>
                      </motion.div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={selectedCount === 0}
                      className={cn(
                        "relative w-full inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold text-white transition-all duration-300 btn-ripple",
                        selectedCount === 0
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 bg-[length:200%_auto] animate-gradient-shift"
                      )}
                    >
                      <Zap className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-white shrink-0" />
                      <span>{selectedCount === 0 ? "Select services above" : "Book Now"}</span>
                      {selectedCount > 0 && <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />}
                      {selectedCount > 0 && (
                        <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none opacity-60" />
                      )}
                    </motion.button>

                    <p className="text-[10px] sm:text-[11px] text-center text-muted-foreground mt-3 sm:mt-3.5 leading-relaxed">
                      Free cancellation up to 2 hrs before ·
                      <br className="sm:hidden" />
                      No charge if we can&apos;t fix it
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
