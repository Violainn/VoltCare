"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Droplets,
  Phone,
  CalendarCheck,
  BookOpen,
  ChevronRight,
  Sparkles,
  CircuitBoard,
  Home,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, diyGuides } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Is the power completely off in your home?",
    options: [
      { label: "Yes", value: "yes", icon: Zap },
      { label: "No", value: "no", icon: HelpCircle },
    ],
  },
  {
    id: 2,
    text: "Is it only one room / one circuit, or the entire property?",
    options: [
      { label: "One room", value: "one", icon: Home },
      { label: "Entire home", value: "all", icon: Home },
    ],
  },
  {
    id: 3,
    text: "Has a circuit breaker (MCB) tripped?",
    options: [
      { label: "Yes", value: "yes", icon: CircuitBoard },
      { label: "No", value: "no", icon: CircuitBoard },
    ],
  },
  {
    id: 4,
    text: "Is there a burning smell or smoke?",
    options: [
      { label: "Yes", value: "yes", icon: Flame },
      { label: "No", value: "no", icon: HelpCircle },
    ],
  },
  {
    id: 5,
    text: "Any visible sparks or flames?",
    options: [
      { label: "Yes", value: "yes", icon: Zap },
      { label: "No", value: "no", icon: HelpCircle },
    ],
  },
  {
    id: 6,
    text: "Is there any flooding or water near wiring?",
    options: [
      { label: "Yes", value: "yes", icon: Droplets },
      { label: "No", value: "no", icon: HelpCircle },
    ],
  },
];

type AnswerValue = string | null;
type Answers = Record<number, AnswerValue>;

type RecommendationType = "diy" | "book" | "emergency";

interface Recommendation {
  type: RecommendationType;
  title: string;
  description: string;
  guideId?: number;
  urgency?: string;
}

interface Message {
  id: number;
  type: "question" | "answer" | "recommendation";
  content: React.ReactNode;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ y: 0, opacity: 0.4 }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground font-medium">
        VoltCare AI is thinking...
      </span>
    </div>
  );
}

function AIAvatar() {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/30">
      <Bot className="w-5 h-5 text-white" />
    </div>
  );
}

