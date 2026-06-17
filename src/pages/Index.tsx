import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Logo = ({ size = "text-[22px]" }: { size?: string }) => (
  <div className={`font-display ${size} font-bold text-ink tracking-wide`}>
    Xito<span className="text-brand">.</span>Events
  </div>
);

const FooterLogo = () => (
  <div className="font-display text-sm font-semibold text-white/40">
    Xito<span className="text-white/40">.</span>Events
  </div>
);

const CATS = [
  { icon: "📸", label: "Photography", count: "Browse studios", bg: "var(--gradient-cat-1)", href: "/photography", active: true },
  { icon: "🎨", label: "Decorators", count: "Coming soon", bg: "var(--gradient-cat-3)", href: "#", active: false },
  { icon: "💄", label: "Makeup Artists", count: "Coming soon", bg: "var(--gradient-cat-4)", href: "#", active: false },
  { icon: "🏛", label: "Venues", count: "Coming soon", bg: "var(--gradient-cat-5)", href: "#", active: false },
];

const STEPS = [
  { n: "01", title: "Browse Vendors", desc: "Explore verified photographers, venues, decorators & more" },
  { n: "02", title: "Check Availability", desc: "See real-time availability on Nepali BS calendar dates" },
  { n: "03", title: "Book Securely", desc: "Confirm your booking directly through the platform" },
  { n: "04", title: "Enjoy Your Event", desc: "Relax — your team is confirmed and ready" },
];

