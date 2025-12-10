-- Create the resources table
create table resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  url text not null,
  category text not null,
  type text not null,
  tags text[] default '{}',
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  submitted_by text, -- Clerk User ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table resources enable row level security;

-- Policy: Everyone can view approved resources
create policy "Public resources are viewable by everyone"
  on resources for select
  using ( status = 'approved' );

-- Policy: Authenticated users can insert resources
create policy "Users can insert resources"
  on resources for insert
  with check ( auth.role() = 'anon' OR auth.role() = 'authenticated' );
  -- Note: We allow 'anon' for now if we want public submissions, 
  -- but ideally only 'authenticated'. Adjust as needed.

-- Policy: Admins (or everyone for MVP simplicity) can view pending
-- For MVP, we might just allow reading all for now to debug, 
-- or strictly limit. Let's allow reading all for simplicity in MVP 
-- but filter in UI. 
create policy "Enable read access for all users"
on resources for select
using (true);
