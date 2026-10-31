/* ============================================================
   COLLECTION TRACKER — APP CODE
   This file builds every page you see. It is split into sections:
     1. Settings and icons
     2. Small helper functions
     3. Saved progress (kept only on this device)
     4. Pages: home, game, collection
     5. Backups (save to a file / restore from a file)
     6. Navigation (which page to show, back button, scroll position)
     7. Offline support and start-up

   How pages work: the part of the web address after "#" says which page
   to show, for example:
     #/                                 home page (every game)
     #/g/resonance                      the collections in a game
     #/g/resonance/tablet-shards        one collection's checklist
   Using the address like this means the phone's Back gesture just works.

   Nothing is ever sent online. Progress is saved in this browser's own
   storage, under names starting with "gct-v1:".
   ============================================================ */
'use strict';

/* ---------- 1. SETTINGS AND ICONS ---------- */

// Every game, added by the files in data/ before this file runs.
const GAMES = window.GAMES || [];

// Saved progress uses names like "gct-v1:resonance:tablet-shards".
const STORE = 'gct-v1';

// Line-drawing icons (SVG). Each game or collection picks one with its "icon" field;
// it shows on the card until the splash image has loaded, and as the tick mark on items.
const ICONS = {
  crystal: '<svg viewBox="0 0 48 48"><path d="M24 3 36 18 24 45 12 18Z"/><path d="M12 18h24M24 3l-5 15 5 27 5-27Z"/></svg>',
  shard: '<svg viewBox="0 0 30 30"><path d="M15 2 24 11 19 28 8 24 6 10Z"/></svg>',
  chest: '<svg viewBox="0 0 48 48"><path d="M6 20h36v20H6zM6 20c0-8 6-12 18-12s18 4 18 12"/><path d="M6 27h36M21 24h6v7h-6z"/></svg>',
  box: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path class="tick" d="m7.5 12.5 3 3 6-7"/></svg>'
};
// Which mark each collection icon uses on its items.
const MARKS = { shard: 'shard', chest: 'box', crystal: 'box' };

/* ---------- 2. SMALL HELPER FUNCTIONS ---------- */

function $(id) { return document.getElementById(id); }

