---
title: "Behavior Forum Speaker Suggestions"
permalink: /behavior-forum/speaker-suggestions/
toc: true
---

The Behavior Forum webinar series showcases researchers and practitioners who shape the future of behavioral neuroscience, ethology, data science, and open research infrastructure. This page captures why we vet nominations carefully and how to submit a speaker suggestion with the right context for conflicts of interest (COI), scheduling, and superorganiser review.

<style>
  #behavior-forum-speaker-form {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  #behavior-forum-speaker-form fieldset {
    border: 1px solid var(--mm-accent, #ccc);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
  }
  #behavior-forum-speaker-form legend {
    font-weight: 600;
  }
  #behavior-forum-speaker-form label {
    display: block;
    margin-top: 0.75rem;
    font-weight: 500;
  }
  #behavior-forum-speaker-form input,
  #behavior-forum-speaker-form select,
  #behavior-forum-speaker-form textarea {
    width: 100%;
    max-width: 100%;
    margin-top: 0.35rem;
  }
  #behavior-forum-speaker-form .checkbox-grid {
    display: grid;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }
  #behavior-forum-speaker-form .checkbox-grid label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-weight: 400;
  }
  #behavior-forum-speaker-form .checkbox-grid input {
    width: auto;
    margin-top: 0.15rem;
  }
  #behavior-forum-speaker-form button[type="submit"] {
    justify-self: start;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
  }
  @media (min-width: 720px) {
    #behavior-forum-speaker-form .checkbox-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  #behavior-forum-speaker-form .internal {
    background: rgba(0, 0, 0, 0.04);
  }
</style>

## Why this process?

- Keep the forum transparent and inclusive by recording how speakers are selected.
- Surface conflicts early so we can plan disclosures, balance sessions, or choose alternate speakers.
- Give superorganisers a shared template for tracking votes and ensuring a majority of academic voices in programming decisions.

## What counts as a conflict of interest?

Conflicts are any relationships - financial, professional, or personal - that could bias how a speaker is selected, what they present, or how their work is interpreted. Use the list below as a starting point when completing the form.

- Company-funded research with vested interests
- Equity, stock, or consultancy in related companies
- Patents pending or granted that relate to study outcomes
- Dual roles on advisory boards, review panels, or programme committees
- Selective reporting or data withholding linked to career or funding gain
- Supervising students while operating related startups or industry pilots
- Promoting products tied to personal financial or intellectual property stakes
- Honoraria, speaking fees, or sponsor-paid travel
- Withholding raw data for proprietary reasons
- Ghostwritten or sponsor-controlled publications
- Dual employment across academia and industry
- Conducting trials while holding sponsor shares
- Advisory or consultancy work that overlaps with presented research
- Personal ties that could influence grants, hiring, or study design
- Undisclosed in-kind support (equipment, licenses, animal models, software)

When in doubt, disclose. We can contextualize or flag potential COI in session announcements rather than discover them too late.

## Suggest a speaker

