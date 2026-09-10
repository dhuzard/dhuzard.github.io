create schema if not exists private;

create or replace function private.insert_signature(
  p_first_name text,
  p_last_name text,
  p_postal_code text,
  p_email text,
  p_public_display boolean
)
returns bigint
language plpgsql
security definer
set search_path = public, private
as $$
declare
  normalized_email text;
  total_count bigint;
begin
  p_first_name := trim(regexp_replace(coalesce(p_first_name,''), '\s+', ' ', 'g'));
  p_last_name := trim(regexp_replace(coalesce(p_last_name,''), '\s+', ' ', 'g'));
  p_postal_code := trim(coalesce(p_postal_code,''));
  normalized_email := lower(trim(coalesce(p_email,'')));

  if char_length(p_first_name) < 1 or char_length(p_first_name) > 80 then raise exception 'invalid_name'; end if;
  if char_length(p_last_name) < 1 or char_length(p_last_name) > 80 then raise exception 'invalid_name'; end if;
  if p_postal_code !~ '^[0-9]{5}$' then raise exception 'invalid_postal_code'; end if;
  if char_length(normalized_email) > 254 or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'invalid_email'; end if;

  begin
    insert into public.signatures(first_name,last_name,postal_code,email,public_display)
    values (p_first_name,p_last_name,p_postal_code,normalized_email,coalesce(p_public_display,false));
  exception when unique_violation then
    raise exception 'already_signed';
  end;

  select count(*) into total_count from public.signatures;
  return total_count;
end;
$$;

revoke all on function private.insert_signature(text,text,text,text,boolean) from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.insert_signature(text,text,text,text,boolean) to anon, authenticated;

create or replace function public.sign_petition(
  p_first_name text,
  p_last_name text,
  p_postal_code text,
  p_email text,
  p_public_display boolean default false
)
returns bigint
language sql
security invoker
set search_path = public, private
as $$
  select private.insert_signature(p_first_name,p_last_name,p_postal_code,p_email,p_public_display);
$$;

revoke all on function public.sign_petition(text,text,text,text,boolean) from public;
grant execute on function public.sign_petition(text,text,text,text,boolean) to anon, authenticated;