/** Makes text safe to put inside HTML. */
function esc(text) {
  return String(text).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function findGame(id) { return GAMES.find(function (g) { return g.id === id; }); }
function findCollection(game, id) { return game.collections.find(function (c) { return c.id === id; }); }

/** "Chapter 3", or a section's own name (e.g. "Oblivion Palace") for a collection that has one. */
function stageLabel(game, stage) { return game.stages.indexOf(stage) >= 0 ? game.stageName + ' ' + stage : String(stage); }

/** "Chapters 1–3", or "Chapter 2" for a single one. */
function stageRange(game, list) {
  if (list.length === 1) return stageLabel(game, list[0]);
  return game.stageName + 's ' + list[0] + '–' + list[list.length - 1];
}

/** Attributes for a card or banner with a splash image. The colours show until
    (or instead of, if there's no image) the image. See loadArt.
    artPos says which part of the image to keep when it's cropped, e.g. 'right center'. */
function artAttrs(thing) {
  const tint = thing.tint || ['#1c2340', '#3b4a80'];
  return ' data-art="' + esc(thing.art || '') + '" style="--t1:' + tint[0] + ';--t2:' + tint[1] +
    (thing.artPos ? ';--art-pos:' + esc(thing.artPos) : '') + '"';
}

/** Loads each splash image on the page. Only once it has really loaded is it shown,
    so a missing image just leaves the coloured background and icon. */
function loadArt(root) {
  root.querySelectorAll('[data-art]').forEach(function (node) {
    const src = node.getAttribute('data-art');
    if (!src) return;
    const img = new Image();
    img.onload = function () {
      node.style.setProperty('--art', 'url("' + src + '")');
      node.classList.add('has-art');
    };
    img.src = src;
  });
}

function meter(done, total) {
  const pct = total ? Math.round(done / total * 100) : 0;
  return '<span class="meter" aria-hidden="true"><i style="width:' + pct + '%"></i></span>';
}

/* ---------- 3. SAVED PROGRESS (kept only on this device) ---------- */

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(STORE + ':' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(STORE + ':' + key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
}

/** The ids of everything collected in one collection. */
function getCollected(game, col) { return new Set(load(game.id + ':' + col.id, [])); }
function setCollected(game, col, set) { save(game.id + ':' + col.id, Array.from(set)); }

/** Is this collection still locked ("unlockAt": the chapter it opens in)? */
function isLocked(game, col) {
  return !!col.unlockAt && game.stages.indexOf(getProgress(game).upTo) < game.stages.indexOf(col.unlockAt);
}

/** How far through the game you are. Shared by all of a game's collections. */
function getProgress(game) {
  const p = load(game.id + ':progress', {});
  return { upTo: game.stages.indexOf(p.upTo) >= 0 ? p.upTo : game.stages[0], only: !!p.only };
}

/** Per-collection display choices (hide collected, missable only, blur contents). */
function getView(game, col) {
  const v = load(game.id + ':' + col.id + ':view', {});
  return { hide: !!v.hide, miss: !!v.miss, blur: !!v.blur, types: Array.isArray(v.types) ? v.types : [] };
}

function countCollected(game, col) {
  const got = getCollected(game, col);
  return col.items.filter(function (item) { return got.has(item.id); }).length;
}

/* ---------- 4. PAGES ---------- */

const view = $('view');

function setTitle(text) {
  $('page-title').textContent = text;
  document.title = text === 'Collections' ? 'Collection Tracker' : text + ' · Collection Tracker';
}

/** A big tappable card with a splash background, used for games and collections.
    With no href it is a locked card: not tappable, and no progress bar. */
function card(href, thing, title, sub, done, total) {
  if (!href) {
    return '<div class="card card-locked" aria-disabled="true"' + artAttrs(thing) + '>' +
      '<span class="card-icon" aria-hidden="true">' + (ICONS[thing.icon] || '') + '</span>' +
      '<span class="card-text"><span class="card-title">' + esc(title) + '</span>' +
      '<span class="card-sub">' + esc(sub) + '</span></span></div>';
  }
  return '<a class="card" href="' + href + '"' + artAttrs(thing) + '>' +
    '<span class="card-icon" aria-hidden="true">' + (ICONS[thing.icon] || '') + '</span>' +
    '<span class="card-text"><span class="card-title">' + esc(title) + '</span>' +
    '<span class="card-sub">' + esc(sub) + '</span>' +
    '<span class="card-progress">' + meter(done, total) + '<span>' + done + ' / ' + total + '</span></span>' +
    '</span></a>';
}

/** Home page: one card per game. */
function showHome() {
  setTitle('Collections');
  let html = '<section class="cards cards-games">';
  GAMES.forEach(function (game) {
    let done = 0, total = 0;
    game.collections.forEach(function (col) { done += countCollected(game, col); total += col.items.length; });
    const names = game.collections.map(function (c) { return c.name; }).join(' · ');
    html += card('#/g/' + game.id, game, game.name, names, done, total);
  });
  html += '</section>';
  html += '<footer class="home-foot">' +
    '<p>Your progress is saved only on this device. Nothing is sent online and there is no account.</p>' +
    '<p>Moving to a new phone, or clearing your browser? Save a backup file first, then restore it there.</p>' +
    '<div class="foot-btns"><button type="button" class="btn" id="backup-save">Save a backup</button>' +
    '<button type="button" class="btn" id="backup-load">Restore a backup</button>' +
    '<input type="file" id="backup-file" accept="application/json,.json" hidden></div>' +
    '<p class="small">Fan-made tool, not affiliated with any game publisher. Game names and artwork belong to their owners.</p>' +
    '</footer>';
  view.innerHTML = html;
  loadArt(view);
  $('backup-save').addEventListener('click', saveBackup);
  $('backup-load').addEventListener('click', function () { $('backup-file').click(); });
  $('backup-file').addEventListener('change', restoreBackup);
}

/** Game page: how far through the game you are, then one card per collection. */
function showGame(game) {
  setTitle(game.short || game.name);
  const progress = getProgress(game);
  const stageWord = game.stageName.toLowerCase();
  let html = '<section class="banner banner-small"' + artAttrs(game) + '><h2>' + esc(game.name) + '</h2></section>';

  // The chapter picker sits here so it applies to every collection in the game.
  html += '<section class="filters stage-picker" aria-label="Spoiler filter">' +
    '<div class="f-row">' +
      '<label class="f-label" for="f-stage">I’m up to</label>' +
      '<select id="f-stage">' + game.stages.map(function (s) {
        return '<option value="' + s + '">' + esc(stageLabel(game, s)) + '</option>';
      }).join('') + '</select>' +
      '<label class="check"><input type="checkbox" id="f-only"> This ' + esc(stageWord) + ' only</label>' +
    '</div>' +
    '<p class="f-hint">Later ' + esc(stageWord) + 's stay hidden in every collection below.' +
      (game.asideNote ? ' ' + esc(game.asideNote) : '') + '</p>' +
  '</section>';

  html += '<section class="cards" id="col-cards"></section>';
  view.innerHTML = html;
  drawCards(game);

  $('f-stage').value = progress.upTo;
  $('f-only').checked = progress.only;
  $('f-stage').addEventListener('change', function (e) {
    progress.upTo = +e.target.value;
    save(game.id + ':progress', progress);
    drawCards(game);
  });
  $('f-only').addEventListener('change', function (e) {
    progress.only = e.target.checked;
    save(game.id + ':progress', progress);
  });
}

/** The collection cards on the game page. A collection that opens in a later chapter
    shows as "???" until "I'm up to" reaches that chapter. */
function drawCards(game) {
  $('col-cards').innerHTML = game.collections.map(function (col) {
    if (isLocked(game, col)) {
      return card('', col, '???', 'This is unlocked during ' + stageLabel(game, col.unlockAt), 0, 0);
    }
    return card('#/g/' + game.id + '/' + col.id, col, col.name, col.blurb || '', countCollected(game, col), col.items.length);
  }).join('');
  loadArt($('col-cards'));
}

/* --- Collection page --- */

// What is shown on the open collection page. Search and location aren't saved:
// they reset each time you open a collection.
let page = null;

// Chapters and locations you have opened or closed by hand, so a redraw keeps them that way.
// Key: "game/collection/stage" for a chapter, "game/collection/stage|location" for a location;
// value: true (open) or false (closed).
const groupOpen = {};

/** Collection page: the filter bar, then every item sorted by chapter, then location. */
function showCollection(game, col) {
  setTitle(col.name);
  page = { game: game, col: col, got: getCollected(game, col), progress: getProgress(game), view: getView(game, col), q: '', group: '' };
  const hasMiss = col.items.some(function (i) { return i.miss; });

  let html = '<section class="banner banner-small"' + artAttrs(col) + '>' +
    '<h2>' + esc(col.name) + '</h2><p id="overall"></p></section>';

  // The chapter picker is on the game page; this bar only narrows down what that allows.
  html += '<section class="filters" aria-label="Filters">' +
    '<div class="f-row">' +
      '<select id="f-group" aria-label="Location"></select>' +
      '<input type="search" id="f-q" placeholder="Search' + (col.showContents ? ' contents or' : '') + ' locations" aria-label="Search">' +
    '</div>' +
    '<div class="f-row">' +
      '<button type="button" class="chip" id="f-hide" aria-pressed="false">Hide collected</button>' +
      (hasMiss ? '<button type="button" class="chip" id="f-miss" aria-pressed="false">Missable only</button>' : '') +
      (col.showContents ? '<button type="button" class="chip" id="f-blur" aria-pressed="false">Blur contents</button>' : '') +
    '</div>' +
    // Type buttons (e.g. Weapon, Materia): pick any number. None picked shows everything.
    (col.types ? '<div class="f-row" role="group" aria-label="Show only these types"><span class="f-label">Show</span>' +
      col.types.map(function (t) {
        return '<button type="button" class="chip" data-type="' + esc(t[0]) + '" aria-pressed="false">' + esc(t[1]) + '</button>';
      }).join('') + '</div>' : '') +
    '<div class="f-progress"><span id="p-text"></span><span class="meter"><i id="p-bar"></i></span></div>' +
  '</section>';

  if (col.milestones) html += '<details class="milestones" id="milestones"></details>';
  html += '<div id="col-list"></div>';
  if (col.footer) html += '<footer class="col-foot">' + esc(col.footer) + '</footer>';
  view.innerHTML = html;
  loadArt(view);

  $('f-group').addEventListener('change', function (e) { page.group = e.target.value; drawList(); });
  let typingTimer = null;
  $('f-q').addEventListener('input', function (e) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () { page.q = e.target.value; drawList(); }, 150);
  });
  [['f-hide', 'hide'], ['f-miss', 'miss'], ['f-blur', 'blur']].forEach(function (pair) {
    const btn = $(pair[0]);
    if (!btn) return;
    btn.addEventListener('click', function () {
      page.view[pair[1]] = !page.view[pair[1]];
      save(game.id + ':' + col.id + ':view', page.view);
      drawList();
    });
  });
  view.querySelectorAll('[data-type]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const type = btn.getAttribute('data-type');
      const at = page.view.types.indexOf(type);
      if (at >= 0) page.view.types.splice(at, 1); else page.view.types.push(type);
      save(game.id + ':' + col.id + ':view', page.view);
      drawList();
    });
  });

  fillGroupOptions();
  drawList();
}

