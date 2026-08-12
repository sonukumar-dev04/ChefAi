import { Lock, Sparkles } from "lucide-react";

export const P = {
  bg: "#faf7f2",
  dark: "#1a0a00",
  dark2: "#2e1200",
  brown: "#7a5c44",
  brownLight: "#c9a87c",
  cream: "#fff3e0",
  creamBorder: "#f5c6a0",
  border: "#ede0d4",
  white: "#fff",
  crimson: "#c0392b",
  orange: "#e67e22",
  grad: "linear-gradient(135deg, #c0392b, #e67e22)",
  gradText: {
    background: "linear-gradient(90deg, #c0392b, #e67e22)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
};

// ── Small reusable pill ────────────────────────────────────────────
export function Pill({ children, style }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: P.cream,
        color: P.crimson,
        border: `1px solid ${P.creamBorder}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Stat card ──────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 py-5 px-4 rounded-2xl"
      style={{ backgroundColor: P.white, border: `1px solid ${P.border}` }}
    >
      <Icon className="w-4 h-4 mb-0.5" style={{ color: P.crimson }} />
      <span className="text-xs font-light" style={{ color: P.brown }}>
        {label}
      </span>
      <span
        className="text-sm font-black text-center leading-tight w-full break-words"
        style={{ color: P.dark }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Pro lock overlay wrapper ───────────────────────────────────────
export function ProGate({ isPro, label, children }) {
  if (isPro) return <>{children}</>;
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{children}</div>
      <div
        className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
        style={{ background: "rgba(250,247,242,0.85)" }}
      >
        <div
          className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl text-center shadow-lg"
          style={{ backgroundColor: P.dark, border: `1px solid ${P.dark2}` }}
        >
          <Lock className="w-5 h-5" style={{ color: P.orange }} />
          <p className="text-xs font-bold" style={{ color: "#fff" }}>
            {label}
          </p>
          <Pill>
            <Sparkles className="w-3 h-3" /> Pro only
          </Pill>
        </div>
      </div>
    </div>
  );
}
