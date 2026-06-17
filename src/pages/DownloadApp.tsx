import { useNavigate } from "react-router-dom";

export default function DownloadApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="font-display text-[18px] font-bold text-gray-900">
          Xito<span className="text-[hsl(4_72%_52%)]">.</span>Events
        </div>
        <div className="w-12" />
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-start text-center px-6 pt-14 pb-6 gap-4" style={{ background: "linear-gradient(160deg, hsl(350 78% 42% / 0.07) 0%, hsl(0 0% 100%) 60%)" }}>
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-2" style={{ background: "hsl(4 72% 52%)", boxShadow: "0 8px 32px hsl(4 72% 52% / 0.35)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>
        <h1 className="font-display text-[32px] md:text-[42px] font-bold text-gray-900 leading-tight">
          Get the Xito Events App
        </h1>

        <a
          href="/freelancer-download"
          onClick={(e) => { e.preventDefault(); navigate("/freelancer-download"); }}
          className="flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-semibold text-[15px] mt-2 transition-all hover:opacity-90 active:scale-95"
          style={{ background: "hsl(4 72% 52%)", boxShadow: "0 6px 24px hsl(4 72% 52% / 0.35)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Get App
        </a>
        <p className="text-[11px] text-gray-400">Android · Direct install</p>
      </section>

      {/* Footer */}
      <footer className="py-5 text-center text-[11px] text-gray-300 border-t border-gray-100">
        © 2025 Xito Events · Kathmandu, Nepal
      </footer>
    </div>
  );
}