/** The chapters currently allowed on screen, to avoid spoilers.
    A collection with its own "section" (e.g. Oblivion Palace) always shows just that. */
function visibleStages() {
  if (page.col.section) return [page.col.section];
  const p = page.progress, stages = page.game.stages, aside = page.game.asideStages || [];
  if (p.only) return [p.upTo];
  // "Aside" chapters (e.g. a flashback whose items don't carry over) only show while you're on them.
  return stages.slice(0, stages.indexOf(p.upTo) + 1).filter(function (s) {
    return s === p.upTo || aside.indexOf(s) < 0;
  });
}

/** Everything shown on the page: sections that always show (e.g. Oblivion Palace), then the visible chapters. */
function shownStages() {
  return (page.col.alwaysStages || []).concat(visibleStages());
}

/** Fills the Location menu with only the locations in the visible chapters. */
function fillGroupOptions() {
  const stages = shownStages();
  const groups = [];
  page.col.items.forEach(function (item) {
    if (stages.indexOf(item.stage) >= 0 && groups.indexOf(item.group) < 0) groups.push(item.group);
  });
  if (groups.indexOf(page.group) < 0) page.group = '';
  $('f-group').innerHTML = '<option value="">All locations</option>' + groups.map(function (g) {
    return '<option value="' + esc(g) + '">' + esc(g) + '</option>';
  }).join('');
  $('f-group').value = page.group;
}

