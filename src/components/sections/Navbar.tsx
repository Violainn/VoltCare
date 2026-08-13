"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Zap,
  Menu,
  X,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "DIY Guide", href: "#diy" },
  { name: "Emergency", href: "#emergency" },
  { name: "Pricing", href: "#pricing" },
  { name: "Electricians", href: "#electricians" },
  { name: "Safety Tips", href: "#safety" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const currentTheme = mounted ? resolvedTheme || theme : "light";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong shadow-glass border-b border-white/10 py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-500 rounded-xl blur-md opacity-50 animate-pulse-slow" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                  <Zap className="w-5.5 h-5.5 text-white fill-white" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground via-primary to-cyan-500 bg-clip-text text-transparent hidden sm:inline-block">
                VoltCare
              </span>
            </motion.a>

            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group rounded-lg hover:bg-muted/50"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-500 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden sm:flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  aria-label="Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-cyan-500 animate-pulse" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                  }
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTheme === "dark" ? "moon" : "sun"}
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      {currentTheme === "dark" ? (
                        <Sun className="w-4.5 h-4.5" />
                      ) : (
                        <Moon className="w-4.5 h-4.5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="hidden md:flex items-center gap-2 ml-2 pl-2 border-l border-border/60">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/60 rounded-xl transition-all"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-all border border-primary/20"
                >
                  Register
                </motion.button>
              </div>

              <motion.a
                href="#book"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all btn-ripple animate-gradient-shift bg-[length:200%_auto]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Book Technician</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2.5 rounded-xl text-foreground hover:bg-muted/60 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-5.5 h-5.5" />
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-md glass-strong border-l border-white/10 z-[70] xl:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg">
                    <Zap className="w-5.5 h-5.5 text-white fill-white" />
                  </div>
                  <span className="font-bold text-xl tracking-tight">
                    VoltCare
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-muted/60 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5.5 h-5.5" />
                </motion.button>
              </div>

              <div className="flex items-center justify-around p-4 border-b border-border/50">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-cyan-500 animate-pulse" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                  }
                  className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTheme === "dark" ? "moon-mobile" : "sun-mobile"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {currentTheme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-4">
                <div className="space-y-1.5">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index, type: "spring", stiffness: 300, damping: 30 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-cyan-500/10 transition-all group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-5 border-t border-border/50 space-y-3 mt-auto">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl font-medium text-foreground border border-border hover:bg-muted/60 transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl font-medium text-primary border border-primary/20 hover:bg-primary/10 transition-all"
                  >
                    Register
                  </motion.button>
                </div>
                <motion.a
                  href="#book"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-cyan-500 shadow-lg shadow-primary/25 btn-ripple animate-gradient-shift bg-[length:200%_auto]"
                >
                  <Zap className="w-4.5 h-4.5 fill-white" />
                  <span>Book Technician</span>
                </motion.a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
