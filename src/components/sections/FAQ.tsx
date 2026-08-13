"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  Phone,
  MessageSquare,
  Sparkles,
  CalendarDays,
  CreditCard,
  Users,
  ShieldAlert,
  Wallet,
  UserCircle2,
  Building2,
  Wrench,
  ChevronDown,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn, faqs } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  { name: "All", value: "All", icon: HelpCircle },
  { name: "Booking", value: "Booking", icon: CalendarDays },
  { name: "Pricing", value: "Pricing", icon: CreditCard },
  { name: "Technicians", value: "Technicians", icon: Users },
  { name: "Safety", value: "Safety", icon: ShieldAlert },
  { name: "Payment", value: "Payment", icon: Wallet },
  { name: "Account", value: "Account", icon: UserCircle2 },
  { name: "Business", value: "Business", icon: Building2 },
  { name: "DIY", value: "DIY", icon: Wrench },
];

const faqCategoryMap: Record<number, string> = {
  0: "Booking",
  1: "Technicians",
  2: "Account",
  3: "Pricing",
  4: "Booking",
  5: "Pricing",
  6: "Payment",
  7: "Booking",
  8: "Pricing",
  9: "Technicians",
  10: "Booking",
  11: "Business",
  12: "DIY",
  13: "Account",
  14: "Booking",
  15: "Safety",
  16: "Technicians",
  17: "Booking",
  18: "DIY",
  19: "Business",
  20: "Account",
  21: "Safety",
};

const popularFaqIndexes = new Set([0, 3, 9, 15, 16]);

