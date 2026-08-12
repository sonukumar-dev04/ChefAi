"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChefHat, Search, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useUser, useClerk } from "@clerk/nextjs";

const suggestions = [
  "Butter Chicken",
  "Masala Dosa",
  "Biryani",
  "Pasta Carbonara",
  "Chocolate Lava Cake",
];

export default function HowToCookModal() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { isLoaded: authLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    if (!authLoaded) {
      toast.error("Still checking your session — try again in a moment");
      return;
    }

    if (!isSignedIn) {
      handleOpenChange(false);
      toast.error("Please sign in to generate a recipe");
      openSignIn();
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setRecipeName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span
          suppressHydrationWarning
          className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "#7a5c44" }}
        >
          <ChefHat className="w-4 h-4" />
          Cook a Dish
        </span>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md w-[calc(100%-2rem)] p-0 gap-0 border-0 rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#fdf6ee" }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div
          className="px-6 pt-6 pb-5"
          style={{ backgroundColor: "#fff", borderBottom: "1px solid #ede0d4" }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
            style={{
              backgroundColor: "#fff3e0",
              color: "#b91c1c",
              border: "1px solid #f5c6a0",
            }}
          >
            <Sparkles className="w-3 h-3" />
            Powered by AI
          </span>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#fff3e0" }}
            >
              <ChefHat className="w-5 h-5" style={{ color: "#b91c1c" }} />
            </div>
            <div>
              <DialogTitle
                className="text-xl font-black tracking-tight"
                style={{ color: "#1a0800" }}
              >
                Find a Recipe
              </DialogTitle>
              <p
                className="text-xs font-light mt-0.5"
                style={{ color: "#7a5c44" }}
              >
                Tell us what to cook — we'll do the rest.
              </p>
            </div>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="px-6 py-6">
          {/* Notice for signed-out users */}
          {authLoaded && !isSignedIn && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold"
              style={{
                backgroundColor: "#fff3e0",
                color: "#b45309",
                border: "1px solid #f5c6a0",
              }}
            >
              You&apos;ll need to sign in to generate a recipe. We&apos;ll
              prompt you when you hit &quot;Show Me How&quot;.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#d97706" }}
              >
                Which dish are you craving?
              </label>

              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#c9a87c" }}
                />
                <input
                  type="text"
                  placeholder="e.g. Dal Makhani, Tacos, Tiramisu…"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 text-sm rounded-xl focus:outline-none transition-all"
                  style={{
                    backgroundColor: "#fff",
                    border: "1.5px solid #ede0d4",
                    color: "#1a0800",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#b91c1c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(185,28,28,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ede0d4";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Suggestions */}
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: "#fff", border: "1px solid #ede0d4" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#c9a87c" }}
              >
                ✦ People are cooking
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRecipeName(item)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor:
                        recipeName === item ? "#fff3e0" : "#fdf6ee",
                      color: recipeName === item ? "#b91c1c" : "#7a5c44",
                      border: `1px solid ${recipeName === item ? "#f5a78a" : "#ede0d4"}`,
                    }}
                    onMouseEnter={(e) => {
                      if (recipeName !== item) {
                        e.currentTarget.style.backgroundColor = "#fff3e0";
                        e.currentTarget.style.color = "#b91c1c";
                        e.currentTarget.style.borderColor = "#f5a78a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (recipeName !== item) {
                        e.currentTarget.style.backgroundColor = "#fdf6ee";
                        e.currentTarget.style.color = "#7a5c44";
                        e.currentTarget.style.borderColor = "#ede0d4";
                      }
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={!recipeName.trim()}
              className="w-full h-12 flex items-center justify-center gap-2 text-sm font-bold rounded-xl transition-opacity disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #b91c1c, #d97706)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(185,28,28,0.35)",
              }}
            >
              <ChefHat className="w-4 h-4" />
              {authLoaded && !isSignedIn
                ? "Sign In to Continue"
                : "Show Me How"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
