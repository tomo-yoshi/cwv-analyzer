-- Enable RLS
alter table profiles enable row level security;

-- Drop existing policies if any
drop policy if exists "Users can create their own profile" on profiles;
drop policy if exists "Users can view their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can delete their own profile" on profiles;

-- Create policies
create policy "Users can create their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can delete their own profile"
  on profiles for delete
  using (auth.uid() = id);

-- Optional: Add a policy to allow users to view other profiles they interact with
create policy "Users can view profiles they interact with"
  on profiles for select
  using (
    exists (
      select 1 
      from organization_members om
      where om.profile_id = profiles.id
      and exists (
        select 1 
        from organization_members my_orgs
        where my_orgs.organization_id = om.organization_id
        and my_orgs.profile_id = auth.uid()
      )
    )
  );