/** Does this item pass the filters (other than chapter)? */
function matches(item, terms) {
  if (page.view.hide && page.got.has(item.id)) return false;
  if (page.view.miss && !item.miss) return false;
  if (page.group && item.group !== page.group) return false;
  if (page.view.types.length && page.view.types.indexOf(item.type) < 0) return false;
  if (terms.length) {
    const text = [item.group, item.region || '', item.name || '', item.where, item.note || '', item.miss || '', item.timing || '']
      .join(' ').toLowerCase();
    if (!terms.every(function (t) { return text.indexOf(t) >= 0; })) return false;
  }
  return true;
}

/** Redraws the checklist, progress bar and rewards. Runs after any change. */
function drawList() {
  const game = page.game, col = page.col, got = page.got;
  const stages = shownStages();
  const chapters = visibleStages();
  const terms = page.q.toLowerCase().split(/\s+/).filter(Boolean);

  // Filter chips show whether they are on.
  [['f-hide', 'hide'], ['f-miss', 'miss'], ['f-blur', 'blur']].forEach(function (pair) {
    if ($(pair[0])) $(pair[0]).setAttribute('aria-pressed', String(page.view[pair[1]]));
  });
  view.querySelectorAll('[data-type]').forEach(function (btn) {
    btn.setAttribute('aria-pressed', String(page.view.types.indexOf(btn.getAttribute('data-type')) >= 0));
  });
  view.classList.toggle('blur-contents', page.view.blur);

  // Overall and visible-chapter progress.
  const totalGot = col.items.filter(function (i) { return got.has(i.id); }).length;
  $('overall').textContent = totalGot + ' of ' + col.items.length + ' collected';
  const inView = col.items.filter(function (i) { return stages.indexOf(i.stage) >= 0; });
  const viewGot = inView.filter(function (i) { return got.has(i.id); }).length;
  $('p-text').textContent = viewGot + ' / ' + inView.length + ' in ' +
    [stageRange(game, chapters)].concat(col.alwaysStages || []).join(' and ');
  $('p-bar').style.width = (inView.length ? viewGot / inView.length * 100 : 0) + '%';

  if (col.milestones) drawMilestones(totalGot);

  let html = '';
  stages.forEach(function (stage) {
    const all = col.items.filter(function (i) { return i.stage === stage; });
    const shown = all.filter(function (i) { return matches(i, terms); });
    const stageGot = all.filter(function (i) { return got.has(i.id); }).length;
    if (!shown.length && (terms.length || page.group || page.view.miss || page.view.types.length)) return;

    const regions = [];
    all.forEach(function (i) { if (i.region && regions.indexOf(i.region) < 0) regions.push(i.region); });
    const title = (game.stageTitles || {})[stage];
    const stageKey = game.id + '/' + col.id + '/' + stage;
    // Chapters start open; tap the heading to fold one away. Filtering opens what matches.
    const stageOpen = terms.length || page.group || page.view.miss || page.view.types.length ? true : groupOpen[stageKey] !== false;

    html += '<details class="stage" data-key="' + esc(stageKey) + '"' + (stageOpen ? ' open' : '') + '>' +
      '<summary><h2><span class="chev" aria-hidden="true"></span><span class="s-name">' + esc(stageLabel(game, stage)) +
      (title ? '<span class="stage-title">' + esc(title) + '</span>' : '') + '</span>' +
      (all.length ? '<small class="' + (stageGot === all.length ? 'done' : '') + '">' + stageGot + ' / ' + all.length + '</small>' : '') +
      '</h2></summary>';
    if (regions.length) html += '<p class="regions">' + esc(regions.join(' · ')) + '</p>';
    ((col.stageNotes || {})[stage] || []).forEach(function (n) {
      html += '<p class="alert alert-' + esc(n.kind) + '">' + (n.title ? '<b>' + esc(n.title) + ':</b> ' : '') + esc(n.text) + '</p>';
    });

    if (!shown.length) {
      // A chapter can have nothing to collect at all (it then just shows its notes).
      if (all.length) html += '<p class="empty">Everything in this ' + esc(game.stageName.toLowerCase()) + ' is collected.</p>';
      html += '</details>';
      return;
    }

    // Group by location, keeping the order the locations first appear in.
    const groups = [];
    shown.forEach(function (i) { if (groups.indexOf(i.group) < 0) groups.push(i.group); });
    groups.forEach(function (group) {
      const groupAll = all.filter(function (i) { return i.group === group; });
      const groupGot = groupAll.filter(function (i) { return got.has(i.id); }).length;
      const items = shown.filter(function (i) { return i.group === group; });
      const key = game.id + '/' + col.id + '/' + stage + '|' + group;
      const complete = groupGot === groupAll.length;
      // Folded until you open it, so a long list isn't overwhelming. Searching, picking a
      // location, a type button or "Missable only" opens what matches.
      const open = terms.length || page.group || page.view.miss || page.view.types.length ? true : !!groupOpen[key];
      const missed = items.filter(function (i) { return i.miss; });
      const hasMiss = missed.length > 0;
      const allTemp = hasMiss && missed.every(function (i) { return i.missTemp; });
      const hasTiming = !hasMiss && items.some(function (i) { return i.timing; });

      html += '<details class="group' + (complete ? ' complete' : '') + '" data-key="' + esc(key) + '"' + (open ? ' open' : '') + '>' +
        '<summary><span class="chev" aria-hidden="true"></span><span class="g-name">' + esc(group) + '</span>' +
        (hasMiss ? missTag(allTemp) : '') +
        (hasTiming ? '<span class="tag tag-time">Timing</span>' : '') +
        '<span class="g-count">' + groupGot + ' / ' + groupAll.length + '</span></summary>';
      const note = (col.groupNotes || {})[group] || (col.groupNotes || {})[group.replace(/ — .*$/, '')];
      if (note) html += '<p class="g-note">' + esc(note) + '</p>';
      html += '<ul class="items">' + items.map(itemRow).join('') + '</ul></details>';
    });
    html += '</details>';
  });

  if (!html) html = '<p class="empty">Nothing matches these filters.</p>';

  // Say what's hidden, so it's clear the list isn't the whole game.
  $('col-list').innerHTML = html + (col.section ? '' : hiddenNotes(game, col, chapters));
}

