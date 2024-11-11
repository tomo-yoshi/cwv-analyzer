-- -- First, ensure we're in the auth schema
-- create schema if not exists auth;

-- -- Create the identities table if it doesn't exist
-- create table if not exists auth.identities (
--     id text primary key,
--     user_id uuid not null references auth.users(id) on delete cascade,
--     identity_data jsonb not null,
--     provider text not null,
--     last_sign_in_at timestamptz,
--     created_at timestamptz,
--     updated_at timestamptz,
--     email text generated always as (lower(identity_data->>'email')) stored,
--     unique(provider, email)
-- );

-- Update the handle_new_user function to be more robust
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
    insert into public.profiles (
        id,
        email,
        first_name,
        last_name,
        created_at,
        updated_at,
        role
    )
    values (
        new.id,
        new.email,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        now(),
        now(),
        'USER'
    );
    return new;
end;
$$;

-- Recreate the trigger
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();