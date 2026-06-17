import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OPTIONS = [
  {
    icon: "🎉",
    label: "I'm a Client",
    desc: "Browse and book photographers, venues, decorators, makeup artists, and other professionals for your event.",
    cta: "Find professionals",
    route: "/register?role=client",
    comingSoon: true,
  },
  {
    icon: "💼",
    label: "I'm a Service Provider",
    desc: "List your services, manage bookings, and grow your business on Xito Events.",
    cta: "Join as a professional",
    route: "/service-category",
    comingSoon: false,
  },
];

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
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
        className="absolute pointer-events-none"
        style={{
          top: "-60px", right: "-40px",
          width: "280px", height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(4 72% 91%) 0%, transparent 65%)",
          opacity: 0.65,
        }}
      />
      <div
        className="absolute pointer-events-none"
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
      <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-16" style={{ marginTop: '-60px' }}>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-[22px] font-bold mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, hsl(4 72% 56%) 0%, hsl(340 62% 58%) 100%)",
              boxShadow: "0 8px 28px hsl(4 72% 54% / 0.25)",
            }}
          >
            ✨
          </div>
          <h1
            className="text-[28px] leading-tight font-normal mb-2"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "hsl(6 38% 14%)" }}
          >
            What Would You Like to Do?
          </h1>
          <p
            className="text-[13px]"
            style={{ color: "hsl(6 14% 52%)", fontFamily: "Poppins, sans-serif" }}
          >
            Choose how you want to use Xito Events.
          </p>
        </div>

        {/* Option cards */}
        <div className="w-full max-w-[420px] flex flex-col gap-4">
          {OPTIONS.map((opt) =>
            opt.comingSoon ? (
              <div
                key={opt.label}
                className="relative w-full text-left rounded-2xl px-5 py-5"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid hsl(6 28% 89%)",
                  boxShadow: "0 2px 16px hsl(6 28% 50% / 0.04)",
                  backdropFilter: "blur(12px)",
                  cursor: "not-allowed",
                  opacity: 0.72,
                }}
              >
                {/* Coming Soon badge */}
                <div
                  className="absolute top-3.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                  style={{
                    background: "hsl(6 45% 95%)",
                    color: "hsl(4 72% 52%)",
                    fontFamily: "Poppins, sans-serif",
                    border: "1px solid hsl(4 72% 84%)",
                  }}
                >
                  Coming Soon
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "hsl(6 45% 95%)", opacity: 0.7 }}
                  >
                    {opt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[15px] font-semibold mb-1"
                      style={{ color: "hsl(6 38% 38%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.label}
                    </p>
                    <p
                      className="text-[12px] leading-relaxed mb-3"
                      style={{ color: "hsl(6 14% 62%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.desc}
                    </p>
                    <div
                      className="flex items-center gap-1 text-[12px] font-semibold"
                      style={{ color: "hsl(4 72% 72%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.cta}
                      <svg
                        width="13" height="13"
                        viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={opt.label}
                onClick={() => navigate(opt.route)}
                className="group w-full text-left rounded-2xl px-5 py-5 transition-all active:scale-[0.98]"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  border: "1px solid hsl(6 28% 89%)",
                  boxShadow: "0 2px 16px hsl(6 28% 50% / 0.06)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid hsl(4 72% 60%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px hsl(4 72% 54% / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid hsl(6 28% 89%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px hsl(6 28% 50% / 0.06)";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "hsl(6 45% 95%)" }}
                  >
                    {opt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[15px] font-semibold mb-1"
                      style={{ color: "hsl(6 38% 14%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.label}
                    </p>
                    <p
                      className="text-[12px] leading-relaxed mb-3"
                      style={{ color: "hsl(6 14% 52%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.desc}
                    </p>
                    <div
                      className="flex items-center gap-1 text-[12px] font-semibold"
                      style={{ color: "hsl(4 72% 52%)", fontFamily: "Poppins, sans-serif" }}
                    >
                      {opt.cta}
                      <svg
                        className="group-hover:translate-x-0.5 transition-transform"
                        width="13" height="13"
                        viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
