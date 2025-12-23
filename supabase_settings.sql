
-- 1. Site Settings Table (Key-Value Store)
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for settings
alter table site_settings enable row level security;

-- Allow public read (e.g. fetching prices on landing page)
create policy "Public read access" on site_settings
  for select to public using (true);

-- Allow admins to update
create policy "Admin update access" on site_settings
  for update to authenticated using (true) with check (true);

-- Allow admins to insert (initial setup)
create policy "Admin insert access" on site_settings
  for insert to authenticated with check (true);


-- 2. FAQs Table
create table if not exists faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  category text default 'general', -- 'general', 'puantajx', 'fismatik'
  display_order integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for FAQs
alter table faqs enable row level security;

-- Allow public read
create policy "Public read faqs" on faqs
  for select to public using (is_published = true);

-- Allow admins full access
create policy "Admin full access faqs" on faqs
  for all to authenticated using (true) with check (true);

-- Initial Data Seeds (Optional default structure for prices)
insert into site_settings (key, value, description)
values 
  ('pricing_puantajx', '{"monthly": 150, "yearly": 1500}', 'PuantajX Abonelik Fiyatları'),
  ('pricing_fismatik', '{"lifetime": 499}', 'FişMatik Tek Seferlik Fiyat')
on conflict (key) do nothing;
