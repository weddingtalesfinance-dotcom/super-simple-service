import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  user_id: string;
  full_name: string | null;
  business_name: string | null;
  profile_photo_url: string | null;
  bio: string | null;
  main_job: string | null;
  city: string | null;
  area: string | null;
  contact_number: string | null;
  whatsapp_number: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
  portfolio_links: string[] | null;
  photographer: string | null;
  videographer: string | null;
  photo_editor: string | null;
  video_editor: string | null;
  hybrid_shooter: string | null;
  hybrid_editor: string | null;
  drone_operator: string | null;
  fpv_operator: string | null;
  iphone_shooter: string | null;
  hide_email: boolean | null;
  email: string | null;
  created_at: string | null;
};

type Post = {
  id: string;
  content: string | null;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
};

const SKILL_LABELS: Array<[keyof Profile, string]> = [
  ["photographer", "Photographer"],
  ["videographer", "Videographer"],
  ["photo_editor", "Photo Editor"],
  ["video_editor", "Video Editor"],
  ["hybrid_shooter", "Hybrid Shooter"],
  ["hybrid_editor", "Hybrid Editor"],
  ["drone_operator", "Drone Operator"],
  ["fpv_operator", "FPV Operator"],
  ["iphone_shooter", "iPhone Shooter"],
];

const Logo = () => (
  <Link to="/" className="font-display text-[22px] font-bold text-ink tracking-wide">
    Xito<span className="text-brand">.</span>Events
  </Link>
);

const SocialIcon = ({ kind, href }: { kind: "ig" | "fb" | "yt" | "tt"; href: string }) => {
  const icons = {
    ig: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="sp-ig" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="50%" stopColor="#D62976" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#sp-ig)" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="5" stroke="url(#sp-ig)" strokeWidth="2" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#sp-ig)" />
      </svg>
    ),
    fb: (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12C24 5.373 18.627 0 12 0S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/></svg>
    ),
    yt: (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
    tt: (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#000" d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>
    ),
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-brand hover:bg-brand-soft transition-colors">
      {icons[kind]}
    </a>
  );
};

const StudioProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState(0);
  const [lightbox, setLightbox] = useState<Post | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: prof }, { data: postRows }, { count: followCount }] = await Promise.all([
        supabase
          .from("freelancer_profiles")
          .select("user_id, full_name, business_name, profile_photo_url, bio, main_job, city, area, contact_number, whatsapp_number, instagram, facebook, youtube, tiktok, portfolio_links, photographer, videographer, photo_editor, video_editor, hybrid_shooter, hybrid_editor, drone_operator, fpv_operator, iphone_shooter, hide_email, email, created_at")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("feed_posts")
          .select("id, content, image_url, likes_count, comments_count, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("following_id", userId)
          .eq("status", "accepted"),
      ]);
      if (cancelled) return;
      setProfile((prof as Profile | null) ?? null);
      setPosts((postRows as Post[] | null) ?? []);
      setFollowers(followCount ?? 0);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [userId]);

  const totalLikes = useMemo(() => posts.reduce((s, p) => s + (p.likes_count ?? 0), 0), [posts]);
  const imagePosts = useMemo(() => posts.filter(p => !!p.image_url), [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <p className="text-muted-foreground mb-4">Studio not found.</p>
        <Link to="/photography" className="text-brand text-sm font-semibold">← Back to Photography</Link>
      </div>
    );
  }

  const displayName = profile.business_name?.trim() || profile.full_name?.trim() || "Studio";
  const location = [profile.city, profile.area].filter(Boolean).join(", ");
  const skills = SKILL_LABELS.filter(([k]) => profile[k] === "YES").map(([, l]) => l);
  const igUrl = profile.instagram ? (profile.instagram.startsWith("http") ? profile.instagram : `https://instagram.com/${profile.instagram.replace(/^@/, "")}`) : null;
  const fbUrl = profile.facebook ? (profile.facebook.startsWith("http") ? profile.facebook : `https://facebook.com/${profile.facebook}`) : null;
  const ytUrl = profile.youtube ? (profile.youtube.startsWith("http") ? profile.youtube : `https://youtube.com/${profile.youtube}`) : null;
  const ttUrl = profile.tiktok ? (profile.tiktok.startsWith("http") ? profile.tiktok : `https://tiktok.com/@${profile.tiktok.replace(/^@/, "")}`) : null;
  const waNumber = profile.whatsapp_number?.replace(/[^0-9]/g, "");
  const portfolio = (profile.portfolio_links ?? []).filter(l => l && l.trim());

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* NAV */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 h-16 border-b border-border bg-background/90 backdrop-blur">
        <Logo />
        <Link to="/photography" className="text-[13px] font-medium text-foreground/70 hover:text-brand transition-colors">← All Studios</Link>
      </nav>

      <main className="flex-1 px-4 md:px-6 py-8 max-w-3xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 shrink-0 rounded-full bg-brand-soft overflow-hidden border-2 border-border">
            {profile.profile_photo_url ? (
              <img src={profile.profile_photo_url} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-display font-bold text-brand">{displayName.charAt(0)}</div>
            )}
          </div>
          <div className="flex-1 grid grid-cols-3 text-center">
            <div><p className="text-lg font-bold">{posts.length}</p><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Posts</p></div>
            <div><p className="text-lg font-bold">{totalLikes}</p><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Likes</p></div>
            <div><p className="text-lg font-bold">{followers}</p><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Followers</p></div>
          </div>
        </div>

        {/* IDENTITY */}
        <div className="mt-5 space-y-2">
          <h1 className="font-display text-[26px] font-bold leading-tight">{displayName}</h1>
          {profile.main_job && <p className="text-sm text-brand font-semibold">{profile.main_job}</p>}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map(s => (
                <span key={s} className="text-[10px] uppercase tracking-wider font-semibold bg-brand-soft text-brand px-2 py-0.5 rounded-full border border-brand-soft-border">{s}</span>
              ))}
            </div>
          )}
          {location && <p className="text-xs text-muted-foreground flex items-center gap-1">📍 {location}</p>}
          {profile.bio && <p className="text-sm leading-relaxed pt-1 whitespace-pre-line">{profile.bio}</p>}
          {portfolio.length > 0 && (
            <div className="pt-1 space-y-0.5">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Portfolio</p>
              {portfolio.map((l, i) => {
                const href = l.startsWith("http") ? l : `https://${l}`;
                return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="block text-xs text-brand hover:underline truncate">{l}</a>;
              })}
            </div>
          )}
        </div>

        {/* SOCIAL ICONS */}
        {(igUrl || fbUrl || ytUrl || ttUrl) && (
          <div className="mt-5 flex items-center gap-2.5">
            {igUrl && <SocialIcon kind="ig" href={igUrl} />}
            {fbUrl && <SocialIcon kind="fb" href={fbUrl} />}
            {ytUrl && <SocialIcon kind="yt" href={ytUrl} />}
            {ttUrl && <SocialIcon kind="tt" href={ttUrl} />}
          </div>
        )}

        {/* CONTACT */}
        {(waNumber || profile.contact_number) && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="h-11 rounded-md bg-[#25D366] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                💬 WhatsApp
              </a>
            )}
            {profile.contact_number && (
              <a href={`tel:${profile.contact_number}`} className="h-11 rounded-md bg-brand text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[hsl(var(--primary-hover))] transition">
                📞 Call {profile.contact_number}
              </a>
            )}
          </div>
        )}

        {/* POSTS GRID */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold">Recent Work</h2>
            <span className="text-xs text-muted-foreground">{imagePosts.length} photo{imagePosts.length === 1 ? "" : "s"}</span>
          </div>
          {imagePosts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
              No posts yet.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {imagePosts.map(p => (
                <button
                  key={p.id}
                  onClick={() => setLightbox(p)}
                  className="relative aspect-square overflow-hidden bg-muted group"
                >
                  <img src={p.image_url!} alt={p.content?.slice(0, 60) ?? "Studio post"} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.likes_count > 0 && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100">
                      ♥ {p.likes_count}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in">
          <div onClick={e => e.stopPropagation()} className="max-w-3xl w-full max-h-[90vh] bg-background rounded-xl overflow-hidden flex flex-col cursor-default">
            <img src={lightbox.image_url!} alt="" className="w-full max-h-[70vh] object-contain bg-black" />
            <div className="p-4 text-sm">
              {lightbox.content && <p className="whitespace-pre-line mb-2">{lightbox.content}</p>}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>♥ {lightbox.likes_count}</span>
                <span>💬 {lightbox.comments_count}</span>
                <button onClick={() => setLightbox(null)} className="ml-auto text-brand font-semibold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-brand-dark px-10 py-6 mt-12">
        <div className="text-[11px] text-white/30 text-center">© 2025 Xito Events · Kathmandu, Nepal</div>
      </footer>
    </div>
  );
};

export default StudioProfile;
