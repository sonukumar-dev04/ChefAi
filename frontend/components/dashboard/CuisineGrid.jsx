import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCountryFlag, SUPPORTED_CUISINES } from "@/lib/data";

export default function CuisineGrid({ areas }) {
  const uniqueAreas = Array.from(
    new Map(areas.map((area) => [area.strArea, area])).values(),
  );
  const displayedAreas = uniqueAreas.filter((area) =>
    SUPPORTED_CUISINES.includes(area.strArea),
  );

  return (
    <section className="pb-16">
      <div className="mb-10">
        <p
          className="text-xs uppercase tracking-widest mb-2 font-semibold"
          style={{ color: "#e67e22" }}
        >
          ✦ Global Cuisines
        </p>
        <h2
          className="text-3xl md:text-4xl font-black mb-2"
          style={{ color: "#1a0a00" }}
        >
          Explore cuisines from around the world
        </h2>
        <p className="font-light max-w-md" style={{ color: "#7a5c44" }}>
          From street food to traditional dishes — discover flavors across
          cultures.
        </p>
      </div>

      <div
        className="h-px mb-8"
        style={{
          background: "linear-gradient(to right, #c0392b, transparent)",
        }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayedAreas.map((area) => (
          <Link
            key={area.strArea}
            href={`/recipes/cuisine/${area.strArea
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <div
              className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ede0d4",
              }}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                {getCountryFlag(area.strArea)}
              </span>
              <span
                className="text-sm font-semibold group-hover:text-orange-600 transition-colors truncate"
                style={{ color: "#3d1f0d" }}
              >
                {area.strArea}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div
        className="mt-16 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: "#1a0a00",
          border: "1px solid #2e1200",
        }}
      >
        <div>
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-1"
            style={{ color: "#e67e22" }}
          >
            ✦ Your kitchen awaits
          </p>
          <p className="text-lg font-black" style={{ color: "#fff" }}>
            Cook what you{" "}
            <span className="italic" style={{ color: "#e67e22" }}>
              already
            </span>{" "}
            have at home.
          </p>
        </div>
        <Link href="/pantry">
          <button
            className="flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #c0392b, #e67e22)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(192,57,43,0.35)",
            }}
          >
            Scan my pantry
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}
