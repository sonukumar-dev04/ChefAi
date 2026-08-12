import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { neobrutalism } from "@clerk/ui/themes";
import { Toaster } from "@/components/ui/sonner";
import { Flame } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chef-AI Recipes Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`} suppressHydrationWarning>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* ── Footer ── */}
          <footer
            style={{
              backgroundColor: "#faf7f2",
              borderTop: "1px solid #e8e0d5",
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "#c0392b" }}
                >
                  <Flame className="w-3 h-3 text-white" strokeWidth={2.5} />
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: "#1a0a00", letterSpacing: "-0.02em" }}
                >
                  Chef<span style={{ color: "#c0392b" }}>AI</span>
                </span>
              </Link>

              <p className="text-xs italic" style={{ color: "#b09070" }}>
                Cook what you already have. Waste less, eat better.
              </p>

              {/* Right */}
              <p className="text-xs" style={{ color: "#b09070" }}>
                © {new Date().getFullYear()} ChefAI
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
