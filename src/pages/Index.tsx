import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupModal } from "@/components/xito/SignupModal";

type Role = "client" | "sp" | null;

const Logo = ({ size = "text-[22px]" }: { size?: string }) => (
  <div className={`font-display ${size} font-bold text-ink tracking-wide`}>
    Xito<span className="text-brand">.</span>Events
  </div>
);

const FooterLogo = () => (
  <div className="font-display text-xl font-bold text-white">
    Xito<span className="text-brand">.</span>Events
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

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselect, setPreselect] = useState<Role>(null);

  const open = (role: Role = null) => { setPreselect(role); setModalOpen(true); };

  return (
    <div className="bg-background text-ink w-full">
      {/* NAV */}
      <nav className="flex items-center justify-between px-10 h-16 border-b border-border bg-background z-10">
        <Logo />
        <div className="hidden md:flex items-center gap-7">
          {["Vendors", "Venues", "Gallery", "Real Events", "Blog"].map(l => (
            <a key={l} href="#" className="text-[13px] font-medium text-foreground/70 hover:text-brand transition-colors">{l}</a>
          ))}
          <button onClick={() => open()} className="bg-brand hover:bg-[hsl(var(--primary-hover))] text-primary-foreground text-[13px] font-medium px-5 py-2.5 rounded transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-[680px]">
          <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">Welcome to Xito Events</div>
          <h1 className="font-display text-[52px] font-bold text-white leading-[1.1] mb-3">
            Nepal's <em className="italic text-brand-light">One-Stop</em><br />Event Platform
          </h1>
          <p className="text-[15px] text-white/65 font-light mb-10 leading-relaxed">
            Find verified photographers, videographers, venues, decorators &amp; more for your wedding or event across Nepal.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => open()} className="inline-block bg-white text-brand text-sm font-semibold px-9 py-3.5 rounded border-2 border-white hover:bg-transparent hover:text-white transition-all">
              Plan My Event
            </button>
            <button onClick={() => open("sp")} className="inline-block bg-transparent text-white text-sm font-medium px-9 py-3.5 rounded border-2 border-white/40 hover:border-white transition-all">
              List My Services
            </button>
          </div>
          <div className="flex items-center justify-center gap-10 mt-10">
            {[
              { num: "93+", label: "Professionals" },
              { num: "500+", label: "Events Covered" },
              { num: "4.9★", label: "Avg Rating" },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-10">
                <div className="text-center">
                  <div className="font-display text-[26px] font-semibold text-white leading-none">{s.num}</div>
                  <div className="text-[10px] tracking-[0.15em] text-white/45 uppercase mt-1">{s.label}</div>
                </div>
                {i < arr.length - 1 && <div className="w-px h-9 bg-white/15" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-brand-soft border-b border-brand-soft-border py-4 px-10 flex items-center justify-center gap-12 flex-wrap">
        {["⭐ Verified Professionals Only", "🔒 100% Secure Bookings", "📅 BS Calendar Integrated", "⚡ Real-time Availability"].map(t => (
          <div key={t} className="text-xs font-medium text-muted-foreground">{t}</div>
        ))}
      </div>

      {/* CATEGORIES */}
      <section className="py-14 px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-[28px] font-semibold text-ink">Browse by <span className="text-brand">Category</span></h2>
            <p className="text-[13px] text-muted-foreground/80 mt-1 font-light">Find the right professional for your event</p>
          </div>
          <a href="#" className="text-xs font-semibold text-brand uppercase tracking-wider">View All →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CATS.map(c => {
            const inner = (
              <>
                <div className="absolute inset-0 flex items-center justify-center text-5xl" style={{ background: c.bg }}>{c.icon}</div>
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

      {/* HOW IT WORKS */}
      <section className="bg-brand-soft py-14 px-10">
        <div>
          <h2 className="font-display text-[28px] font-semibold text-ink">How <span className="text-brand">Xito Works</span></h2>
          <p className="text-[13px] text-muted-foreground/80 mt-1 font-light">Plan your perfect event in 4 simple steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-soft-border border border-brand-soft-border rounded-[10px] overflow-hidden mt-8">
          {STEPS.map(s => (
            <div key={s.n} className="bg-brand-soft p-8 text-center">
              <div className="font-display text-[40px] font-bold leading-none mb-3" style={{ color: "#f0d0d4" }}>{s.n}</div>
              <div className="text-sm font-semibold text-ink mb-1.5">{s.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark px-10 pt-10 pb-6">
        <div className="flex flex-wrap gap-8 justify-between items-start mb-8 pb-8 border-b border-white/[0.07]">
          <div>
            <FooterLogo />
            <div className="text-xs text-white/30 mt-1.5 font-light">Nepal's one-stop event platform</div>
          </div>
          <div className="flex gap-12 flex-wrap">
            {[
              { title: "Platform", links: ["Find Vendors", "Browse Venues", "Real Events"] },
              { title: "Company", links: ["About Us", "Contact", "Blog"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Use"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3">{col.title}</div>
                {col.links.map(l => (
                  <a key={l} href="#" className="block text-[13px] text-white/50 hover:text-white mb-1.5 transition-colors">{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="text-[11px] text-white/20">© 2025 Xito Events · Kathmandu, Nepal</div>
          <div className="text-[11px] text-white/20">Made with ♥ for Nepal's event industry</div>
        </div>
      </footer>

      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} preselect={preselect} />
    </div>
  );
};

export default Index;
