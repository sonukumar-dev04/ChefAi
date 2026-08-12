import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  LogIn,
  RefreshCw,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import { SignInButton } from "@clerk/nextjs";
import { P } from "./recipe-ui";

export function NoRecipeState() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: P.bg }}
    >
      <div
        className="max-w-md w-full rounded-3xl p-12 text-center"
        style={{
          backgroundColor: P.dark,
          border: `1px solid ${P.dark2}`,
          boxShadow: "0 8px 40px rgba(192,57,43,0.15)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <UtensilsCrossed className="w-8 h-8" style={{ color: P.orange }} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "#fff" }}>
          No recipe selected
        </h2>
        <p className="font-light mb-7" style={{ color: "#a87d5e" }}>
          Head to the dashboard and pick something delicious to cook.
        </p>
        <Link href="/dashboard">
          <button
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{
              background: P.grad,
              color: "#fff",
              boxShadow: "0 4px 20px rgba(192,57,43,0.4)",
            }}
          >
            Browse Recipes <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export function LoadingState({ recipeName }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: P.bg }}
    >
      <div className="max-w-sm w-full text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-7"
          style={{
            backgroundColor: P.cream,
            border: `1px solid ${P.creamBorder}`,
          }}
        >
          <ClockLoader color={P.crimson} size={36} />
        </div>
        <h2 className="text-2xl font-black mb-3" style={{ color: P.dark }}>
          Crafting your recipe…
        </h2>
        <p className="font-light mb-8" style={{ color: P.brown }}>
          Our AI chef is writing every step for{" "}
          <span className="font-bold" style={{ color: P.crimson }}>
            {recipeName}
          </span>
        </p>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: P.border }}
        >
          <div
            className="h-full rounded-full animate-pulse"
            style={{ background: P.grad, width: "60%" }}
          />
        </div>
      </div>
    </div>
  );
}

export function AuthRequiredState({ recipeName }) {
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: P.bg }}
    >
      <div
        className="max-w-md w-full rounded-3xl p-12 text-center"
        style={{
          backgroundColor: P.dark,
          border: `1px solid ${P.dark2}`,
          boxShadow: "0 8px 40px rgba(192,57,43,0.15)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            backgroundColor: "rgba(217,119,6,0.18)",
            border: "1px solid rgba(217,119,6,0.3)",
          }}
        >
          <LogIn className="w-8 h-8" style={{ color: P.orange }} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "#fff" }}>
          Sign in to continue
        </h2>
        <p className="font-light mb-7" style={{ color: "#a87d5e" }}>
          {recipeName ? (
            <>
              You need to be signed in for our AI chef to cook up{" "}
              <span className="font-bold" style={{ color: P.orange }}>
                {recipeName}
              </span>
              .
            </>
          ) : (
            "You need to be signed in to generate a recipe."
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#c9a87c",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
          <SignInButton mode="modal">
            <button
              className="inline-flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-opacity hover:opacity-90"
              style={{
                background: P.grad,
                color: "#fff",
                boxShadow: "0 4px 16px rgba(192,57,43,0.35)",
              }}
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}

export function ErrorState() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: P.bg }}
    >
      <div
        className="max-w-md w-full rounded-3xl p-12 text-center"
        style={{
          backgroundColor: P.dark,
          border: `1px solid ${P.dark2}`,
          boxShadow: "0 8px 40px rgba(192,57,43,0.15)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            backgroundColor: "rgba(192,57,43,0.2)",
            border: "1px solid rgba(192,57,43,0.3)",
          }}
        >
          <AlertCircle className="w-8 h-8" style={{ color: P.orange }} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "#fff" }}>
          Recipe failed to load
        </h2>
        <p className="font-light mb-7" style={{ color: "#a87d5e" }}>
          Something went wrong on our end. Give it another shot.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#c9a87c",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{
              background: P.grad,
              color: "#fff",
              boxShadow: "0 4px 16px rgba(192,57,43,0.35)",
            }}
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export function SuspenseFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: P.bg }}
    >
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            backgroundColor: P.cream,
            border: `1px solid ${P.creamBorder}`,
          }}
        >
          <Loader2
            className="w-8 h-8 animate-spin"
            style={{ color: P.crimson }}
          />
        </div>
        <p className="font-semibold" style={{ color: P.brown }}>
          Loading recipe…
        </p>
      </div>
    </div>
  );
}
