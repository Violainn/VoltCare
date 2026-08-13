"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Paperclip,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Building2,
  Sparkles,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  AlertCircle,
  FileText,
  ChevronRight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FloatingLabelInput } from "@/components/ui/input";
import { FloatingLabelTextarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Urgency = "Low" | "Medium" | "High" | "Emergency";

const urgencyConfig: Record<Urgency, {
  icon: LucideIcon;
  activeClass: string;
  inactiveClass: string;
  label: string;
}> = {
  Low: {
    icon: Clock,
    activeClass: "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30",
    inactiveClass: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/40 bg-emerald-500/5",
    label: "No rush",
  },
  Medium: {
    icon: FileText,
    activeClass: "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30",
    inactiveClass: "border-blue-500/20 text-blue-600 dark:text-blue-400 hover:border-blue-500/40 bg-blue-500/5",
    label: "Standard",
  },
  High: {
    icon: AlertCircle,
    activeClass: "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/30",
    inactiveClass: "border-amber-500/20 text-amber-600 dark:text-amber-400 hover:border-amber-500/40 bg-amber-500/5",
    label: "This week",
  },
  Emergency: {
    icon: Zap,
    activeClass: "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30",
    inactiveClass: "border-rose-500/20 text-rose-600 dark:text-rose-400 hover:border-rose-500/40 bg-rose-500/5",
    label: "ASAP",
  },
};

const workingHours = [
  { day: "Monday – Friday", hours: "08:00 – 20:00", highlight: false },
  { day: "Saturday", hours: "09:00 – 18:00", highlight: false },
  { day: "Sunday", hours: "Emergency Only", highlight: true },
];

const phoneNumbers = [
  {
    label: "Support",
    number: "+62 21 1234 5678",
    description: "General inquiries & booking help",
    icon: Headphones,
    color: "from-primary/15 to-cyan-500/15",
    iconColor: "text-primary",
  },
  {
    label: "Business",
    number: "+62 21 9876 5432",
    description: "Office, retail & property managers",
    icon: Building2,
    color: "from-violet-500/15 to-purple-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    label: "Emergency",
    number: "+62 800 111 911",
    description: "24/7 – Free call, no IVR, direct tech",
    icon: Zap,
    color: "from-rose-500/15 to-red-500/15",
    iconColor: "text-rose-600 dark:text-rose-400",
    badge: "24/7",
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const subjectOptions = [
  "General Inquiry",
  "Book a Service",
  "Emergency Request",
  "Quote / Estimate",
  "Existing Booking",
  "Complaint",
  "Partnership",
  "Other",
];

function Headphones(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3v-7Z" />
      <path d="M21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v-7Z" />
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
    </svg>
  );
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [urgency, setUrgency] = useState<Urgency>("Medium");
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);
    setProgressValue(0);

    toast.message("Sending your message...", {
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
    });

    const progressSteps = [18, 42, 68, 87, 100];
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 280));
      setProgressValue(progressSteps[i]);
    }

    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);
    setIsSuccess(true);

    toast.success("Message sent successfully!", {
      description: "Our team will respond within 2 hours or less.",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    });
  };

  const resetForm = () => {
    setIsSuccess(false);
    setProgressValue(0);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubject(undefined);
    setUrgency("Medium");
    setFileName(null);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-gradient-to-br from-primary/8 via-cyan-500/6 to-amber-500/4 rounded-full blur-[120px] -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[500px] bg-gradient-to-tl from-emerald-500/6 via-cyan-500/4 to-transparent rounded-full blur-[100px] translate-y-1/4 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

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
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Contact Us</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            We&apos;re Here to Help —{" "}
            <span className="text-gradient block sm:inline">Get in Touch</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, need a quote, or ready to book? Our certified experts and support team are standing by — 24/7, 365 days a year.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6 xl:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <Card className="overflow-hidden p-0">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-cyan-500 bg-[length:200%_200%] animate-gradient-shift" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl scale-110" />
                    <div className="relative glass-strong rounded-3xl px-5 py-4 flex items-center gap-3 shadow-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-slate-100 flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-foreground leading-tight">
                        <div className="text-xs font-bold opacity-80 mb-0.5">Head Office</div>
                        <div className="text-sm font-black">Jkt, SCBD District 8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold mb-1.5">VoltCare HQ & Experience Center</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  SCBD District 8, Treasury Tower 32nd Floor, Jl. Jend. Sudirman Kav. 52-53, Sudirman, Jakarta Selatan 12190, Indonesia
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-bold">Working Hours</span>
                  </div>
                  <div className="space-y-1.5">
                    {workingHours.map((row) => (
                      <div
                        key={row.day}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm border transition-colors",
                          row.highlight
                            ? "bg-gradient-to-r from-rose-500/5 border-rose-500/20"
                            : "bg-muted/40 border-border/40"
                        )}
                      >
                        <span className="font-medium">{row.day}</span>
                        <span
                          className={cn(
                            "font-semibold",
                            row.highlight ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                          )}
                        >
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-bold">Call Us</span>
                  </div>
                  <div className="space-y-3">
                    {phoneNumbers.map((pn) => {
                      const PnIcon = pn.icon as LucideIcon;
                      return (
                        <a
                          key={pn.label}
                          href={`tel:${pn.number.replace(/\s/g, "")}`}
                          className="group flex items-start gap-3 p-3 rounded-2xl border border-border/50 hover:border-primary/20 bg-muted/20 hover:bg-muted/40 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm", pn.color)}>
                            <PnIcon className={cn("w-5 h-5 shrink-0", pn.iconColor)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-foreground leading-none">{pn.label}</span>
                              {pn.badge && (
                                <Badge variant="danger" className="text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                  {pn.badge}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm font-black text-primary group-hover:underline leading-tight mb-0.5">
                              {pn.number}
                            </div>
                            <div className="text-[11px] text-muted-foreground leading-tight">
                              {pn.description}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <a
                  href="mailto:hello@voltcare.id"
                  className="group flex items-center gap-3 p-3 rounded-2xl border border-border/50 hover:border-primary/20 bg-muted/20 hover:bg-muted/40 transition-all duration-300 hover:-translate-y-0.5 mb-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-foreground leading-none mb-0.5">Email Us</div>
                    <div className="text-sm font-black text-primary group-hover:underline leading-tight mb-0.5">
                      hello@voltcare.id
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-tight">
                      Replies within 2 hours on business days
                    </div>
                  </div>
                </a>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Follow us</span>
                  <div className="flex items-center gap-1.5">
                    {socialLinks.map((social) => {
                      const SocialIcon: LucideIcon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="group relative w-9 h-9 rounded-xl border border-border/50 bg-muted/30 hover:bg-gradient-to-br hover:from-primary hover:to-cyan-500 hover:border-transparent flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25"
                        >
                          <SocialIcon className="w-4 h-4 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col items-start gap-3 p-4 sm:p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
                  <MessageSquare className="w-5 h-5 text-white shrink-0" />
                </div>
                <div className="relative">
                  <Badge variant="info" className="text-[9px] px-1.5 py-0.5 rounded-full font-bold mb-1.5">
                    Avg 2 min
                  </Badge>
                  <div className="text-sm font-black leading-tight mb-0.5">Live Chat</div>
                  <div className="text-[11px] text-muted-foreground leading-tight">
                    Chat with our team now
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/62800111911"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col items-start gap-3 p-4 sm:p-5 rounded-2xl overflow-hidden border-0 text-white shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #059669 50%, #10B981 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 5s ease infinite",
                  boxShadow: "0 16px 48px rgba(16, 185, 129, 0.35)",
                }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
                <div className="relative w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="relative">
                  <Badge className="text-[9px] px-1.5 py-0.5 rounded-full font-bold mb-1.5 bg-white/20 text-white border-0">
                    24/7
                  </Badge>
                  <div className="text-sm font-black leading-tight mb-0.5">WhatsApp</div>
                  <div className="text-[11px] text-white/80 leading-tight">
                    Quick message anytime
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="p-5 sm:p-7 lg:p-8 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-primary/10 via-cyan-500/8 to-amber-500/5 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1.5">
                          Send us a message
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Fill in the form below and our team will get back to you.
                        </p>
                      </div>
                      <Badge variant="success" className="hidden sm:flex shrink-0 text-[10px] px-2.5 py-1 rounded-full font-semibold items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Responds &lt; 2 hrs
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingLabelInput
                        label="Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        autoComplete="name"
                      />
                      <FloatingLabelInput
                        label="Email Address *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                      <FloatingLabelInput
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        autoComplete="tel"
                      />
                      <div>
                        <Select
                          value={subject}
                          onValueChange={setSubject}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="h-14 !pt-6 !pb-2 !rounded-xl">
                            <span className="absolute left-4 top-2 text-[11px] font-semibold text-muted-foreground">
                              Subject
                            </span>
                            <SelectValue placeholder="Select a subject..." />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <FloatingLabelTextarea
                      label="Your Message *"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                      rows={5}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          How urgent is this?
                        </Label>
                        <span className="text-[11px] text-muted-foreground hidden sm:inline">
                          {urgencyConfig[urgency].label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {(Object.keys(urgencyConfig) as Urgency[]).map((level) => {
                          const cfg = urgencyConfig[level];
                          const Icon: LucideIcon = cfg.icon;
                          const active = urgency === level;
                          return (
                            <button
                              key={level}
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => setUrgency(level)}
                              className={cn(
                                "group relative flex flex-col items-center justify-center gap-1.5 px-2.5 py-3.5 rounded-2xl border-2 font-semibold text-xs transition-all duration-300 disabled:opacity-60",
                                active ? cfg.activeClass : cfg.inactiveClass
                              )}
                            >
                              <Icon
                                className={cn(
                                  "w-5 h-5 shrink-0 transition-transform duration-300",
                                  active ? "scale-110" : "group-hover:scale-110"
                                )}
                              />
                              <span className="leading-tight">{level}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isSubmitting}
                          multiple
                        />
                        <button
                          type="button"
                          onClick={handleFileClick}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-foreground border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all disabled:opacity-60"
                        >
                          <Paperclip className="w-4.5 h-4.5 text-primary shrink-0" />
                          <span className="text-left leading-tight">
                            <span className="block">{fileName ?? "Attach files"}</span>
                            {fileName && (
                              <span className="block text-[10px] text-muted-foreground font-medium">
                                Click to replace
                              </span>
                            )}
                            {!fileName && (
                              <span className="block text-[10px] text-muted-foreground font-medium">
                                Photos, PDFs — up to 20MB
                              </span>
                            )}
                          </span>
                        </button>
                      </div>

                      <div className="flex-1 sm:max-w-xs">
                        {(isSubmitting || progressValue > 0) && !isSuccess && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-muted-foreground">Sending...</span>
                              <span className="text-primary">{progressValue}%</span>
                            </div>
                            <Progress value={progressValue} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto sm:min-w-56 h-12 sm:h-14 rounded-2xl text-sm sm:text-base shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-[length:200%_auto] animate-gradient-shift btn-ripple"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 180, damping: 18 }}
                    className="relative text-center py-6 sm:py-10 lg:py-14"
                  >
                    <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-5 sm:mb-7">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 14 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-xl"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 14 }}
                        className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 flex items-center justify-center shadow-2xl animate-pulse-slow"
                        style={{ boxShadow: "0 24px 80px rgba(16, 185, 129, 0.45)" }}
                      >
                        <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
                      </motion.div>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 sm:mb-3"
                    >
                      Message Sent!{" "}
                      <span className="text-gradient inline-block">🎉</span>
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-md mx-auto mb-7 sm:mb-8 leading-relaxed"
                    >
                      Thanks for reaching out! A member of our team will get back to you within 2 hours or less. For urgent issues, please call our 24/7 hotline.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={resetForm}
                        className="rounded-2xl border-2 hover:border-primary/40 hover:bg-primary/5 px-7 h-12"
                      >
                        Send Another Message
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <a
                        href="tel:+62800111911"
                        className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-red-500 shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
                      >
                        <Zap className="w-4 h-4" />
                        Call Emergency Line
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 sm:mt-6 glass rounded-3xl p-5 sm:p-6 lg:p-7 shadow-glass relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-gradient-to-br from-violet-500/15 via-primary/10 to-amber-500/10 rounded-full blur-3xl" />
              <div className="relative grid sm:grid-cols-[1fr_auto] gap-5 sm:gap-6 items-center">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/25 to-primary/25 rounded-2xl blur-lg opacity-60" />
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/15 via-primary/10 to-cyan-500/15 border border-primary/20 flex items-center justify-center shadow-md">
                      <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight mb-1.5 leading-tight">
                      Business or Property Manager?{" "}
                      <span className="text-gradient inline-block">Get a dedicated account manager.</span>
                    </h4>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                      Custom quotes, monthly retainers, consolidated billing, after-hours service — for offices, retail, restaurants, warehouses, and real estate portfolios.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="rounded-2xl h-12 sm:h-14 px-6 sm:px-8 shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/35 hover:-translate-y-0.5 whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #0B5FFF 50%, #00C2FF 100%)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 6s ease infinite",
                  }}
                >
                  <Sparkles className="w-4.5 h-4.5" />
                  Business Inquiry
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
