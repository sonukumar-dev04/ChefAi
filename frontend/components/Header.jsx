"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  LayoutDashboard,
  ShoppingBasket,
  Sparkles,
  Flame,
  Menu,
  X,
} from "lucide-react";
import PricingModal from "./PricingModal";
import UserDropdown from "./UserDropdown";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/recipes", label: "Recipes", icon: UtensilsCrossed },
  { href: "/pantry", label: "Pantry", icon: ShoppingBasket },
];

const Header = () => {
  const { isLoaded: clerkLoaded, isSignedIn } = useUser();

  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!clerkLoaded) return;

    if (!isSignedIn) {
      setUser(null);
      setCheckingUser(false);
      return;
    }

    setCheckingUser(true);
    fetch("/api/check-user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setCheckingUser(false));
  }, [clerkLoaded, isSignedIn]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  const authLoading = !clerkLoaded || (isSignedIn && checkingUser);

  const isPro = user?.subscriptionTier === "pro";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-18"
        style={{
          backgroundColor: "rgba(250,247,242,0.97)",
          borderBottom: "1px solid #e8e0d5",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#c0392b" }}
              suppressHydrationWarning
            >
              <Flame className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-bold"
              style={{ color: "#1a0a00", letterSpacing: "-0.03em" }}
            >
              Chef<span style={{ color: "#c0392b" }}>AI</span>
            </span>
          </Link>

          {/* ── Desktop Nav — centered ── */}
          {user && (
            <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href || pathname?.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      color: active ? "#c0392b" : "#7a5c44",
                      backgroundColor: active ? "#fdf0ec" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = "#f5ede6";
                        e.currentTarget.style.color = "#1a0a00";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#7a5c44";
                      }
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5"
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <HowToCookModal />
            </div>

            {authLoading ? (
              <div className="flex items-center gap-2">
                <style jsx>{`
                  @keyframes headerShimmer {
                    0% {
                      background-position: -120% 0;
                    }
                    100% {
                      background-position: 220% 0;
                    }
                  }
                  .header-shimmer {
                    background-color: #f0e6da;
                    background-image: linear-gradient(
                      90deg,
                      rgba(240, 230, 218, 0) 0%,
                      rgba(255, 255, 255, 0.9) 50%,
                      rgba(240, 230, 218, 0) 100%
                    );
                    background-size: 60% 100%;
                    background-repeat: no-repeat;
                    animation: headerShimmer 1.3s ease-in-out infinite;
                  }
                `}</style>
                <div className="hidden sm:block h-8 w-20 rounded-full header-shimmer" />
                <div className="w-8 h-8 rounded-full header-shimmer" />
              </div>
            ) : user ? (
              <>
                <PricingModal subscriptionTier={user.subscriptionTier}>
                  <button
                    className="hidden sm:flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-85"
                    style={
                      isPro
                        ? {
                            background:
                              "linear-gradient(135deg, #c0392b, #e67e22)",
                            color: "#fff",
                          }
                        : {
                            backgroundColor: "#f5ede6",
                            color: "#7a4f3a",
                            border: "1px solid #e8d5c4",
                          }
                    }
                  >
                    <Sparkles className="w-3 h-3" />
                    {isPro ? "Pro Chef" : "Upgrade"}
                  </button>
                </PricingModal>

                <UserDropdown />

                <button
                  className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                  style={{ color: "#7a5c44" }}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button
                    className="h-8 px-3.5 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: "#7a5c44" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5ede6";
                      e.currentTarget.style.color = "#1a0a00";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#7a5c44";
                    }}
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    className="h-8 px-4 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#c0392b" }}
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {user && mobileOpen && (
        <div
          className="fixed top-14 left-0 right-0 z-40 md:hidden"
          style={{
            backgroundColor: "#faf7f2",
            borderBottom: "1px solid #e8e0d5",
            boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
          }}
        >
          <div className="px-4 pt-3 pb-4 flex flex-col gap-1">
            {/* Nav links */}
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname?.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium"
                  style={{
                    color: active ? "#c0392b" : "#3d1f0d",
                    backgroundColor: active ? "#fdf0ec" : "transparent",
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
                  {label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-2 h-px" style={{ backgroundColor: "#e8e0d5" }} />

            {/* Cook a Dish — full row treatment */}
            <HowToCookModal />

            {/* Upgrade — only for free users */}
            {!isPro && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <button
                  className="mt-1 flex items-center gap-2 w-full px-3 py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: "#fdf0ec",
                    color: "#c0392b",
                    border: "1px solid #f5c6a0",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Pro Chef
                </button>
              </PricingModal>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
