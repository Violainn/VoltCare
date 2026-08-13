"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
  Sun,
  BatteryFull,
  Battery,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  Upload,
  FileImage,
  FileVideo,
  Star,
  MapPin,
  Briefcase,
  Clock3,
  Heart,
  Check,
  CheckCheck,
  Calendar,
  Timer,
  Tag,
  Receipt,
  CreditCard,
  Landmark,
  Wallet,
  CircleCheck,
  Copy,
  AlertTriangle,
  Zap,
  Filter,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  cn,
  servicesData,
  electricians,
  formatCurrency,
  formatRating,
  getDifficultyColor,
  getUrgencyColor,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea, FloatingLabelTextarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

const urgencyOptions = [
  {
    id: "standard",
    name: "Standard",
    modifier: 0,
    eta: "2-4 hours",
    description: "Regular service during business hours",
    icon: Clock,
  },
  {
    id: "sameday",
    name: "Same Day",
    modifier: 50000,
    eta: "Within 4 hours",
    description: "Guaranteed service today",
    icon: Zap,
  },
  {
    id: "emergency",
    name: "Emergency",
    modifier: 150000,
    eta: "< 45 minutes",
    description: "24/7 immediate response",
    icon: AlertTriangle,
  },
];

const experienceFilters = ["All", "5+", "10+", "15+"];

type SelectedFile = {
  id: string;
  name: string;
  type: "image" | "video";
  size: string;
};

const stepTitles = [
  "Choose Service",
  "Describe Issue",
  "Choose Technician",
  "Schedule",
  "Payment",
];

const stepIcons = [Sparkles, FileImage, Briefcase, Calendar, CreditCard];

function generateTimeSlots() {
  const slots: { time: string; available: boolean }[] = [];
  for (let h = 8; h < 20; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const rand = (h * 60 + m) % 7;
      slots.push({ time, available: rand !== 3 && rand !== 6 });
    }
  }
  return slots;
}

