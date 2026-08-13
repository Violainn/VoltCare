"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Mail,
  ChevronRight,
  Zap,
  ShieldAlert,
  Lightbulb,
  Home,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn, blogPosts } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const categoryTabs = [
  { name: "All", value: "All", icon: Sparkles },
  { name: "Safety", value: "Safety", icon: ShieldAlert },
  { name: "Myths", value: "Myths", icon: Zap },
  { name: "Energy Saving", value: "Energy Saving", icon: Lightbulb },
  { name: "Smart Home", value: "Smart Home", icon: Home },
  { name: "Guides", value: "Guides", icon: FileText },
];

const categoryColorMap: Record<string, string> = {
  Safety: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Myths: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
  "Energy Saving": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Smart Home": "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  Guides: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const getAuthorInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

function FeaturedPost({ post }: { post: typeof blogPosts[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <Card className="relative overflow-hidden h-full min-h-[480px] border-0 p-0 group/card">
        <div
          className="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: "linear-gradient(135deg, rgba(11,95,255,0.5) 0%, rgba(0,194,255,0.5) 50%, rgba(255,193,7,0.5) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-cyan-500/10 to-amber-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10 scale-105" />
        <div className="relative h-full">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-60" />
          </div>
          <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-white z-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-full border",
                categoryColorMap[post.category] || "bg-white/15 text-white border-white/20"
              )}>
                <BookOpen className="w-3 h-3" />
                {post.category}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white/90 border-white/20 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                Featured
              </Badge>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-3 leading-tight max-w-2xl group-hover:text-primary-foreground">
              {post.title}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-6 max-w-2xl line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border-2 border-white/30 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                    {getAuthorInitials(post.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{post.author}</div>
                  <div className="flex items-center gap-2.5 text-xs text-white/60 mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20 transition-all shadow-lg btn-ripple group/btn"
              >
                Read Article
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function PostCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Card className="relative h-full overflow-hidden p-0 group/card">
        <div
          className="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: "linear-gradient(135deg, rgba(11,95,255,0.5) 0%, rgba(0,194,255,0.5) 50%, rgba(255,193,7,0.5) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="relative h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3">
              <Badge className={cn(
                "px-2.5 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-sm",
                categoryColorMap[post.category] || "bg-white/90 text-foreground border-white/50"
              )}>
                {post.category}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col flex-1 p-5 sm:p-6">
            <h4 className="text-base sm:text-lg font-bold tracking-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2.5 pt-4 mt-auto border-t border-border/50">
              <Avatar className="h-8 w-8 border border-border/40">
                <AvatarFallback className="text-[10px] font-bold bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary">
                  {getAuthorInitials(post.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">{post.author}</div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date.split(",")[0]}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    categoryTabs.slice(1).forEach((tab) => {
      counts[tab.value] = blogPosts.filter((p) => p.category === tab.value).length;
    });
    return counts;
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      return activeCategory === "All" || post.category === activeCategory;
    });
  }, [activeCategory]);

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1, 5);

  return (
    <section id="blog" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-gradient-to-br from-primary/8 via-cyan-500/6 to-transparent rounded-full blur-[120px] -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-amber-500/6 via-primary/4 to-transparent rounded-full blur-[100px] translate-y-1/3 pointer-events-none" />
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
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Knowledge Hub</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-3 sm:mb-5">
            Latest from Our{" "}
            <span className="text-gradient block sm:inline">Electrician Experts</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Safety tips, money-saving hacks, and practical guides from certified master electricians — everything you need to know about your home electrical system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {categoryTabs.map((tab) => {
            const TabIcon: LucideIcon = tab.icon;
            const isActive = activeCategory === tab.value;
            return (
              <motion.button
                key={tab.value}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(tab.value)}
                className={cn(
                  "relative flex-shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                  isActive
                    ? "text-white shadow-xl shadow-primary/30 bg-[length:200%_auto] animate-gradient-shift"
                    : "text-foreground/80 hover:text-foreground glass border border-border/50 hover:border-primary/20"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
                )}
                <span className="relative flex items-center gap-2">
                  <TabIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  <span>{tab.name}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold transition-all duration-300",
                      isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {categoryCounts[tab.value] || 0}
                  </span>
                </span>
              </motion.button>
            );
          })}
          </div>
        </motion.div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {featuredPost && <FeaturedPost key={featuredPost} />}
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
              <AnimatePresence mode="popLayout">
              {secondaryPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl py-16 text-center shadow-glass"
          >
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <div className="relative w-full h-full rounded-2xl bg-muted/60 border border-border flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">No articles in this category</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Check back soon — we&apos;re constantly adding new guides.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 sm:mt-14 glass rounded-3xl p-6 sm:p-8 lg:p-10 shadow-glass relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/15 via-cyan-500/10 to-amber-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-center">
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-2 sm:mb-3">
            <span className="text-gradient">View All Articles</span>{" "}
            & Get Weekly Tips in Your Inbox
          </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Join 50,000+ homeowners getting exclusive safety guides, energy-saving hacks, and early access to new features — no spam, unsubscribe anytime.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 sm:w-80 group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 pr-4 py-5 sm:py-6 rounded-2xl text-sm shadow-inner-glass border border-border/60 focus:border-primary/40"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
              <Button
                size="lg"
                className="rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-[length:200%_auto] animate-gradient-shift btn-ripple whitespace-nowrap"
              >
                Subscribe
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl border-2 hover:border-primary/40 hover:bg-primary/5 whitespace-nowrap"
              >
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
