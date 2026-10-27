# Collection Tracker: phone app

An offline checklist for collectables in the games I play. It currently covers **Final Fantasy Resonance**: all 99 Tablet Shards and 220 Treasure Chests.
Fan-made tool, not affiliated with any game publisher. Game names and artwork belong to their owners.

- **Works offline.** Once installed, it opens without internet.
- **No account or log-in.**
- **Nothing is sent online.** Your ticks are saved only in the app's storage on your device.

## How to use it

1. **Home:** tap a game.
2. **Game:** set how far you've played (see below), then tap a collection (for Resonance: *Tablet Shards* or *Treasure Chests*).
3. **Collection:** tap the shard or box next to an item to mark it collected. Tap again to undo.

Items are sorted by **chapter**, then by **location**. Locations start folded so the list isn't overwhelming: tap a location's name to open or close it. Searching, picking a location or turning on **Missable only** opens whatever matches.

**Avoiding spoilers:**
- **I'm up to** (on the game page): set the chapter you've reached. Later chapters stay hidden in every collection for that game.
- **This chapter only** (on the game page): show just that chapter.
- **Blur contents** (chests): hides what's inside each chest until you tap it or mark it opened.

**Other filters:** pick a location, search for an item or place, **Hide collected**, or **Missable only**.

The Tablet Shards page also shows the next Oblivion Palace reward and how many more shards you need.

## Backups

Progress lives only on the device you use. To move it, open the home page, tap **Save a backup**, move the file to the new device, then tap **Restore a backup** there.

## Splash images

A card shows a picture when its entry in the data file has an `art` path, and a coloured background with a drawn icon when it doesn't.

- **Final Fantasy Resonance:** `images/resonance/cover.jpg`. `artPos: 'right center'` keeps the character in view when the card crops the picture.
- **Tablet Shards and Treasure Chests:** these use the drawn shard and chest icons on purpose.

Landscape images around 1200×700 work best. The bottom of each picture is darkened so the text stays readable. Images are saved for offline use the first time they're shown, so they don't need adding to `sw.js`.

## Adding a game

1. Copy `data/resonance.js` as a starting point and change its lists and the `window.GAMES` entry at the bottom.
2. Add a `<script>` line for the new file in `index.html`, and add the file to `APP_FILES` in `sw.js`.
3. Change `CACHE_VERSION` in `sw.js`.

## Updates

Whenever anything changes, change `CACHE_VERSION` in `sw.js` (for example `collection-tracker-v1` to `collection-tracker-v2`). Otherwise phones keep showing the old version.
When the app is next opened online, **"App updated. Tap to reload."** appears.
