# Changelog

All notable changes to Flightradar24 Airport Cams are documented here.

This project follows [Semantic Versioning](https://semver.org/): `vMAJOR.MINOR.PATCH`

| Part | When to bump | Example |
|------|-------------|---------|
| **MAJOR** | Complete UI overhaul or breaking change to the worker's response | `v1.0.0` → `v2.0.0` |
| **MINOR** | New feature | `v1.0.0` → `v1.1.0` |
| **PATCH** | Bug fix, label tweak, or cosmetic change | `v1.0.0` → `v1.0.1` |

---

## [v1.1.1] — 2026-10-11

- Footer text is lighter and easier to read; the License link is brighter still and turns yellow on hover

## [v1.1.0] — 2026-10-11

- Phones in portrait now show one camera per row at full width, scrolling, instead of a grid of tiny tiles; landscape and desktop keep the fit-to-screen grid, and ⤢ enlarge still fits on one screen

## [v1.0.4] — 2026-10-11

- Phones: tile controls no longer show all the time and spill off small tiles; tap a tile's airport code to show its controls (tapping another code switches to that tile), and on narrow tiles the buttons wrap upward instead of overflowing

## [v1.0.3] — 2026-10-11

- Footer License link now points to the GitHub repository's new name, RJLcode/Flightradar24viewer

## [v1.0.2] — 2026-10-11

- Moved each tile's airport label and controls to the bottom-right corner so they no longer cover Flightradar24's overlay in the video; the controls now appear beside the label on hover

## [v1.0.1] — 2026-10-11

- New color scheme: warm charcoal with taxiway-sign yellow instead of blue; warnings are now orange so they stand out from the yellow accent

## [v1.0.0] — 2026-10-11

- First release: grid of Flightradar24's live YouTube airport cameras with a Cameras panel to show, hide and reorder them, per-camera listen / enlarge / open-on-YouTube / hide controls, and adding your own YouTube streams by link
- Cloudflare Worker (`worker.js`) that lists the cameras live on Flightradar24's YouTube channel, cached for 5 minutes
