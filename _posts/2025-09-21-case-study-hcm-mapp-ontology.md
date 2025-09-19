---
title: "FAIRRR 4/5 — Case Study: Home Cage Monitoring with MAPP + Ontology Mapping"
last_modified_at: 2025-09-21T10:00:00+02:00
categories:
  - Blog
tags:
  - HCM
  - ontology
  - MAPP
  - FAIRRR
  - devices
  - reproducibility
author: HD + (Codex)
header:
  image: /assets/hcmo-mapping/hcm-mapper/HCM-mapper.png
  teaser: /assets/hcmo-mapping/hcm-mapper/HCM-mapper.png
excerpt: "A concrete example: modeling devices, behaviors, and provenance in Home Cage Monitoring to unlock reuse, comparability, and fewer animals."
toc: true
toc_label: On this page
---

> This article is part of the FAIRRR series: [1](/Blog/fairrr-ethics-of-metadata/) · [2](/Blog/fairrr-explained-metrics-outcomes/) · [3](/Blog/mapp-api-first-fairrr/) · [4](/Blog/case-study-hcm-mapp-ontology/) · [5](/Blog/fairrr-playbook-30-days/)
{: .notice--info}

This is Post 4 of 5 in the FAIRRR series. Previous: [Inside MAPP—API‑First FAIRRR](/Blog/mapp-api-first-fairrr/) • Next: [The 30‑Day FAIRRR Playbook](/Blog/fairrr-playbook-30-days/)

## The HCM reproducibility problem

HCM studies hinge on device details (model, firmware, calibration), environment (light/temperature/noise), and behavior definitions. Without consistent metadata, cross‑study comparison is fragile, and duplication is common.

## Modeling HCM with MAPP

- Animals ↔ devices ↔ procedures ↔ behaviors/outcomes.
- Capture firmware, calibration, and environment alongside procedures.
- Link analyses and parameters to specific device sessions.

![HCM Ontology Mapper](/assets/hcmo-mapping/hcm-mapper/HCM-mapper.png)

## Ontology mapping workflow

Use the HCM Ontology Mapper to align device outputs and behavior labels to shared terms (e.g., MBO for behaviors). That makes results comparable across vendors and pipelines.

Workflow sketch:

1) Extract device mapping sheet → 2) Map to ontology terms → 3) Create MAPP entities → 4) Export a reusable package with provenance and licenses.

## Analysis linkage

Tie each behavior/outcome to its generating pipeline version and parameters. That enables auditability and safe reuse in meta‑analyses.

## Outcomes

- Fewer repeated experiments; more cross‑study joins.
- Faster review and QC via clear provenance and deviations.
- Better welfare through transparent refinement opportunities.

Related projects: [/projects/hcm-ontology-mapper/](/projects/hcm-ontology-mapper/) • [/projects/hcm-explorer/](/projects/hcm-explorer/)

Series navigation: Previous ← [Inside MAPP—API‑First FAIRRR](/Blog/mapp-api-first-fairrr/) • Next → [The 30‑Day FAIRRR Playbook](/Blog/fairrr-playbook-30-days/)
