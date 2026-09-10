import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SITE_CONFIG } from "./config.js";

const form = document.querySelector("#signature-form");
const submitButton = document.querySelector("#submit-button");
const statusEl = document.querySelector("#form-status");
const countEls = [document.querySelector("#signature-count"), document.querySelector("#signature-count-secondary")];
const supportersSection = document.querySelector("#public-supporters");
const supportersList = document.querySelector("#supporters-list");

const configured = SITE_CONFIG.supabaseUrl && SITE_CONFIG.supabaseAnonKey;
const supabase = configured ? createClient(SITE_CONFIG.supabaseUrl, SITE_CONFIG.supabaseAnonKey) : null;
let startedAt = Date.now();

document.querySelectorAll("[data-owner-name]").forEach(el => el.textContent = SITE_CONFIG.ownerName || "À compléter");
document.querySelectorAll("[data-owner-email]").forEach(el => {
  const email = SITE_CONFIG.ownerEmail || "contact@example.org";
  el.textContent = email;
  el.href = `mailto:${email}`;
});

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `form-status ${type}`.trim();
}

function setCount(value) {
  const count = Number.isFinite(Number(value)) ? Number(value) : 0;
  countEls.forEach(el => { if (el) el.textContent = new Intl.NumberFormat("fr-FR").format(count); });
}

async function loadStats() {
  if (!supabase) { setCount(0); return; }
  const { data, error } = await supabase.rpc("petition_stats");
  if (error) { console.error(error); return; }
  const row = Array.isArray(data) ? data[0] : data;
  setCount(row?.signature_count ?? data ?? 0);
}

async function loadPublicSupporters() {
  if (!supabase || !SITE_CONFIG.showPublicSupporters) return;
  const { data, error } = await supabase.rpc("public_signatures", { max_rows: 60 });
  if (error || !Array.isArray(data) || data.length === 0) {
    supportersSection.hidden = true;
    return;
  }

  supportersList.replaceChildren();
  data.forEach(row => {
    const item = document.createElement("div");
    item.className = "supporter";
    const name = document.createElement("strong");
    const initial = String(row.last_initial || "").slice(0, 1).toUpperCase();
    name.textContent = `${row.first_name || ""}${initial ? " " + initial + "." : ""}`;
    const detail = document.createElement("span");
    detail.textContent = row.postal_code || "";
    item.append(name, detail);
    supportersList.append(item);
  });
  supportersSection.hidden = false;
}

function validateForm() {
  const postalCode = form.postal_code.value.trim();
  if (!form.first_name.value.trim() || !form.last_name.value.trim()) return "Merci d'indiquer votre prénom et votre nom.";
  if (!/^[0-9]{5}$/.test(postalCode)) return "Le code postal doit contenir 5 chiffres.";
  if (!form.email.validity.valid) return "Merci d'indiquer une adresse e-mail valide.";
  if (!form.support.checked) return "Vous devez confirmer que vous soutenez la pétition.";
  if (!form.privacy.checked) return "Merci de prendre connaissance des informations relatives à vos données.";
  return "";
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  setStatus("");
  const validationError = validateForm();
  if (validationError) return setStatus(validationError, "error");
  if (!supabase) return setStatus("La collecte des signatures n'est pas configurée.", "error");

  submitButton.disabled = true;
  submitButton.textContent = "Enregistrement…";

  try {
    const { data, error } = await supabase.functions.invoke("sign-petition", {
      body: {
        first_name: form.first_name.value.trim(),
        last_name: form.last_name.value.trim(),
        postal_code: form.postal_code.value.trim(),
        email: form.email.value.trim(),
        public_display: form.public_display.checked,
        website: form.website?.value || "",
        started_at: startedAt
      }
    });

    if (error) {
      let message = "Impossible d'enregistrer la signature pour le moment.";
      try {
        const payload = await error.context?.json?.();
        if (payload?.error === "already_signed") message = "Cette adresse e-mail a déjà été utilisée pour soutenir la pétition.";
        else if (payload?.error === "rate_limited") message = payload.message || "Trop de tentatives. Réessayez plus tard.";
        else if (payload?.error === "submission_timing") message = "Le formulaire a été soumis trop rapidement. Merci de réessayer.";
        else if (payload?.message) message = payload.message;
      } catch (_) {}
      throw new Error(message);
    }

    form.reset();
    startedAt = Date.now();
    setStatus("Merci. Votre soutien a bien été enregistré.", "success");
    if (data?.signature_count !== undefined) setCount(data.signature_count);
    await loadPublicSupporters();
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Une erreur est survenue.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Signer la pétition";
  }
});

await Promise.all([loadStats(), loadPublicSupporters()]);
