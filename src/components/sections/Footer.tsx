"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Mail,
  ArrowRight,
  Users,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Play,
  Download,
  Send,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const socialLinks = [
  { name: "WhatsApp", icon: "whatsapp", href: "#", color: "hover:bg-emerald-500" },
  { name: "Instagram", icon: "instagram", href: "#", color: "hover:bg-pink-500" },
  { name: "TikTok", icon: "tiktok", href: "#", color: "hover:bg-foreground" },
  { name: "YouTube", icon: "youtube", href: "#", color: "hover:bg-red-500" },
  { name: "LinkedIn", icon: "linkedin", href: "#", color: "hover:bg-blue-600" },
  { name: "Facebook", icon: "facebook", href: "#", color: "hover:bg-blue-500" },
  { name: "X", icon: "x", href: "#", color: "hover:bg-foreground" },
];

const servicesLinks = [
  { name: "Book Technician", href: "#book" },
  { name: "DIY Guide", href: "#diy" },
  { name: "Emergency Service", href: "#emergency" },
  { name: "Electrical Inspection", href: "#services" },
  { name: "EV Charger", href: "#services" },
  { name: "Solar Consultation", href: "#services" },
  { name: "Pricing", href: "#pricing" },
];

const companyLinks = [
  { name: "About Us", href: "#", badge: null },
  { name: "Careers", href: "#", badge: "Hiring" },
  { name: "Electricians", href: "#electricians", badge: "We're Hiring" },
  { name: "Blog", href: "#" },
  { name: "Press Kit", href: "#" },
  { name: "Partners", href: "#" },
  { name: "Referral Program", href: "#" },
];

const supportLinks = [
  { name: "Help Center", href: "#" },
  { name: "FAQ", href: "#faq" },
  { name: "Safety Tips", href: "#safety" },
  { name: "Warranty", href: "#" },
  { name: "Contact Us", href: "#contact" },
  { name: "Complaint Form", href: "#" },
  { name: "Status Page", href: "#" },
];

