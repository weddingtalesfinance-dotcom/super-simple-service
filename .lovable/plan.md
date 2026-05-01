## Photography Page — Hero Redesign

Replace the current text hero on `/photography` with a carousel of the most-liked photos (across all agency studios), and move the search box into the top nav next to the "Xito.Events" logo.

### 1. Top nav (search relocation)
- In `src/pages/Photography.tsx`, the `<nav>` becomes:
  - Left: `Xito.Events` logo
  - Middle (flex-1): a compact search input ("Search studios by name or city…"), sized smaller on mobile, hidden-icon on very small screens — collapses into a smaller pill but stays visible
  - Right: "← Back to Home" link (icon only on mobile to save space)
- The current search input inside the hero is removed. The same `search` state continues to drive the studio grid below.

### 2. New hero — Top Photos carousel
Replace the existing dark gradient hero with a slimmer header + carousel section:
- Small heading row above the carousel: "Most Loved Shots" + subtitle "Tap any photo to visit the studio".
- Data: fetch top photos via
  ```
  feed_posts (id, user_id, image_url, likes_count)
  joined with freelancer_profiles (business_name, full_name, profile_photo_url, city)
  where account_type='agency' and image_url not null
  order by likes_count desc nulls last
  limit 15
  ```
  We'll do this as a second query in the same `useEffect` (one query for posts, one for profiles by `user_id IN (...)`), since the existing client typings already cover both tables.

- Each slide card shows:
  - The photo (object-cover, fixed height)
  - Bottom overlay gradient with: studio avatar (small circle), business name, city, and a small "♥ N" likes pill on the top-right
  - The whole card is a `<Link to={\`/photography/\${post.user_id}\`}>` so clicking opens that studio's profile

### 3. Carousel behavior (responsive)
Use the existing `embla-carousel-react` (already in `src/components/ui/carousel.tsx`):
- Desktop (≥1024px): 4 slides visible, navigation arrows, snap scrolling
- Tablet (≥640px): 3 slides visible
- Mobile (<640px): **2 slides visible**, **continuous free-scroll** (Embla `dragFree: true`, `loop: true`, `align: 'start'`) — no arrows, swipe only, with a subtle right-edge fade hint
- Slide height: ~280px desktop, ~200px mobile so two fit nicely side-by-side

We'll configure two Embla instances OR (cleaner) one instance with options derived from a `useIsMobile()` check. Plan: single carousel with conditional `opts={{ loop: true, dragFree: isMobile, align: 'start' }}` and CSS basis classes (`basis-1/2 sm:basis-1/3 lg:basis-1/4`).

### 4. Loading & empty states
- Skeleton: 4 grey rectangle slides while loading
- Empty (no agency posts yet): hide the carousel and show a small line "No featured photos yet — be the first to post."

### 5. Files touched
- `src/pages/Photography.tsx` — only file modified
  - Remove old hero `<section>`
  - Add new `TopPhotosCarousel` section (inline component within the same file)
  - Move search input into the `<nav>`
  - Add a fetch for top liked photos to the existing `useEffect`

No database, routing, or other component changes needed. The `/photography/:userId` route already exists.

### Technical snippet
```tsx
const { data: posts } = await supabase
  .from('feed_posts')
  .select('id, user_id, image_url, likes_count')
  .not('image_url', 'is', null)
  .order('likes_count', { ascending: false })
  .limit(30); // fetch extra, then filter to agency user_ids client-side

const agencyIdSet = new Set(agencies.map(a => a.user_id));
const topPhotos = (posts ?? [])
  .filter(p => agencyIdSet.has(p.user_id))
  .slice(0, 15)
  .map(p => ({ ...p, studio: agencyById[p.user_id] }));
```
