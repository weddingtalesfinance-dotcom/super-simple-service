import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { icon: "📸", label: "Photographer / Studio", desc: "Individual photographers or full studios", active: true },
  { icon: "🎨", label: "Decorator", desc: "Floral, theme & stage decoration", active: false },
  { icon: "💄", label: "Makeup Artist", desc: "Bridal, editorial & event makeup", active: false },
  { icon: "🏛️", label: "Venue Owner", desc: "Halls, gardens, rooftops & more", active: false },
  { icon: "🎵", label: "Entertainer", desc: "DJs, bands & live performers", active: false },
  { icon: "🍽️", label: "Caterer", desc: "Food & beverage service provider", active: false },
];

const ListMyServices = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{
        background: `
          radial-gradient(ellipse at 15% 10%, hsl(4 75% 93%) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 85%, hsl(6 65% 94%) 0%, transparent 40%),
          hsl(6 55% 97%)
        `,
      }}
    >
      {/* Decorative orbs */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-60px", right: "-40px",
          width: "280px", height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(4 72% 91%) 0%, transparent 65%)",
          opacity: 0.65,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-80px", left: "-50px",
          width: "320px", height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(6 55% 92%) 0%, transparent 65%)",
          opacity: 0.55,
        }}
      />

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-1.5 transition-colors active:scale-95 z-10"
        style={{
          color: "hsl(6 14% 52%)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Content */}
      <div className="relative flex flex-col items-center px-6 pt-14 pb-12">

        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[22px] mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, hsl(4 72% 56%) 0%, hsl(340 62% 58%) 100%)",
              boxShadow: "0 8px 28px hsl(4 72% 54% / 0.25)",
            }}
          >
            💼
          </div>
          <h1
            className="text-[28px] leading-tight font-normal mb-2"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "hsl(6 38% 14%)" }}
          >
            Grow your business on Xito Events
          </h1>
          <p
            className="text-[13px]"
            style={{ color: "hsl(6 14% 52%)", fontFamily: "Poppins, sans-serif" }}
          >
            Choose your service category to get started.
          </p>
        </div>

        {/* Category cards */}
        <div className="w-full max-w-[420px] flex flex-col gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              disabled={!c.active}
              className="group w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all active:scale-[0.98]"
              style={{
                background: c.active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.5)",
                border: "1px solid hsl(6 28% 89%)",
                boxShadow: c.active ? "0 2px 16px hsl(6 28% 50% / 0.06)" : "none",
                backdropFilter: "blur(12px)",
                cursor: c.active ? "pointer" : "default",
                opacity: c.active ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (!c.active) return;
                (e.currentTarget as HTMLElement).style.border = "1px solid hsl(4 72% 60%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px hsl(4 72% 54% / 0.15)";
              }}
              onMouseLeave={(e) => {
                if (!c.active) return;
                (e.currentTarget as HTMLElement).style.border = "1px solid hsl(6 28% 89%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px hsl(6 28% 50% / 0.06)";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "hsl(6 45% 95%)" }}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "hsl(6 38% 14%)", fontFamily: "Poppins, sans-serif" }}
                >
                  {c.label}
                </p>
                <p
                  className="text-[11px] mt-0.5 leading-snug"
                  style={{ color: "hsl(6 14% 52%)", fontFamily: "Poppins, sans-serif" }}
                >
                  {c.desc}
                </p>
              </div>
              {!c.active ? (
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: "hsl(6 28% 92%)",
                    color: "hsl(6 14% 52%)",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  SOON
                </span>
              ) : (
                <svg
                  className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ color: "hsl(4 72% 54%)" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="w-full max-w-[420px] mt-6 rounded-2xl px-5 py-4 text-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid hsl(6 28% 89%)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            className="text-[12px] mb-1"
            style={{ color: "hsl(6 14% 52%)", fontFamily: "Poppins, sans-serif" }}
          >
            Don't see your category? We're adding more soon.
          </p>
          <a
            href="mailto:hello@xito.events"
            className="text-[12px] font-semibold hover:underline"
            style={{ color: "hsl(4 72% 52%)", fontFamily: "Poppins, sans-serif" }}
          >
            Contact us: hello@xito.events
          </a>
        </div>

      </div>
    </div>
  );
};

export default ListMyServices;
