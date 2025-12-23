-- 1. Blog Yazıları Tablosu
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  author text default 'KF Software Team',
  image_url text,
  is_published boolean default false
);

-- 2. Site Ayarları Tablosu
create table if not exists site_config (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  description text
);

-- 3. SSS (FAQ) Tablosu
create table if not exists faqs (
  id uuid default gen_random_uuid() primary key,
  app_id text not null, -- 'puantajx', 'fismatik' veya 'general'
  question text not null,
  answer text not null,
  order_index int default 0
);

-- Örnek Site Ayarı
insert into site_config (key, value, description)
values ('fismatik_free_limit', '3', 'FişMatik ücretsiz paket günlük fiş sınırı')
on conflict (key) do nothing;

-- 4. Blog Yaz�lar� Tablosuna 'tags' kolonu ekleme
alter table posts add column if not exists tags text[] default '{}';
