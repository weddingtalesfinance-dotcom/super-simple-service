## Goal

Update the "Browse by Category" section so only **Photography** is active. Clicking it opens a listing page showing all **agency / studio** users from the connected Supabase, each as a card with a few of their recent posted photos.

## Changes

### 1. Homepage category grid (`src/pages/Index.tsx`)
- Replace the current 5 categories with a single set where **Photography** is the only active card.
- Keep the other categories (Videography, Decorators, Makeup, Venues) visible but greyed out and labeled "Coming Soon" so the layout doesn't collapse.
- The Photography card becomes a `<Link to="/photography">` (react-router).

### 2. New listing page `src/pages/Photography.tsx`
- Route: `/photography` (added in `src/App.tsx` above the catch-all).
- Reuses the existing nav + footer styling from Index.
- On mount, queries Supabase:
  ```
  freelancer_profiles
    .select('user_id, full_name, business_name, city, area, profile_photo_url, bio')
    .eq('account_type', 'agency')
  ```
  Then for each agency, fetch the latest 3 feed posts that have an image:
  ```
  feed_posts
    .select('id, image_url')
    .eq('user_id', <id>)
    .not('image_url', 'is', null)
    .order('created_at', { ascending: false })
    .limit(3)
  ```
  Done in one batched `in('user_id', [...])` query, then grouped client-side, so we do exactly 2 round-trips total.
- Renders a responsive grid of **studio cards**. Each card shows:
  - Cover strip: up to 3 thumbnails from their feed posts (fallback to a brand gradient placeholder if they have none).
  - Avatar (`profile_photo_url`) + business name (or full name) as title.
  - Subtitle: `city · area`.
  - Short bio (clamped to 2 lines).
- Loading state: skeleton cards. Empty state: friendly message.
- Cards are not clickable yet (no detail page exists in this project) — that can be added later.

### 3. Optional polish
- Header text on the Photography page: "Photography Studios in Nepal" + count.
- Simple search/filter input by name/city (client-side filter over the loaded list) — small and useful since there are only ~8 agencies today.

## Technical notes

- Uses existing `@/integrations/supabase/client`. No schema changes, no RLS changes — `freelancer_profiles` and `feed_posts` already allow anon SELECT.
- No auth required to view this page.
- All 8 existing agencies in your Supabase will show up immediately (SD Films, Nepa Studio, Picture Point, Ktown Studios, Pana Production, Baddas Weddings, Photo Frame Nepal, Wedding Tales Nepal).

## Files touched

```text
src/pages/Index.tsx        (edit categories grid)
src/pages/Photography.tsx  (new)
src/App.tsx                (add /photography route)
```

Approve to implement.