/*
 * Flightradar24 Airport Cams — Cloudflare Worker
 * Copyright (c) 2026 RJLcode (https://github.com/RJLcode). All rights reserved.
 * Proprietary and confidential — NOT open source. No part of this source code,
 * data, design, or documentation may be copied, modified, distributed, or used
 * in any form without explicit written permission. See the LICENSE file.
 */

// Lists the Flightradar24 airport cameras that are live on YouTube right now.
//   GET / -> {"updated":"<ISO time>","streams":[{"id":"<YouTube video ID>","title":".."}]}
//
// The cameras get a new video ID whenever a stream restarts, so the page asks for whatever is live
// instead of keeping a fixed list. Results are cached for 5 minutes per Cloudflare edge location.

// Flightradar24's YouTube channel (@Flightradar24DotCom), "Live" tab
const FR24_STREAMS = "https://www.youtube.com/channel/UCcGI_kXwKl_QhyW9jK_8gIA/streams";
const CAMS_TTL = 300; // seconds

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
}

// Pulls the currently-live videos out of the channel page's embedded ytInitialData JSON.
// YouTube has used both shapes below for channel grids, so handle either.
function parseLiveStreams(html) {
  const marker = "var ytInitialData = ";
  const start = html.indexOf(marker);
  if (start < 0) throw new Error("channel page layout not recognized");
  const end = html.indexOf(";</script>", start);
  const data = JSON.parse(html.slice(start + marker.length, end));

  const streams = [];
  const seen = new Set();
  const add = (id, title, node) => {
    const raw = JSON.stringify(node);
    const live = raw.includes("BADGE_STYLE_LIVE") || raw.includes("BADGE_STYLE_TYPE_LIVE_NOW");
    if (id && live && !seen.has(id)) { seen.add(id); streams.push({ id, title: title || id }); }
  };
  const walk = (o) => {
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (!o || typeof o !== "object") return;
    if (o.lockupViewModel) {
      const l = o.lockupViewModel;
      const t = l.metadata && l.metadata.lockupMetadataViewModel && l.metadata.lockupMetadataViewModel.title;
      add(l.contentId, t && t.content, l.contentImage);
    } else if (o.videoRenderer) {
      const v = o.videoRenderer;
      const t = v.title && v.title.runs && v.title.runs[0];
      add(v.videoId, t && t.text, [v.badges, v.thumbnailOverlays]);
    }
    Object.values(o).forEach(walk);
  };
  walk(data);
  return streams;
}

async function liveCams(ctx) {
  const cache = caches.default;
  const key = new Request("https://cams.cache/fr24");
  const hit = await cache.match(key);
  if (hit) return new Response(hit.body, { headers: { ...Object.fromEntries(hit.headers), "X-Cams-Cache": "HIT" } });

  const res = await fetch(FR24_STREAMS, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Cookie": "SOCS=CAI", // skip the EU cookie-consent interstitial
    },
  });
  if (!res.ok) return json({ error: "YouTube returned " + res.status }, 502);
  const streams = parseLiveStreams(await res.text());
  if (!streams.length) return json({ error: "no live streams found" }, 502);

  const out = json({ updated: new Date().toISOString(), streams }, 200, { "Cache-Control": "public, max-age=" + CAMS_TTL });
  ctx.waitUntil(cache.put(key, out.clone()));
  return out;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    try {
      return await liveCams(ctx);
    } catch (err) {
      return json({ error: err.message }, 502);
    }
  },
};
