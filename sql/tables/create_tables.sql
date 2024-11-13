create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  role text not null default 'USER' check (role in ('ADMIN', 'USER')),
  plan text not null default 'FREE' check (plan in ('FREE', 'PRO')),

  primary key (id)
);

alter table public.profiles enable row level security;


create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
