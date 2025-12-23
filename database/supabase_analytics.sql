
-- Analytics: Page Views Table
create table if not exists page_views (
  id uuid default gen_random_uuid() primary key,
  path text not null,
  user_agent text,
  referrer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table page_views enable row level security;

-- Allow public to insert (track views from anyone)
create policy "Enable insert for public" on page_views
  for insert with check (true);

-- Allow admins to view stats
create policy "Enable read for authenticated users" on page_views
  for select to authenticated using (true);

-- Optional: Clean up old logs after X days (manual trigger or cron if available)
-- Not adding cron here to keep it simple, but good practice.
