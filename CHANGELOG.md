# Changelog

All notable changes to Airport Cams are documented here.

This project follows [Semantic Versioning](https://semver.org/): `vMAJOR.MINOR.PATCH`

| Part | When to bump | Example |
|------|-------------|---------|
| **MAJOR** | Complete UI overhaul or breaking change to the worker's response | `v1.0.0` → `v2.0.0` |
| **MINOR** | New feature | `v1.0.0` → `v1.1.0` |
| **PATCH** | Bug fix, label tweak, or cosmetic change | `v1.0.0` → `v1.0.1` |

---

## [v1.4.2] — 2026-10-12

- Fixed cameras staying blank with no message after their ads: the player reports "playing" during the ad, and when YouTube's bot check followed, the page never noticed. A player whose video time hasn't moved for two minutes is now always treated as stuck and retried
- If the browser never reports whether a camera is on screen, its player now loads after 3 seconds anyway instead of never starting
- `?debug` at the end of the address shows each camera's player state on its tile, for troubleshooting

## [v1.4.1] — 2026-10-12

- Cameras that go blank after the ads are now caught: a player that stops playing for 90 seconds at any point, or whose video time stops moving for two minutes, gets the same host switch and retries as a refused camera (v1.4.0 only checked the first minute after loading, so a tile could stay blank forever after its ads)
- README: tip to let the ads play out instead of reloading

## [v1.4.0] — 2026-10-12

- Players start one at a time, 2.5 seconds apart, instead of all at once, which looks less like a bot to YouTube
- Only cameras on (or near) the screen play; on phones, scrolling a camera well out of view stops its player, so fewer streams run at once
- When YouTube refuses a camera, the page first tries it on the other player host (youtube-nocookie.com ↔ youtube.com) before showing the error
- A player that hasn't started after a minute (YouTube's "Sign in to confirm you're not a bot" screen, which reports no error) is now handled like a refused camera instead of staying stuck
- Refused cameras retry after 2, 4, 8, then every 15 minutes instead of a fixed 5 minutes, and the tile says when the next try is

## [v1.3.0] — 2026-10-12

- **↻ Refresh page** button at the bottom of the Cameras panel reloads the page, picking up a new version and restarting every stream

## [v1.2.5] — 2026-10-12

- Sharper header: removed the soft glows around the title, logo sign, clock and header bar, and the live count and header buttons use brighter text instead of dim gray

## [v1.2.4] — 2026-10-12

- Phones: the header sits lower, with more space above it so it isn't crowded against the status bar

## [v1.2.3] — 2026-10-12

- Renamed to Airport Cams (also the browser tab title): the repository is now RJLcode/AirportCams and the live site is https://rjlcode.github.io/AirportCams/ (the old /Flightradar24viewer/ address no longer works). The footer License link points to the new repository

## [v1.2.2] — 2026-10-12

- Players load from youtube-nocookie.com again, as before v1.2.0: on iPhone, the youtube.com players played the ad and then stopped at YouTube's "Sign in to confirm you're not a bot" instead of showing the stream. The Watch on YouTube fallback from v1.2.0 stays

## [v1.2.1] — 2026-10-12

- Header logo is now a red runway sign reading FR-24 (white characters outlined in black, black frame) instead of the yellow hexagon; the phone header is slightly tighter so it still fits on one row

## [v1.2.0] — 2026-10-12

- When YouTube refuses to play a camera inside the page ("Video unavailable" / error 150, which YouTube also gives when it suspects a network of being a bot), the tile now says so, offers a **Watch on YouTube** button, and retries that camera every 5 minutes while the page is on screen
- Players now load from youtube.com instead of youtube-nocookie.com, so viewers signed in to YouTube in the same browser usually get past YouTube's bot check

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
