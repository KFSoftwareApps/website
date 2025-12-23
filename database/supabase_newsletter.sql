
-- Newsletter Subscribers Table
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true
);

-- RLS Policies
alter table newsletter_subscribers enable row level security;

-- Allow public insert (anyone can subscribe)
create policy "Enable insert for public" on newsletter_subscribers
  for insert with check (true);

-- Allow authenticated users (Admins) to view list
create policy "Enable read access for authenticated users" on newsletter_subscribers
  for select to authenticated using (true);

-- Allow authenticated users (Admins) to delete
create policy "Enable delete for authenticated users" on newsletter_subscribers
  for delete to authenticated using (true);
