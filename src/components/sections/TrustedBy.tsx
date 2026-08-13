"use client";

import { motion } from "framer-motion";
import { Zap, Building2, Shield, Home, Landmark, Store, ShoppingBag, Car } from "lucide-react";
import { cn } from "@/lib/utils";

const companyLogos = [
  {
    name: "PLN",
    fullName: "Perusahaan Listrik Negara",
    icon: Zap,
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    border: "from-green-400/50 via-emerald-500/50 to-teal-500/50",
  },
  {
    name: "Perumahan Indonesia",
    fullName: "Perumahan Indonesia Group",
    icon: Home,
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
    border: "from-orange-400/50 via-amber-500/50 to-yellow-500/50",
  },
  {
    name: "Asuransi Jiwasraya",
    fullName: "PT Asuransi Jiwasraya",
    icon: Shield,
    gradient: "from-blue-400 via-indigo-500 to-violet-500",
    border: "from-blue-400/50 via-indigo-500/50 to-violet-500/50",
  },
  {
    name: "Apartemen Podomoro",
    fullName: "Podomoro City Apartments",
    icon: Building2,
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
    border: "from-rose-400/50 via-pink-500/50 to-fuchsia-500/50",
  },
  {
    name: "ASEAN Property Group",
    fullName: "ASEAN Property Group",
    icon: Landmark,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    border: "from-cyan-400/50 via-sky-500/50 to-blue-500/50",
  },
  {
    name: "IKEA Home Services",
    fullName: "IKEA Home Services Indonesia",
    icon: Store,
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    border: "from-yellow-400/50 via-amber-500/50 to-orange-500/50",
  },
  {
    name: "Tokopedia Mitra",
    fullName: "Tokopedia Mitra Services",
    icon: ShoppingBag,
    gradient: "from-emerald-400 via-green-500 to-lime-500",
    border: "from-emerald-400/50 via-green-500/50 to-lime-500/50",
  },
  {
    name: "Gojek Services",
    fullName: "Gojek Home Services",
    icon: Car,
    gradient: "from-red-400 via-rose-500 to-pink-500",
    border: "from-red-400/50 via-rose-500/50 to-pink-500/50",
  },
];

interface LogoCardProps {
  company: typeof companyLogos[0];
  index: number;
}

function LogoCard({ company, index }: LogoCardProps) {
  const Icon = company.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group flex-shrink-0"
    >
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 bg-gradient-to-br",
          company.border
        )}
      />
      <div
        className={cn(
          "relative glass rounded-2xl px-6 sm:px-8 py-4 sm:py-5 shadow-glass transition-all duration-500 group-hover:shadow-lift",
          "min-w-[200px] sm:min-w-[240px]"
        )}
      >
        <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br opacity-40 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 30%, hsl(var(--border)) 50%, transparent 70%)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="relative flex items-center gap-3 sm:gap-4">
          <div
            className={cn(
              "relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              company.gradient
            )}
          >
            <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-br opacity-40 blur-md", company.gradient)} />
            <Icon className="relative w-5.5 h-5.5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-bold tracking-tight truncate">
              {company.name}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
              {company.fullName}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...companyLogos, ...companyLogos];
  return (
    <div className="relative overflow-hidden py-2 mask-fade-r">
      <motion.div
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
        className="flex items-center gap-4 sm:gap-5"
      >
        {doubled.map((company, index) => (
          <LogoCard key={`${company.name}-${index}`} company={company} index={index % companyLogos.length} />
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section id="trusted" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs sm:text-sm font-medium mb-4 shadow-glass"
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Trusted Partnerships</span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-3 sm:mb-4">
            Trusted by{" "}
            <span className="text-gradient">Leading Companies</span>
            <br className="hidden sm:block" /> &amp; Communities
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Partnering with Indonesia&apos;s largest organizations to deliver
            safe, reliable electrical services across residential and
            commercial properties nationwide.
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <LogoMarquee />
          <LogoMarquee reverse />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "50K+", label: "Happy Customers", color: "from-primary to-cyan-500" },
            { value: "99.2%", label: "On-Time Rate", color: "from-emerald-500 to-teal-500" },
            { value: "30+", label: "Cities Covered", color: "from-amber-400 to-orange-500" },
            { value: "90-Day", label: "Work Guarantee", color: "from-violet-500 to-purple-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="glass rounded-2xl p-4 sm:p-5 text-center shadow-glass"
            >
              <div
                className={cn(
                  "text-2xl sm:text-3xl font-black bg-gradient-to-r bg-clip-text text-transparent tracking-tight",
                  stat.color
                )}
              >
                {stat.value}
              </div>
              <div className="mt-1.5 text-[11px] sm:text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
