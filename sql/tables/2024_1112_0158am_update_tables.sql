-- First, check if tables don't exist to avoid conflicts
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

create table if not exists public.organizations (
  id uuid not null default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

create table if not exists public.organization_members (
  profile_id uuid not null references public.profiles on delete cascade,
  organization_id uuid not null references public.organizations on delete cascade,
  role text not null default 'MEMBER' check (role in ('OWNER', 'ADMIN', 'MEMBER')),
  created_at timestamp with time zone not null default now(),
  primary key (profile_id, organization_id)
);

create table if not exists public.projects (
  id uuid not null default gen_random_uuid(),
  name text not null,
  organization_id uuid not null references public.organizations on delete cascade,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Create enum for strategy type if it doesn't exist
do $$ 
begin
  create type strategy_type as enum ('mobile', 'desktop');
exception when duplicate_object then
  null;
end $$;

-- Create the TBT Records table if it doesn't exist
create table if not exists public.tbt_records (
  id uuid not null default gen_random_uuid(),
  display_name text not null,
  url text not null,
  records jsonb not null,
  strategy strategy_type not null,
  project_id uuid not null references public.projects on delete cascade,
  profile_id uuid not null references public.profiles on delete cascade,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Create indexes if they don't exist
create index if not exists tbt_records_project_id_idx on public.tbt_records(project_id);
create index if not exists tbt_records_profile_id_idx on public.tbt_records(profile_id);

-- Enable RLS if not already enabled
do $$
begin
  execute format('alter table public.profiles enable row level security');
  execute format('alter table public.organizations enable row level security');
  execute format('alter table public.organization_members enable row level security');
  execute format('alter table public.projects enable row level security');
  execute format('alter table public.tbt_records enable row level security');
exception when others then
  null;
end $$;

-- Create RLS policies for tbt_records if they don't exist
do $$
begin
  create policy "Users can view their own records" on public.tbt_records
    for select using (auth.uid() = profile_id);
    
  create policy "Users can insert their own records" on public.tbt_records
    for insert with check (auth.uid() = profile_id);
    
  create policy "Users can update their own records" on public.tbt_records
    for update using (auth.uid() = profile_id);
    
  create policy "Users can delete their own records" on public.tbt_records
    for delete using (auth.uid() = profile_id);
exception when duplicate_object then
  null;
end $$;