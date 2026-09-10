drop function if exists public.petition_stats();
drop function if exists public.public_signatures(integer);

create or replace function private.petition_stats_impl()
returns bigint
language sql
stable
security definer
set search_path = public, private
as $$ select count(*)::bigint from public.signatures; $$;

create or replace function private.public_signatures_impl(max_rows integer default 60)
returns table(first_name text,last_initial text,postal_code text,signed_at timestamptz)
language sql
stable
security definer
set search_path = public, private
as $$
  select s.first_name, left(s.last_name,1), s.postal_code, s.created_at
  from public.signatures s
  where s.public_display = true
  order by s.created_at desc
  limit least(greatest(coalesce(max_rows,60),1),100);
$$;

revoke all on function private.petition_stats_impl() from public;
revoke all on function private.public_signatures_impl(integer) from public;
grant execute on function private.petition_stats_impl() to anon, authenticated;
grant execute on function private.public_signatures_impl(integer) to anon, authenticated;

create or replace function public.petition_stats()
returns table(signature_count bigint)
language sql
stable
security invoker
set search_path = public, private
as $$ select private.petition_stats_impl(); $$;

create or replace function public.public_signatures(max_rows integer default 60)
returns table(first_name text,last_initial text,postal_code text,signed_at timestamptz)
language sql
stable
security invoker
set search_path = public, private
as $$ select * from private.public_signatures_impl(max_rows); $$;

revoke all on function public.petition_stats() from public;
revoke all on function public.public_signatures(integer) from public;
grant execute on function public.petition_stats() to anon, authenticated;
grant execute on function public.public_signatures(integer) to anon, authenticated;
