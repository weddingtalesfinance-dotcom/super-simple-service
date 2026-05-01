import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Agency = {
  user_id: string;
  full_name: string | null;
  business_name: string | null;
  city: string | null;
  area: string | null;
  profile_photo_url: string | null;
  bio: string | null;
};

type Post = { id: string; user_id: string; image_url: string };

const Logo = () => (
  <Link to="/" className="font-display text-[22px] font-bold text-ink tracking-wide">
    Xito<span className="text-brand">.</span>Events
  </Link>
);

const FooterLogo = () => (
  <div className="font-display text-xl font-bold text-white">
    Xito<span className="text-brand">.</span>Events
  </div>
);

const Photography = () => {
  const [loading, setLoading] = useState(true);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [postsByUser, setPostsByUser] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: ag, error } = await supabase
        .from("freelancer_profiles")
        .select("user_id, full_name, business_name, city, area, profile_photo_url, bio")
        .eq("account_type", "agency");

      if (error || !ag) {
        if (!cancelled) { setAgencies([]); setLoading(false); }
        return;
      }

      const ids = ag.map((a: Agency) => a.user_id);
      const grouped: Record<string, string[]> = {};

      if (ids.length) {
        const { data: posts } = await supabase
          .from("feed_posts")
          .select("id, user_id, image_url, created_at")
          .in("user_id", ids)
          .not("image_url", "is", null)
          .order("created_at", { ascending: false });

        (posts as Post[] | null)?.forEach(p => {
          if (!grouped[p.user_id]) grouped[p.user_id] = [];
          if (grouped[p.user_id].length < 3 && p.image_url) grouped[p.user_id].push(p.image_url);
        });
      }

      if (!cancelled) {
        setAgencies(ag as Agency[]);
        setPostsByUser(grouped);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return agencies;
    return agencies.filter(a =>
      [a.business_name, a.full_name, a.city, a.area].some(v => v?.toLowerCase().includes(q))
    );
  }, [agencies, search]);

  return (
    <div className="bg-background text-ink w-full min-h-screen flex flex-col">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-border bg-background z-10">
        <Logo />
        <Link to="/" className="text-[13px] font-medium text-foreground/70 hover:text-brand transition-colors">← Back to Home</Link>
      </nav>

      {/* HEADER */}
      <section className="relative py-16 px-6 md:px-10 overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-3">Browse Category</div>
          <h1 className="font-display text-[40px] md:text-[48px] font-bold text-white leading-[1.1] mb-3">
            <em className="italic text-brand-light">Photography</em> Studios in Nepal
          </h1>
          <p className="text-[14px] text-white/65 font-light">
            {loading ? "Loading verified studios…" : `${filtered.length} verified studio${filtered.length === 1 ? "" : "s"} ready to capture your moments`}
          </p>
          <div className="mt-6 flex justify-center">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or city…"
              className="w-full max-w-md px-4 py-3 rounded-md text-sm bg-white/95 text-ink placeholder:text-muted-foreground border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="flex-1 px-6 md:px-10 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-5xl mb-3">📸</div>
            <p className="text-sm">No studios match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map(a => {
              const photos = postsByUser[a.user_id] ?? [];
              const title = a.business_name?.trim() || a.full_name?.trim() || "Studio";
              const location = [a.city, a.area].filter(Boolean).join(" · ") || "Nepal";
              return (
                <article key={a.user_id} className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  {/* photo strip */}
                  <div className="grid grid-cols-3 gap-px h-44 bg-border">
                    {photos.length > 0 ? (
                      <>
                        {photos.map((url, i) => (
                          <div key={i} className="bg-muted overflow-hidden">
                            <img src={url} alt={`${title} portfolio ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, 3 - photos.length) }).map((_, i) => (
                          <div key={`ph-${i}`} className="bg-brand-soft" />
                        ))}
                      </>
                    ) : (
                      <div className="col-span-3 flex items-center justify-center text-4xl" style={{ background: "var(--gradient-cat-1)" }}>📸</div>
                    )}
                  </div>

                  {/* meta */}
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-soft flex items-center justify-center shrink-0 border border-border">
                      {a.profile_photo_url ? (
                        <img src={a.profile_photo_url} alt={`${title} avatar`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-brand font-display font-bold">{title.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-ink truncate">{title}</h3>
                      <div className="text-[12px] text-muted-foreground mt-0.5 truncate">{location}</div>
                      {a.bio && (
                        <p className="text-[12px] text-muted-foreground/90 mt-2 leading-relaxed line-clamp-2">{a.bio}</p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark px-10 py-6 mt-auto">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <FooterLogo />
          <div className="text-[11px] text-white/30">© 2025 Xito Events · Kathmandu, Nepal</div>
        </div>
      </footer>
    </div>
  );
};

export default Photography;
