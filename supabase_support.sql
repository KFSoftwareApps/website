
-- Support Tickets Table
create table if not exists support_tickets (
  id uuid default gen_random_uuid() primary key,
  app text not null, -- 'PuantajX', 'FişMatik', etc.
  topic text not null, -- 'Hesap / Giriş', 'Hata / Bug', etc.
  email text not null,
  message text not null,
  status text default 'open', -- 'open', 'closed', 'in_progress'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table support_tickets enable row level security;

-- Allow public to insert (anyone can submit a ticket)
create policy "Enable insert for public" on support_tickets
  for insert to public with check (true);

-- Allow admins to view and update
create policy "Enable full access for authenticated users" on support_tickets
  for all to authenticated using (true) with check (true);
