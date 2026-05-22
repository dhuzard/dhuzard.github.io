---
title: "FAIRRR 3/5 — Inside MAPP: API‑First Metadata for Reproducible Research"
last_modified_at: 2025-09-20T10:00:00+02:00
categories:
  - Blog
tags:
  - MAPP
  - FAIRRR
  - metadata
  - APIs
  - provenance
  - ontologies
author: HD + (Codex)
header:
  image: /assets/images/MAPP-Logo-color.png
  teaser: /assets/images/MAPP-Logo-color.png
excerpt: MAPP turns scattered records into structured, shareable, machine‑readable metadata—operationalizing FAIRRR with standards, identifiers, and provenance.
toc: true
toc_label: On this page
---

> This article is part of the FAIRRR series: [1](/Blog/fairrr-ethics-of-metadata/) · [2](/Blog/fairrr-explained-metrics-outcomes/) · [3](/Blog/mapp-api-first-fairrr/) · [4](/Blog/case-study-hcm-mapp-ontology/) · [5](/Blog/fairrr-playbook-30-days/)
{: .notice--info}

This is Post 3 of 5 in the FAIRRR series. Previous: [FAIRRR, Explained](/Blog/fairrr-explained-metrics-outcomes/) • Next: [Case Study—HCM with MAPP + Ontology Mapping](/Blog/case-study-hcm-mapp-ontology/)

## Why API‑first beats forms‑first

- Interoperability: integrate ELN/LIMS, devices, and pipelines programmatically.
- Automation: capture in‑flow with fewer manual steps and fewer errors.
- Governance: versioned templates, roles, and validations at the edge.

## What MAPP captures

- Subjects and cohorts, with identifiers and lineage.
- Procedures, protocols, and deviations.
- Devices, firmware, and environment.
- Behaviors and outcomes.
- Analysis pipelines, inputs/outputs, parameters, and versions.

## Standards under the hood

- Persistent identifiers for linkability.
- Community ontologies for semantics and comparability.
- Provenance (who/what/when/where/how) and versioning.

Example payload sketch (illustrative):

```json
{
  "study": {"id": "STUDY:123", "title": "Open Field"},
  "animal": {"id": "ANML:001", "strain": "C57BL/6J"},
  "device": {"id": "DEV:OF-01", "model": "OF-Cam", "firmware": "1.3.2"},
  "procedure": {"id": "PROC:OF", "ontology": "OAE:0001"},
  "behavior": {"id": "MBO:000123", "label": "Exploration"},
  "provenance": {"who": "tech_a", "when": "2025-09-01T10:30:00Z", "where": "Room 3"},
  "analysis": {"pipeline": "of-v1", "version": "0.9.4", "params": {"fps": 30}}
}
```

## Integration patterns

- ELN/LIMS sync via connectors.
- Pipeline hooks that emit RO‑Crate/PROV‑O flavored exports.
- Repository exports with licenses and DOI metadata.

## Governance built‑in

- Role‑based access; review workflows.
- Versioned, reusable templates.
- Validations that keep data FAIR by design.

Series navigation: Previous ← [FAIRRR, Explained](/Blog/fairrr-explained-metrics-outcomes/) • Next → [Case Study—HCM with MAPP + Ontology Mapping](/Blog/case-study-hcm-mapp-ontology/)
