# Collection Tracker: phone app

An offline checklist for collectables in the games I play:

- **Final Fantasy Resonance:** all 99 Tablet Shards and 220 Treasure Chests.
- **Final Fantasy VII Rebirth:** Treasure: chests, materia on the ground and open-world caches across all 14 chapters.

Fan-made tool, not affiliated with any game publisher. Game names and artwork belong to their owners.

- **Works offline.** Once installed, it opens without internet.
- **No account or log-in.**
- **Nothing is sent online.** Your ticks are saved only in the app's storage on your device.

**Open the app:** https://devoutchaos.github.io/InGame-Collection-Tracker/

## Install it on your phone

### Android (Chrome)
1. Open **https://devoutchaos.github.io/InGame-Collection-Tracker/** in **Chrome**.
2. Tap the **⋮** menu (top right), then **Add to Home screen**, then **Install**.
3. Open the app once from its new icon while you're online. After that it works offline.

On Samsung Internet, tap **☰**, then **Add page to**, then **Home screen**.

### iPhone (Safari)
1. Open **https://devoutchaos.github.io/InGame-Collection-Tracker/** in **Safari**.
2. Tap the **Share** button (the square with an arrow), then **Add to Home Screen**, then **Add**.
3. Open the app once from its new icon while you're online. After that it works offline.

## How to use it

1. **Home:** tap a game.
2. **Game:** set how far you've played (see below), then tap a collection:
   - Resonance: *Tablet Shards* or *Treasure Chests*
   - Rebirth: *Treasure*
3. **Collection:** tap the shard or box next to an item to mark it collected. Tap again to undo.

Items are sorted by **chapter**, then by **location**. Tap a chapter's heading to fold it away (handy for chapters you've finished). Locations start folded so the list isn't overwhelming: tap a location's name to open or close it. Searching, picking a location or turning on **Missable only** opens whatever matches.

**Avoiding spoilers:**
- **I'm up to** (on the game page): set the chapter you've reached. Later chapters stay hidden in every collection for that game.
- **This chapter only** (on the game page): show just that chapter.
- **Rebirth Chapter 1** is a flashback whose items don't carry over, so it only shows while "I'm up to" is on Chapter 1, or with "This chapter only".
- **Blur contents** (chests): hides what's inside each chest until you tap it or mark it opened.

**Other filters:** pick a location, search for an item or place, **Hide collected**, or **Missable only**.

**Rebirth Treasure:** the **Weapon**, **Materia**, **Item** and **Gil** buttons show only those types. Pick as many as you like, or none to see everything. Open-world caches hold a mix of items, so they only show when no type is picked.
Tags on each item:
- **Missable:** lost for this playthrough once you move on.
- **Timing:** grab it before the step named.
- **Cache:** an open-world cache, usually 2–3 chests.
- **Reported:** from player reports, not the main guides.

The Tablet Shards page also shows the next Oblivion Palace reward and how many more shards you need.

## Backups

Progress lives only on the device you use. To move it, open the home page, tap **Save a backup**, move the file to the new device, then tap **Restore a backup** there.

## Splash images

A card shows a picture when its entry in the data file has an `art` path, and a coloured background with a drawn icon when it doesn't.

- **Final Fantasy Resonance:** `images/resonance/cover.jpg`. `artPos: 'right center'` keeps the character in view when the card crops the picture.
- **Final Fantasy VII Rebirth:** `images/rebirth/cover.jpg`. `artPos: 'center 72%'` keeps the three characters in view.
- **Collections** (Tablet Shards, Treasure Chests, Treasure): these use the drawn shard and chest icons on purpose.

Landscape images around 1200×700 work best. The bottom of each picture is darkened so the text stays readable. Images are saved for offline use the first time they're shown, so they don't need adding to `sw.js`.

## Adding a game

1. Copy a file in `data/` as a starting point and change its lists and the `window.GAMES` entry at the bottom.
   `data/rebirth.js` shows the type buttons (`types`) and chapter titles (`stageTitles`).
2. Add a `<script>` line for the new file in `index.html`, and add the file to `APP_FILES` in `sw.js`.
3. Change `CACHE_VERSION` in `sw.js`.

## Updates

Whenever anything changes, change `CACHE_VERSION` in `sw.js` (for example `collection-tracker-v1.1` to `collection-tracker-v1.2`). Otherwise phones keep showing the old version.
When the app is next opened online, **"App updated. Tap to reload."** appears.

| Version | What changed |
|---|---|
| v1 | Final Fantasy Resonance: Tablet Shards and Treasure Chests |
| v1.1 | Final Fantasy VII Rebirth: Treasure, with Weapon / Materia / Item / Gil filters |
| v1.2 | Chapters can be folded away by tapping their heading |