/** Notes saying which chapters are hidden and how to show them. */
function hiddenNotes(game, col, stages) {
  let html = '';
  const all = game.stages;
  const last = stages[stages.length - 1];
  const later = all.slice(all.indexOf(last) + 1);
  const aside = game.asideStages || [];
  const earlier = all.slice(0, all.indexOf(stages[0])).filter(function (s) { return page.progress.only || aside.indexOf(s) < 0; });
  if (later.length) {
    const n = col.items.filter(function (i) { return later.indexOf(i.stage) >= 0; }).length;
    html += '<p class="locked"><b>' + esc(stageRange(game, later)) + '</b> hidden to avoid spoilers (' + n + ' more). ' +
      'Move “I’m up to” forward on the ' + gameLink(game) + ' page when you get there.</p>';
  }
  if (earlier.length) html += '<p class="locked">' + esc(stageRange(game, earlier)) + ' hidden while “This ' +
    esc(game.stageName.toLowerCase()) + ' only” is on (on the ' + gameLink(game) + ' page).</p>';
  if (!page.progress.only && game.asideNote && aside.some(function (s) { return stages.indexOf(s) < 0 && all.indexOf(s) < all.indexOf(page.progress.upTo); })) {
    html += '<p class="locked">' + esc(game.asideNote) + '</p>';
  }
  return html;
}

