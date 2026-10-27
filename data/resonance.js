/* ============================================================
   FINAL FANTASY RESONANCE — COLLECTION DATA
   Copied from the "FF Resonance Tablet Shards" and "Resonance Chest Log"
   pages (Oct 2026). The lists are kept in the same shape as those pages,
   and the bottom of this file turns them into what app.js reads.

   Tablet Shards   SHARDS  [number, chapter, location, where to find it, optional note]
                   REWARDS [shards needed, chamber, reward] (Oblivion Palace safes)
   Treasure Chests ROWS    [chapter, region, location, chest number, contents, 1 if magicite]
                   LOC     "location|number" -> [where to find it, 1 = written directions / 0 = map section only]
                   MISS    "location|number" -> why it can be missed
                   ZONE_NOTES  location -> note shown above its chests
                   CH_ALERTS   chapter -> warnings shown at the top of the chapter

   To update: edit the lists below, then change CACHE_VERSION in sw.js (see README).
   ============================================================ */
(function () {
'use strict';

const SHARDS = [
[1,1,"Grandshelt, the Royal Capital","Commercial District (east of the main entrance): among crates left of the weapon and item stalls."],
[2,1,"Village of Kol","Left side of the pool in the south-west corner."],
[3,1,"Town of Felicitas","From the entrance, cross the wooden bridge east; just right of the stone wall ahead."],
[4,1,"Town of Felicitas","Cross the bridge west, turn left at the torch onto a hidden path and climb the ladder; behind the wall on your left."],
[5,1,"Kolobos Ruins","Second area: down the entry steps, behind the two grey-green cylinders."],
[6,1,"Kolobos Ruins","After the bridge gives way and the fight, climb the ladder and the next stairs; behind the fallen pillar below you."],
[7,1,"Grandport Harbour","On the pier south of the Item Shop, behind barrels on the right."],
[8,1,"Grandport Harbour","At the foot of the tree west of the Weapon & Armour shop."],
[9,1,"Cavern of Swords","At the far end of the cave, behind a stalagmite."],
[10,1,"Siren’s Tower","Past the entry fountain, up the right-hand stairs, at the edge of the ledge."],
[11,1,"Siren’s Tower","Top of the first staircase area, before the next room: the far end of the right ledge."],
[12,1,"Siren’s Tower","Next room: up the stairs and left, at the end of a ledge."],

[13,2,"Dilmagia","First side area on the left after entering (NPC and a gate ringed with lights), in the corner."],
[14,2,"Dilmagia","Second junction on the main street (noticeboard west, shops east), behind stacked crates."],
[15,2,"Dilmagia","Shipyard: up the first stairs, then the stairs left of the main platform; end of that path by a ladder."],
[16,2,"Dilmagia","Shipyard: up the first stairs, then down the stairs right of the main platform; by the third girder."],
[17,2,"Mt. Thunderclap","Hard route (don’t pay Lid): just round the corner from the yellowish tree used in the Elven Maven sub quest.","Took the easy route? Teleport to the entrance from the Save Point."],
[18,2,"Mt. Thunderclap","Easy route (pay Lid 1,000 Gil): up the long ladder, beside a tree.","You can pay later via Save Point teleport."],
[19,2,"Mt. Thunderclap","After leaving, head south past the Shrine of Zidane and loop into the upper entrance (the Ramuh path); down the small ramp, tucked behind rocks."],
[20,2,"Dwarven Forge","South-west of the main area: over the wooden bridge and south to the end of the path."],
[21,2,"Dwarven Forge","North-west: down the steps to the Mom Bomb arena, on the south side of the path."],
[22,2,"Mobliz Shipyard","First area, head west; behind crates."],
[23,2,"Mobliz Shipyard","After the first lift, go east through a gap in the fence to the generator area; down the ladder in the south-east corner, then west."],
[24,2,"Mobliz Shipyard","After the second lift, head north; behind the shipping container before the fenced lift."],
[25,2,"Wind Shrine","First room: ignore the green-crystal elevator and look behind the right-hand pillar."],
[26,2,"Wind Shrine","Later, at an elevator on top of a staircase: in the gap between the stairs and the right railing."],
[27,2,"Wind Shrine","From there go south and ride the next crystal elevator over; left side of that platform."],

[28,3,"Olderion, the Aquapolis","Right at the entrance, by the boat-tour NPC, to the right of the central platform."],
[29,3,"Olderion, the Aquapolis","North to the pool with two statues; by a bench behind the left statue."],
[30,3,"Olderion, the Aquapolis","From the statues go north-east past the big water wheel; behind the plant pot on the stone bridge."],
[31,3,"Olderion, the Aquapolis","From the statue pool go north up some steps; behind the tree."],
[32,3,"Cave of Waters","After the first boat maze, just left of the dock you arrive at."],
[33,3,"Cave of Waters","Through the door after the long boat maze, in front of the waterfall (room with the Save Point and ladder)."],
[34,3,"Cave of Waters","On a later story return, a hidden path opens in the room left of the entrance; climb the ladders along it.","Unlocks on a later visit"],
[35,3,"Waterfall Way","Second room on the story visit (the room after the Save Point room if returning): up the stairs, east, by a ladder."],
[36,3,"Waterfall Way","Big waterfall room, on one of the stone platforms."],
[37,3,"Waterfall Way","Same room, north over the wooden bridges; on a rock between the waterfalls."],
[38,3,"Town of Amore","South of the Weapon and Item Shops, by a well on the small grassy island."],
[39,3,"Town of Amore","North of the Item Shop before the long bridge, beside a tree on the right."],
[40,3,"Water Shrine","Room with a round central platform and four paths: down the north stairs once the water is lowered."],
[41,3,"Water Shrine","Boat section: sail north-east past the balcony with the Viridian Pot; on a ledge to the right."],
[42,3,"Water Shrine","Further down, just left of the bottom of a long ladder."],

[43,4,"Mozul Station","South-west corner of the station."],
[44,4,"Capital Station","By the eastern stairs; you appear right beside it if you enter from the south on the World Map."],
[45,4,"Zoldaad, the Imperial Capital","Castle Plaza, straight east of the tram stop."],
[46,4,"Zoldaad, the Imperial Capital","Residential District, south-east corner."],
[47,4,"Zoldaad, the Imperial Capital","Slums, a few steps east of where you arrive, by barrels."],
[48,4,"Zoldaad, the Imperial Capital","Underground Tunnel: east to a metal walkway, down the stairs, double back west down a small ramp, then south to the corner of the room."],
[49,4,"Zoldaad, the Imperial Capital","Underground Tunnel: further in, south past the Pot room towards a metal bridge; a hidden way beneath it leads up to a room on the right."],
[50,4,"Rebel Hideout","North-west, Jake’s room (door with red-and-white flags): go round its right side and behind it to reach the crates, climb the ladder, then a few steps south-west."],
[51,4,"Rebel Hideout","North-east: facing the exit to the conference room, up the stairs on the right, behind a metal pillar by the railing."],
[52,4,"Weapons Factory","Lava room: far west, up the stairs and across platforms to a crystal switch; use it, cross the raised girder and turn left."],
[53,4,"Weapons Factory","Lava room: up the long ladder by the Save Point to the three-switch platform; turn the left switch three times. Second left heading north from the ladder."],
[54,4,"Dungeon","With the Master Key, go south to the next block of cells; first cell on the right."],
[55,4,"Dungeon","With the Master Key, back in the room where you were held; the west-side cell."],
[56,4,"Zoldaad Castle","Behind the left horse statue at the stairs to the throne room."],
[57,4,"Zoldaad Castle","Up the throne-room stairs, right hallway, first door; south-east corner."],
[58,4,"Grandshelt, the Royal Capital","Colosseum (west exit from Grandshelt’s main screen): follow the first path all the way west.","Colosseum opens this chapter"],

[59,5,"Mysidia, the Magiapolis","From the main entrance, down the right stairs by the teleport crystal; in the corner behind an NPC."],
[60,5,"Mysidia, the Magiapolis","Storefront: just south of the Weapon Shop, beside two crates."],
[61,5,"Mysidia, the Magiapolis","West past the Item Shop into the blue teleporter; in the fountain plaza, by the second pillar on the right."],
[62,5,"Arcane Library","Entrance room (through the blue portal), south-west among the writing desks."],
[63,5,"Village of Sunioo","Straight ahead as you enter, a couple of steps up, between a bench and a pot."],
[64,5,"Village of Sunioo","Far north-east, by a snowman outside an igloo."],
[65,5,"Nameless Ruins","First room, as far west as you can go, by a fallen pillar."],
[66,5,"Nameless Ruins","Second area, down the stairs south of the Save Point, by a fallen chandelier."],
[67,5,"Arcane Library","Final room (second Save Point): climb the ladder to the east and follow the balcony round to the west.","Only after Nameless Ruins"],
[68,5,"Fina’s Psyche (Part 1)","Left of the big padlocked gate, under a chain."],
[69,5,"Fina’s Psyche (Part 1)","West of the gate, in the westernmost tent; among crates in the top-right corner."],
[70,5,"Fina’s Psyche (Part 1)","After the first padlock opens: the far end of the third area west of the gate, in a clearing."],
[71,5,"Tower of Mysidia","Top of the entrance, up the stairs behind the large crystal."],
[72,5,"Tower of Mysidia","On a landing of the spiral staircase."],
[73,5,"Tower of Mysidia","Higher landing on the story path, before the Azure Pot."],
[74,5,"Tower of Mysidia","On a snowdrift on the story path, after the Azure Pot."],
[75,5,"Fina’s Psyche (Part 2)","Over the bridge, then north to a small army camp; behind supplies in the bottom-right corner."],

[76,6,"Gaberads, the Undertown","Right side of the house at the north-west end of town."],
[77,6,"Research Centre Ruins","Level 1 card route (west): room with desks and a green teleporter."],
[78,6,"Research Centre Ruins","Level 1 route: the room with three consoles to switch on; on top of the shelves, south-east corner."],
[79,6,"Research Centre Ruins","Level 2 card route (east): through the teleporter room, up the long ladder, on the gantry to the right."],
[80,6,"Rugged Mountain Path","West of the first Save Point, under a dead tree."],
[81,6,"Rugged Mountain Path","East and down a ramp from the second Save Point, in the corner."],
[82,6,"Town of Duggle","North of town, east of the Weapon and Item Shop door; half-hidden behind the waterfall."],
[83,6,"Gronoa Shrine","Leaving the first room: south end of the landing, before either staircase."],
[84,6,"Gronoa Shrine","Down the west stairs, all the way south, then east; on stairs blocked by a fallen pillar."],
[85,6,"Gronoa Shrine","Down the long ladder, west, up the parallel ladder, then south; against a broken pillar."],
[86,6,"Sanctissimus Shrine","North from the second Save Point into the tombstone room; behind the north stairs go east into a hidden room under the torch, upstairs, then up the ladder by the Violet Pot."],
[87,6,"Sanctissimus Shrine","Ladder from the third Save Point to the crystal-elevator room; after the third elevator, before the fourth."],

[88,7,"Town of Sian","East past the item shop, under a blossom tree."],
[89,7,"Mt. Reizan","Along the story path to a fork of ramps going up and down; take the down path."],
[90,7,"Mt. Reizan","Platform between two wooden bridges, beside two pines."],
[91,7,"Lake Ryusei","West side, under a tree."],
[92,7,"Forest Path","North of the first Save Point, at the bend in the path."],
[93,7,"Forest Path","Dead end south-west of the second Save Point."],
[94,7,"Wandering Lands","Take the left turn at the first fork after the Save Point."],
[95,7,"Wandering Lands","Right beside you among stones after a cutscene."],

[96,8,"Crystal Tower","Right at the first fork from the entrance."],
[97,8,"Crystal Tower","Left at the next fork, then the next right."],
[98,8,"Crystal Tower","Appearing-bridges area: from the third solid platform go north, then west along the bridge."],
[99,8,"Dragon’s Maw","Near the end, where you defeat the Rogue Magitek Armour."]
];

const REWARDS=[
[3,"1-Star","Vitality Charm"],[6,"1-Star","Earrings"],[9,"1-Star","Magicite Shard"],[12,"1-Star","Stagger Ring"],[16,"1-Star","Dreadwing Mallet"],[20,"1-Star","Compound Bow"],[24,"1-Star","Magicite Shard"],[28,"1-Star","Astral Jacket"],
[32,"2-Star","Cure Drop"],[36,"2-Star","Celaeno Fragments"],[40,"2-Star","Magicite"],[44,"2-Star","Phantom Robe"],[48,"2-Star","Repeater Rifle"],[52,"2-Star","Protective Gear"],[56,"2-Star","Briar Edge"],[60,"2-Star","War Pick"],
[64,"3-Star","Magicite Cryst"],[68,"3-Star","Mirage Jacket"],[72,"3-Star","Sundering Odachi"],[76,"3-Star","Ancient Firearm"],[80,"3-Star","Adamantite"],[84,"3-Star","Ancient Whip"],
[89,"4-Star","Adamantite"],[94,"4-Star","Arch Drain"],[99,"4-Star","Lightbringer"]
];

const ROWS = [[1,"Grandshelt","Town of Mitra",1,"Ether ×1",0],[1,"Grandshelt","Town of Mitra",2,"Phoenix Down ×1",0],[1,"Grandshelt","Town of Mitra",3,"Tent ×1",0],[1,"Grandshelt","Town of Mitra",4,"Phoenix Down ×3",0],[1,"Grandshelt","Town of Mitra",5,"Ether ×1",0],[1,"Grandshelt","Grandshelt, the Royal Capital",1,"Premium Card ×1",0],[1,"Grandshelt","Grandshelt Castle",1,"Flame Scroll I ×3",0],[1,"Grandshelt","Grandshelt Castle",2,"Antidote Herb ×4",0],[1,"Grandshelt","Grandshelt Castle",3,"Flame Scroll I ×2",0],[1,"Grandshelt","Grandshelt Castle",4,"Phoenix Down ×1",0],[1,"Grandshelt","Grandshelt Castle",5,"Phoenix Down ×2",0],[1,"Grandshelt","Grandshelt Castle",6,"Black Garb ×1",0],[1,"Grandshelt","Grandshelt Castle",7,"Mist Turbo Ether ×1",0],[1,"Grandshelt","Grandshelt Castle",8,"Mist Hi-Potion ×2",0],[1,"Grandshelt","Grandshelt Castle",9,"Hoodwink Garb ×1",0],[1,"Grandshelt","Grandshelt Castle",10,"Cotton Robe ×1",0],[1,"Grandshelt","Commercial District",1,"Gil ×300",0],[1,"Grandshelt","Commercial District",2,"Gil ×300",0],[1,"Grandshelt","Commercial District",3,"Healing Spring ×1",0],[1,"Grandshelt","Earth Shrine — Area 1",1,"Phoenix Down ×1",0],[1,"Grandshelt","Earth Shrine — Area 1",2,"Nodachi ×1",0],[1,"Grandshelt","Earth Shrine — Area 1",3,"Flame Scroll I ×2",0],[1,"Grandshelt","Earth Shrine — Area 1",4,"Potion ×3",0],[1,"Grandshelt","Earth Shrine — Area 1",5,"Bulletproof Vest ×1",0],[1,"Grandshelt","Earth Shrine — Area 1",6,"Gil ×400",0],[1,"Grandshelt","Earth Shrine — Area 2",1,"Potion ×1",0],[1,"Grandshelt","Earth Shrine — Area 2",2,"Ether ×1",0],[1,"Grandshelt","Lost Cave",1,"Fuma Shuriken ×3",0],[1,"Grandshelt","Lost Cave",2,"Remedy ×1",0],[1,"Lanzelt","Village of Kol",1,"Tent ×1",0],[1,"Lanzelt","Village of Kol",2,"Antidote Herb ×3",0],[1,"Lanzelt","Grandport Harbor",1,"Smoke Bomb ×2",0],[1,"Lanzelt","Grandport Harbor",2,"Lightning Scroll I ×2",0],[1,"Lanzelt","Oblivion Palace",1,"Vitality Charm ×1",0],[1,"Lanzelt","Oblivion Palace",2,"Earrings ×1",0],[1,"Lanzelt","Oblivion Palace",3,"Magicite Shard ×1",1],[1,"Lanzelt","Oblivion Palace",4,"Stagger Ring ×1",0],[1,"Lanzelt","Oblivion Palace",5,"Dreadwing Mallet ×1",0],[1,"Lanzelt","Oblivion Palace",6,"Compound Bow ×1",0],[1,"Lanzelt","Oblivion Palace",7,"Magicite Shard ×1",1],[1,"Lanzelt","Oblivion Palace",8,"Astral Jacket ×1",0],[1,"Lanzelt","Oblivion Palace",9,"Cure Drop ×1",0],[1,"Lanzelt","Oblivion Palace",10,"Celaeno Fragments ×1",0],[1,"Lanzelt","Oblivion Palace",11,"Magicite ×1",1],[1,"Lanzelt","Oblivion Palace",12,"Phantom Robe ×1",0],[1,"Lanzelt","Oblivion Palace",13,"Repeater Rifle ×1",0],[1,"Lanzelt","Oblivion Palace",14,"Protective Gear ×1",0],[1,"Lanzelt","Oblivion Palace",15,"Briar Edge ×1",0],[1,"Lanzelt","Oblivion Palace",16,"War Pick ×1",0],[1,"Lanzelt","Oblivion Palace",17,"Magicite Cryst ×1",1],[1,"Lanzelt","Oblivion Palace",18,"Mirage Jacket ×1",0],[1,"Lanzelt","Oblivion Palace",19,"Sundering Odachi ×1",0],[1,"Lanzelt","Oblivion Palace",20,"Ancient Firearm ×1",0],[1,"Lanzelt","Oblivion Palace",21,"Adamantite ×1",0],[1,"Lanzelt","Oblivion Palace",22,"Ancient Whip ×1",0],[1,"Lanzelt","Oblivion Palace",23,"Adamantite ×1",0],[1,"Lanzelt","Oblivion Palace",24,"Arch Drain ×1",0],[1,"Lanzelt","Oblivion Palace",25,"Lightbringer ×1",0],[1,"Lanzelt","Siren's Tower",1,"Echo Herb ×2",0],[1,"Lanzelt","Siren's Tower",2,"Magicite Shard ×1",1],[1,"Lanzelt","Siren's Tower",3,"Sakura-Fubuki ×1",0],[1,"Lanzelt","Siren's Tower",4,"Monk's Prayer Beads ×1",0],[1,"Lanzelt","Siren's Tower",5,"Ether ×1",0],[1,"Lanzelt","Siren's Tower",6,"Ether ×2",0],[1,"Kolobos","Town of Felicitas",1,"Tent ×1",0],[1,"Kolobos","Town of Felicitas",2,"Smoke Bomb ×2",0],[1,"Kolobos","Town of Felicitas",3,"Unicorn Horn ×2",0],[1,"Kolobos","Town of Felicitas",4,"Ice Scroll I ×2",0],[1,"Kolobos","Kolobos Ruins",1,"Prickly Straitjacket ×1",0],[1,"Kolobos","Kolobos Ruins",2,"Knife of Poison ×2",0],[1,"Kolobos","Kolobos Ruins",3,"Antidote Herb ×3",0],[1,"Kolobos","Kolobos Ruins",4,"Ether ×2",0],[2,"Dirnado","Dwarven Forge",1,"Phoenix Down ×3",0],[2,"Dirnado","Dwarven Forge",2,"Headband ×1",0],[2,"Dirnado","Dwarven Forge",3,"Sledgehammer ×1",0],[2,"Dirnado","Dilmagia, the Machinopolis",1,"Insulated Gloves ×1",0],[2,"Dirnado","Dilmagia, the Machinopolis",2,"Gil ×500",0],[2,"Dirnado","Dilmagia, the Machinopolis",3,"Gil ×500",0],[2,"Dirnado","Shipyard",1,"Gil ×500",0],[2,"Dirnado","Shipyard",2,"Anti-Magic Gear ×1",0],[2,"Dirnado","Mt. Thunderclap",1,"Gil ×800",0],[2,"Dirnado","Mt. Thunderclap",2,"Moon Saber ×1",0],[2,"Dirnado","Mt. Thunderclap",3,"Power Wristbands ×1",0],[2,"Dirnado","Mt. Thunderclap",4,"Cape of the Raiju ×1",0],[2,"Dirnado","Mobliz Shipyard",1,"Eye Drops ×3",0],[2,"Dirnado","Mobliz Shipyard",2,"Protective Overcoat ×1",0],[2,"Dirnado","Mobliz Shipyard",3,"Lightning Scroll I ×2",0],[2,"Dirnado","Mobliz Shipyard",4,"Chocobo Down Charm ×1",0],[2,"Dirnado","Wind Shrine",1,"Mist Hi-Potion ×1",0],[2,"Dirnado","Wind Shrine",2,"Mist Hi-Potion ×1",0],[2,"Dirnado","Wind Shrine",3,"Tsukiyo no Tachi ×1",0],[2,"Dirnado","Wind Shrine",4,"Magicite Shard ×1",1],[2,"Dirnado","Wind Shrine",5,"Armor of Gales ×1",0],[3,"Olderion","Olderion, the Aquapolis",1,"Rock Piercer ×1",0],[3,"Olderion","Olderion, the Aquapolis",2,"Jeweled Ring ×1",0],[3,"Olderion","Olderion, the Aquapolis",3,"Mirage Robe ×1",0],[3,"Olderion","Town of Amore",1,"Morning Star ×1",0],[3,"Olderion","Town of Amore",2,"Water Scroll I ×2",0],[3,"Olderion","Town of Amore",3,"Aegis Robe ×1",0],[3,"Olderion","Cave of Waters",1,"Magicite Shard ×1",1],[3,"Olderion","Cave of Waters",2,"Total Calisthenics ×1",0],[3,"Olderion","Cave of Waters",3,"Shuriken ×3",0],[3,"Olderion","Cave of Waters",4,"Ice Scroll I ×2",0],[3,"Olderion","Cave of Waters",5,"Ninja Gear ×1",0],[3,"Olderion","Old Town, Olderion",1,"Lightning Scroll I ×3",0],[3,"Olderion","Old Town, Olderion",2,"Ether ×1",0],[3,"Olderion","Old Town, Olderion",3,"Mist Hi-Potion ×1",0],[3,"Olderion","Waterfall Way",1,"Devout's Armor ×1",0],[3,"Olderion","Waterfall Way",2,"Eye Drops ×2",0],[3,"Olderion","Waterfall Way",3,"Phoenix Pinion ×1",0],[3,"Olderion","Waterfall Way",4,"Guardian Sword ×1",0],[3,"Olderion","Waterfall Way",5,"Aquatic Veil ×1",0],[3,"Olderion","Water Shrine",1,"Scale Mail ×1",0],[3,"Olderion","Water Shrine",2,"Magicite Shard ×1",1],[3,"Olderion","Water Shrine",3,"R'lyeh Text ×1",0],[3,"Olderion","Water Shrine",4,"Lightning Scroll I ×3",0],[3,"Olderion","Water Shrine",5,"Piercing Mace ×1",0],[3,"Olderion","Water Shrine",6,"Calm Armlet ×1",0],[4,"Zoldaad","Zoldaad, the Imperial Capital",1,"Healing Spring ×2",0],[4,"Zoldaad","Imperial Residences",1,"Phoenix Pinion ×1",0],[4,"Zoldaad","Rebel Hideout",1,"Remedy ×1",0],[4,"Zoldaad","Rebel Hideout",2,"Phoenix Pinion ×1",0],[4,"Zoldaad","Rebel Hideout",3,"Robe of Roses ×1",0],[4,"Zoldaad","Weapons Factory",1,"Hoodwink Garb ×1",0],[4,"Zoldaad","Weapons Factory",2,"Magicite ×1",1],[4,"Zoldaad","Weapons Factory",3,"Knife of Blind ×3",0],[4,"Zoldaad","Weapons Factory",4,"Mist Potion ×3",0],[4,"Zoldaad","Weapons Factory",5,"Lightning Scroll I ×3",0],[4,"Zoldaad","Underground Tunnel",1,"Mist Turbo Ether ×1",0],[4,"Zoldaad","Underground Tunnel",2,"Lucky Bell ×1",0],[4,"Zoldaad","Underground Tunnel",3,"Magicite Shard ×1",1],[4,"Zoldaad","Underground Tunnel",4,"Mist Hi-Potion ×2",0],[4,"Zoldaad","Underground Tunnel",5,"Ether ×2",0],[4,"Zoldaad","Dungeon",1,"Turbo Ether ×1",0],[4,"Zoldaad","Dungeon",2,"Phoenix Pinion ×2",0],[4,"Zoldaad","Dungeon",3,"Phoenix Pinion ×1",0],[4,"Zoldaad","Dungeon",4,"Pulse Cannon ×1",0],[4,"Zoldaad","Zoldaad Castle",1,"Mist Turbo Ether ×1",0],[4,"Zoldaad","Zoldaad Castle",2,"Kikokusenga ×1",0],[4,"Zoldaad","Zoldaad Castle",3,"Kaiser Sword ×1",0],[4,"Zoldaad","Zoldaad Castle",4,"X-Potion ×1",0],[4,"Zoldaad","Quarry Cave",1,"Ancient Accessory ×1",0],[5,"Mysidia","Mysidia, the Magiapolis",1,"Healing Spring ×2",0],[5,"Mysidia","Mysidia, the Magiapolis",2,"Knight's Sword ×1",0],[5,"Mysidia","Mysidia, the Magiapolis",3,"Knife of Silence ×3",0],[5,"Mysidia","Mysidia, the Magiapolis",4,"Seraphim Bow ×1",0],[5,"Mysidia","Mysidia, the Magiapolis",5,"Thunder God's Earrings ×1",0],[5,"Mysidia","Village of Sunioo",1,"Water Scroll II ×2",0],[5,"Mysidia","Village of Sunioo",2,"Resonate Staff ×1",0],[5,"Mysidia","Village of Sunioo",3,"Fuma Shuriken ×2",0],[5,"Mysidia","Village of Sunioo",4,"Phoenix Pinion ×2",0],[5,"Mysidia","Village of Sunioo",5,"Arcane Coat ×1",0],[5,"Mysidia","Nameless Ruins",1,"Magi-Blaster ×1",0],[5,"Mysidia","Nameless Ruins",2,"Magicite ×1",1],[5,"Mysidia","Nameless Ruins",3,"Healing Spring ×3",0],[5,"Mysidia","Nameless Ruins",4,"Impact Wand ×1",0],[5,"Mysidia","Nameless Ruins",5,"Tyr's Armor ×1",0],[5,"Mysidia","Arcane Library",1,"Knife of Blind ×2",0],[5,"Mysidia","Arcane Library",2,"Book of Strength ×1",0],[5,"Mysidia","Arcane Library",3,"Mist Potion ×3",0],[5,"Mysidia","Arcane Library",4,"Mist Ether ×3",0],[5,"Mysidia","Arcane Library",5,"Genmato ×1",0],[5,"Mysidia","Tower of Mysidia",1,"Smelling Salts ×3",0],[5,"Mysidia","Tower of Mysidia",2,"Magicite ×1",1],[5,"Mysidia","Tower of Mysidia",3,"Guarding Gown ×1",0],[5,"Mysidia","Tower of Mysidia",4,"Bullseye Mace ×1",0],[5,"Mysidia","Fina's Psyche",1,"Mist Hi-Potion ×2",0],[5,"Mysidia","Fina's Psyche",2,"Barrel Blazer ×1",0],[5,"Mysidia","Fina's Psyche",3,"Lunar Whip ×1",0],[6,"Gronoa","Gaberada, the Undertown",1,"Remedy ×1",0],[6,"Gronoa","Gaberada, the Undertown",2,"Phoenix Pinion ×1",0],[6,"Gronoa","Gaberada, the Undertown",3,"Fuma Shuriken ×3",0],[6,"Gronoa","Town of Duggle",1,"Fuma Shuriken ×2",0],[6,"Gronoa","Town of Duggle",2,"X-Potion ×2",0],[6,"Gronoa","Research Center Ruins",1,"Lightning Scroll II ×1",0],[6,"Gronoa","Research Center Ruins",2,"Mist Turbo Ether ×2",0],[6,"Gronoa","Research Center Ruins",3,"Fortress Gear ×1",0],[6,"Gronoa","Research Center Ruins",4,"Arcane Long Rifle ×1",0],[6,"Gronoa","Research Center Ruins",5,"Magicite ×1",1],[6,"Gronoa","Research Center Ruins",6,"Unicorn Horn ×3",0],[6,"Gronoa","Rugged Mountain Path",1,"Flame Scroll II ×1",0],[6,"Gronoa","Rugged Mountain Path",2,"Kumobashiri ×1",0],[6,"Gronoa","Rugged Mountain Path",3,"Adamantite ×1",0],[6,"Gronoa","Gronoa Shrine",1,"Mist X-Ether ×1",0],[6,"Gronoa","Gronoa Shrine",2,"Magicite Cryst ×1",1],[6,"Gronoa","Gronoa Shrine",3,"Rod of Focus ×1",0],[6,"Gronoa","Gronoa Shrine",4,"Hermes Sandals ×1",0],[6,"Gronoa","Sanctissimus Shrine",1,"Whip of Affliction ×1",0],[6,"Gronoa","Sanctissimus Shrine",2,"Hero's Blade ×1",0],[7,"Pharm","Town of Sian",1,"Mist Hi-Potion ×2",0],[7,"Pharm","Town of Sian",2,"Fuma Shuriken ×2",0],[7,"Pharm","Town of Sian",3,"Phoenix Pinion ×3",0],[7,"Pharm","Town of Sian",4,"Mist Turbo Ether ×1",0],[7,"Pharm","Abandoned Cabin",1,"Ancient Rod ×1",0],[7,"Pharm","Dragon's Maw",1,"Magicite Cryst ×1",1],[7,"Pharm","Dragon's Maw",2,"Masamune ×1",0],[7,"Pharm","Dragon's Maw",3,"Excalibur ×1",0],[7,"Pharm","Dragon's Maw",4,"Sniper's Eye ×1",0],[7,"Pharm","Dragon's Maw",5,"Elixir ×2",0],[7,"Pharm","Dragon's Maw",6,"Chef's Knife ×3",0],[7,"Pharm","Dragon's Maw",7,"Analysis Hammer ×1",0],[7,"Pharm","Mt. Reizan",1,"X-Ether ×2",0],[7,"Pharm","Mt. Reizan",2,"Magicite Cryst ×1",1],[7,"Pharm","Mt. Reizan",3,"Analysis Hammer ×1",0],[7,"Pharm","Mt. Reizan",4,"Resonance Stone ×1",0],[7,"Pharm","Forest Path",1,"Megalixir ×1",0],[7,"Pharm","Forest Path",2,"Chef's Knife ×2",0],[7,"Pharm","Wandering Lands",1,"Elixir ×1",0],[7,"Pharm","Wandering Lands",2,"Silver Key ×1",0],[8,"Crystal Tower","Crystal Tower",1,"Apocalypse ×1",0],[8,"Crystal Tower","Crystal Tower",2,"Ancient Katana ×1",0],[8,"Crystal Tower","Crystal Tower",3,"Faerie Bow ×1",0],[8,"Crystal Tower","Crystal Tower",4,"Megalixir ×1",0],[8,"Crystal Tower","Crystal Tower",5,"Pilebunker ×1",0],[8,"Crystal Tower","Crystal Tower",6,"Magicite Cryst ×1",1],[8,"Crystal Tower","Crystal Tower",7,"Book of Eibon ×1",0],[8,"Crystal Tower","Crystal Tower",8,"Dragon Whisker ×1",0],[8,"Crystal Tower","Crystal Tower",9,"Hastur Long Barrel ×1",0],[8,"Crystal Tower","Crystal Tower",10,"Laevateinn ×1",0],[8,"Crystal Tower","Crystal Tower",11,"Chef's Knife ×2",0]];

const LOC = {"Town of Mitra|1":["Two Ether chests here: one in the gated garden of the eastern house (go in the house and out the other door); the other high up at the top left of town, on a path that appears when you approach the weapon shop and turn left.",1],"Town of Mitra|2":["Northeast, in the garden with the chocobo. Go through the house to reach it.",1],"Town of Mitra|3":["Behind the inn. Walk round the back and go in from there.",1],"Town of Mitra|4":["On the pier at the southernmost point of town.",1],"Town of Mitra|5":["Two Ether chests here: one in the gated garden of the eastern house (go in the house and out the other door); the other high up at the top left of town, on a path that appears when you approach the weapon shop and turn left.",1],"Grandshelt Castle|1":["Castle interior (with Charlotte): take an immediate right from the entrance; the chest is at the end.",1],"Grandshelt Castle|2":["Upstairs, skip the next room, keep going east to the end and down the stairs.",1],"Grandshelt Castle|3":["Continue to the end and go up the stairs; it's in the first room you see.",1],"Grandshelt Castle|4":["Second section of the castle during the fire.",0],"Grandshelt Castle|5":["Head back down the stairs, then go east.",1],"Grandshelt Castle|6":["Left of the throne room. After the Hell's Rider fight, go to the knight statue and through the hidden wall beside it.",1],"Grandshelt Castle|7":["Second section of the castle during the fire, in the room you can't enter on the first pass.",0],"Grandshelt Castle|8":["Second section of the castle during the fire, same locked room as the Mist Turbo Ether.",0],"Grandshelt Castle|9":["Second section of the castle during the fire.",0],"Commercial District|1":["Two 300 gil chests: one in the house at the end after climbing the ladder behind the building where the Tablet Shard is; the other in the house just east of the old man who gives you an Ether.",1],"Commercial District|2":["Two 300 gil chests: one in the house at the end after climbing the ladder behind the building where the Tablet Shard is; the other in the house just east of the old man who gives you an Ether.",1],"Commercial District|3":["Go up the stairs to the right of the house, past the woman, to the very north end. The chest is on the right.",1],"Earth Shrine — Area 1|1":["Inside: take an immediate right, go down one set of steps, then down the steps to the northwest.",1],"Earth Shrine — Area 1|2":["Back up the steps, then south down the next set. Follow the path round to the very top and take the small passage on the right.",1],"Earth Shrine — Area 1|3":["Keep following the path until a hidden path heads south. The chest is at the end of it.",1],"Earth Shrine — Area 1|4":["Back on the main path, keep going east into a new area. One of three chests at the very end of the room.",1],"Earth Shrine — Area 1|5":["East into the new area. One of three chests at the very end of the room.",1],"Earth Shrine — Area 1|6":["East into the new area. One of three chests at the very end of the room.",1],"Earth Shrine — Area 2|1":["Outside the shrine. Before entering, go right of the save point (behind the soldier on the left).",1],"Earth Shrine — Area 2|2":["Outside the shrine, next to the Potion chest, right of the save point.",1],"Village of Kol|1":["Inside the first house you come to.",1],"Village of Kol|2":["Inside the next house, between the two people on the west side of the village.",1],"Grandport Harbor|1":["Head towards the side quest icon. Behind the building at the end on the west side.",1],"Grandport Harbor|2":["From the entrance go east over the bridge, down the stairs, turn right and follow the path under the harbour.",1],"Siren's Tower|1":["Up two sets of stairs, keep going west and up the next stairs. On that platform.",1],"Siren's Tower|3":["Back in the room with the second Tablet Shard, go west up the stairs, east past the save point, then ride the lift down.",1],"Siren's Tower|4":["After the Ether ×2 chest, before going up the stairs, go back north and take the stairs down on the right.",1],"Siren's Tower|5":["From the entrance go straight ahead and up the stairs on the right. Next to the first Tablet Shard.",1],"Siren's Tower|6":["Ride the circular lift just below the Citrine Pot. On the next floor, it's to the east.",1],"Town of Felicitas|1":["Northwest corner: go left to reveal a hidden path. The chest is on the right (Tablet Shard on the left).",1],"Town of Felicitas|2":["As you enter, go left straight away and walk behind the inn.",1],"Town of Felicitas|3":["Climb the ladder by the weapon and armour shop and go into the room at the top.",1],"Town of Felicitas|4":["South of the hidden path, next to the ladder, a path runs behind the weapon and armour shop.",1],"Kolobos Ruins|1":["Past the first two tanks (Tablet Shard behind them), continue north to a door.",1],"Kolobos Ruins|2":["Next area: walk past the fallen pillar and down the steps.",1],"Kolobos Ruins|3":["From the broken pillar (Tablet Shard), follow the path south and up the stairs.",1],"Kolobos Ruins|4":["After the Antidote Herb chest, go north to the end.",1],"Dwarven Forge|1":["Go ahead from the entrance and ride the lift down. At the bottom, go south.",1],"Dwarven Forge|2":["After the Sledgehammer, walk right to the dead end.",1],"Dwarven Forge|3":["Continue north, then east. A hidden passage leads up some stairs.",1],"Dilmagia, the Machinopolis|1":["Walk towards the old man north of the crossing and turn right. Near the end you can see it through the gaps between buildings.",1],"Dilmagia, the Machinopolis|2":["Two 500 gil chests: one inside the last door on the left at the second crossing, between the two beds; the other at the top of a ladder.",1],"Dilmagia, the Machinopolis|3":["Two 500 gil chests: one inside the last door on the left at the second crossing, between the two beds; the other at the top of a ladder.",1],"Shipyard|1":["Continue right, take the stairs down (last Tablet Shard), then climb the ladder.",1],"Shipyard|2":["Head north, take the first stairs on the left and climb down the ladder.",1],"Mt. Thunderclap|1":["On the route back in to the Onion Knight's Sanctum: go right as you enter; it's at the bottom right.",1],"Mt. Thunderclap|2":["Same route: go left from the entrance. Where the path drops down, it's on the right.",1],"Mt. Thunderclap|3":["By the westernmost wall, on the path heading north from it.",1],"Mt. Thunderclap|4":["Shortcut route (after paying Lid 1,000 gil): climb the ladder and follow the path. Next to a Tablet Shard.",1],"Mobliz Shipyard|1":["Walk down the stairs; it's to the left of the save point.",1],"Mobliz Shipyard|2":["Inside the fenced area, take the ladder at the bottom right down. The chest is to the north.",1],"Mobliz Shipyard|3":["Power up the lift, ride it down and open the chest at the bottom.",1],"Mobliz Shipyard|4":["Go north; the chest is at the top.",1],"Wind Shrine|1":["Two Mist Hi-Potion chests. One is on the top floor: ride the lift up again after the main route.",0],"Wind Shrine|2":["Two Mist Hi-Potion chests. One is on the top floor: ride the lift up again after the main route.",0],"Wind Shrine|3":["Walk up the first set of stairs you see, then take the lift up.",1],"Wind Shrine|4":["Look for a pillar on the floor with a ladder behind it. Climb down.",1],"Wind Shrine|5":["Go to the southern part of the area and take the steps all the way down behind the pillar.",1],"Olderion, the Aquapolis|1":["From the centre of the city head north. To the right of the tree with a Tablet Shard behind it.",1],"Olderion, the Aquapolis|2":["Far west, next to the boat.",1],"Olderion, the Aquapolis|3":["Take the steps down, go northeast over the bridge, and keep going north to the very top.",1],"Town of Amore|1":["North part of town: go up the stairs towards the house, round the grass on the right and behind the house. Under the wooden platform.",1],"Town of Amore|2":["To the right of the armour shop.",1],"Town of Amore|3":["In the inn: go upstairs, first room.",1],"Cave of Waters|1":["Raise the water and take the boat. At the first split, go up.",1],"Cave of Waters|2":["Just past the waterfall, dock at the cave opening on the right.",1],"Cave of Waters|3":["Raise the water at the top right and take the boat. Go right first, then up.",1],"Cave of Waters|4":["Back on the boat, go left. At the two openings, take the left one.",1],"Cave of Waters|5":["Sail towards the top left corner, dock and touch the crystal to raise the water.",1],"Old Town, Olderion|1":["Back at the split, go right. The chest is at the end.",1],"Old Town, Olderion|2":["Go south past another enemy. The chest is at the bridge.",1],"Old Town, Olderion|3":["Straight ahead from the entrance, after you save the boy from the fiends.",1],"Waterfall Way|1":["Climb down a hole with a ladder, just left of where the NPC was standing.",1],"Waterfall Way|2":["Leave the hidden room; it's on the right of the waterfall.",1],"Waterfall Way|3":["At the end of the bridge, take the first path down.",1],"Waterfall Way|4":["Through a hidden entrance in the last section of the area.",0],"Waterfall Way|5":["From the centre of the waterfall room, go north into a hidden passage in the waterfall.",1],"Water Shrine|1":["From the entrance go left and board the boat. Behind one of the two waterfalls (hidden passage).",1],"Water Shrine|2":["From the entrance go left and board the boat. Behind the other waterfall (hidden passage).",1],"Water Shrine|3":["Push the crate south into line with the others. A hidden passage from that spot leads to it.",1],"Water Shrine|4":["Go right and touch the shining crystal to lower the water, then go to the top.",1],"Water Shrine|5":["Walk straight ahead, ignore the steps, go left. The chest is at the end.",1],"Water Shrine|6":["Cross the crate bridge you made.",1],"Zoldaad, the Imperial Capital|1":["Go into the inn and through the small gate inside.",1],"Imperial Residences|1":["Pick up the Tablet Shard at the bottom right, then go into the building on the left. The chest is at the bottom.",1],"Rebel Hideout|1":["Middle top of the map: go through the door into the next area. At the very end of the room.",1],"Rebel Hideout|2":["Back in the previous area, go right up the stairs. On that floor, a hidden path by the bed icon.",1],"Rebel Hideout|3":["Top left: go right of the room with two flags, follow it and climb the ladder. Behind the rock on the right.",1],"Weapons Factory|1":["Third crystal puzzle, right chest: hit the middle crystal 3 times and the right one 2 times, then follow the path.",1],"Weapons Factory|2":["Third crystal puzzle, left chest: hit the left crystal 3 times and the middle one 3 times, then follow the path.",1],"Weapons Factory|3":["After the second glowing crystal, go up the ladder, then up the ladder in the middle of that area. At the end.",1],"Weapons Factory|5":["On the conveyor belts: take the first belt up, then right, then the left belt up.",1],"Underground Tunnel|1":["Return visit: follow the marker far west, climb the ladder, turn right and go through the door.",1],"Underground Tunnel|2":["Down the ramp from the entrance, then left through a secret passage.",1],"Underground Tunnel|3":["Keep east, walk down the stairs and go north. Hidden under the platform in the top right corner.",1],"Underground Tunnel|4":["Go south; at the bridge turn right into a secret passage, through the door and to the very end.",1],"Underground Tunnel|5":["Go right then east. At the wooden platform, go south.",1],"Dungeon|1":["Map section 6 of 7.",0],"Dungeon|2":["Map section 7 of 7.",0],"Dungeon|3":["Map section 4 of 7.",0],"Dungeon|4":["Map section 2 of 7.",0],"Zoldaad Castle|1":["Castle interior, map section 3 of 3.",0],"Zoldaad Castle|2":["Castle interior, map section 1 of 3.",0],"Zoldaad Castle|3":["Castle interior, map section 2 of 3.",0],"Zoldaad Castle|4":["Castle interior, map section 1 of 3.",0],"Mysidia, the Magiapolis|1":["Map section 2 of 3.",0],"Mysidia, the Magiapolis|2":["Map section 1 of 3.",0],"Mysidia, the Magiapolis|3":["Map section 1 of 3.",0],"Mysidia, the Magiapolis|4":["Map section 1 of 3.",0],"Mysidia, the Magiapolis|5":["Map section 3 of 3.",0],"Village of Sunioo|1":["Map section 2 of 5.",0],"Village of Sunioo|2":["Map section 1 of 5.",0],"Village of Sunioo|3":["Map section 1 of 5.",0],"Village of Sunioo|4":["Map section 3 of 5.",0],"Village of Sunioo|5":["Map section 1 of 5.",0],"Nameless Ruins|1":["Map section 2 of 4.",0],"Nameless Ruins|2":["Map section 4 of 4.",0],"Nameless Ruins|3":["Map section 3 of 4.",0],"Nameless Ruins|4":["Map section 1 of 4.",0],"Nameless Ruins|5":["Locked chest near the entrance save point. Light the statues in order: Broken Sword (by the far save point), Withered Horse (second area), then Darkness Sealed (beside the chest).",1],"Arcane Library|2":["Before examining the final bookshelf, climb the room's ladder.",1],"Gaberada, the Undertown|1":["Map section 1.",0],"Gaberada, the Undertown|2":["Map section 1.",0],"Gaberada, the Undertown|3":["Map section 1.",0],"Research Center Ruins|1":["Map section 2.",0],"Research Center Ruins|2":["Map section 2.",0],"Research Center Ruins|3":["Map section 1. Take the right, left, right detour.",1],"Research Center Ruins|4":["Map section 2.",0],"Research Center Ruins|5":["Map section 1.",0],"Research Center Ruins|6":["Map section 1.",0],"Gronoa Shrine|1":["Map section 1.",0],"Gronoa Shrine|2":["Map section 1.",0],"Gronoa Shrine|3":["Map section 1.",0],"Gronoa Shrine|4":["Before the later lift, down the eastern branch.",1],"Sanctissimus Shrine|1":["Map section 10.",0],"Sanctissimus Shrine|2":["Map section 7.",0],"Town of Sian|1":["Map section 1.",0],"Town of Sian|2":["Map section 1.",0],"Town of Sian|3":["Map section 1.",0],"Town of Sian|4":["Map section 1.",0],"Forest Path|2":["In one of the path's dead ends; come back after the battle.",1],"Wandering Lands|1":["Deeper in.",0],"Wandering Lands|2":["Second screen, first dead end to the east.",1],"Crystal Tower|1":["Map section 6 of 9.",0],"Crystal Tower|2":["Near the save point in the first section.",1],"Crystal Tower|3":["Near the final save point.",1],"Crystal Tower|4":["After the Dante encounter and the portal, take the left staircase (with Laevateinn).",1],"Crystal Tower|5":["Map section 2 of 9.",0],"Crystal Tower|6":["Near the final save point.",1],"Crystal Tower|7":["Third platform, eastern branch: from the top crossing on the east side, 3 east then 5 north.",1],"Crystal Tower|8":["Go 17 tiles west, 3 south, then 6 east.",1],"Crystal Tower|9":["Map section 4 of 9.",0],"Crystal Tower|10":["After the Dante encounter and the portal, take the left staircase.",1],"Crystal Tower|11":["Map section 2 of 9.",0]};

const MISS = {
  "Grandshelt Castle|6":"Reachable only during the castle fire. Guards block the castle afterwards; access after repairs is unconfirmed.",
  "Grandshelt Castle|7":"Behind a door that stays shut during the fire. Guards block the castle afterwards; later access is unconfirmed.",
  "Grandshelt Castle|8":"Same locked room as chest 7. Later access is unconfirmed."
};

const ZONE_NOTES = {
  "Oblivion Palace":"Treasure rooms open with Tablet Shards (3 shards for the first chest). Later chests need shards from later chapters, so expect to fill this in over the whole game.",
  "Siren's Tower":"Not a chest on this list, but watch for the Gilgamesh chest (Genji Gloves get stolen; reported to return after his second fight) and the one-time Citrine Pot fight (rare Elixir drop).",
  "Zoldaad Castle":"Not missable. To come back later, enter from the Zoldaad Castle Plaza.",
  "Dungeon":"Not missable. To come back later, enter from Zoldaad Castle.",
  "Underground Tunnel":"Not missable. To come back later, enter from the Dungeon.",
  "Imperial Residences":"Not missable. To come back later, take the capital train from any Zoldaad district.",
  "Arcane Library":"Not missable. Re-enter from Mysidia. One area opens only after you finish the Nameless Ruins.",
  "Fina's Psyche":"Not missable. Re-enter through the magic book in the Tower of Mysidia.",
  "Dragon's Maw":"Optional dungeon. Guides suggest coming back late in the game when you're stronger.",
  "Grandshelt Castle":"Chests 9 and 10 have no map pin on MeowDB yet."
};

const CH_ALERTS = {
  1:[["warn","<b>Missable:</b> Grandshelt Castle chests 6–8 during the fire. Also one-time: the Citrine Pot fight in Siren's Tower and the temporary soldier shops (Smoke Bombs are sold elsewhere too)."]],
  2:[["note","<b>Point of no return warning</b> before the Mobliz Shipyard. You can come back after the story, but clear Dirnado first to save backtracking."]],
  3:[["note","<b>Point of no return warning</b> before the Old Town of Olderion. You can come back after the story."]],
  8:[["warn","<b>Final point of no return:</b> the portal next to the save point in the Crystal Tower's Upper Reach. Finish everything you want first. After the ending, your cleared save is reported to resume just before the final area."]]
};

/* ---------- Turn the lists above into the shape app.js reads ---------- */

// Clearer names for the two halves of the Earth Shrine map.
const ZONE_LABEL = { 'Earth Shrine — Area 1': 'Earth Shrine — Inside', 'Earth Shrine — Area 2': 'Earth Shrine — Outside' };

// Chapter warnings start with "<b>Title:</b>"; split that into a title and plain text.
function splitAlert(alert) {
  const m = /^<b>(.*?)<\/b>\s*(.*)$/.exec(alert[1]);
  return { kind: alert[0], title: m ? m[1].replace(/:$/, '') : '', text: m ? m[2] : alert[1] };
}
const chestStageNotes = {};
Object.keys(CH_ALERTS).forEach(function (c) { chestStageNotes[c] = CH_ALERTS[c].map(splitAlert); });

const shardItems = SHARDS.map(function (s) {
  return { id: String(s[0]), num: s[0], stage: s[1], group: s[2], where: s[3], note: s[4] || '' };
});

const chestItems = ROWS.map(function (r) {
  const key = r[2] + '|' + r[3];
  const item = {
    id: key, num: r[3], stage: r[0], region: r[1], group: ZONE_LABEL[r[2]] || r[2],
    name: r[4], tags: r[5] ? ['Magicite'] : [], where: ''
  };
  if (r[2] === 'Oblivion Palace') {
    // The palace safes are the Tablet Shard rewards, in the same order.
    const reward = REWARDS[r[3] - 1];
    item.where = 'Tablet Shard reward: opens once you have handed ' + reward[0] +
      ' shards to the Enigmatic Princess (' + reward[1] + ' Chamber).';
  } else if (LOC[key]) {
    item.where = LOC[key][0];
    item.rough = !LOC[key][1];
  }
  if (MISS[key]) item.miss = MISS[key];
  return item;
});

window.GAMES = (window.GAMES || []).concat([{
  id: 'resonance',
  name: 'Final Fantasy Resonance',
  short: 'FF Resonance',
  art: 'images/resonance/cover.jpg',
  artPos: 'right center',
  tint: ['#14244f', '#5b3a96'],
  icon: 'crystal',
  stageName: 'Chapter',
  stages: [1, 2, 3, 4, 5, 6, 7, 8],
  collections: [
    {
      id: 'tablet-shards',
      name: 'Tablet Shards',
      blurb: 'Fragments handed to the Enigmatic Princess for Oblivion Palace rewards.',
      tint: ['#3a2a08', '#b48a24'],
      icon: 'shard',
      showContents: false,
      items: shardItems,
      milestones: {
        title: 'Oblivion Palace rewards',
        list: REWARDS.map(function (r) { return { at: r[0], title: r[2], detail: r[1] + ' Chamber' }; })
      },
      footer: 'Hand shards to the Enigmatic Princess at Oblivion Palace in Grandshelt. Nothing is missable, ' +
        'and 89 shards are enough for the trophies. Locations summarised from the PowerPyx guide.'
    },
    {
      id: 'treasure-chests',
      name: 'Treasure Chests',
      blurb: 'Every chest, its contents and how to reach it.',
      tint: ['#0f3640', '#2b7a8c'],
      icon: 'chest',
      showContents: true,
      items: chestItems,
      stageNotes: chestStageNotes,
      groupNotes: ZONE_NOTES,
      footer: 'Locations in italics only give the guide map section so far. Directions from Vorxu\'s walkthrough ' +
        '(Chapters 1–4), with map sections and notes from ffresonance.wiki, MeowDB and 9Puz. Contents and chest ' +
        'numbers from NiaMeowDB, matching its in-game map pins. The game launched on 22 October 2026, so guides ' +
        'are still being checked: treat missable flags as cautious and keep a spare save before big story moments.'
    }
  ]
}]);
})();
