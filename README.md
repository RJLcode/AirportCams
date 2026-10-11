# Flightradar24 Airport Cams

**Current version: v1.0.2**

A wall-display page that shows Flightradar24's live airport cameras from YouTube side by side, with controls to pick which cameras are shown.

## Links

- **Live site:** https://rjlcode.github.io/Flightradar24/ (once GitHub Pages is enabled)

## Files

- `index.html` — the whole page (HTML, CSS and JavaScript in one file)
- `worker.js` — a Cloudflare Worker that reports which Flightradar24 cameras are live right now
- `wrangler.toml` — deploy settings for the worker

## How It Works

Flightradar24 runs its automated airport cameras as 24/7 live streams on its YouTube channel ([@Flightradar24DotCom](https://www.youtube.com/@Flightradar24DotCom/streams)). Each stream gets a new YouTube video ID whenever it restarts, so the page doesn't keep a fixed list. Instead, the worker reads the channel's **Live** tab and returns the streams that are live now. The page asks again every 5 minutes, so new cameras appear and ended ones drop off without any edits.

If the worker can't be reached, the page uses the last list it got on that browser, or a built-in list as a last resort. The header shows **N LIVE** when the list is current and an amber **SAVED LIST** / **BUILT-IN LIST** when it isn't.

```
index.html  →  Cloudflare Worker  →  youtube.com/@Flightradar24DotCom/streams
index.html  →  <iframe> youtube-nocookie.com/embed/<video ID>   (one per camera)
```

## Features

- Every selected camera plays muted in a grid sized to fit the screen (the layout picks the column count that gives the biggest tiles)
- **Cameras** panel: tick or untick cameras to show or hide them, ▲/▼ to reorder, **All** / **None**
- Choices are remembered per browser and follow the airport (e.g. `LAS`), so they survive a stream restarting under a new video ID
- Each tile shows its airport code in the bottom-right corner, clear of Flightradar24's own overlay; hover a tile (tap on phones) for its controls beside the code: 🔇/🔊 listen to that camera (mutes the others), ⤢ enlarge it with the rest in a strip beside it (Esc to exit), ↗ open on YouTube, ✕ hide
- **Add a YouTube stream**: paste any YouTube link to add a camera of your own; remove it with ✕ in the panel
- Shows/hiding or reordering cameras never reloads the other streams
- Warns when more than 9 streams are shown, since each one uses its own bandwidth

## Cloudflare Worker Setup

```
npx wrangler deploy
```

The page expects the worker at `https://fr24-cams.yanks126.workers.dev` (`WORKER_URL` near the top of the script in `index.html`). The worker needs no secrets. It caches YouTube's answer for 5 minutes.

## Hosting on GitHub Pages

Push to GitHub, then **Settings → Pages → Deploy from a branch → `main` / root**. YouTube embeds don't play from a `file://` page, so test locally with a small web server (for example `python3 -m http.server`).

## Versioning

The footer shows the version and release date. When publishing a release, bump `APP_VERSION` and `APP_RELEASED` near the top of the script in `index.html`, and add an entry to `CHANGELOG.md`.

## Limitations

- The worker reads YouTube's channel page; if YouTube changes that page's layout, the live list stops updating (the page keeps working from its saved list) and `parseLiveStreams` in `worker.js` needs updating.
- If Flightradar24 turns off embedding for a stream, its tile shows YouTube's "unavailable" message; use ↗ to watch it on YouTube.
- Browsers only autoplay muted video, so all cameras start muted.

## License

Copyright © 2026 RJLcode. All Rights Reserved. This project is proprietary and is NOT open source. See [LICENSE](LICENSE). Camera streams belong to Flightradar24 and their camera hosts.
