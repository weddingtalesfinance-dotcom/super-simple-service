## Goal

1. **Remove** the Videography card from the homepage's "Browse by Category" section (only Photography stays as the active one; Decorators/Makeup/Venues stay greyed out as "Coming Soon").
2. **Make each studio card clickable** on `/photography` — opening a public profile page styled like the Freelancer.xitoevents.com profile.
3. **Order studios by total likes** received across all their feed posts (highest first).

## Changes

### 1. `src/pages/Index.tsx` — categories grid
- Remove the "Videography" entry from the `CATS` array. Final cards: **Photography (active)**, Decorators, Makeup Artists, Venues (all three remain greyed out with "Soon" badge).
- Grid stays at `lg:grid-cols-5` visually? Switch to `lg:grid-cols-4` so 4 cards fill the row cleanly.

### 2. `src/pages/Photography.tsx` — list page updates
- Change the Supabase query so studios are **ordered by total likes**:
  - Fetch all agency profiles.
  - Fetch every `feed_posts` row for those users with `likes_count`, sum per user.
  - Sort the agency list by that sum descending. Studios with 0 likes go to the bottom.
- Wrap each studio card in a `<Link to={`/photography/${user_id}`}>` so the whole card is clickable.
- Add a small "❤ N" badge on each card showing total likes (so the ordering is visible).

### 3. New page `src/pages/StudioProfile.tsx` (route `/photography/:userId`)
Public read-only profile that mirrors the Freelancer app's `ProfileLayout` look, minus auth-only actions (no Follow / Message / Settings — this is a marketing landing page, viewers are not logged in).

Sections, top to bottom:
- **Top bar**: back link to `/photography` + studio name.
- **Header**: 80px avatar + 3 stats (Posts · Total Likes · Followers — followers fetched from `follows` table count).
- **Identity block**: business name (or full_name), `main_job` highlighted, skill badges built from the same `YES`/`NO` columns the freelancer app uses (`photographer`, `videographer`, `photo_editor`, etc.), city · area, bio.
- **Social row**: Instagram / Facebook / YouTube / TikTok icon links (only those that exist), same styling as the Freelancer app.
- **Contact row**: WhatsApp button (deep-links to `wa.me/<number>`) and a Call button (`tel:`) — only visible when contact_number / whatsapp_number is set. No auth wall, since the goal is to drive leads from the landing page.
- **Posts grid**: Instagram-style 3-column grid of all the studio's feed_posts that have `image_url`, ordered newest first. Click a post → open a simple lightbox (image + caption). Empty state: "No posts yet."

Data fetched in parallel with one query per source:
```
freelancer_profiles  where user_id = :id   (single row)
feed_posts           where user_id = :id and image_url not null  order by created_at desc
follows              where following_id = :id and status='accepted'   (head:true count)
```

### 4. `src/App.tsx` — add the new route above the catch-all
```tsx
<Route path="/photography" element={<Photography />} />
<Route path="/photography/:userId" element={<StudioProfile />} />
```

## Technical notes

- All queries use the existing anon-readable RLS on `freelancer_profiles`, `feed_posts`, `follows` — no schema or policy changes needed.
- `likes_count` already lives on each `feed_posts` row (maintained by the `update_feed_likes_count` trigger), so ranking is one cheap query — no extra joins.
- Files touched:

```text
src/pages/Index.tsx           (remove Videography card)
src/pages/Photography.tsx     (sort by total likes, make cards links, show like count)
src/pages/StudioProfile.tsx   (new public profile page)
src/App.tsx                   (new route)
```

Approve to implement.