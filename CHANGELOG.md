# Changelog

All notable changes to Flightradar24 Airport Cams are documented here.

This project follows [Semantic Versioning](https://semver.org/): `vMAJOR.MINOR.PATCH`

| Part | When to bump | Example |
|------|-------------|---------|
| **MAJOR** | Complete UI overhaul or breaking change to the worker's response | `v1.0.0` → `v2.0.0` |
| **MINOR** | New feature | `v1.0.0` → `v1.1.0` |
| **PATCH** | Bug fix, label tweak, or cosmetic change | `v1.0.0` → `v1.0.1` |

---

## [v1.0.2] — 2026-10-11

- Moved each tile's airport label and controls to the bottom-right corner so they no longer cover Flightradar24's overlay in the video; the controls now appear beside the label on hover

## [v1.0.1] — 2026-10-11

- New color scheme: warm charcoal with taxiway-sign yellow instead of blue; warnings are now orange so they stand out from the yellow accent

## [v1.0.0] — 2026-10-11

- First release: grid of Flightradar24's live YouTube airport cameras with a Cameras panel to show, hide and reorder them, per-camera listen / enlarge / open-on-YouTube / hide controls, and adding your own YouTube streams by link
- Cloudflare Worker (`worker.js`) that lists the cameras live on Flightradar24's YouTube channel, cached for 5 minutes
