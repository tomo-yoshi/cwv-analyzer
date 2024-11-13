-- Enable RLS
alter table organizations enable row level security;
alter table organization_members enable row level security;

-- Drop all existing policies
drop policy if exists "Anyone can create organizations" on organizations;
drop policy if exists "Anyone can create organization members" on organization_members;
drop policy if exists "Only ADMIN or OWNER can update organizations" on organizations;
drop policy if exists "Only ADMIN or OWNER can delete organizations" on organizations;
drop policy if exists "Only ADMIN or OWNER can update organization members" on organization_members;
drop policy if exists "Only ADMIN or OWNER can delete organization members" on organization_members;
drop policy if exists "Users can read organizations" on organizations;
drop policy if exists "Users can read organization members" on organization_members;

-- Organizations policies
create policy "Anyone can create organizations"
  on organizations for insert
  with check (auth.uid() is not null);  -- Ensures user is authenticated

create policy "Users can read organizations"
  on organizations for select
  using (true);

-- Organization members policies
create policy "Anyone can create organization members"
  on organization_members for insert
  with check (auth.uid() is not null);  -- Ensures user is authenticated

create policy "Users can read organization members"
  on organization_members for select
  using (true);

-- Then create the policies
-- Add update policy for organizations
create policy "Only ADMIN or OWNER can update organizations"
  on organizations for update
  using (
    exists (
      select 1
      from organization_members
      where organization_id = id
      and profile_id = auth.uid()
      and role in ('ADMIN', 'OWNER')
    )
  );

-- Add delete policy for organizations
create policy "Only ADMIN or OWNER can delete organizations"
  on organizations for delete
  using (
    exists (
      select 1
      from organization_members
      where organization_id = id
      and profile_id = auth.uid()
      and role in ('ADMIN', 'OWNER')
    )
  );

-- Add update policy for organization members
create policy "Only ADMIN or OWNER can update organization members"
  on organization_members for update
  using (
    exists (
      select 1
      from organization_members
      where organization_id = organization_id
      and profile_id = auth.uid()
      and role in ('ADMIN', 'OWNER')
    )
  );

-- Add delete policy for organization members
create policy "Only ADMIN or OWNER can delete organization members"
  on organization_members for delete
  using (
    exists (
      select 1
      from organization_members
      where organization_id = organization_id
      and profile_id = auth.uid()
      and role in ('ADMIN', 'OWNER')
    )
  );