const padNumber = (n: number) => n.toString().padStart(2, "0");

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMultiple, setIsMultiple] = useState(false);

  const categorizedFaqs = useMemo(() => {
    return faqs.map((faq, i) => ({
      ...faq,
      index: i,
      category: faqCategoryMap[i] || "General",
      popular: popularFaqIndexes.has(i),
    }));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: categorizedFaqs.length };
    faqCategories.slice(1).forEach((cat) => {
      counts[cat.value] = categorizedFaqs.filter(
        (f) => f.category === cat.value
      ).length;
    });
    return counts;
  }, [categorizedFaqs]);

  const filteredFaqs = useMemo(() => {
    return categorizedFaqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [categorizedFaqs, activeCategory, searchQuery]);

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 via-cyan-500/6 to-transparent rounded-full blur-[120px] pointer-events-none" />
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
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">FAQ</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            Frequently Asked{" "}
            <span className="text-gradient block sm:inline">Questions</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about VoltCare — from booking and pricing to safety protocols and our 90-day guarantee. Can&apos;t find your answer? We&apos;re just a message away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            <Input
              type="text"
              placeholder="Search questions (e.g., 'pricing', 'emergency', 'EV charger')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-5 sm:py-6 rounded-2xl glass border border-border/60 text-sm placeholder:text-muted-foreground/70 focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all shadow-glass"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {faqCategories.map((cat) => {
              const CatIcon: LucideIcon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "relative flex-shrink-0 inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "text-white shadow-xl shadow-primary/30 bg-[length:200%_auto] animate-gradient-shift"
                      : "text-foreground/80 hover:text-foreground glass border border-border/50 hover:border-primary/20"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
                  )}
                  <span className="relative flex items-center gap-1.5 sm:gap-2">
                    <CatIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{cat.name}</span>
                    <span
                      className={cn(
                        "px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold transition-all duration-300",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {categoryCounts[cat.value] || 0}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 glass rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 border border-border/50 shadow-glass shrink-0 self-start sm:self-auto">
            <div className="flex flex-col items-start sm:items-end leading-tight mr-1">
              <span className="text-xs font-bold text-foreground whitespace-nowrap">Expand mode</span>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {isMultiple ? "Open multiple" : "One at a time"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Label
                htmlFor="faq-multiple"
                className={cn(
                  "text-[10px] sm:text-[11px] font-semibold cursor-pointer transition-colors",
                  !isMultiple ? "text-primary" : "text-muted-foreground"
                )}
              >
                Single
              </Label>
              <Switch
                id="faq-multiple"
                checked={isMultiple}
                onCheckedChange={setIsMultiple}
              />
              <Label
                htmlFor="faq-multiple"
                className={cn(
                  "text-[10px] sm:text-[11px] font-semibold cursor-pointer transition-colors",
                  isMultiple ? "text-primary" : "text-muted-foreground"
                )}
              >
                Multiple
              </Label>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="max-w-4xl mx-auto"
        >
          {filteredFaqs.length > 0 ? (
            <Accordion
              key={isMultiple ? "multiple" : "single"}
              type={isMultiple ? "multiple" : "single"}
              collapsible
              className="space-y-3 sm:space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, displayIndex) => {
                  const value = `faq-${faq.index}`;
                  return (
                    <motion.div
                      key={value}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: displayIndex * 0.03,
                        duration: 0.3,
                      }}
                    >
                      <AccordionItem
                        value={value}
                        className={cn(
                          "group px-5 sm:px-6 lg:px-7 glass border border-border/50 hover:border-primary/25 transition-all duration-300",
                          faq.popular && "ring-1 ring-amber-500/30 bg-gradient-to-br from-amber-500/[0.03] to-transparent"
                        )}
                      >
                        <AccordionTrigger className="!py-4.5 sm:!py-5.5 gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 text-left min-w-0">
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-xl blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
                              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted/60 border border-border/50 flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-cyan-500 group-hover:bg-gradient-to-br group-hover:border-transparent transition-all duration-300">
                                <span className="text-[11px] sm:text-xs font-black tracking-tight text-muted-foreground group-hover:text-white transition-colors">
                                  {padNumber(displayIndex + 1)}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                              <span className="text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                                {faq.q}
                              </span>
                              {faq.popular && (
                                <Badge
                                  variant="warning"
                                  className="shrink-0 self-start flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                >
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="relative shrink-0 ml-2">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="!pb-5 sm:!pb-6">
                          <div className="pl-12 sm:pl-14 lg:pl-[4.5rem]">
                            <div className="relative">
                              <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-gradient-to-b from-primary/40 via-cyan-500/40 to-transparent" />
                              <p className="pl-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </Accordion>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl py-16 text-center shadow-glass"
            >
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-xl" />
                <div className="relative w-full h-full rounded-2xl bg-muted/60 border border-border flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">No matching questions</h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-5">
                Try a different search term or category, or reach out to our team directly.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all"
              >
                <HelpCircle className="w-4 h-4" />
                Show all questions
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 sm:mt-14 max-w-4xl mx-auto"
        >
          <div className="relative glass rounded-3xl p-6 sm:p-8 lg:p-10 shadow-glass overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-primary/15 via-cyan-500/10 to-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/25 shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                    Didn&apos;t find your answer?
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                  Our customer support team is available 24/7. Average response time is under 2 minutes for chat and under 30 seconds on the phone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 sm:gap-3.5">
                <motion.a
                  href="tel:+621234567890"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-foreground bg-background/60 border-2 border-border hover:border-primary/40 hover:bg-primary/5 backdrop-blur-sm transition-all shadow-lg"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-cyan-500/15 flex items-center justify-center group-hover:from-primary group-hover:to-cyan-500 transition-all">
                    <Phone className="w-4 h-4 text-primary group-hover:text-white shrink-0" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] text-muted-foreground font-medium">24/7 Hotline</span>
                    <span className="font-bold leading-tight">Call Us</span>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all bg-[length:200%_auto] animate-gradient-shift btn-ripple"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] text-white/80 font-medium">Avg 2 min</span>
                    <span className="font-bold leading-tight">Live Chat</span>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/621234567890"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-white shadow-xl hover:shadow-2xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    boxShadow: "0 12px 40px rgba(16, 185, 129, 0.35)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] text-white/80 font-medium">WhatsApp</span>
                    <span className="font-bold leading-tight">Message Us</span>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
