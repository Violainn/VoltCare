import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransition } from "@/components/providers/motion";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VoltCare — Smart Home Electrical Services, Fast, Safe, and Trusted",
  description:
    "Professional home electrical services in minutes. Book licensed electricians, learn safe DIY fixes, 24/7 emergency service, preventive maintenance, and expert consultation.",
  keywords: [
    "electrician",
    "electrical service",
    "home repair",
    "emergency electrician",
    "smart home",
    "EV charger installation",
    "VoltCare",
  ],
  authors: [{ name: "VoltCare" }],
  openGraph: {
    title: "VoltCare",
    description: "Smart Home Electrical Services, Fast, Safe, and Trusted.",
    type: "website",
  },
  manifest: "/pwa.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="voltcare-theme"
        >
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                borderRadius: "1rem",
                backdropFilter: "blur(16px)",
                background: "rgba(255,255,255,0.9)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
