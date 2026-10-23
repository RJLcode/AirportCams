# Airport Cams

**Current version: v1.4.4**

A wall-display page that shows Flightradar24's live airport cameras from YouTube side by side, with controls to pick which cameras are shown.

> **Tip:** Sign in to YouTube in the browser you watch with. YouTube sometimes stops anonymous viewers with "Sign in to confirm you're not a bot", especially when several streams play at once from one network. Being signed in avoids most of these interruptions, and if a camera still won't play in the page, its **Watch on YouTube** button opens it on youtube.com, where signed-in viewers can watch it.

> **Tip:** Let the ads play out. Each camera may show a YouTube ad or two before its stream starts. Reloading or skipping only starts a new ad and sends YouTube more requests, which makes its bot check more likely. If a camera goes blank after its ads, leave it: the page notices within a minute or two and retries it by itself. Use **↻ Refresh page** (in the Cameras panel) sparingly, not over and over.

## Links

- **Live site:** https://rjlcode.github.io/AirportCams/
- **Repository:** https://github.com/RJLcode/AirportCams

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
- Phones in portrait: cameras stack one per row at full width and the camera area scrolls (when they don't all fit); turn the phone sideways for the grid
- **Cameras** panel: tick or untick cameras to show or hide them, ▲/▼ to reorder, **All** / **None**, and **↻ Refresh page** at the bottom to reload the page (picks up a new version and restarts every stream)
- Choices are remembered per browser and follow the airport (e.g. `LAS`), so they survive a stream restarting under a new video ID
- Each tile shows its airport code in the bottom-right corner, clear of Flightradar24's own overlay; hover a tile (on phones, tap the code) for its controls beside it: 🔇/🔊 listen to that camera (mutes the others), ⤢ enlarge it with the rest in a strip beside it (Esc to exit), ↗ open on YouTube, ✕ hide
- **Add a YouTube stream**: paste any YouTube link to add a camera of your own; remove it with ✕ in the panel
- Shows/hiding or reordering cameras never reloads the other streams
- Warns when more than 9 streams are shown, since each one uses its own bandwidth
- Players start one at a time a couple of seconds apart, and only for cameras on (or near) the screen; on phones, scrolling a camera well out of view stops its player, so only what's showing streams
- If YouTube refuses to play a camera inside the page, or a player stops playing for 90 seconds, or its picture freezes for two minutes (YouTube's "confirm you're not a bot" screen, which can appear right after the ads, reports no error), the page first tries that camera on the other YouTube player host (youtube-nocookie.com ↔ youtube.com). If that fails too, the tile says so with a **Watch on YouTube** button and retries after 2, 4, 8, then every 15 minutes (only while the page is on screen), so the wall recovers on its own

## Troubleshooting

Add `?debug` to the address (for example `https://rjlcode.github.io/AirportCams/?debug`) to show each camera's player state on its tile: which YouTube host it's using, whether it loaded, the player state, how many messages the player has sent, its video time, and any error code.

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
- YouTube sometimes refuses embedded playback ("Video unavailable", player error 150) when it suspects the viewer's network of being a bot, for example after many streams have been loaded from one IP address. It still plays on youtube.com. Players start on YouTube's privacy-mode player (`youtube-nocookie.com`), which works best on iPhone Safari (it blocks YouTube's sign-in cookies inside other sites), and switch a refused camera to `youtube.com`, where signed-in viewers on other browsers may pass the check. Showing fewer cameras at once makes refusals less likely.
- Shared networks often get YouTube's bot check ("Sign in to confirm you're not a bot") right away, even for a single camera: in-flight Wi-Fi, hotel and public Wi-Fi, VPNs, iCloud Private Relay, and office or school networks, where many people share one IP address. Cameras usually play again once the viewer is on a normal home or mobile connection, though a flagged IP can take hours to a day to clear. **Watch on YouTube** works in the meantime.
- The same notice appears if Flightradar24 turns off embedding for a stream.
- Browsers only autoplay muted video, so all cameras start muted.

## License

Copyright © 2026 RJLcode. All Rights Reserved. This project is proprietary and is NOT open source. See [LICENSE](LICENSE). Camera streams belong to Flightradar24 and their camera hosts.