/** A link back up to the game page, where the chapter picker is. */
function gameLink(game) {
  return '<a class="text-link" href="#/g/' + esc(game.id) + '">' + esc(game.short || game.name) + '</a>';
}

/** "Missable", or "Temporarily missable" for something you get another chance at later. */
function missTag(temp) {
  return temp ? '<span class="tag tag-temp">Temporarily missable</span>' : '<span class="tag tag-miss">Missable</span>';
}

/** One item: the tick button, then what it is and where to find it. */
function itemRow(item) {
  const got = page.got.has(item.id);
  const mark = ICONS[MARKS[page.col.icon] || 'box'];
  const label = (page.col.showContents ? item.name : page.col.name.replace(/s$/, '') + ' ' + item.num) + ', ' + item.group;
  let body = '';
  if (page.col.showContents) {
    body += '<span class="i-head"><span class="num">#' + item.num + '</span><span class="i-name">' + esc(item.name) + '</span>' +
      (item.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</span>';
    body += item.where
      ? '<span class="where' + (item.rough ? ' rough' : '') + '">' + esc(item.where) + '</span>'
      : '<span class="where rough none">No written location found yet.</span>';
  } else {
    body += '<span class="where"><span class="num">#' + item.num + '</span>' + esc(item.where) + '</span>';
  }
  if (item.note) body += '<span class="note">' + esc(item.note) + '</span>';
  if (item.miss) body += '<span class="miss' + (item.missTemp ? ' miss-temp' : '') + '">' + missTag(item.missTemp) + ' ' + esc(item.miss) + '</span>';
  if (item.timing) body += '<span class="timing"><span class="tag tag-time">Timing</span> ' + esc(item.timing) + '</span>';

  return '<li class="item' + (got ? ' got' : '') + '">' +
    '<button type="button" class="mark mark-' + (MARKS[page.col.icon] || 'box') + '" data-id="' + esc(item.id) + '" aria-pressed="' + got + '" ' +
    'aria-label="' + esc(label) + '">' + mark + '</button>' +
    '<span class="i-body">' + body + '</span></li>';
}

/** The rewards panel: what the next reward is and how many more you need. */
function drawMilestones(count) {
  const m = page.col.milestones;
  const nextIndex = m.list.findIndex(function (r) { return r.at > count; });
  let head;
  if (nextIndex < 0) {
    head = '<span class="ms-next">Every reward unlocked</span>' + meter(1, 1);
  } else {
    const next = m.list[nextIndex];
    const prev = nextIndex ? m.list[nextIndex - 1].at : 0;
    head = '<span class="ms-next">Next: ' + esc(next.title) + ' <small>(' + esc(next.detail) + ', ' + next.at + ')</small></span>' +
      '<span class="ms-need">' + (next.at - count) + ' more</span>' + meter(count - prev, next.at - prev);
  }
  const box = $('milestones');
  const wasOpen = box.open;
  box.innerHTML = '<summary>' + head + '<span class="ms-all">' + esc(m.title) + '</span></summary>' +
    '<ol class="ms-list">' + m.list.map(function (r, i) {
      const done = count >= r.at;
      return '<li class="' + (done ? 'done' : '') + (i === nextIndex ? ' next' : '') + '"><span class="ms-at">' + r.at + '</span>' +
        '<span>' + esc(r.title) + ' <small>' + esc(r.detail) + '</small></span>' +
        '<span class="ms-state">' + (done ? 'Unlocked' : (r.at - count) + ' to go') + '</span></li>';
    }).join('') + '</ol>';
  box.open = wasOpen;
}

// Taps on the collection page: ticking items, and remembering opened/closed chapters and locations.
view.addEventListener('click', function (e) {
  if (!page) return;
  const btn = e.target.closest('.mark');
  if (btn) {
    const id = btn.getAttribute('data-id');
    if (page.got.has(id)) page.got.delete(id); else page.got.add(id);
    setCollected(page.game, page.col, page.got);
    drawList();
    // Keep keyboard focus on the same item after the redraw (or the list if it was hidden).
    const again = view.querySelector('.mark[data-id="' + CSS.escape(id) + '"]');
    if (again) again.focus({ preventScroll: true });
    return;
  }
  const summary = e.target.closest('details.group > summary, details.stage > summary');
  if (summary) groupOpen[summary.parentNode.getAttribute('data-key')] = !summary.parentNode.open;
});

/* ---------- 5. BACKUPS ---------- */

/** Downloads every saved list as one small file. It never leaves the device unless you move it. */
function saveBackup() {
  const data = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.indexOf(STORE + ':') === 0) data[key] = JSON.parse(localStorage.getItem(key));
    }
  } catch (e) { alert('Couldn’t read your saved progress on this device.'); return; }
  const file = new Blob([JSON.stringify({ app: 'collection-tracker', saved: new Date().toISOString(), data: data }, null, 1)],
    { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'collection-tracker-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
}

/** Reads a backup file and replaces the progress on this device with it. */
function restoreBackup(e) {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  file.text().then(function (text) {
    const backup = JSON.parse(text);
    if (!backup || backup.app !== 'collection-tracker' || typeof backup.data !== 'object') throw new Error('not a backup');
    if (!confirm('Replace the progress on this device with the backup from ' + String(backup.saved || '').slice(0, 10) + '?')) return;
    const remove = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf(STORE + ':') === 0) remove.push(localStorage.key(i));
    }
    remove.forEach(function (k) { localStorage.removeItem(k); });
    Object.keys(backup.data).forEach(function (k) {
      if (k.indexOf(STORE + ':') === 0) localStorage.setItem(k, JSON.stringify(backup.data[k]));
    });
    route();
  }).catch(function () { alert('That file isn’t a Collection Tracker backup.'); });
}

