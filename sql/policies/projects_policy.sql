-- Enable RLS
alter table projects enable row level security;

-- Drop all existing policies
drop policy if exists "Any organization member can create projects" on projects;
drop policy if exists "Any organization member can read projects" on projects;
drop policy if exists "Any organization member can update projects" on projects;
drop policy if exists "Any organization member can delete projects" on projects;

-- Create policies
create policy "Any organization member can create projects"
  on projects for insert
  with check (
    exists (
      select 1
      from organization_members
      where organization_id = organization_id
      and profile_id = auth.uid()
    )
  );

create policy "Any organization member can read projects"
  on projects for select
  using (
    exists (
      select 1
      from organization_members
      where organization_id = projects.organization_id
      and profile_id = auth.uid()
    )
  );

create policy "Any organization member can update projects"
  on projects for update
  using (
    exists (
      select 1
      from organization_members
      where organization_id = projects.organization_id
      and profile_id = auth.uid()
    )
  );

create policy "Any organization member can delete projects"
  on projects for delete
  using (
    exists (
      select 1
      from organization_members
      where organization_id = projects.organization_id
      and profile_id = auth.uid()
    )
  );