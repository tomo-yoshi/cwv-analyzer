-- First, check if tables don't exist to avoid conflicts
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

-- Enable RLS if not already enabled
do $$
begin
  execute format('alter table public.organizations enable row level security');
  execute format('alter table public.organization_members enable row level security');
  execute format('alter table public.projects enable row level security');
exception when others then
  null;
end $$; 