"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  MessageCircle,
  Send,
  Minimize2,
  X,
  Mic,
  ArrowUp,
  User,
  Contrast,
  Type,
  Keyboard,
  PlayCircle,
  Eye,
  Sparkles,
  Zap,
  Bot,
  Download,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  content: string;
  time: string;
};

const quickReplies = [
  "Book technician",
  "Pricing?",
  "DIY help",
  "Emergency",
];

const textSizes = [
  { label: "100%", value: "100" },
  { label: "110%", value: "110" },
  { label: "125%", value: "125" },
  { label: "150%", value: "150" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingWidgets() {
  const { resolvedTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [a11yPanelOpen, setA11yPanelOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pwaInstallable, setPwaInstallable] = useState(false);
  const [pwaBannerDismissed, setPwaBannerDismissed] = useState(false);
  const deferredPromptRef = useRef<any>(null);

  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      content: "Hi! 👋 I'm Volt Bot. How can I help you today?",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textSize, setTextSize] = useState("100");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setPwaInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${parseInt(textSize) * 0.16}px`;
  }, [textSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSendMessage = useCallback(
    (content?: string) => {
      const text = content || chatMessage.trim();
      if (!text) return;

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", content: text, time: timeStr },
      ]);
      setChatMessage("");
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const responses: Record<string, string> = {
          "book technician":
            "Great! I can help you book a certified electrician. Would you like a standard appointment or emergency service? 🔌",
          "pricing?":
            "Our services start from Rp 50,000 for basic repairs. Emergency service is Rp 500,000 callout. You can see full pricing in the #pricing section! 💰",
          "diy help":
            "Check out our DIY Guide section for safe, step-by-step repairs you can do at home. Always call a pro if unsure! 🛠️",
          emergency:
            "⚠️ EMERGENCY: Call 1500-111 immediately for 24/7 dispatch. Average response time is 30 minutes within city limits!",
        };
        const lower = text.toLowerCase();
        let response =
          "Thanks for your message! A human agent will respond within 5 minutes. In the meantime, feel free to explore our services or call 1500-111 for urgent matters. ⚡";
        for (const key of Object.keys(responses)) {
          if (lower.includes(key)) {
            response = responses[key];
            break;
          }
        }
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            content: response,
            time: timeStr,
          },
        ]);
      }, 1500);
    },
    [chatMessage]
  );

  const handleInstallPWA = async () => {
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt();
      const { outcome } = await deferredPromptRef.current.userChoice;
      if (outcome === "accepted") {
        setPwaInstallable(false);
      }
      deferredPromptRef.current = null;
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence>
        {pwaInstallable && !pwaBannerDismissed && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl"
          >
            <div className="relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl glass-strong border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 animate-gradient-shift bg-[length:200%_auto]" />
              <div className="relative flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-500 rounded-xl blur-md opacity-40" />
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white fill-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-foreground truncate">
                      Install VoltCare App
                    </p>
                    <Badge
                      variant="success"
                      className="h-5 px-2 text-[10px] shrink-0"
                    >
                      5MB Only
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    Works offline • Fast access • Home screen icon
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleInstallPWA}
                  className="h-9 px-3.5 sm:px-4 text-xs sm:text-sm gap-1.5 bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Install</span>
                  <span className="sm:hidden">Get</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPwaBannerDismissed(true)}
                  className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", damping: 20 }}
        className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-[70] hidden lg:flex flex-col items-center gap-2.5 p-2.5 rounded-2xl glass-strong border border-white/10 shadow-xl"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setA11yPanelOpen(true)}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-300",
                a11yPanelOpen
                  ? "bg-gradient-to-br from-primary to-cyan-500 text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
              aria-label="Accessibility settings"
            >
              <User className="w-5 h-5" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Accessibility
          </TooltipContent>
        </Tooltip>

        <div className="w-8 h-px bg-border/60 my-0.5" />

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.a
              href="tel:1500111"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-all duration-300 group"
              aria-label="Emergency call"
            >
              <div className="relative">
                <Sparkles className="w-5 h-5" />
                <span className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping opacity-40" />
              </div>
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Emergency 1500-111
          </TooltipContent>
        </Tooltip>
      </motion.div>

      <Dialog open={a11yPanelOpen} onOpenChange={setA11yPanelOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-cyan-500 p-6 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2.5 text-xl text-white">
                <User className="w-6 h-6" />
                Accessibility Settings
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm">
                Customize your browsing experience for comfort and ease of use.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <Contrast className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">High Contrast Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Boost colors and borders for better readability
                  </p>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3 mb-3.5">
                <div className="p-2.5 rounded-lg bg-amber-500/10 shrink-0">
                  <Type className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Large Text Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Adjust font size for comfortable reading
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 ml-0">
                {textSizes.map((size) => (
                  <Button
                    key={size.value}
                    size="sm"
                    variant={textSize === size.value ? "default" : "outline"}
                    onClick={() => setTextSize(size.value)}
                    className={cn(
                      "h-9 text-xs font-semibold",
                      textSize === size.value &&
                        "bg-gradient-to-r from-primary to-cyan-500 border-transparent"
                    )}
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-violet-500/10 shrink-0">
                  <PlayCircle className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Reduce Motion</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Disable animations and transitions
                  </p>
                </div>
              </div>
              <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30">
              <div className="flex items-start gap-3 mb-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 shrink-0">
                  <Keyboard className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Keyboard Navigation</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Navigate without a mouse using these shortcuts
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border/60">
                  <span className="text-muted-foreground">Next element</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-muted font-mono text-[10px] font-bold border border-border">
                    Tab
                  </kbd>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border/60">
                  <span className="text-muted-foreground">Activate</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-muted font-mono text-[10px] font-bold border border-border">
                    Enter
                  </kbd>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border/60">
                  <span className="text-muted-foreground">Skip to content</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-muted font-mono text-[10px] font-bold border border-border">
                    Alt + S
                  </kbd>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 shrink-0">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Screen Reader</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Optimized for NVDA, JAWS, VoiceOver
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="h-6 px-2.5 text-[10px]">
                Alt + R
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href="https://wa.me/622112345678"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed left-3 sm:left-4 bottom-24 sm:bottom-28 z-[70] group lg:left-auto lg:right-auto lg:static"
            style={{ left: "clamp(0.75rem, 2vw, 1rem)" }}
            aria-label="Chat on WhatsApp"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-2xl shadow-emerald-500/40 flex items-center justify-center border-2 border-white">
                <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
          </motion.a>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs font-medium">
          Chat on WhatsApp
        </TooltipContent>
      </Tooltip>

      <Dialog open={voiceModalOpen} onOpenChange={setVoiceModalOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden text-center">
          <div className="relative p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5" />

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListening((p) => !p)}
                className={cn(
                  "relative mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-8 transition-all duration-300",
                  isListening
                    ? "bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl shadow-red-500/50"
                    : "bg-gradient-to-br from-primary to-cyan-500 shadow-2xl shadow-primary/50 hover:shadow-primary/60"
                )}
              >
                <AnimatePresence mode="wait">
                  {isListening && (
                    <>
                      <motion.span
                        key="wave1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0.6, 0, 0.6],
                          scale: [1, 1.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full border-4 border-red-400/50"
                      />
                      <motion.span
                        key="wave2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0.4, 0, 0.4],
                          scale: [1, 2, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4,
                        }}
                        className="absolute inset-0 rounded-full border-4 border-red-400/30"
                      />
                      <motion.span
                        key="wave3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0.2, 0, 0.2],
                          scale: [1, 2.4, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8,
                        }}
                        className="absolute inset-0 rounded-full border-4 border-red-400/20"
                      />
                    </>
                  )}
                </AnimatePresence>
                <Mic
                  className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 text-white relative z-10",
                    isListening && "animate-pulse"
                  )}
                />
              </motion.button>

              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {isListening ? "Listening..." : "Voice Search"}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {isListening
                    ? "Speak now — I'll transcribe your request"
                    : "Tap the mic and ask VoltCare anything"}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 p-5 rounded-2xl border border-border bg-muted/40 text-left">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Try saying:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Book an electrician for power outage",
                    "How much does EV charger installation cost?",
                    "Show me DIY guide for MCB reset",
                    "Schedule emergency service right now",
                  ].map((phrase, index) => (
                    <motion.li
                      key={phrase}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-start gap-2.5 group cursor-pointer"
                      onClick={() => {
                        setVoiceModalOpen(false);
                        setChatOpen(true);
                        handleSendMessage(phrase);
                      }}
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {phrase}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setVoiceModalOpen(false)}
                className="mt-6 h-11 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {!chatOpen && (
          <div className="fixed bottom-24 sm:bottom-28 right-3 sm:right-4 z-[70] flex flex-col items-end gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.8, type: "spring", damping: 15 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVoiceModalOpen(true)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-strong border border-white/10 shadow-xl flex items-center justify-center text-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="Voice search"
                >
                  <Mic className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Voice Search
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.7, type: "spring", damping: 15 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChatOpen(true)}
                  className="relative"
                  aria-label="Open live chat"
                >
                  <span className="absolute -top-0.5 -right-0.5 z-10">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/60 animate-ping" />
                    <span className="relative block w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-background flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                  </span>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary via-blue-600 to-cyan-500 shadow-2xl shadow-primary/40 flex items-center justify-center animate-glow overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <MessageCircle className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 text-white relative z-10" />
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Chat with Volt Bot
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={
              chatMinimized
                ? { opacity: 1, y: 0, scale: 1, height: "auto" }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className={cn(
              "fixed right-3 sm:right-4 z-[75] flex flex-col glass-strong border border-white/10 shadow-2xl rounded-3xl overflow-hidden",
              chatMinimized
                ? "bottom-24 sm:bottom-28 w-auto"
                : "bottom-24 sm:bottom-28 w-[calc(100%-1.5rem)] sm:w-96 h-[520px] sm:h-[560px] max-h-[75vh]"
            )}
          >
            {chatMinimized ? (
              <button
                onClick={() => setChatMinimized(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">Volt Bot</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Online — Tap to chat
                  </p>
                </div>
                <X
                  onClick={(e) => {
                    e.stopPropagation();
                    setChatOpen(false);
                  }}
                  className="ml-2 w-4 h-4 text-muted-foreground hover:text-foreground"
                />
              </button>
            ) : (
              <>
                <div className="relative p-4 sm:p-5 border-b border-border/50 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-500 rounded-xl blur-md opacity-40 animate-pulse-slow" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                          <Bot className="w-5.5 h-5.5 text-white" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background z-10" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base">Volt Bot</h3>
                          <Badge
                            variant="outline"
                            className="h-5 px-2 text-[10px] gap-1 border-primary/30 bg-primary/5 text-primary font-semibold"
                          >
                            <Sparkles className="w-3 h-3" />
                            AI
                          </Badge>
                        </div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Online • Replies instantly
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setChatMinimized(true)}
                        className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-xl"
                      >
                        <Minimize2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setChatOpen(false)}
                        className="h-9 w-9 text-muted-foreground hover:text-red-500 rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                  <div className="px-4 pt-3 border-b border-border/30">
                    <TabsList className="h-9 w-full grid grid-cols-2 p-1 rounded-xl bg-muted/50">
                      <TabsTrigger
                        value="chat"
                        className="h-7 text-xs font-semibold rounded-lg data-[state=active]:shadow-sm"
                      >
                        💬 Live Chat
                      </TabsTrigger>
                      <TabsTrigger
                        value="assistant"
                        className="h-7 text-xs font-semibold rounded-lg data-[state=active]:shadow-sm"
                      >
                        ✨ AI Assistant
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    value="chat"
                    className="flex-1 flex flex-col mt-0 data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div
                      ref={chatScrollRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar"
                    >
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex gap-2.5",
                            msg.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          )}
                        >
                          {msg.sender === "bot" && (
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm shadow-sm",
                              msg.sender === "user"
                                ? "bg-gradient-to-br from-primary to-cyan-500 text-white rounded-br-md"
                                : "bg-muted/70 text-foreground rounded-bl-md border border-border/50"
                            )}
                          >
                            <p className="leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </p>
                            <p
                              className={cn(
                                "text-[10px] mt-1",
                                msg.sender === "user"
                                  ? "text-white/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {msg.time}
                            </p>
                          </div>
                          {msg.sender === "user" && (
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-foreground/10 flex items-center justify-center">
                              <span className="text-xs font-bold">You</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2.5 justify-start"
                        >
                          <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted/70 border border-border/50">
                            <div className="flex gap-1">
                              <motion.span
                                className="w-2 h-2 rounded-full bg-primary/60"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: 0,
                                }}
                              />
                              <motion.span
                                className="w-2 h-2 rounded-full bg-primary/60"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: 0.15,
                                }}
                              />
                              <motion.span
                                className="w-2 h-2 rounded-full bg-primary/60"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: 0.3,
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {messages.length <= 1 && (
                      <div className="px-4 pb-3 pt-1 border-t border-border/30">
                        <p className="text-[11px] text-muted-foreground mb-2 font-medium">
                          Quick replies:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {quickReplies.map((reply, index) => (
                            <motion.button
                              key={reply}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * index }}
                              whileHover={{ y: -1, scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleSendMessage(reply)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all"
                            >
                              {reply}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="p-3 sm:p-4 border-t border-border/50 bg-background/60"
                    >
                      <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-input bg-background focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="h-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:border-0 px-3 text-sm placeholder:text-muted-foreground/70"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setVoiceModalOpen(true)}
                          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 shrink-0"
                        >
                          <Mic className="w-4.5 h-4.5" />
                        </Button>
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!chatMessage.trim() && !isTyping}
                          className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/30 shrink-0 disabled:opacity-50"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 mt-2.5">
                        <Sparkles className="w-3 h-3 text-primary/60" />
                        <span className="text-[10px] text-muted-foreground">
                          Powered by VoltCare AI • Human backup available
                        </span>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent
                    value="assistant"
                    className="flex-1 flex flex-col mt-0 data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2.5"
                      >
                        <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-gradient-to-br from-violet-500/10 to-purple-500/10 text-foreground border border-violet-500/20">
                          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Pro AI Assistant
                          </p>
                          <p className="text-sm leading-relaxed">
                            I'm your upgraded AI assistant! 🌟 I can analyze
                            electrical issues, give smart recommendations, and
                            even help with complex troubleshooting. Try the
                            voice button below for hands-free help!
                          </p>
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {[
                          {
                            icon: "🔍",
                            title: "Diagnose an issue",
                            desc: "Describe symptoms, get smart analysis",
                          },
                          {
                            icon: "💰",
                            title: "Compare service costs",
                            desc: "See price breakdown instantly",
                          },
                          {
                            icon: "📅",
                            title: "Optimal booking time",
                            desc: "Find cheapest available slots",
                          },
                        ].map((item, idx) => (
                          <motion.button
                            key={item.title}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            whileHover={{ x: 2, scale: 1.01 }}
                            className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background/60 hover:border-violet-500/30 hover:bg-violet-500/5 text-left transition-all"
                          >
                            <span className="text-xl">{item.icon}</span>
                            <div>
                              <p className="text-sm font-semibold">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="p-3 sm:p-4 border-t border-border/50 bg-gradient-to-br from-violet-500/5 via-background/60 to-purple-500/5"
                    >
                      <div className="flex items-center gap-2 p-1.5 rounded-2xl border-2 border-violet-500/30 bg-background focus-within:border-violet-500/60 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all">
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => setVoiceModalOpen(true)}
                          className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/30 shrink-0"
                        >
                          <Mic className="w-4.5 h-4.5" />
                        </Button>
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Ask Volt AI anything..."
                          className="h-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:border-0 px-3 text-sm placeholder:text-muted-foreground/70"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!chatMessage.trim()}
                          className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/30 shrink-0 disabled:opacity-50"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 mt-2.5">
                        <Badge
                          variant="outline"
                          className="h-5 px-2 text-[10px] gap-1 border-violet-500/30 bg-violet-500/5 text-violet-700 dark:text-violet-300"
                        >
                          <Mic className="w-3 h-3" />
                          Voice enabled
                        </Badge>
                        <Badge
                          variant="outline"
                          className="h-5 px-2 text-[10px] gap-1 border-violet-500/30 bg-violet-500/5 text-violet-700 dark:text-violet-300"
                        >
                          ⚡ GPT-4 Powered
                        </Badge>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ type: "spring", damping: 20 }}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="fixed right-3 sm:right-4 bottom-4 sm:bottom-5 z-[65] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-foreground text-background shadow-2xl shadow-foreground/20 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              Back to top
            </TooltipContent>
          </Tooltip>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