<form id="behavior-forum-speaker-form" name="behavior-forum-speaker" method="post" action="#" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="behavior-forum-speaker" />
  <p class="screen-reader-text">Leave this field empty:<br><input type="text" name="bot-field" aria-hidden="true" /></p>

  <fieldset>
    <legend>About you (the nominator)</legend>
    <label for="nominator-name">Full name *</label>
    <input id="nominator-name" name="nominator_name" type="text" required />

    <label for="nominator-email">Email *</label>
    <input id="nominator-email" name="nominator_email" type="email" required />

    <label for="nominator-role">Primary role or affiliation *</label>
    <select id="nominator-role" name="nominator_role" required>
      <option value="">Select one</option>
      <option value="academic">Academic / Researcher</option>
      <option value="industry">Industry / Private sector</option>
      <option value="nonprofit">Non-profit / NGO</option>
      <option value="independent">Independent / Community scientist</option>
      <option value="student">Student / Trainee</option>
      <option value="other">Other</option>
    </select>

    <label for="nominator-coi">Describe your direct conflicts of interest *</label>
    <textarea id="nominator-coi" name="nominator_coi" rows="4" placeholder="List any financial, professional, or personal ties that could influence this nomination." required></textarea>

    <div class="checkbox-grid">
      <p>Tick any conflicts that apply to you:</p>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="company-funded-research" /> Company-funded research with vested interests</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="equity-stock-consultancy" /> Equity, stock, or consultancy in related companies</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="patents" /> Patents pending or granted tied to study outcomes</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="advisory-roles" /> Dual roles on advisory boards or review panels</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="selective-reporting" /> Selective reporting or data withholding for gain</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="startup-supervision" /> Supervising students while running related startups</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="product-promotion" /> Promoting products tied to personal financial or IP stakes</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="honoraria" /> Honoraria, speaking fees, or sponsor-paid travel</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="data-withheld" /> Withholding raw data for proprietary reasons</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="ghostwriting" /> Ghostwritten or sponsor-controlled publications</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="dual-employment" /> Dual employment in academia and industry</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="sponsor-shares" /> Running trials while holding sponsor shares</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="overlapping-consultancy" /> Advisory or consultancy overlapping with this research</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="personal-ties" /> Personal ties influencing grants, hiring, or study design</label>
      <label><input type="checkbox" name="nominator_conflict_flags[]" value="inkind-support" /> Undisclosed in-kind support (equipment, licenses, models)</label>
    </div>
  </fieldset>

  <fieldset>
    <legend>About the proposed speaker</legend>
    <label for="speaker-name">Speaker full name *</label>
    <input id="speaker-name" name="speaker_name" type="text" required />

    <label for="speaker-affiliation">Affiliation and role *</label>
    <input id="speaker-affiliation" name="speaker_affiliation" type="text" required />

    <label for="speaker-email">Contact email (if known)</label>
    <input id="speaker-email" name="speaker_email" type="email" />

    <label for="speaker-links">Key links (lab, project, profile)</label>
    <input id="speaker-links" name="speaker_links" type="url" placeholder="https://example.com" />

    <label for="talk-title">Working title or theme *</label>
    <input id="talk-title" name="talk_title" type="text" required />

    <label for="talk-summary">What will the speaker cover? *</label>
    <textarea id="talk-summary" name="talk_summary" rows="4" required></textarea>

    <label for="speaker-fit">Why is this speaker a strong fit for the Behavior Forum? *</label>
    <textarea id="speaker-fit" name="speaker_fit" rows="4" required></textarea>

    <label for="speaker-coi">What are the speaker's declared conflicts of interest? *</label>
    <textarea id="speaker-coi" name="speaker_coi" rows="4" placeholder="Share what you know and what we should verify." required></textarea>

    <div class="checkbox-grid">
      <p>Conflicts that may apply to the speaker:</p>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="company-funded-research" /> Company-funded research with vested interests</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="equity-stock-consultancy" /> Equity, stock, or consultancy in related companies</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="patents" /> Patents pending or granted tied to study outcomes</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="advisory-roles" /> Dual roles on advisory boards or review panels</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="selective-reporting" /> Selective reporting or data withholding for gain</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="startup-supervision" /> Supervising students while running related startups</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="product-promotion" /> Promoting products tied to personal financial or IP stakes</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="honoraria" /> Honoraria, speaking fees, or sponsor-paid travel</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="data-withheld" /> Withholding raw data for proprietary reasons</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="ghostwriting" /> Ghostwritten or sponsor-controlled publications</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="dual-employment" /> Dual employment in academia and industry</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="sponsor-shares" /> Running trials while holding sponsor shares</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="overlapping-consultancy" /> Advisory or consultancy overlapping with this research</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="personal-ties" /> Personal ties influencing grants, hiring, or study design</label>
      <label><input type="checkbox" name="speaker_conflict_flags[]" value="inkind-support" /> Undisclosed in-kind support (equipment, licenses, models)</label>
    </div>
  </fieldset>

  <fieldset>
    <legend>Session logistics</legend>
    <label for="preferred-date">Preferred date *</label>
    <input id="preferred-date" name="preferred_date" type="date" required />

    <label for="alternate-date">Alternate date window</label>
    <input id="alternate-date" name="alternate_date" type="date" />

    <label for="time-zone">Time zone considerations</label>
    <input id="time-zone" name="time_zone" type="text" placeholder="Example: Speaker is UTC-5, mornings only" />

    <label for="format">Preferred format *</label>
    <select id="format" name="session_format" required>
      <option value="">Select format</option>
      <option value="virtual">Virtual</option>
      <option value="hybrid">Hybrid</option>
      <option value="in-person">In-person</option>
      <option value="to-define">To be defined</option>
    </select>

    <label for="support-needs">Support needs (tech, accessibility, translation)</label>
    <textarea id="support-needs" name="support_needs" rows="3"></textarea>
  </fieldset>

  <fieldset class="internal">
    <legend>Superorganiser review (internal use)</legend>
    <p>Record who reviewed this nomination and capture the academic and industry balance. Update the list of superorganisers below to match the current team.</p>

    <div class="checkbox-grid">
      <label><input type="checkbox" name="superorganiser_vote[]" value="Reviewer A - Academic" /> Reviewer A - Academic</label>
      <label><input type="checkbox" name="superorganiser_vote[]" value="Reviewer B - Academic" /> Reviewer B - Academic</label>
      <label><input type="checkbox" name="superorganiser_vote[]" value="Reviewer C - Industry" /> Reviewer C - Industry</label>
      <label><input type="checkbox" name="superorganiser_vote[]" value="Reviewer D - Independent" /> Reviewer D - Independent</label>
    </div>

    <label for="vote-outcome">Vote outcome *</label>
    <select id="vote-outcome" name="vote_outcome" required>
      <option value="">Select outcome</option>
      <option value="accepted">Accepted</option>
      <option value="waitlist">Waitlist / Revisit</option>
      <option value="declined">Declined</option>
      <option value="needs-more-info">Need more information</option>
    </select>

    <label for="majority-check">Does an academic majority support this?</label>
    <select id="majority-check" name="majority_check">
      <option value="undetermined">Not yet determined</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <label for="review-notes">Internal notes</label>
    <textarea id="review-notes" name="review_notes" rows="3" placeholder="Summaries of discussions, conditions, or follow-ups."></textarea>
  </fieldset>

  <button type="submit">Submit nomination</button>
</form>

## Implementation notes

- Update the form `action` attribute with the service you intend to use (Formspree, Netlify, Airtable, and so on).
- The hidden `form-name` field and `data-netlify` attribute let you use Netlify forms; remove them if you choose another provider.
- Replace the placeholder superorganiser names with your actual roster and annotate who counts as primarily academic before tallying votes.
- Add any privacy or data retention notices required by your data handling policy.