export function SmartTroubleshooter() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  useEffect(() => {
    if (started && messages.length === 0 && currentQuestion < questions.length) {
      addQuestionMessage(0);
    }
  }, [started]);

  const addQuestionMessage = (qIndex: number) => {
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const q = questions[qIndex];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "question",
          content: (
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                Question {qIndex + 1} of {questions.length}
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {q.text}
              </p>
            </div>
          ),
        },
      ]);
    }, 600);
  };

  const computeRecommendation = (ans: Answers): Recommendation => {
    if (ans[4] === "yes" || ans[5] === "yes" || ans[6] === "yes") {
      return {
        type: "emergency",
        title: "EMERGENCY — Immediate Action Required",
        description:
          ans[5] === "yes"
            ? "Sparks or flames indicate an immediate fire hazard. EVACUATE the building immediately and call emergency services."
            : ans[4] === "yes"
            ? "Burning smells indicate wires are melting — a serious fire hazard. Do not touch anything, evacuate and call emergency services."
            : "Water near electricity is DEADLY. Do NOT approach the area. Evacuate, turn off the main breaker if safe from a distance, and call emergency help.",
        urgency: "24/7 Emergency Response",
      };
    }

    if (ans[1] === "no") {
      return {
        type: "diy",
        title: "Quick DIY Check — Try This First",
        description:
          "Since power is not completely out, the issue is likely isolated to a specific fixture or device. Check individual light bulbs and plugs first. If the problem persists with a specific circuit, follow our safe troubleshooting guide.",
        guideId: 3,
      };
    }

    if (ans[3] === "yes") {
      return {
        type: "diy",
        title: "DIY Fix: Reset Your Circuit Breaker (MCB)",
        description:
          "A tripped breaker is the most common cause of sudden power loss. It's a safety feature protecting your home from overload. Follow our step-by-step guide to safely reset it. If it trips again immediately after resetting, STOP and book a technician — there's an underlying fault.",
        guideId: 1,
      };
    }

    if (ans[2] === "one" && ans[3] === "no") {
      return {
        type: "book",
        title: "Book a Certified Technician",
        description:
          "The issue appears to be localized wiring damage or a faulty outlet in one room. Since no breaker has tripped, this requires professional diagnosis. Book a technician today for a same-day inspection.",
        urgency: "Same-Day Available",
      };
    }

    if (ans[2] === "all" && ans[3] === "no") {
      return {
        type: "book",
        title: "Book a Technician — Possible Panel Issue",
        description:
          "Complete power loss with no tripped breaker could indicate a main panel fault, meter issue, or external PLN supply problem. We'll send our most senior electrician to diagnose and resolve this quickly.",
        urgency: "Priority Dispatch",
      };
    }

    return {
      type: "book",
      title: "Book a Certified Technician",
      description:
        "Based on your responses, we recommend a professional inspection to safely diagnose the issue. Our electricians are fully equipped and can help identify the root cause.",
      urgency: "Standard Booking",
    };
  };

  const handleAnswer = (qId: number, value: string, label: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "answer",
        content: <span className="text-sm sm:text-base font-medium">{label}</span>,
      },
    ]);

    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    const nextQ = currentQuestion + 1;

    if (qId === 4 || qId === 5 || qId === 6) {
      if (value === "yes") {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          const rec = computeRecommendation(newAnswers);
          setRecommendation(rec);
          setCurrentQuestion(questions.length);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              type: "recommendation",
              content: null,
            },
          ]);
        }, 800);
        return;
      }
    }

    if (nextQ >= questions.length) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        const rec = computeRecommendation(newAnswers);
        setRecommendation(rec);
        setCurrentQuestion(questions.length);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "recommendation",
            content: null,
          },
        ]);
      }, 800);
    } else {
      setCurrentQuestion(nextQ);
      addQuestionMessage(nextQ);
    }
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setMessages([]);
    setRecommendation(null);
    setShowTyping(false);
    setStarted(false);
  };

  const handleSkip = () => {
    const rec = computeRecommendation(answers);
    setRecommendation(rec);
    setCurrentQuestion(questions.length);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "recommendation",
          content: null,
        },
      ]);
    }, 500);
  };

  const progressValue = started ? Math.min(((currentQuestion) / questions.length) * 100, 100) : 0;
  const stepsLeft = Math.max(questions.length - currentQuestion, 0);

  const guide = recommendation?.guideId ? diyGuides.find((g) => g.id === recommendation.guideId) : null;

  return (
    <section
      id="troubleshooter"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary/8 via-cyan-500/5 to-transparent rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
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
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">AI-Powered Diagnostic</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            AI Smart Troubleshooter{" "}
            <span className="text-gradient block sm:inline">— Get Help Fast</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer 6 quick questions and our AI will instantly recommend the right
            solution: a safe DIY fix, a standard booking, or emergency dispatch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/60 shadow-xl">
            <div className="absolute inset-0 rounded-2xl p-px pointer-events-none opacity-50">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-cyan-500/10 to-amber-500/10" />
            </div>

            <div className="relative border-b border-border/60 p-4 sm:p-5 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-transparent">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <AIAvatar />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold">VoltCare AI Assistant</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {!started
                        ? "Ready to help diagnose your issue"
                        : recommendation
                        ? "Analysis complete"
                        : `${stepsLeft} question${stepsLeft !== 1 ? "s" : ""} remaining`}
                    </p>
                  </div>
                </div>
                {started && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleStartOver}
                      className="h-9 rounded-xl font-semibold text-xs border-border/60 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Start Over
                    </Button>
                    {!recommendation && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSkip}
                        className="h-9 rounded-xl font-semibold text-xs border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all"
                      >
                        <SkipForward className="w-3.5 h-3.5 mr-1" />
                        Skip
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {started && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">Progress</span>
                    <span className="font-bold text-primary">
                      {Math.round(progressValue)}%
                    </span>
                  </div>
                  <Progress
                    value={progressValue}
                    className="h-2.5 bg-muted/80"
                    indicatorClassName="bg-gradient-to-r from-primary via-blue-600 to-cyan-500"
                  />
                </div>
              )}
            </div>

            <div
              ref={scrollRef}
              className="relative p-4 sm:p-6 space-y-4 max-h-[520px] overflow-y-auto no-scrollbar"
            >
              {!started ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="py-4 sm:py-6"
                >
                  <div className="flex gap-3">
                    <AIAvatar />
                    <div className="flex-1">
                      <div className="glass rounded-2xl rounded-tl-md p-4 sm:p-5 shadow-glass border border-white/10">
                        <div className="space-y-3 sm:space-y-4">
                          <p className="text-sm sm:text-base font-medium leading-relaxed">
                            👋 Hi! I&apos;m <span className="text-primary font-bold">VoltCare AI</span>. I&apos;ll ask you a few simple questions to understand your electrical issue.
                          </p>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            Takes <strong className="text-foreground">~30 seconds</strong>. At the end I&apos;ll tell you whether it&apos;s safe to DIY, if you should book a technician, or if you need <strong className="text-red-500">emergency help right now</strong>.
                          </p>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40">
                              <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                              <div className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400">Safe DIY</div>
                            </div>
                            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/40">
                              <CalendarCheck className="w-4 h-4 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                              <div className="text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-400">Book Tech</div>
                            </div>
                            <div className="text-center p-2.5 sm:p-3 rounded-xl bg-red-50/80 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/40">
                              <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-red-600 dark:text-red-400" />
                              <div className="text-[10px] sm:text-xs font-bold text-red-700 dark:text-red-400">Emergency</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={handleStart}
                          size="lg"
                          className="h-12 px-8 rounded-2xl font-bold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all bg-[length:200%_auto] animate-gradient-shift btn-ripple"
                        >
                          <Sparkles className="w-4.5 h-4.5 mr-2" />
                          Start Diagnostic
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <div key={msg.id}>
                      {msg.type === "question" ? (
                        <motion.div
                          key={`q-${msg.id}`}
                          initial={{ opacity: 0, y: 15, x: -10 }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex gap-3"
                        >
                          <AIAvatar />
                          <div className="flex-1 max-w-[85%]">
                            <div className="glass rounded-2xl rounded-tl-md p-4 shadow-glass border border-white/10">
                              {msg.content}
                            </div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                              className="flex flex-wrap gap-2.5 mt-3.5 ml-1"
                            >
                              {questions[Math.min(currentQuestion, questions.length - 1)].options.map((opt) => {
                                const Icon = opt.icon;
                                return (
                                  <motion.button
                                    key={opt.value}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() =>
                                      handleAnswer(
                                        questions[Math.min(currentQuestion, questions.length - 1)].id,
                                        opt.value,
                                        opt.label
                                      )
                                    }
                                    className={cn(
                                      "relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm font-bold transition-all duration-300 border",
                                      "bg-background/90 border-border/70 hover:border-primary/40 hover:bg-primary/5 hover:text-primary shadow-sm hover:shadow-md"
                                    )}
                                  >
                                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                                    <span>{opt.label}</span>
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : msg.type === "answer" ? (
                        <motion.div
                          key={`a-${msg.id}`}
                          initial={{ opacity: 0, y: 15, x: 10 }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex gap-3 justify-end"
                        >
                          <div className="max-w-[85%]">
                            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl rounded-tr-md text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-lg shadow-primary/25">
                              <CheckCircle2 className="w-4 h-4 shrink-0 opacity-90" />
                              {msg.content}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`r-${msg.id}`}
                          initial={{ opacity: 0, y: 20, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 16 }}
                          className="flex gap-3"
                        >
                          <AIAvatar />
                          <div className="flex-1">
                            {recommendation?.type === "emergency" && (
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(239,68,68,0.6)",
                                    "0 0 0 16px rgba(239,68,68,0)",
                                    "0 0 0 0 rgba(239,68,68,0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="rounded-3xl overflow-hidden border-2 border-red-500/80 bg-gradient-to-br from-red-500/15 via-red-500/5 to-orange-500/10"
                              >
                                <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-4 sm:p-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                                      <AlertTriangle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <Badge variant="destructive" className="bg-white/20 backdrop-blur-sm border-0 text-white font-bold px-3 py-1 text-xs mb-1.5">
                                        <Flame className="w-3 h-3 mr-1" />
                                        {recommendation.urgency}
                                      </Badge>
                                      <h3 className="text-white font-black text-lg sm:text-xl leading-tight">
                                        {recommendation.title}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 sm:p-5 space-y-4">
                                  <p className="text-sm sm:text-base font-medium text-red-900 dark:text-red-100 leading-relaxed">
                                    {recommendation.description}
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                    <Button
                                      size="lg"
                                      className="h-12 sm:h-14 rounded-2xl font-black text-base text-white bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all bg-[length:200%_auto] animate-gradient-shift btn-ripple flex-1"
                                    >
                                      <Phone className="w-5 h-5 mr-2" />
                                      Call Emergency 24/7
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {recommendation?.type === "diy" && (
                              <div className="rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-green-500/10">
                                <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 p-4 sm:p-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                      <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <Badge variant="success" className="bg-white/20 backdrop-blur-sm border-0 text-white font-bold px-3 py-1 text-xs mb-1.5">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Safe to Try DIY
                                      </Badge>
                                      <h3 className="text-white font-black text-lg sm:text-xl leading-tight">
                                        {recommendation.title}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 sm:p-5 space-y-4">
                                  <p className="text-sm sm:text-base font-medium text-emerald-900 dark:text-emerald-100 leading-relaxed">
                                    {recommendation.description}
                                  </p>
                                  {guide && (
                                    <Card className="border-emerald-200/60 dark:border-emerald-800/40 bg-white/60 dark:bg-emerald-950/20 overflow-hidden">
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                          <div className="flex items-center gap-2.5">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                              <CircuitBoard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                              <h4 className="font-bold text-sm sm:text-base">{guide.title}</h4>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{guide.difficulty}</span>
                                                <span>•</span>
                                                <span>{guide.time}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <ol className="space-y-2 mb-4">
                                          {guide.steps.slice(0, 3).map((step, i) => (
                                            <li key={i} className="flex gap-2.5 text-xs sm:text-sm">
                                              <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                                                {i + 1}
                                              </span>
                                              <span className="text-muted-foreground leading-relaxed">{step}</span>
                                            </li>
                                          ))}
                                        </ol>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                          <Button
                                            variant="success"
                                            size="sm"
                                            className="h-11 rounded-xl font-bold flex-1"
                                          >
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            View Full Guide
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-11 rounded-xl font-semibold border-emerald-300/60 dark:border-emerald-700/40 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                          >
                                            <CalendarCheck className="w-4 h-4 mr-2" />
                                            Still Book a Tech
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </div>
                              </div>
                            )}

                            {recommendation?.type === "book" && (
                              <div className="rounded-3xl overflow-hidden border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10">
                                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-4 sm:p-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                      <CalendarCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                      <Badge variant="info" className="bg-white/20 backdrop-blur-sm border-0 text-white font-bold px-3 py-1 text-xs mb-1.5">
                                        <Zap className="w-3 h-3 mr-1" />
                                        {recommendation.urgency}
                                      </Badge>
                                      <h3 className="text-white font-black text-lg sm:text-xl leading-tight">
                                        {recommendation.title}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 sm:p-5 space-y-4">
                                  <p className="text-sm sm:text-base font-medium text-blue-900 dark:text-blue-100 leading-relaxed">
                                    {recommendation.description}
                                  </p>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-xl bg-blue-500/8 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/40">
                                      <div className="text-xs text-muted-foreground font-semibold mb-1">Avg Arrival</div>
                                      <div className="font-black text-blue-700 dark:text-blue-400">2-4 hrs</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-blue-500/8 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/40">
                                      <div className="text-xs text-muted-foreground font-semibold mb-1">Diagnostic Fee</div>
                                      <div className="font-black text-blue-700 dark:text-blue-400">Rp 350,000</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                    <Button
                                      size="lg"
                                      className="h-12 sm:h-14 rounded-2xl font-black text-base text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all bg-[length:200%_auto] animate-gradient-shift btn-ripple flex-1"
                                    >
                                      <CalendarCheck className="w-5 h-5 mr-2" />
                                      Book Technician Now
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="lg"
                                      className="h-12 sm:h-14 rounded-2xl font-bold border-blue-300/60 dark:border-blue-700/40 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 flex-1"
                                    >
                                      <Phone className="w-4.5 h-4.5 mr-2" />
                                      Call to Book
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <AIAvatar />
                      <div className="glass rounded-2xl rounded-tl-md shadow-glass border border-white/10">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </AnimatePresence>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
