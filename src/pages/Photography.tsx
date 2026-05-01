import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

type Agency = {
  user_id: string;
  full_name: string | null;
  business_name: string | null;
  city: string | null;
  area: string | null;
  profile_photo_url: string | null;
  bio: string | null;
};

type Post = { id: string; user_id: string; image_url: string | null; likes_count: number | null; created_at: string };

type StudioRow = Agency & { totalLikes: number; photos: string[] };
type TopPhoto = { id: string; user_id: string; image_url: string; likes_count: number; studio: Agency };

const Logo = () => (
  <Link to="/" className="font-display text-[20px] md:text-[22px] font-bold text-ink tracking-wide shrink-0">
    Xito<span className="text-brand">.</span>Events
  </Link>
);

const FooterLogo = () => (
  <div className="font-display text-xl font-bold text-white">
    Xito<span className="text-brand">.</span>Events
  </div>
);

/* ---------------- Top Photos Carousel ---------------- */
const TopPhotosCarousel = ({ photos, loading }: { photos: TopPhoto[]; loading: boolean }) => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: photos.length > 4,
    align: "start",
    dragFree: isMobile,
    containScroll: "trimSnaps",
  });

  if (loading) {
    return (
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/4 h-[200px] sm:h-[260px] lg:h-[300px] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="text-center py-10 text-sm text-white/70">
        No featured photos yet — be the first to post.
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3 md:gap-4">
          {photos.map((p, idx) => {
            const title = p.studio.business_name?.trim() || p.studio.full_name?.trim() || "Studio";
            const location = [p.studio.city, p.studio.area].filter(Boolean).join(" · ");
            const eager = idx < 4;
            return (
              <Link
                key={p.id}
                to={`/photography/${p.user_id}`}
                className="group relative shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/4 h-[200px] sm:h-[260px] lg:h-[300px] rounded-xl overflow-hidden bg-muted shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <img
                  src={p.image_url}
                  alt={`${title} — featured photo`}
                  loading={eager ? "eager" : "lazy"}
                  // @ts-expect-error fetchpriority is a valid HTML attr
                  fetchpriority={idx === 0 ? "high" : undefined}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Likes pill */}
                <div className="absolute top-2 right-2 text-[11px] font-semibold bg-black/55 backdrop-blur text-white px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                  <span className="text-brand-light">♥</span> {p.likes_count}
                </div>
                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/85 via-black/55 to-transparent">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-brand-soft border border-white/30 shrink-0">
                      {p.studio.profile_photo_url ? (
                        <img src={p.studio.profile_photo_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand text-[11px] font-bold">
                          {title.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] sm:text-[13px] font-semibold text-white truncate leading-tight">{title}</div>
                      {location && <div className="text-[10px] sm:text-[11px] text-white/70 truncate">{location}</div>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop arrows */}
      {!isMobile && photos.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white items-center justify-center shadow-lg z-20 transition"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4 text-ink" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white items-center justify-center shadow-lg z-20 transition"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4 text-ink" />
          </button>
        </>
      )}

      {/* Mobile fade hint */}
      {isMobile && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background/80 to-transparent" />
      )}
    </div>
  );
};

/* ---------------- Page ---------------- */
const Photography = () => {
  const [studiosLoading, setStudiosLoading] = useState(true);
  const [topLoading, setTopLoading] = useState(true);
  const [studios, setStudios] = useState<StudioRow[]>([]);
  const [topPhotos, setTopPhotos] = useState<TopPhoto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    // Run both queries in PARALLEL — agencies + top liked posts
    const agenciesPromise = supabase
      .from("freelancer_profiles")
      .select("user_id, full_name, business_name, city, area, profile_photo_url, bio")
      .eq("account_type", "agency");

    // Pre-fetch the top liked posts directly (no need to wait for agency list).
    // We over-fetch a little (20) then filter client-side to those owned by an agency.
    const topPostsPromise = supabase
      .from("feed_posts")
      .select("id, user_id, image_url, likes_count")
      .not("image_url", "is", null)
      .order("likes_count", { ascending: false, nullsFirst: false })
      .limit(100);

    (async () => {
      const [{ data: ag }, { data: topRaw }] = await Promise.all([agenciesPromise, topPostsPromise]);
      if (cancelled) return;

      const agencies = (ag as Agency[] | null) ?? [];
      const agencyById: Record<string, Agency> = {};
      agencies.forEach(a => { agencyById[a.user_id] = a; });

      // Hero: ready as soon as both small queries resolve
      const top: TopPhoto[] = ((topRaw as Post[] | null) ?? [])
        .filter(p => p.image_url && agencyById[p.user_id])
        .slice(0, 100)
        .map(p => ({
          id: p.id,
          user_id: p.user_id,
          image_url: p.image_url as string,
          likes_count: p.likes_count ?? 0,
          studio: agencyById[p.user_id],
        }));
      setTopPhotos(top);
      setTopLoading(false);

      // Now fetch the rest (all posts for grid likes + thumbnails) in the background.
      // Grid will appear shortly after the hero.
      const ids = agencies.map(a => a.user_id);
      if (!ids.length) {
        setStudios([]);
        setStudiosLoading(false);
        return;
      }

      const { data: posts } = await supabase
        .from("feed_posts")
        .select("user_id, image_url, likes_count, created_at")
        .in("user_id", ids)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      const likesByUser: Record<string, number> = {};
      const photosByUser: Record<string, string[]> = {};
      ((posts as Post[] | null) ?? []).forEach(p => {
        likesByUser[p.user_id] = (likesByUser[p.user_id] ?? 0) + (p.likes_count ?? 0);
        if (p.image_url) {
          if (!photosByUser[p.user_id]) photosByUser[p.user_id] = [];
          if (photosByUser[p.user_id].length < 3) photosByUser[p.user_id].push(p.image_url);
        }
      });

      const rows: StudioRow[] = agencies
        .map(a => ({ ...a, totalLikes: likesByUser[a.user_id] ?? 0, photos: photosByUser[a.user_id] ?? [] }))
        .sort((a, b) => b.totalLikes - a.totalLikes);

      setStudios(rows);
      setStudiosLoading(false);
    })();

    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return studios;
    return studios.filter(a =>
      [a.business_name, a.full_name, a.city, a.area].some(v => v?.toLowerCase().includes(q))
    );
  }, [studios, search]);

  return (
    <div className="bg-background text-ink w-full min-h-screen flex flex-col">
      {/* NAV with inline search */}
      <nav className="flex items-center gap-3 md:gap-6 px-4 md:px-10 h-16 border-b border-border bg-background z-10 sticky top-0">
        <Logo />
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search studios…"
            className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-muted/60 border border-border focus:outline-none focus:ring-2 focus:ring-brand focus:bg-background transition"
            aria-label="Search studios"
          />
        </div>
        <Link
          to="/"
          className="text-[13px] font-medium text-foreground/70 hover:text-brand transition-colors hidden sm:inline"
        >
          ← Back to Home
        </Link>
        <Link
          to="/"
          className="sm:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-brand"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </nav>

      {/* HERO — Top Photos Carousel */}
      <section
        className="relative px-4 md:px-10 py-8 md:py-12 overflow-hidden border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-5 md:mb-7">
            <div>
              <div className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1.5">
                Most Loved Shots
              </div>
              <h1 className="font-display text-[24px] md:text-[36px] font-bold text-white leading-tight">
                <em className="italic text-brand-light">Photography</em> Studios in Nepal
              </h1>
              <p className="text-[12px] md:text-[13px] text-white/65 font-light mt-1">
                Tap any photo to visit the studio
              </p>
            </div>
          </div>

          <TopPhotosCarousel photos={topPhotos} loading={topLoading} />
        </div>
      </section>

      {/* GRID */}
      <section className="flex-1 px-6 md:px-10 py-12">
        <div className="max-w-6xl mx-auto mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-[20px] md:text-[24px] font-bold text-ink">All Studios</h2>
          <span className="text-[12px] text-muted-foreground">
            {studiosLoading ? "Loading…" : `${filtered.length} studio${filtered.length === 1 ? "" : "s"} · ranked by popularity`}
          </span>
        </div>

        {studiosLoading ? (
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
            {filtered.map((a, idx) => {
              const title = a.business_name?.trim() || a.full_name?.trim() || "Studio";
              const location = [a.city, a.area].filter(Boolean).join(" · ") || "Nepal";
              return (
                <Link
                  key={a.user_id}
                  to={`/photography/${a.user_id}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 block"
                >
                  <div className="relative grid grid-cols-3 gap-px h-44 bg-border">
                    {a.photos.length > 0 ? (
                      <>
                        {a.photos.map((url, i) => (
                          <div key={i} className="bg-muted overflow-hidden">
                            <img src={url} alt={`${title} portfolio ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, 3 - a.photos.length) }).map((_, i) => (
                          <div key={`ph-${i}`} className="bg-brand-soft" />
                        ))}
                      </>
                    ) : (
                      <div className="col-span-3 flex items-center justify-center text-4xl" style={{ background: "var(--gradient-cat-1)" }}>📸</div>
                    )}
                    {idx < 3 && (
                      <div className="absolute top-2 left-2 text-[10px] font-bold tracking-wider uppercase bg-brand text-primary-foreground px-2 py-0.5 rounded-full shadow">
                        #{idx + 1} Top
                      </div>
                    )}
                    <div className="absolute top-2 right-2 text-[11px] font-semibold bg-black/55 backdrop-blur text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="text-brand-light">♥</span> {a.totalLikes}
                    </div>
                  </div>

                  <div className="p-4 flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-soft flex items-center justify-center shrink-0 border border-border">
                      {a.profile_photo_url ? (
                        <img src={a.profile_photo_url} alt={`${title} avatar`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-brand font-display font-bold">{title.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-ink truncate group-hover:text-brand transition-colors">{title}</h3>
                      <div className="text-[12px] text-muted-foreground mt-0.5 truncate">{location}</div>
                      {a.bio && (
                        <p className="text-[12px] text-muted-foreground/90 mt-2 leading-relaxed line-clamp-2">{a.bio}</p>
                      )}
                    </div>
                  </div>
                </Link>
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