const legalLinks = [
  { name: "Privacy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
  { name: "Accessibility", href: "#" },
  { name: "Sitemap", href: "#" },
];

const stats = [
  { icon: Users, value: "250K+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "100%", label: "Licensed Techs" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "30 min", label: "Avg Response" },
];

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

function FooterLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 2 }}
      className={cn(
        "group relative inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-1",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-500 group-hover:w-full transition-all duration-300 rounded-full" />
      </span>
    </motion.a>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative pt-16 bg-gradient-to-b from-background via-muted/30 to-background border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-16 overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-primary via-blue-600 to-cyan-500 shadow-2xl shadow-primary/25"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <div className="relative">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-xs font-semibold text-white/90">
                  Newsletter
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  Get safety tips &{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent">
                    exclusive deals
                  </span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                  Join 50,000+ homeowners who receive our weekly electrical
                  safety guide, DIY tips, and members-only discounts up to 30%.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 text-white/90">
                      <stat.icon className="w-4 h-4 text-amber-200" />
                      <span className="text-lg sm:text-xl font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <form
                onSubmit={handleSubscribe}
                className="relative flex flex-col sm:flex-row gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xl"
              >
                <div className="flex-1 flex items-center gap-2 px-4 bg-white/95 rounded-xl">
                  <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-0 bg-transparent focus-visible:ring-0 focus-visible:border-0 px-0 text-foreground placeholder:text-muted-foreground/70"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    "h-11 sm:h-11 px-6 rounded-xl gap-2 font-semibold transition-all",
                    subscribed
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  {subscribed ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>4.9/5 rated content</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Weekly digest</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="col-span-2 lg:col-span-4 space-y-6"
          >
            <div>
              <motion.a
                href="#home"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-500 rounded-xl blur-md opacity-40 animate-pulse-slow" />
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                    <Zap className="w-5.5 h-5.5 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground via-primary to-cyan-500 bg-clip-text text-transparent">
                    VoltCare
                  </span>
                  <p className="text-xs text-muted-foreground -mt-0.5">
                    Electrical Care, Reimagined
                  </p>
                </div>
              </motion.a>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
                Indonesia's trusted platform for certified electricians. 24/7
                emergency service, transparent pricing, 90-day workmanship
                guarantee.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                Get the App
              </p>
              <div className="flex flex-wrap gap-2.5">
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] opacity-70">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] opacity-70">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </motion.a>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-background/50 hover:bg-muted/60 transition-colors text-sm"
              >
                <Download className="w-4 h-4 text-primary" />
                <span className="font-medium">Install PWA</span>
                <Badge variant="success" className="h-5 px-2 text-[10px]">
                  NEW
                </Badge>
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="leading-relaxed">
                <p className="font-medium text-foreground">HQ</p>
                <p>
                  SCBD Sudirman, Tower 2 Lv. 22
                  <br />
                  Jakarta Selatan 12190, Indonesia
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a
                    href="tel:+622112345678"
                    className="font-medium text-primary hover:underline"
                  >
                    (021) 123-45678
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 lg:col-span-2"
          >
            <h3 className="text-sm font-bold text-foreground mb-5 tracking-tight">
              Services
            </h3>
            <ul className="space-y-1.5">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 lg:col-span-2"
          >
            <h3 className="text-sm font-bold text-foreground mb-5 tracking-tight">
              Company
            </h3>
            <ul className="space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.name} className="flex items-center gap-2">
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                  {link.badge && (
                    <Badge
                      variant="success"
                      className="h-5 px-1.5 text-[9px] font-bold animate-pulse-slow"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2 md:col-span-2 lg:col-span-4"
          >
            <h3 className="text-sm font-bold text-foreground mb-5 tracking-tight">
              Support
            </h3>
            <ul className="space-y-1.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-2xl border border-border bg-gradient-to-br from-muted/60 to-background">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shrink-0">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Emergency? Call 24/7</p>
                  <p className="text-xs text-muted-foreground">
                    Avg response: 30 min
                  </p>
                </div>
              </div>
              <a
                href="tel:+62210000111"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 transition-all"
              >
                <Phone className="w-4 h-4" />
                1500-111 (Emergency)
              </a>
            </div>
          </motion.div>
        </div>

        <div className="py-5 border-y border-border/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {legalLinks.map((link, index) => (
            <div key={link.name} className="flex items-center gap-8">
              <FooterLink href={link.href} className="text-xs">
                {link.name}
              </FooterLink>
              {index < legalLinks.length - 1 && (
                <span className="hidden sm:block w-1 h-1 rounded-full bg-border shrink-0 -ml-6" />
              )}
            </div>
          ))}
        </div>

        <div className="py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
            <p className="font-medium">
              © 2026 VoltCare Pte Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="h-7 px-2.5 gap-1.5 border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Certified PLN Partner
              </Badge>
              <Badge
                variant="outline"
                className="h-7 px-2.5 gap-1.5 border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                SSL Secured
              </Badge>
              <Badge
                variant="outline"
                className="h-7 px-2.5 gap-1.5 border-violet-500/30 bg-violet-500/5 text-violet-700 dark:text-violet-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M20 8V6l-2.95-2.95A6.937 6.937 0 0 0 12 2c-1.89 0-3.57.72-4.89 1.89L5.11 5.89A6.937 6.937 0 0 0 3 11v3a7 7 0 0 0 6 6.92V22a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.08A7 7 0 0 0 21 14v-3a7 7 0 0 0-1-3zM12 4c1.66 0 3.14.65 4.22 1.78L18 7.53V8H6v-.47l1.78-1.75A5.95 5.95 0 0 1 12 4zm-5 9H5v-2a5 5 0 0 1 2-4v2a3 3 0 0 0 0 6v-2zm6 6.58V21h-2v-1.42a7.07 7.07 0 0 0 2 0zm0-4.58H8v-2h5v2zm3 0a1 1 0 0 1 0-2h-2V9h1.59A4.93 4.93 0 0 1 19 11v2h-2z" />
                </svg>
                PCI DSS
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">
              Follow us:
            </span>
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-2 rounded-xl text-muted-foreground hover:text-white border border-transparent hover:border-white/10 transition-all duration-300",
                    social.color
                  )}
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
