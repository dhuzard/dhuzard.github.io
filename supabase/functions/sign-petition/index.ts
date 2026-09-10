import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const body = await req.json();
    const firstName = cleanText(body.first_name, 80);
    const lastName = cleanText(body.last_name, 80);
    const postalCode = cleanText(body.postal_code, 5);
    const email = cleanText(body.email, 254).toLowerCase();
    const publicDisplay = body.public_display === true;
    const turnstileToken = cleanText(body.turnstile_token, 2048);

    if (!firstName || !lastName) return json({ error: "invalid_name", message: "Prénom et nom requis." }, 400);
    if (!/^[0-9]{5}$/.test(postalCode)) return json({ error: "invalid_postal_code", message: "Code postal invalide." }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "invalid_email", message: "Adresse e-mail invalide." }, 400);
    if (!turnstileToken) return json({ error: "turnstile_required", message: "Vérification anti-spam requise." }, 400);

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (!turnstileSecret) return json({ error: "server_configuration" }, 500);

    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: turnstileToken })
    });

    const verification = await verifyResponse.json();
    if (!verification.success) return json({ error: "turnstile_failed", message: "La vérification anti-spam a échoué. Réessayez." }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return json({ error: "server_configuration" }, 500);

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const { error: insertError } = await admin.from("signatures").insert({
      first_name: firstName,
      last_name: lastName,
      postal_code: postalCode,
      email,
      public_display: publicDisplay
    });

    if (insertError) {
      if (insertError.code === "23505") return json({ error: "already_signed" }, 409);
      console.error(insertError);
      return json({ error: "database_error" }, 500);
    }

    const { count } = await admin.from("signatures").select("*", { count: "exact", head: true });
    return json({ ok: true, signature_count: count ?? undefined }, 201);
  } catch (error) {
    console.error(error);
    return json({ error: "unexpected_error" }, 500);
  }
});