/* ---------- 6. NAVIGATION ---------- */

// Scroll position of each page you've visited, so Back returns you to the same spot.
const scrollMemory = {};
let lastHash = null;

// How many in-app pages deep you are, stored with each history step (see Duty Briefings).
let depth = 0;

/** Reads the web address and draws the matching page. */
function route() {
  if (lastHash !== null) scrollMemory[lastHash] = window.scrollY;
  if (history.state && typeof history.state.depth === 'number') {
    depth = history.state.depth;
  } else {
    depth = lastHash === null ? 0 : depth + 1;
    history.replaceState({ depth: depth }, '');
  }

  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const game = parts[0] === 'g' ? findGame(parts[1]) : null;
  const col = game && parts[2] ? findCollection(game, parts[2]) : null;

  page = null;
  view.classList.remove('blur-contents');
  // A collection that is still locked (e.g. the Colosseum before Chapter 4) shows the game page instead.
  if (col && !isLocked(game, col)) showCollection(game, col);
  else if (game) showGame(game);
  else showHome();

  $('back-btn').hidden = !game;
  const hash = location.hash || '#/';
  window.scrollTo(0, scrollMemory[hash] || 0);
  lastHash = hash;
}

/** The page "above" this one: collection → game → home. */
function parentHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return parts.length > 2 ? '#/g/' + parts[1] : '#/';
}

/** Back button: go back if we came from inside the app, otherwise go up a level. */
function goBack() {
  if (depth > 0) history.back();
  else location.replace(parentHash());
}

/* ---------- 7. OFFLINE SUPPORT AND START-UP ---------- */

/** Registers the service worker (sw.js), which saves the app on the phone so it opens without internet.
    If a newer version is found later, a "tap to reload" message appears. */
function registerServiceWorker() {
  // Service workers only run from a proper web address, not from a file opened directly.
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').catch(function () { /* offline support unavailable */ });
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    // The very first install also triggers this, so only show the message for real updates.
    if (hadController) $('update-toast').hidden = false;
  });
}

function start() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  $('back-btn').addEventListener('click', goBack);
  $('update-toast').addEventListener('click', function () { location.reload(); });
  window.addEventListener('hashchange', route);
  route();
  registerServiceWorker();
}

start();
