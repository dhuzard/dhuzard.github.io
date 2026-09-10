create extension if not exists pgcrypto;

create table if not exists public.signatures (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  postal_code text not null check (postal_code ~ '^[0-9]{5}$'),
  email text not null check (char_length(email) <= 254),
  public_display boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists signatures_email_unique on public.signatures (lower(email));

alter table public.signatures enable row level security;
revoke all on table public.signatures from anon, authenticated;
grant all on table public.signatures to service_role;

create or replace function public.petition_stats()
returns table(signature_count bigint)
language sql
stable
security definer
set search_path = public
as $$ select count(*)::bigint from public.signatures; $$;

revoke all on function public.petition_stats() from public;
grant execute on function public.petition_stats() to anon, authenticated;

create or replace function public.public_signatures(max_rows integer default 60)
returns table(first_name text,last_initial text,postal_code text,signed_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select s.first_name, left(s.last_name,1), s.postal_code, s.created_at
  from public.signatures s
  where s.public_display = true
  order by s.created_at desc
  limit least(greatest(coalesce(max_rows,60),1),100);
$$;

revoke all on function public.public_signatures(integer) from public;
grant execute on function public.public_signatures(integer) to anon, authenticated;