function getDaysNext30Days() {
  const today = new Date();
  const days: {
    date: Date;
    day: string;
    num: number;
    month: string;
    available: boolean;
  }[] = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    days.push({
      date: d,
      day: dayNames[dow],
      num: d.getDate(),
      month: monthNames[d.getMonth()],
      available: dow !== 0,
    });
  }
  return days;
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<SelectedFile[]>([]);
  const [urgency, setUrgency] = useState("standard");
  const [distanceFilter, setDistanceFilter] = useState([10]);
  const [ratingFilter, setRatingFilter] = useState([4]);
  const [priceRange, setPriceRange] = useState([100000, 200000]);
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null);
  const [favoriteTechs, setFavoriteTechs] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInputs, setCardInputs] = useState(["", "", "", ""]);

  const days = useMemo(() => getDaysNext30Days(), []);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const progressValue = ((currentStep + 1) / 5) * 100;

  const filteredServices = useMemo(() => {
    if (!serviceSearch.trim()) return servicesData;
    const q = serviceSearch.toLowerCase();
    return servicesData.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [serviceSearch]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const servicesSubtotal = useMemo(() => {
    return selectedServices.reduce(
      (sum, id) => sum + (servicesData.find((s) => s.id === id)?.price || 0),
      0
    );
  }, [selectedServices]);

  const urgencyFee = useMemo(() => {
    return urgencyOptions.find((u) => u.id === urgency)?.modifier || 0;
  }, [urgency]);

  const travelFee = 15000;
  const discount = couponApplied ? Math.round(servicesSubtotal * 0.1) : 0;
  const totalAmount =
    servicesSubtotal + urgencyFee + travelFee - discount;

  const technician = electricians.find((e) => e.id === selectedTechnician);
  const techFee = technician ? technician.priceHour * 2 : 0;
  const finalTotal = totalAmount + techFee;

  const toggleFavorite = (id: number) => {
    setFavoriteTechs((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredElectricians = useMemo(() => {
    return electricians.filter((e) => {
      const dist = parseFloat(e.distance);
      const price = e.priceHour;
      const rating = e.rating;
      const expYears = parseInt(e.experience);
      if (dist > distanceFilter[0]) return false;
      if (rating < ratingFilter[0]) return false;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (experienceFilter !== "All") {
        const min = parseInt(experienceFilter);
        if (expYears < min) return false;
      }
      return true;
    });
  }, [distanceFilter, ratingFilter, priceRange, experienceFilter]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0:
        return selectedServices.length > 0;
      case 1:
        return issueDescription.trim().length > 10;
      case 2:
        return selectedTechnician !== null;
      case 3:
        return selectedDate !== null && selectedTime !== null;
      case 4:
        return true;
      default:
        return false;
    }
  }, [
    currentStep,
    selectedServices,
    issueDescription,
    selectedTechnician,
    selectedDate,
    selectedTime,
  ]);

  const goNext = () => {
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const placeOrder = () => {
    const id = `VC-${Date.now().toString().slice(-8)}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    setBookingId(id);
    setBookingSuccess(true);
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "VOLTCARE10") {
      setCouponApplied(true);
    }
  };

  const addMockFile = () => {
    const isVideo = Math.random() > 0.5;
    const newFile: SelectedFile = {
      id: Math.random().toString(36).slice(2),
      name: isVideo ? `video_${Date.now()}.mp4` : `photo_${Date.now()}.jpg`,
      type: isVideo ? "video" : "image",
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <section
      id="booking"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/10 via-cyan-500/10 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-amber-500/10 via-primary/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-medium mb-4 sm:mb-5 shadow-glass">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            Book a Technician in{" "}
            <span className="text-gradient">5 Easy Steps</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            From choosing your service to payment confirmation — a seamless,
            transparent booking flow with verified electricians.
          </p>
        </motion.div>

        <Card className="relative glass-strong shadow-glass border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 pointer-events-none" />
          <div className="relative p-5 sm:p-7 lg:p-9">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
                  Step {currentStep + 1} of 5
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  {stepTitles[currentStep]}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCloseDialogOpen(true)}
                className="rounded-full hover:bg-muted shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6 sm:mb-8 space-y-3">
              <div className="hidden sm:flex items-center justify-between gap-2">
                {stepTitles.map((title, idx) => {
                  const StepIcon = stepIcons[idx];
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;
                  return (
                    <div key={title} className="flex items-center gap-2 flex-1">
                      <div
                        className={cn(
                          "flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-300 shrink-0",
                          isActive
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                            : isCompleted
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                            isActive
                              ? "bg-white/20"
                              : isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-background/50"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <StepIcon className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <span className="text-xs font-semibold hidden lg:inline">
                          {title}
                        </span>
                      </div>
                      {idx < stepTitles.length - 1 && (
                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{
                              width: idx < currentStep ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <Progress value={progressValue} className="h-2 sm:h-3" />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50 border-2 border-white"
                  initial={{ left: "0%" }}
                  animate={{
                    left: `calc(${progressValue}% - 10px)`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
            </div>

            <div className="min-h-[500px] relative">
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {currentStep === 0 && (
                      <StepChooseService
                        selectedServices={selectedServices}
                        toggleService={toggleService}
                        filteredServices={filteredServices}
                        serviceSearch={serviceSearch}
                        setServiceSearch={setServiceSearch}
                        servicesSubtotal={servicesSubtotal}
                      />
                    )}
                    {currentStep === 1 && (
                      <StepDescribeIssue
                        issueDescription={issueDescription}
                        setIssueDescription={setIssueDescription}
                        urgency={urgency}
                        setUrgency={setUrgency}
                        uploadedFiles={uploadedFiles}
                        addMockFile={addMockFile}
                        removeFile={removeFile}
                      />
                    )}
                    {currentStep === 2 && (
                      <StepChooseTechnician
                        distanceFilter={distanceFilter}
                        setDistanceFilter={setDistanceFilter}
                        ratingFilter={ratingFilter}
                        setRatingFilter={setRatingFilter}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        experienceFilter={experienceFilter}
                        setExperienceFilter={setExperienceFilter}
                        availableOnly={availableOnly}
                        setAvailableOnly={setAvailableOnly}
                        filteredElectricians={filteredElectricians}
                        selectedTechnician={selectedTechnician}
                        setSelectedTechnician={setSelectedTechnician}
                        favoriteTechs={favoriteTechs}
                        toggleFavorite={toggleFavorite}
                      />
                    )}
                    {currentStep === 3 && (
                      <StepSchedule
                        days={days}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        timeSlots={timeSlots}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                      />
                    )}
                    {currentStep === 4 && (
                      <StepPayment
                        selectedServices={selectedServices}
                        servicesSubtotal={servicesSubtotal}
                        urgency={urgency}
                        urgencyFee={urgencyFee}
                        travelFee={travelFee}
                        discount={discount}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        couponApplied={couponApplied}
                        applyCoupon={applyCoupon}
                        technician={technician}
                        techFee={techFee}
                        finalTotal={finalTotal}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        cardInputs={cardInputs}
                        setCardInputs={setCardInputs}
                      />
                    )}
                  </motion.div>
                ) : (
                  <StepSuccess bookingId={bookingId} />
                )}
              </AnimatePresence>
            </div>

            {!bookingSuccess && (
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Your progress is saved automatically
                  </span>
                </div>
                {currentStep < 4 ? (
                  <Button
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="gap-2 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all bg-[length:200%_auto] animate-gradient-shift"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={placeOrder}
                    className="gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
                    size="lg"
                  >
                    <CircleCheck className="w-5 h-5" />
                    Place Order
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>

        <Dialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
          <DialogContent className="sm:max-w-md glass-strong">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Close Booking Wizard?
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                You&apos;re on Step {currentStep + 1} — {stepTitles[currentStep]}
                . Your progress will be lost if you close now.
              </DialogDescription>
            </DialogHeader>
            <div className="glass rounded-xl p-4 my-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-bold">{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setCloseDialogOpen(false)}
              >
                Continue Booking
              </Button>
              <Button
                variant="destructive"
                onClick={() => setCloseDialogOpen(false)}
              >
                Yes, Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function StepChooseService({
  selectedServices,
  toggleService,
  filteredServices,
  serviceSearch,
  setServiceSearch,
  servicesSubtotal,
}: {
  selectedServices: number[];
  toggleService: (id: number) => void;
  filteredServices: typeof servicesData;
  serviceSearch: string;
  setServiceSearch: (v: string) => void;
  servicesSubtotal: number;
}) {
  return (
    <div className="space-y-5">
      <div className="relative group max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
        <Input
          placeholder="Search services (e.g., 'smart switch', 'EV charger')..."
          value={serviceSearch}
          onChange={(e) => setServiceSearch(e.target.value)}
          className="pl-11 py-6 rounded-2xl text-sm border-border/60"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-[380px] lg:max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
        {filteredServices.map((service, idx) => {
          const Icon = iconMap[service.icon] || Lightbulb;
          const isSelected = selectedServices.includes(service.id);
          return (
            <motion.button
              layout
              key={service.id}
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.02,
                type: "spring",
                stiffness: 200,
              }}
              onClick={() => toggleService(service.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative text-left w-full p-4 rounded-2xl border transition-all duration-300 group",
                isSelected
                  ? "border-primary/50 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent shadow-lg shadow-primary/15 ring-2 ring-primary/20"
                  : "border-border/60 bg-background/40 hover:border-primary/30 hover:bg-background/70"
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/40 z-10"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </motion.div>
              )}
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300",
                    isSelected
                      ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/30"
                      : "bg-gradient-to-br from-primary/10 to-cyan-500/10 text-primary border border-primary/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1 pr-6">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm tracking-tight">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mb-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold",
                        getDifficultyColor(service.difficulty)
                      )}
                    >
                      {service.difficulty}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {service.duration}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-muted-foreground font-medium">
                    Price
                  </div>
                  <div className="text-base font-black text-gradient tracking-tight">
                    {formatCurrency(service.price)}
                  </div>
                </div>
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "text-[10px] px-2.5 py-1",
                    isSelected &&
                      "bg-gradient-to-r from-primary to-secondary border-transparent shadow-md shadow-primary/25"
                  )}
                >
                  {isSelected ? "Selected" : service.category}
                </Badge>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="glass rounded-2xl p-4 sm:p-5 border border-primary/20 shadow-lg shadow-primary/10"
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md shadow-primary/30">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">
                    {selectedServices.length} Service
                    {selectedServices.length > 1 ? "s" : ""} Selected
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Subtotal shown below
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground font-medium">
                  Subtotal
                </div>
                <div className="text-xl font-black text-gradient tracking-tight">
                  {formatCurrency(servicesSubtotal)}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((id) => {
                const s = servicesData.find((x) => x.id === id);
                if (!s) return null;
                const Icon = iconMap[s.icon] || Lightbulb;
                return (
                  <Badge
                    key={id}
                    variant="default"
                    className="gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-primary/20 to-cyan-500/20 text-foreground border border-primary/20 shadow-none hover:from-primary/30 hover:to-cyan-500/30 transition-colors cursor-pointer"
                    onClick={() => toggleService(id)}
                  >
                    <Icon className="w-3 h-3" />
                    {s.title}
                    <X className="w-3 h-3 ml-0.5 opacity-60" />
                  </Badge>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepDescribeIssue({
  issueDescription,
  setIssueDescription,
  urgency,
  setUrgency,
  uploadedFiles,
  addMockFile,
  removeFile,
}: {
  issueDescription: string;
  setIssueDescription: (v: string) => void;
  urgency: string;
  setUrgency: (v: string) => void;
  uploadedFiles: SelectedFile[];
  addMockFile: () => void;
  removeFile: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <FloatingLabelTextarea
            label="Describe the electrical issue in detail..."
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder=" "
            className="min-h-[180px] rounded-2xl"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Tip: Include location, when it started, and any visible issues
            </span>
            <span
              className={cn(
                "font-mono",
                issueDescription.length > 500
                  ? "text-rose-500"
                  : issueDescription.length > 10
                  ? "text-emerald-500"
                  : "text-muted-foreground"
              )}
            >
              {issueDescription.length} chars
            </span>
          </div>

          <div className="mt-5">
            <Label className="text-sm font-semibold mb-3 inline-flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Upload Photos or Videos
              <span className="text-xs font-normal text-muted-foreground ml-1">
                (optional)
              </span>
            </Label>
            <div
              onClick={addMockFile}
              className="group relative border-2 border-dashed border-border/70 rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-cyan-500/0 group-hover:from-primary/5 group-hover:via-cyan-500/5 group-hover:to-amber-500/5 transition-all duration-500" />
              <div className="relative">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/15 flex items-center justify-center group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-lg shadow-primary/0 group-hover:shadow-primary/25">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold mb-1">
                  Drop files here or click to upload
                </div>
                <div className="text-xs text-muted-foreground">
                  PNG, JPG, MP4 up to 25MB each · Max 5 files
                </div>
              </div>
            </div>

            <AnimatePresence>
              {uploadedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {uploadedFiles.map((file) => (
                    <motion.div
                      key={file.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative group rounded-xl border border-border/60 bg-background/50 p-2.5 overflow-hidden"
                    >
                      <div
                        className={cn(
                          "aspect-video rounded-lg flex items-center justify-center mb-2",
                          file.type === "image"
                            ? "bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10"
                            : "bg-gradient-to-br from-rose-500/10 to-orange-500/10"
                        )}
                      >
                        {file.type === "image" ? (
                          <FileImage className="w-8 h-8 text-violet-500/70" />
                        ) : (
                          <FileVideo className="w-8 h-8 text-rose-500/70" />
                        )}
                      </div>
                      <div className="pr-6">
                        <div className="text-[11px] font-semibold truncate">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {file.size}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-muted hover:bg-rose-500 hover:text-white text-muted-foreground flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Label className="text-sm font-semibold mb-3 inline-flex items-center gap-2">
            <Timer className="w-4 h-4 text-primary" />
            Service Urgency
          </Label>
          <div className="space-y-2.5">
            {urgencyOptions.map((opt) => {
              const OptIcon = opt.icon;
              const isActive = urgency === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUrgency(opt.id)}
                  className={cn(
                    "relative w-full text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden",
                    isActive
                      ? "border-primary/50 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent shadow-lg shadow-primary/15 ring-2 ring-primary/20"
                      : "border-border/60 bg-background/40 hover:border-primary/30 hover:bg-background/70"
                  )}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md shadow-primary/30"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/30"
                          : opt.id === "emergency"
                          ? "bg-gradient-to-br from-rose-500/10 to-red-500/10 text-rose-500 border border-rose-500/15"
                          : opt.id === "sameday"
                          ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-amber-500 border border-amber-500/15"
                          : "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-500 border border-blue-500/15"
                      )}
                    >
                      <OptIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-sm">{opt.name}</h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-2 py-0.5",
                            getUrgencyColor(opt.name)
                          )}
                        >
                          {opt.eta}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-2">
                        {opt.description}
                      </p>
                      <div className="text-sm font-black tracking-tight">
                        {opt.modifier === 0 ? (
                          <span className="text-emerald-500">No extra fee</span>
                        ) : (
                          <span className="text-gradient">
                            + {formatCurrency(opt.modifier)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepChooseTechnician({
  distanceFilter,
  setDistanceFilter,
  ratingFilter,
  setRatingFilter,
  priceRange,
  setPriceRange,
  experienceFilter,
  setExperienceFilter,
  availableOnly,
  setAvailableOnly,
  filteredElectricians,
  selectedTechnician,
  setSelectedTechnician,
  favoriteTechs,
  toggleFavorite,
}: {
  distanceFilter: number[];
  setDistanceFilter: (v: number[]) => void;
  ratingFilter: number[];
  setRatingFilter: (v: number[]) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  experienceFilter: string;
  setExperienceFilter: (v: string) => void;
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  filteredElectricians: typeof electricians;
  selectedTechnician: number | null;
  setSelectedTechnician: (v: number | null) => void;
  favoriteTechs: number[];
  toggleFavorite: (id: number) => void;
}) {
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-5">
      <div className="glass rounded-2xl p-4 sm:p-5 space-y-5 border border-border/50 h-fit">
        <div className="flex items-center gap-2 pb-3 border-b border-border/50">
          <Filter className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm">Filter Technicians</h4>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Max Distance</Label>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {distanceFilter[0]} km
            </Badge>
          </div>
          <Slider
            value={distanceFilter}
            onValueChange={setDistanceFilter}
            min={1}
            max={15}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Min Rating</Label>
            <Badge variant="success" className="text-[10px] px-2 py-0.5 gap-1">
              <Star className="w-2.5 h-2.5 fill-current" />
              {ratingFilter[0]}+
            </Badge>
          </div>
          <Slider
            value={ratingFilter}
            onValueChange={setRatingFilter}
            min={3}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Price Range /hr</Label>
            <span className="text-[10px] text-muted-foreground font-mono">
              {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={100000}
            max={250000}
            step={5000}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold">Experience</Label>
          <div className="grid grid-cols-4 gap-1.5">
            {experienceFilters.map((exp) => (
              <button
                key={exp}
                onClick={() => setExperienceFilter(exp)}
                className={cn(
                  "px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200",
                  experienceFilter === exp
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Label className="text-xs font-semibold cursor-pointer">
            Available Now
          </Label>
          <Checkbox
            checked={availableOnly}
            onCheckedChange={(v) => setAvailableOnly(v === true)}
          />
        </div>

        <div className="text-[11px] text-muted-foreground pt-2 border-t border-border/50">
          Showing{" "}
          <span className="font-bold text-foreground">
            {filteredElectricians.length}
          </span>{" "}
          of {electricians.length} technicians
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 max-h-[520px] overflow-y-auto pr-1 no-scrollbar">
        {filteredElectricians.map((tech, idx) => {
          const isSelected = selectedTechnician === tech.id;
          const isFav = favoriteTechs.includes(tech.id);
          return (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.03,
                type: "spring",
                stiffness: 200,
              }}
              layout
              className={cn(
                "relative rounded-2xl p-4 border transition-all duration-300 overflow-hidden group",
                isSelected
                  ? "border-primary/50 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent shadow-xl shadow-primary/20 ring-2 ring-primary/25"
                  : "border-border/60 bg-background/40 hover:border-primary/30 hover:shadow-lg"
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-3 right-12 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </motion.div>
              )}
              <button
                onClick={() => toggleFavorite(tech.id)}
                className={cn(
                  "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-200",
                  isFav
                    ? "bg-rose-500/15 text-rose-500"
                    : "bg-muted/60 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                )}
              >
                <Heart
                  className={cn("w-4 h-4", isFav && "fill-current")}
                />
              </button>

              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-border/50 shrink-0">
                    <img
                      src={tech.photo}
                      alt={tech.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {tech.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md border-2 border-background">
                      <CheckCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-bold text-sm truncate">{tech.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      {formatRating(tech.rating)}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      ({tech.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {tech.completed} completed · {tech.experience}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {tech.skills.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-[10px] px-2 py-0.5 bg-primary/5 border-primary/15 text-primary/80"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mb-3 pt-3 border-t border-border/40">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock3 className="w-3 h-3 text-emerald-500" />
                  <span>Resp. {tech.responseTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span>{tech.distance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <div className="text-[10px] text-muted-foreground font-medium">
                    Rate
                  </div>
                  <div className="text-base font-black text-gradient tracking-tight leading-none">
                    {formatCurrency(tech.priceHour)}
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      /hr
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setSelectedTechnician(tech.id)}
                  className={cn(
                    "gap-1.5",
                    isSelected
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/30"
                      : "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-md shadow-primary/25 bg-[length:200%_auto] animate-gradient-shift"
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Chosen
                    </>
                  ) : (
                    <>
                      Select
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          );
        })}
        {filteredElectricians.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-8 text-center">
            <div className="text-muted-foreground text-sm">
              No technicians match your filters. Try adjusting them.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepSchedule({
  days,
  selectedDate,
  setSelectedDate,
  timeSlots,
  selectedTime,
  setSelectedTime,
}: {
  days: {
    date: Date;
    day: string;
    num: number;
    month: string;
    available: boolean;
  }[];
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  timeSlots: { time: string; available: boolean }[];
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
}) {
  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
      <div className="glass rounded-2xl p-4 sm:p-5 border border-border/50">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <h4 className="font-bold text-sm">Select a Date</h4>
          </div>
          <div className="text-xs text-muted-foreground">
            Next 30 days
          </div>
        </div>
        <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1.5 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold text-muted-foreground py-1.5"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1.5 max-h-[340px] overflow-y-auto no-scrollbar pr-1">
          {(() => {
            const firstDow = days[0].date.getDay();
            const blanks = Array.from({ length: firstDow }, (_, i) => i);
            return (
              <>
                {blanks.map((i) => (
                  <div key={`b-${i}`} />
                ))}
                {days.map((d) => {
                  const isSelected =
                    selectedDate &&
                    d.date.toDateString() === selectedDate.toDateString();
                  const isToday = d.date.toDateString() === new Date().toDateString();
                  return (
                    <motion.button
                      key={d.num + d.month}
                      whileHover={d.available ? { y: -2, scale: 1.05 } : {}}
                      whileTap={d.available ? { scale: 0.95 } : {}}
                      onClick={() => d.available && setSelectedDate(d.date)}
                      disabled={!d.available}
                      className={cn(
                        "relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs transition-all duration-200",
                        !d.available &&
                          "opacity-40 cursor-not-allowed bg-muted/30 line-through text-muted-foreground",
                        d.available &&
                          !isSelected &&
                          "bg-background/50 hover:bg-primary/10 hover:border-primary/30 border border-border/40",
                        isSelected &&
                          "bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/40 border border-transparent"
                      )}
                    >
                      {isToday && (
                        <div
                          className={cn(
                            "absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                            isSelected ? "bg-white" : "bg-primary"
                          )}
                        />
                      )}
                      <span className="font-bold text-sm">{d.num}</span>
                      <span
                        className={cn(
                          "text-[9px]",
                          isSelected
                            ? "text-white/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {d.month}
                      </span>
                    </motion.button>
                  );
                })}
              </>
            );
          })()}
        </div>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-2xl p-4 sm:p-5 border border-border/50">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h4 className="font-bold text-sm">Select a Time</h4>
            </div>
            <div className="text-xs text-muted-foreground">08:00 - 20:00</div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[340px] overflow-y-auto no-scrollbar pr-1">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.time;
              return (
                <motion.button
                  key={slot.time}
                  whileHover={slot.available ? { y: -1, scale: 1.03 } : {}}
                  whileTap={slot.available ? { scale: 0.97 } : {}}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "relative px-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border",
                    !slot.available &&
                      "opacity-40 cursor-not-allowed bg-muted/30 border-border/40 line-through text-muted-foreground",
                    slot.available &&
                      !isSelected &&
                      "bg-background/50 hover:bg-primary/10 border-border/50 hover:border-primary/30",
                    isSelected &&
                      "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-primary/30 bg-[length:200%_auto] animate-gradient-shift"
                  )}
                >
                  {slot.time}
                  {!slot.available && (
                    <div className="absolute -top-1 -right-1 text-[8px] bg-rose-500 text-white px-1 rounded-md font-normal">
                      Full
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {(selectedDate || selectedTime) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass rounded-2xl p-4 border border-primary/20 shadow-lg shadow-primary/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md shadow-primary/30">
                  <CircleCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm">Your Appointment</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Date</span>
                  <span className="font-bold">
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Time</span>
                  <span className="font-bold">{selectedTime || "—"}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <span className="text-muted-foreground text-xs">Duration</span>
                  <span className="font-semibold text-primary">
                    Est. 1 - 2 hrs
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepPayment({
  selectedServices,
  servicesSubtotal,
  urgency,
  urgencyFee,
  travelFee,
  discount,
  couponCode,
  setCouponCode,
  couponApplied,
  applyCoupon,
  technician,
  techFee,
  finalTotal,
  paymentMethod,
  setPaymentMethod,
  cardInputs,
  setCardInputs,
}: {
  selectedServices: number[];
  servicesSubtotal: number;
  urgency: string;
  urgencyFee: number;
  travelFee: number;
  discount: number;
  couponCode: string;
  setCouponCode: (v: string) => void;
  couponApplied: boolean;
  applyCoupon: () => void;
  technician: (typeof electricians)[0] | undefined;
  techFee: number;
  finalTotal: number;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  cardInputs: string[];
  setCardInputs: (v: string[]) => void;
}) {
  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex, JCB" },
    { id: "gopay", name: "GoPay", icon: Wallet, desc: "E-wallet QRIS" },
    { id: "ovo", name: "OVO", icon: Wallet, desc: "E-wallet instant" },
    { id: "bank", name: "Bank Transfer", icon: Landmark, desc: "BCA, Mandiri, BNI, BRI" },
    { id: "cash", name: "Cash", icon: Receipt, desc: "Pay on completion" },
  ];

  const handleCardInput = (idx: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    const next = [...cardInputs];
    next[idx] = cleaned;
    setCardInputs(next);
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-5">
      <div className="space-y-5 order-2 lg:order-1">
        <div className="glass rounded-2xl p-4 sm:p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
            <CreditCard className="w-4 h-4 text-primary" />
            <h4 className="font-bold text-sm">Payment Method</h4>
          </div>
          <div className="space-y-2.5">
            {paymentMethods.map((pm) => {
              const PMIcon = pm.icon;
              const isActive = paymentMethod === pm.id;
              return (
                <motion.button
                  key={pm.id}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={cn(
                    "relative w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3",
                    isActive
                      ? "border-primary/50 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent shadow-md shadow-primary/15 ring-1 ring-primary/20"
                      : "border-border/60 bg-background/40 hover:border-primary/30 hover:bg-background/70"
                  )}
                >
                  <div
                    className={cn(
                      "w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/30"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <PMIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{pm.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {pm.desc}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                      isActive
                        ? "border-primary bg-gradient-to-br from-primary to-secondary"
                        : "border-border/70"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {paymentMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-primary/40 to-cyan-500/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 shadow-md" />
                      <CreditCard className="w-7 h-7 text-white/70" />
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      {cardInputs.map((v, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2.5"
                        >
                          <input
                            value={v}
                            onChange={(e) => handleCardInput(idx, e.target.value)}
                            inputMode="numeric"
                            placeholder="0000"
                            maxLength={4}
                            className="w-full bg-transparent text-white font-mono font-bold tracking-widest text-sm sm:text-base outline-none placeholder:text-white/30"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                          Cardholder
                        </Label>
                        <input
                          placeholder="YOUR NAME"
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs font-semibold text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                            Exp
                          </Label>
                          <input
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs font-mono font-semibold text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-colors"
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] uppercase tracking-wider text-white/50 mb-1 block">
                            CVV
                          </Label>
                          <input
                            placeholder="•••"
                            maxLength={3}
                            inputMode="numeric"
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs font-mono font-semibold text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="glass rounded-2xl p-4 sm:p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-primary" />
            <h4 className="font-bold text-sm">Apply Coupon</h4>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied}
              className="uppercase tracking-wider text-sm"
              onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
            />
            <Button
              variant="outline"
              onClick={applyCoupon}
              disabled={couponApplied}
              className={cn(
                couponApplied &&
                  "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-transparent shadow-md shadow-emerald-500/25"
              )}
            >
              {couponApplied ? (
                <>
                  <Check className="w-4 h-4" />
                  Applied
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          {!couponApplied && (
            <div className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              Try <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px]">VOLTCARE10</code> for 10% off
            </div>
          )}
        </div>
      </div>

      <div className="glass-strong rounded-2xl border border-border/60 shadow-glass overflow-hidden order-1 lg:order-2 h-fit sticky top-4">
        <div className="p-5 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent border-b border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Receipt className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-base">Order Summary</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Review your booking details
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Services ({selectedServices.length})
            </div>
            <div className="space-y-2">
              {selectedServices.map((id) => {
                const s = servicesData.find((x) => x.id === id);
                if (!s) return null;
                return (
                  <div
                    key={id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium leading-tight">
                        {s.title}
                      </span>
                    </div>
                    <span className="font-bold text-sm shrink-0">
                      {formatCurrency(s.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {technician && (
            <div className="pt-3 border-t border-border/40">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Technician
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={technician.photo}
                      alt={technician.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {technician.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      2 hrs @ {formatCurrency(technician.priceHour)}/hr
                    </div>
                  </div>
                </div>
                <span className="font-bold text-sm shrink-0">
                  {formatCurrency(techFee)}
                </span>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border/40 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Services Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(servicesSubtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {urgencyOptions.find((u) => u.id === urgency)?.name} Fee
              </span>
              <span
                className={cn(
                  "font-semibold",
                  urgencyFee > 0 && "text-amber-600 dark:text-amber-400"
                )}
              >
                {urgencyFee === 0 ? "—" : formatCurrency(urgencyFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Travel Fee</span>
              <span className="font-semibold">{formatCurrency(travelFee)}</span>
            </div>
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  Coupon (10%)
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  - {formatCurrency(discount)}
                </span>
              </motion.div>
            )}
          </div>

          <div className="pt-4 border-t-2 border-border/60 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Total
              </div>
              <div className="text-xs text-muted-foreground">
                Incl. VAT & insurance
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-gradient tracking-tight leading-none">
                {formatCurrency(finalTotal)}
              </div>
            </div>
          </div>

          <div className="pt-3 -mt-1">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                <span className="font-bold">90-day Guarantee</span> — free
                re-work if issues arise. 100% money-back guarantee.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSuccess({ bookingId }: { bookingId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="min-h-[400px] flex flex-col items-center justify-center py-10 text-center"
    >
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            delay: 0.1,
          }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <svg
              viewBox="0 0 50 50"
              className="w-12 h-12 sm:w-14 sm:h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M12 26 L22 36 L38 16"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 1.6, 1], opacity: [0.8, 0, 0] }}
            transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 rounded-full border-4 border-emerald-400"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0.5, 0, 0] }}
          transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 rounded-full border-2 border-emerald-300"
        />
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2"
      >
        Booking{" "}
        <span className="text-gradient bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
          Confirmed!
        </span>
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-sm sm:text-base text-muted-foreground max-w-md mb-6"
      >
        Your electrician has been notified. You&apos;ll receive a confirmation
        email and SMS with live tracking details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-5 mb-5 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-semibold">
            Booking ID
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-[10px] text-primary hover:bg-primary/10"
            onClick={() => navigator.clipboard?.writeText(bookingId)}
          >
            <Copy className="w-3 h-3" />
            Copy
          </Button>
        </div>
        <div className="font-mono text-lg sm:text-xl font-black tracking-wider text-gradient bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
          {bookingId}
        </div>
        <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-3 gap-3 text-[11px]">
          <div>
            <div className="text-muted-foreground mb-1">Est. Arrival</div>
            <div className="font-bold text-foreground">30 - 45 min</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Payment</div>
            <div className="font-bold text-foreground">On Completion</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Guarantee</div>
            <div className="font-bold text-emerald-500">90 days</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3 flex-wrap justify-center"
      >
        <Button
          className="gap-2 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all bg-[length:200%_auto] animate-gradient-shift"
        >
          <Receipt className="w-4 h-4" />
          View Booking Details
        </Button>
        <Button variant="outline" className="gap-2">
          <Zap className="w-4 h-4" />
          Back to Home
        </Button>
      </motion.div>
    </motion.div>
  );
}