const PhotoThumbCarousel = ({ photos, fallbackBg, fallbackIcon }: { photos: string[]; fallbackBg: string; fallbackIcon: string }) => {
  const [idx, setIdx] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % photos.length), 2500);
    return () => clearInterval(t);
  }, [photos.length]);

  const allFailed = photos.length > 0 && errorCount >= photos.length;

  if (photos.length === 0 || allFailed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-5xl" style={{ background: fallbackBg }}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black">
      {photos.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          loading="lazy"
          onError={() => setErrorCount(c => c + 1)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const [photoThumbs, setPhotoThumbs] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: agencies } = await supabase
        .from("freelancer_profiles")
        .select("user_id")
        .eq("account_type", "agency");
      if (cancelled) return;
      const agencyIds = (agencies ?? []).map((a: { user_id: string }) => a.user_id);
      if (agencyIds.length === 0) return;

      const { data } = await supabase
        .from("feed_posts")
        .select("image_url")
        .in("user_id", agencyIds)
        .not("image_url", "is", null)
        .order("likes_count", { ascending: false })
        .limit(40);
      if (cancelled) return;
      const urls = (data ?? [])
        .map((d: { image_url: string | null }) => d.image_url)
        .filter((u): u is string => !!u);
      // Shuffle (Fisher–Yates)
      for (let i = urls.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [urls[i], urls[j]] = [urls[j], urls[i]];
      }
      setPhotoThumbs(urls.slice(0, 15));
    })();
    return () => { cancelled = true; };
  }, []);


  return (
    <div style={{ background: "#fff", color: "#1c1c1c" }} className="w-full">
      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", position: "relative", zIndex: 20 }}>
        <div className="flex items-center justify-between pl-6 pr-2 md:px-10 h-16">
          {/* Logo */}
          <div className="font-display text-[22px] font-bold tracking-wide" style={{ color: "#1c1c1c" }}>
            Xito<span style={{ color: "#c0182e" }}>.</span>Events
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {["Vendors", "Venues", "Gallery", "Real Events"].map(l => (
              <a key={l} href="#" className="text-[13px] font-medium transition-colors" style={{ color: "#555" }}>{l}</a>
            ))}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-[13px] font-medium px-5 py-2.5 rounded transition-colors"
                style={{ color: "#555", border: "1px solid #ddd", background: "transparent" }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/get-started")}
                className="text-[13px] font-medium px-5 py-2.5 rounded transition-colors"
                style={{ background: "#c0182e", color: "#fff", border: "none" }}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Mobile: Login + Get Started */}
          <div className="md:hidden flex items-center gap-2 mr-3">
            <button
              onClick={() => navigate("/login")}
              className="text-[13px] font-medium px-3 py-2 rounded transition-colors"
              style={{ color: "#555", border: "1px solid #ddd", background: "transparent" }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/get-started")}
              className="text-[13px] font-medium px-4 py-2 rounded transition-colors"
              style={{ background: "#c0182e", color: "#fff", border: "none" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[320px] md:h-[460px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-[680px]" style={{ marginTop: '-40px' }}>
          <div className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 mb-2 md:mb-4">Welcome to Xito Events</div>
          <h1 className="font-display text-[48px] md:text-[72px] font-bold text-white leading-[1.1] mb-7 md:mb-10">
            Nepal's <em className="italic text-brand-light">One-Stop</em><br />Event Platform
          </h1>
        </div>
        <div className="absolute bottom-5 md:bottom-7 left-0 right-0 z-10 flex items-center justify-center gap-6 md:gap-10">
          {[
            { num: "93+", label: "Professionals" },
            { num: "500+", label: "Events Covered" },
            { num: "4.9★", label: "Avg Rating" },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-6 md:gap-10">
              <div className="text-center">
                <div className="font-display text-[18px] md:text-[26px] font-semibold text-white leading-none">{s.num}</div>
                <div className="text-[9px] md:text-[10px] tracking-[0.15em] text-white/45 uppercase mt-1">{s.label}</div>
              </div>
              {i < arr.length - 1 && <div className="w-px h-6 md:h-9 bg-white/15" />}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED EVENT CARD */}
      <section className="flex items-center justify-center py-5 px-4">
        <div
          onClick={() => navigate("/find-my-photos")}
          className="relative rounded-2xl px-10 py-4 flex flex-col items-center justify-center gap-1 glow-animate cursor-pointer"
          style={{ background: "hsl(15 55% 96%)", border: "1px solid hsl(4 72% 52% / 0.3)", minHeight: "64px", minWidth: "400px" }}
        >
          <p
            className="text-[18px] font-semibold"
            style={{ color: "hsl(4 72% 52%)", fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "0.02em" }}
          >
            Find My Photos
          </p>
          <p className="text-[11px] text-gray-400 tracking-wide">Find every event photo instantly with a simple face scan.</p>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "hsl(6 20% 88%)", boxShadow: "0 4px 12px 0 hsl(6 30% 70% / 0.35)" }} />

      {/* CATEGORIES */}
      <section className="pt-2 pb-14 px-4 md:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-[28px] font-semibold text-ink">Browse by <span className="text-brand">Category</span></h2>
            <p className="text-[13px] text-muted-foreground/80 mt-1 font-light">Find the right professional for your event</p>
          </div>
          <a href="#" className="text-xs font-semibold text-brand uppercase tracking-wider">View All →</a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3.5">
          {CATS.map(c => {
            const isPhotography = c.label === "Photography";
            const inner = (
              <>
                {isPhotography ? (
                  <PhotoThumbCarousel photos={photoThumbs} fallbackBg={c.bg} fallbackIcon={c.icon} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-5xl" style={{ background: c.bg }}>{c.icon}</div>
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }} />
                {!c.active && <div className="absolute inset-0 bg-black/55" />}
                <div className="absolute bottom-0 left-0 right-0 px-3.5 py-4 text-white">
                  <div className="text-[13px] font-semibold leading-tight">{c.label}</div>
                  <div className="text-[11px] font-light text-white/70 mt-0.5">{c.count}</div>
                </div>
                {!c.active && (
                  <div className="absolute top-2 right-2 text-[9px] font-semibold tracking-wider uppercase bg-white/15 backdrop-blur text-white px-2 py-0.5 rounded-full border border-white/20">
                    Soon
                  </div>
                )}
              </>
            );
            const cls = `rounded-[10px] overflow-hidden relative aspect-[3/4] block ${c.active ? "cursor-pointer hover:-translate-y-1 transition-transform" : "cursor-not-allowed opacity-80"}`;
            return c.active ? (
              <Link key={c.label} to={c.href} className={cls}>{inner}</Link>
            ) : (
              <div key={c.label} className={cls} aria-disabled>{inner}</div>
            );
          })}
        </div>
      </section>


      {/* DOWNLOAD APP SECTION */}
      <section className="px-5 md:px-10 py-10 md:py-14 flex flex-col items-center text-center gap-5" style={{ background: "linear-gradient(135deg, hsl(350 78% 42% / 0.06) 0%, hsl(15 55% 96% / 0.8) 100%)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "hsl(4 72% 52%)", boxShadow: "0 6px 24px hsl(4 72% 52% / 0.3)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-[26px] md:text-[32px] font-bold text-gray-900">Take Xito Events with you</h2>
        </div>
        <button
          onClick={() => navigate("/download-app")}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-[15px] transition-all active:scale-95 hover:opacity-90"
          style={{ background: "hsl(4 72% 52%)", boxShadow: "0 4px 20px hsl(4 72% 52% / 0.35)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Get App
        </button>
        <div className="flex items-center gap-3 text-[12px] text-gray-400">
          <span>🤖 Android</span>
          <span>·</span>
          <span>Free to download</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark px-5 md:px-10 pt-6 md:pt-10 pb-4 md:pb-6">
        <div className="flex flex-col items-center gap-4 mb-5 md:mb-8 pb-5 md:pb-8 border-b border-white/[0.07]">
          <FooterLogo />
          <div className="flex gap-4 md:gap-6 items-center justify-center">
            {["About Us", "Contact", "Privacy Policy", "Terms of Use"].map(l => (
              <a key={l} href="#" className="text-[12px] md:text-[13px] text-white/50 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-[10px] md:text-[11px] text-white/20">© 2025 Xito Events · Kathmandu, Nepal</div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
