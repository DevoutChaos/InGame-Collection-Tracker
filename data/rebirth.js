/* ============================================================
   FINAL FANTASY VII REBIRTH — COLLECTION DATA
   Copied from the "Rebirth Chest Log" page (Oct 2026). The lists are kept
   in the same shape as that page, and the bottom of this file turns them
   into what app.js reads.

   D           [chapter, region, area, item, where to find it, flags, reason]
               flags: p purple weapon chest · m missable · t timing · c cache · r reported
   MAT         materia lying on the ground, same shape (added to D with flag g)
   CACHES      chapter -> [region, cache names] (open-world caches, added to D with flag c)
   CH_NAMES    chapter titles
   ZONE_NOTES  area -> note shown above its treasure
   CH_ALERTS   chapter -> notes shown at the top of the chapter

   To update: edit the lists below, then change CACHE_VERSION in sw.js (see README).
   ============================================================ */
(function () {
'use strict';

/* [chapter, region, area, item, location, flags, reason]
   flags: p purple weapon chest · m missable · t timing · c cache · r reported */
const D = [
// Chapter 1 — flashback
[1,"Nibelheim (flashback)","Nibelheim","Ether","Tifa's house (south of Cloud's mum's house). Go upstairs; it's in the room up there.",""],
[1,"Nibelheim (flashback)","Nibelheim","Mega-Potion","Towards the northwest corner of town.",""],
[1,"Nibelheim (flashback)","Nibelheim","Mega-Potion","South side of town, just over a small fence. Head there after leaving Tifa's house.",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Mixed Hi-Potion ×2","Where the path narrows, before the stairs up to a dead end (Tifa then calls you back).",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Mega-Potion","On the stairs after defeating the Zu.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Ether","Mako Measurement Facility: after the Screamer fight, hop the railing and go behind the stairs.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Elixir","Gnipahellir Ravine, second gas purifier puzzle: just before the bench, drop down to the chest.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Elixir","On the path after the elevator, before the bench. PowerPyx lists two Elixir chests here; GamerGuides lists one.","r"],
// Chapter 2
[2,"Kalm · Grasslands","Kalm","Sprigs of Laurel","\"Down and Out\": in the tunnel below the hole in the wall, on the underground route out of Kalm to the Grasslands.",""],
[2,"Kalm · Grasslands","Abandoned Dock","1,500 Gil","Follow the path southwest. At the entrance, before the broken bridge that triggers a scene.",""],
[2,"Kalm · Grasslands","Abandoned Dock","Sleek Saber (Cloud)","Purple chest beside the building as you approach the dock.","p"],
[2,"Kalm · Grasslands","Bill's Chocobo Ranch","Aureate Pinion","Round the back of the barn, before you go inside.",""],
[2,"Kalm · Grasslands","Bill's Chocobo Ranch","Timeless Rod (Aerith)","Purple chest directly to the right of Chloe the shopkeeper, at the back of the barn.","p"],
[2,"Kalm · Grasslands","Bill's Chocobo Ranch","Moogle Medal","Climb the ladder near Chloe to the barn's upper floor.",""],
[2,"Kalm · Grasslands","Swamplands","Hi-Caliber Rifle (Barret)","Purple chest on the island straight ahead, reached during the swamp crossing.","p"],
[2,"Kalm · Grasslands","Swamplands","1,500 Gil","Ride your chocobo out to the centre islands (Sephiroth scene). The chest is nearby; then carry on south to Midgardsormr.",""],
// Chapter 3
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","Sylph Gloves (Tifa)","Past the AP Up Materia and Crystalline Crab, take the ladder down on the east side. Purple chest next to another ladder.","p"],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","Ether","Quarry 2nd tier: big cavern with four Crawlers. Chest past them after the fight.",""],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","Iron Ore ×5","Quarry 2nd tier: side area to the left, guarded by an Archdragon (Aero staggers it fast).",""],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","Hi-Potion ×3","\"Ticket Out of Here\": head east past more Crawlers. Next to the broken elevator switch, before the broken ladder.",""],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","Lea Titanium ×3","After pushing the second mine cart onto the upper track, drop down left of the ramp. Inside the broken elevator.",""],
[3,"Mythril Mine","Mythril Mine — Barret & Red XIII","Renegade's Collar (Red XIII)","\"Escape the Depths\": first area, purple chest by the bench and vending machine.","p"],
[3,"Mythril Mine","Mythril Mine — Barret & Red XIII","Bulletproof Vest","\"So Close Yet So Far\": chest on the left. Push the mine cart first without touching the switch, then come back and pull the switch.","t","Push the cart before you pull the switch."],
[3,"Mythril Mine","Mythril Mine — Barret & Red XIII","1,000 Gil","\"Two-Grand Gig\": go left past the two ladders you can shoot down, then climb the ladder on the right to a small ledge.",""],
[3,"Mythril Mine","Mythril Mine — Barret & Red XIII","Hi-Ether","\"Two-Grand Gig\": just right of the bridge while you push the cart, after shooting the boulders out of the way.","t","Grab it before pushing the cart past the split."],
// Chapter 4
[4,"Junon","Under Junon","Empress's Scepter (Aerith)","Inn, the night before Upper Junon: listen at Aerith's door, interact again, talk to her, then open the purple chest in her room.","p"],
[4,"Junon","Upper Junon","Survival Vest","\"Hello, Old Friend\": the room where you change into soldier uniforms. Left of the marked box.",""],
[4,"Junon","Upper Junon","Rune Blade (Cloud)","\"Hue and Cry\": straight after the opening scene, purple chest directly to the right of the rest spot.","p"],
[4,"Junon","Upper Junon","Revival Earrings","\"Hue and Cry\": after the dining hall fight, up the next flight of stairs. Chest is in view.",""],
[4,"Junon","Junon Harbor","3,000 Gil","Room after the Roche fight: one of three chests. Break the boxes first.",""],
[4,"Junon","Junon Harbor","Phoenix Down ×2","Same room as above: one of three chests.",""],
[4,"Junon","Junon Harbor","Armor-Piercing Grenade ×3","Same room as above: one of three chests.",""],
[4,"Junon","Under Junon","Ether?","\"Washed Ashore\": behind the boats near the HP Up Materia on the shore. From a reader comment; contents unconfirmed.","r"],
// Chapter 5
[5,"Shinra-8 (cruise ship)","Shinra-8","Antidote ×2","2nd Class Cabins / sleeping quarters, lower level. Check the large side rooms; this one is right by the door.",""],
[5,"Shinra-8 (cruise ship)","Shinra-8","Antidote ×2","2nd Class Cabins: the second chest in the side rooms. Get both before resting after the tournament.",""],
[5,"Shinra-8 (cruise ship)","Shinra-8 — Cargo Hold","Kaiser Knuckles (Tifa)","\"In His Footsteps\": after both Daemonic Entities, jump up the small ledge on the left (an alcove off the main route).","p"],
[5,"Shinra-8 (cruise ship)","Shinra-8 — Cargo Hold","Mega-Potion","Past the next enemies, duck under the debris. Where you'd turn right to drop down, go up the stairs on the left.",""],
// Chapter 7
[7,"Corel","Mt. Corel","Wizard's Rod (Aerith)","First rest spot: small alcove to the left of the bench, purple chest.","p"],
[7,"Corel","Mt. Corel","Ruby","Climb the footholds by the Heatseekers, go south to the stairs and the broken Corel Ropeway station. On the main platform.",""],
[7,"Corel","Mt. Corel","Gold Dust ×3","Second large area: hug the right wall past the scaffolding to a small dead end (west of the MP Up Materia outcrop, before the path turns south).",""],
[7,"Corel","Mt. Corel","Mythril Ore","Where the path splits by the small river: skip Yuffie's stairs and cross the water. Chest on the far side.",""],
[7,"Corel","Corel Reactor & Coal Mines","1,700 Gil","\"Leaving the Reactor Behind\": after the elevator, go left around the building before taking the stairs on the right (an alcove to the south).",""],
[7,"Corel","Corel Reactor & Coal Mines","Unknown contents","Beside the stairs, before the party splits again. GamerGuides doesn't name the item.","t","Get it before the party splits."],
[7,"Corel","Corel Reactor & Coal Mines","Twin Viper (Yuffie)","Preparation Plant: grapple across the gap; purple chest on the far side, near the conveyor switch.","p"],
[7,"Corel","Corel Reactor & Coal Mines","Hi-Ether","Preparation Plant: ride the conveyor up, beat the enemies, cut the rope with Yuffie to drop a ladder and climb to it.",""],
[7,"Corel","Corel Reactor & Coal Mines","Emerald","Outdoor area northwest of the conveyor: clear the enemies, swing to the next ledge and climb the last wall.",""],
[7,"Corel","Corel Reactor & Coal Mines","Zinc Ore ×5","\"Unlock the Elevator\": grapple out, drop onto the first platform, throw Yuffie's weapon to make a grapple point, then grapple to the chest's platform.",""],
[7,"Corel","Corel Reactor & Coal Mines","Exquisite Beast Hide ×3","Take the zipline over the chasm towards the Railway Control Tower, then drop down off the platform you land on.",""],
[7,"Corel","Corel Reactor & Coal Mines","Illusionist's Armband","Railway Control Tower, after the Cockatrice: climb the wall, cut the rope, climb the ladder and swing across the grapple points to a wooden ledge.",""],
[7,"Corel","Corel Reactor & Coal Mines","Exquisite Beast Spine ×3","Back inside: cut the grapple point at the other dead end, swing round the ceiling rock and nudge the moving grapple point onto the switch ledge.",""],
[7,"Corel","Corel Reactor & Coal Mines","Barrage Blaster (Barret)","\"Reach the Generator\": after the two Cockatrices, take the outside path on the left to a dead-end ledge.","pt","Get it before going up the conveyors."],
[7,"Corel","Corel Reactor & Coal Mines","Safety Bit","\"Set Their Route\": zipline down from the upper path, beat the Bloatfloats, then go into the small shack on the lower level.",""],
// Chapter 8
[8,"Gold Saucer · Corel Desert","Dustbowl","Umbral Blade (Cloud)","\"Meeting Your Mount\": the morning after you wake at Solemnitude Manor, on the path towards the bird you'll ride.","p"],
[8,"Gold Saucer · Corel Desert","Dustbowl","1,500 Gil","\"Stalkers?\": find the three men by the notice board and walk down the path to their right.",""],
[8,"Gold Saucer · Corel Desert","Dustbowl","Mega-Potion ×2","Bartender's Untended Garden: follow the Cactuar after they steal the Greens. At the split, take the left branch to a dead end.",""],
[8,"Gold Saucer · Corel Desert","Dustbowl","Mega-Potion","Bartender's garden: just before the Cactuar encounter, jump down a ledge on the left (next to an HP Up Materia).","r"],
[8,"Gold Saucer · Corel Desert","Corel Desert","Vulcan Cannon (Barret)","\"Prisoner\": head for the structure ahead. Before dropping into the enemy area, purple chest on the right.","p"],
// Chapter 9
[9,"Gongaga","Gongaga Village","Bird of Prey (Yuffie)","Cissnei's house: the building across the bridge with the rest point (Yuffie is on the couch).","p"],
[9,"Gongaga","Gongaga Village","Red Megaphone (Cait Sith)","Southernmost bridge: jump into the river and swim south to a small cave in the southwest corner.","p"],
[9,"Gongaga","Gongaga Reactor — Cloud","Crystal Sword (Cloud)","First room: before squeezing through the door, go into the small side room to the southeast. Dead end.","pt","Get it before squeezing through the door."],
[9,"Gongaga","Gongaga Reactor — Cloud","Sapphire","After the Grangalan room, crawl through the small gap north and keep going northeast.",""],
[9,"Gongaga","Gongaga Reactor — Cloud","Hazardous Material ×3","After the Chimera and Gagighandi fight, take the northeast hallway at the split to a dead end.",""],
[9,"Gongaga","Gongaga Reactor — Cloud","Sage Armband","Coolant Control (large water room): swim to the northeast corner and climb onto the platform.",""],
[9,"Gongaga","Gongaga Reactor — Cloud","Golden Collar (Red XIII)","Water level: after restoring power, climb onto the cart you moved and follow the duct path to the platform.","p"],
[9,"Gongaga","Gongaga Reactor — Cloud","Remedy","Swim across the broken bridge, crawl under the rubble. Side room off the hallway, with a few Grangalans.",""],
[9,"Gongaga","Gongaga Reactor — Tifa","Exquisite Beast Hide ×10","\"Bouncing to the Reactor\": after the first gate, drop down the ladder, cross to the far side and grapple up.","m","Only reachable during Tifa's section. Grab it before the rest point."],
[9,"Gongaga","Gongaga Reactor — Tifa","Tiger Fangs (Tifa)","Flooded room: swim to the middle platform, grapple up twice, then across to the side beam and the chest.","pm","Only reachable during Tifa's section (the weapon is reported to be buyable later)."],
[9,"Gongaga","Gongaga Reactor — Tifa","Hi-Ether","Grapple up above the two Chimera Mimics on the south side, go up one more level, drop into the next area and fight the Amphidexes.","m","Only reachable during Tifa's section."],
[9,"Gongaga","Gongaga Reactor — Tifa","Sapphire","Gate Generator: climb to the generator plug platform and go directly right.","m","Only reachable during Tifa's section. Get it before grappling higher."],
// Chapter 10
[10,"Cosmo Canyon","Cosmo Observatory storeroom","Moogle Medal ×5","Leave the observatory towards the lift; an assistant leads you to a storeroom door. One of five chests inside.",""],
[10,"Cosmo Canyon","Cosmo Observatory storeroom","5,000 Gil","Same storeroom: one of five chests.",""],
[10,"Cosmo Canyon","Cosmo Observatory storeroom","Cosmotite Ore","Same storeroom: one of five chests.",""],
[10,"Cosmo Canyon","Cosmo Observatory storeroom","X-Potion","Same storeroom: one of five chests.",""],
[10,"Cosmo Canyon","Cosmo Observatory storeroom","Crystal Megaphone (Cait Sith)","Same storeroom: one of five chests.","p"],
[10,"Cosmo Canyon","Cave of the Gi","Hi-Ether","First room, after the Nidhogg fight: climb the wall from Red XIII's tutorial to the higher platform.",""],
[10,"Cosmo Canyon","Cave of the Gi","Revival Earrings","Stringer room: after clearing it, climb the northeast wall to the stone structure. Chest on top.",""],
[10,"Cosmo Canyon","Cave of the Gi","Mist Mega-Potion","Large central room: climb the pillar partway. Chest on the platform halfway up.",""],
[10,"Cosmo Canyon","Cave of the Gi","Celestial Bangle","\"The First Trial\": room with a hole in the middle. Across the gap; climb the wall immediately to the left.",""],
[10,"Cosmo Canyon","Cave of the Gi","Timeworn Talisman","Second-to-last floor, directly above the white glowing statues. Wall-run to reach it (if you're down with the statues, you've gone too far).",""],
[10,"Cosmo Canyon","Cave of the Gi","Exquisite Beast Hide ×5","After the second Nidhogg group, go left to the dead end with boxes, near the Walk of Insolence.",""],
[10,"Cosmo Canyon","Cave of the Gi","Phoenix Down","Emerald Altar path: leave Barret, climb the wall right of the central platform's stairs, hug the right through the small pillar room.",""],
[10,"Cosmo Canyon","Cave of the Gi","Cosmotite Ore","Behind the Amber Altar, up the stairs directly behind it.",""],
[10,"Cosmo Canyon","Cave of the Gi","Giga-Potion ×2","Chamber of Sacrifice: on the sloped ledge left of the stairs, after the door opens past the four statues.",""],
[10,"Cosmo Canyon","Cave of the Gi","Ether","At the split at the bottom of the stairs (before the first Two Face enemies), take the left path and drop down.",""],
[10,"Cosmo Canyon","Cave of the Gi","5,500 Gil","After the next set of stairs, on the left.",""],
[10,"Cosmo Canyon","Cave of the Gi","Calamitous Bazooka (Barret)","At the first gate, turn round and look down to the lower platform. Clear the enemies there.","pt","Grab it before pulling the first gate's chain."],
[10,"Cosmo Canyon","Cave of the Gi","Gold Needle ×3","On the platform up to the next gate, after the second gate's bridge.",""],
[10,"Cosmo Canyon","Cave of the Gi","2,600 Gil","Third gate: pull the chain to extend the bridge, then climb the wall on the left to the upper platform.",""],
[10,"Cosmo Canyon","Interlude","Ceremonial Staff (Aerith)","After you get off the boat, purple chest to the left of the rest point.","p"],
// Chapter 11
[11,"Nibel","Mt. Nibel","Crystal Gloves (Tifa)","Rebuilt Bridge: cross north, past the building you can't enter yet. Purple chest along the fence by its front door.","p"],
[11,"Nibel","Mt. Nibel","Igneous Saber (Cloud)","Gnipahellir Ravine: after the two Screamers, purple chest on the middle ledge between the two climbing walls. Climb the left wall.","p"],
[11,"Nibel","Mt. Nibel","Mythril Ore","Climbing walls: drop down, climb the left wall, then go up to the fencer area.",""],
[11,"Nibel","Mt. Nibel","Sapphire","Climb to the far-right platform, go right past the breakable boxes and jump up the ledge.",""],
[11,"Nibel","Mt. Nibel","Fortification Materia","Climb the wall beside the Sapphire chest, shuffle left along the cliff boards, then drop to the ledge below.",""],
[11,"Nibel","Mt. Nibel Reactor pipes","Cosmotite Ore","Pipe slide: take pipe A2 (middle of the first set). The lift brings you back to the top to try others.",""],
[11,"Nibel","Mt. Nibel Reactor pipes","Hi-Ether","Pipe slide: take pipe C2, past two Screamers.",""],
[11,"Nibel","Mt. Nibel Reactor pipes","Giga-Potion","\"Locked Out\": after the two Twin Brains, go through the door and turn left (west) to the end.",""],
[11,"Nibel","Shinra Manor basement","Golden Megaphone (Cait Sith)","\"Buds Behind Bars\": south side; throw a box at the wall switch left of the second cell's door.","p"],
[11,"Nibel","Shinra Manor basement","Revival Earrings","\"Escape Plan\": beat the next two enemies, go west past the locked door and roll through the vent into a cell.",""],
[11,"Nibel","Shinra Manor basement","Giga-Potion","\"Generator Valve\": side room left of the valves, before moving the boxes.",""],
[11,"Nibel","Shinra Manor basement","1,700 Gil","\"Insufficient Power\": large room by the bench, after the enemies.",""],
[11,"Nibel","Shinra Manor basement","Dry Ether","One floor up from the 1,700 Gil, in the north corner by the railing (via the first blue duct).",""],
[11,"Nibel","Shinra Manor basement","Hades Armlet","Go through the red vent and turn left: Materials Storage on the third floor, after two Adjudicators.",""],
[11,"Nibel","Shinra Manor basement","Giga-Potion","\"Input Password\": pull the cart on the left out of the ladder's way, climb to the platform.",""],
[11,"Nibel","Shinra Manor basement","Turbo Ether","\"Search Resumed\": to the left of the door as you leave the room.",""],
// Chapter 12
[12,"Gold Saucer · Costa del Sol","Gold Saucer","Crystalline Cross (Yuffie)","\"Hightailing It\": side area behind the barrier Cait Sith knocked over. At the end, before the stairs back up to the central park.","p"],
[12,"Gold Saucer · Costa del Sol","Costa del Sol","Pirate King's chest","On the dock after you arrive on the Tiny Bronco. Starts the Pirate King's Treasure quest and gives the Corsair's Compass. Open it before fast travelling to the Gold Saucer.","t","Open it before you leave Costa del Sol for the Gold Saucer."],
// Chapter 13
[13,"Temple of the Ancients","Northwood","Mist Mega-Potion ×2","Off to the side at the Keystone Altar, on the left before the bridge.",""],
[13,"Temple of the Ancients","Northwood","Dry Ether","After the first group of Shinra soldiers past the camp: open structure on the left of the side path.",""],
[13,"Temple of the Ancients","Northwood","X-Potion","Same spot: open structure on the right of the side path.",""],
[13,"Temple of the Ancients","Temple — One Step Ahead","Giga-Potion ×2","After the first scenes, take the stairs east and go straight south to the wall at the end.",""],
[13,"Temple of the Ancients","Temple — One Step Ahead","Slipstream Saber (Cloud)","Climb the first vine wall (after the first Ancient Dragon) and go up to the right.","p"],
[13,"Temple of the Ancients","Temple — One Step Ahead","Hi-Ether","Climb out the back window of the Jadestar Chamber (gravity down). Southwest corner of the platform.",""],
[13,"Temple of the Ancients","Temple — One Step Ahead","X-Potion","North of the Jadestar Chamber: go west then south at the split, past the Cthonilizards. Large left platform.",""],
[13,"Temple of the Ancients","Temple — One Step Ahead","Whistlewind Scarf","Azurestar Chamber: flip gravity to the ceiling, then check the corner.",""],
[13,"Temple of the Ancients","Temple — Chasing Waterfalls","Giga-Potion","Top of the long vine climb, behind you at the end of the west walkway, before the waterfall jump.",""],
[13,"Temple of the Ancients","Temple — Chasing Waterfalls","Mythril Ore","After jumping down the waterfall, swim to the ledge and go to the north side of the first platform.",""],
[13,"Temple of the Ancients","Temple — Chasing Waterfalls","Cetran Bangle","Mauvestar Chamber: climb the vines over the wall and go up the stairs. An Ancient Dragon guards it.",""],
[13,"Temple of the Ancients","Temple — Divergent Paths","Járngreipr (Tifa)","After the Shinra soldiers, just past a short wall on the left.","p"],
[13,"Temple of the Ancients","Temple — Divergent Paths","Cosmotite Ore","Large open platform after the bees and frogs, along the west wall.",""],
[13,"Temple of the Ancients","Temple — Divergent Paths","Giga-Potion ×2","Lifestorm section: east side of the next circular room.",""],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Hi-Ether","Corner of the eastern structure.","t","Fill the vessels in the guide order or some chests stay out of reach."],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Gambanteinn (Aerith)","Room at the bottom of the stairs from the repaired structure.","p"],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Elixir","Behind the structure with water, after filling the first vessel.",""],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Sapphire","Southwest room of the southern area.",""],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Cetran Armband","Up the stairs at the repaired tower, after filling the southeast vessel. Visible earlier but not reachable yet.",""],
[13,"Temple of the Ancients","Temple — Crossing the Rapids","Battle Cry (Barret)","In the nearby building, before the stairs up.","p"],
[13,"Temple of the Ancients","Temple — The Looming Monument","Circlet","Drop off the ledge to the south before dealing with the pillar.",""],
[13,"Temple of the Ancients","Temple — The Looming Monument","Revival Materia Earrings","Turn left after crossing the bridge.",""],
[13,"Temple of the Ancients","Temple — The Looming Monument","Mist Giga-Potion","Near the ledge, before the next room with enemies.",""],
[13,"Temple of the Ancients","Temple — Further Interference","Brisingamen (Red XIII)","Turn left straight after jumping the small gap into the next room.","p"],
[13,"Temple of the Ancients","Temple — Further Interference","Cetran Armlet","Far west room with the frogs and bees.",""],
[13,"Temple of the Ancients","Temple — Further Interference","Astral Remnant","From the central platform, go left and loop round to the platform.",""],
[13,"Temple of the Ancients","Temple — Hall of Resurrection","Fuma Shuriken (Yuffie)","Spiral of Rebirth: after the Panthera Protector and Ancient Dragon, check the raised section at the fork before taking either path.","p"],
[13,"Temple of the Ancients","Temple — Hall of Resurrection","Cetran Bracer","At the first split, go south (right) to a dead-end room with a Floating Death. Across from the entrance.",""],
[13,"Temple of the Ancients","Temple — Hall of Resurrection","X-Potion","After the Moss-Grown Adamantoise, take the east exit. On a raised section.",""],
[13,"Temple of the Ancients","Temple — Hall of Resurrection","Elixir","Stairwell past the X-Potion: go up the spiral stairs first, on the far side of the blockage.",""],
];
/* Ground materia: [chapter, region, area, materia, location, flags, reason] — flag g added automatically */
const MAT = [
[1,"Nibelheim (flashback)","Mt. Nibel","Wind Materia","Near the broken bridge (\"Bridge Is Out\"): turn back towards Tifa and climb the rocks to the ledge on the right.",""],
[1,"Nibelheim (flashback)","Mt. Nibel","HP Up Materia","Directly beside the bench after the rest-bench tutorial (top of the ledges in \"Up the Cliff\").",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Empowerment Materia","In the cave: hug the right wall around the big pillar to a large dead end on the right.",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Spare Change Materia","Cave path north: past two enemies, before the big ledge. Climb up on the right to a higher ledge by a crooked tree.",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Magnify Materia","After the wooden planks on the cliff edge, jump down to the lower area immediately on the left.",""],
[1,"Nibelheim (flashback)","Mt. Nibel","Precision Defense Focus Materia","After the Zu fight, up the first flight of stairs, then climb the ledges immediately to the left.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Level Boost Materia","Shinra facility: up the first flight of stairs, immediately to the right.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Auto-Cast Materia","At the top of the long ladder, up a short flight of stairs immediately to the left.",""],
[1,"Nibelheim (flashback)","Mt. Nibel Reactor","Comet Materia","Mako gas area before the elevator: drop off the northwest side to a lower platform. Inside a stack of boxes.",""],
[2,"Kalm · Grasslands","Windmill Settlement","Cleansing Materia","Falls from the windmill at the final step of the side quest \"Where the Wind Blows\". North of the windmill.","t","Only appears at the last step of \"Where the Wind Blows\"."],
[2,"Kalm · Grasslands","Grasslands Port","Item Master Materia","Dock cave far west of Kalm and slightly south, below the Midgar checkpoint.",""],
[2,"Kalm · Grasslands","Grasslands Port","Precision Defense Focus Materia","On the island next to the first Protorelic mission. From a reader comment; not in the guide itself.","r"],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","AP Up Materia","\"Where They Lead\", Northern Quarry Storage: end of the right-hand catwalk (or drop left and climb the ladder). In plain sight.",""],
[3,"Mythril Mine","Mythril Mine — Cloud, Tifa & Aerith","MP Up Materia","\"Climbers\", Subterranean Terrace: in the room with the big root, wade through the water right of the root to the back (southeast dead end).",""],
[3,"Mythril Mine","Mythril Mine — Barret & Red XIII","Lightning Materia","\"Exit\": after Barret pushes a mine cart off the cliff, the gate opens and it's on the path in the rest-spot room.",""],
[4,"Junon","Under Junon","HP Up Materia","\"Washed Ashore\": down the stairs left of the inn at the end of town, turn left, follow the beach and take the wooden ramp left to the dockyard.",""],
[4,"Junon","Under Junon","Lightning Materia","\"Respite\": Under Junon inn, second floor, living room at the far end of the hall by the fireplace.",""],
[4,"Junon","Junon open world","Level Boost Materia","In the crater southwest of the Buffeted Cape tower (Activation Intel 2).",""],
[5,"Shinra-8 (cruise ship)","Shinra-8","Fortification Materia","\"King of Queen's Blood\": leave the Royal Lounge 1F by the south door (where Barret walks off). On the deck.","t","Grab it before carrying on with the Queen's Blood intro."],
[7,"Corel","Mt. Corel","Enervation Materia","\"Split Up\": past the vending machine and bench at the first rest spot, follow the path left of the bench past the purple chest.",""],
[7,"Corel","Mt. Corel","MP Up Materia","Second Trail: at Yuffie's second yellow arrow, turn right and drop down the broken ski lift. End of the side area, on a ledge.",""],
[7,"Corel","Corel Reactor & Coal Mines","Empowerment Materia","Railway Control Tower 3F: after starting the generator and climbing two yellow/red poles, in front of you on the left.",""],
[7,"Corel","North Corel","Revival Materia","Take the stairs signed Ropeway (west of the clinic) and drop through the broken fence onto the raised roof area.",""],
[7,"Corel","Old South Corel Mine","Binding Materia","Platform northwest of the Central Colliery, via the path from the southwest. The mine stays shut until you accept \"Of Robed Men and Ransoms\".","t","Needs the side quest \"Of Robed Men and Ransoms\" to open the mine."],
[8,"Gold Saucer · Corel Desert","Gold Saucer","Healing Materia","\"Gilded Paradise\": Cast Break Room, right in front of you in the staff room at the start of the chapter.",""],
[8,"Gold Saucer · Corel Desert","Gold Saucer","Steadfast Block Materia","Park Central: take the central stairs signed Speed Square, then cross the bridge on the right.",""],
[8,"Gold Saucer · Corel Desert","Gold Saucer","HP Up Materia","Inside the Golden Theatre in Event Square (main objective).",""],
[8,"Gold Saucer · Corel Desert","Dustbowl","Poison Materia","Bartender's Untended Garden: during the Cactuar chase, after the grapples and fights, take the right path at the end.",""],
[8,"Gold Saucer · Corel Desert","Dustbowl","HP Up Materia","Same chase: take the left path, then drop into the hole on the left instead of following the Cactuar across the pipe.",""],
[9,"Gongaga","Gongaga Reactor — Cloud","Subversion Materia","\"The Shadow Beckons\", Reactor B4: next to the rest spot, in plain sight.",""],
[10,"Cosmo Canyon","Cosmo Canyon","Chakra Materia","\"Welcome Back, Nanaki\": Water Grotto, outside the inn in the northeast-most room.",""],
[10,"Cosmo Canyon","Cave of the Gi","Healing Materia","\"The First Trial\", Hall of Diversion: right side, up the wall.",""],
[10,"Cosmo Canyon","Cave of the Gi","Fortification Materia","\"The Voice Within\", Shrine of Enmity: in the four-altar room, cross the first wall on the right and drop halfway to fall into the water.",""],
[10,"Cosmo Canyon","Cave of the Gi","Empowerment Materia","Gate of Grief: before the third gate, go up and right to the higher platform with four Two Faces. Back corner.",""],
[11,"Nibel","Mt. Nibel","HP <> MP Materia","\"To the Reactor\", Gnipahellir Ravine: beside the mako spring where the cutscene plays, on the main path.","m","Prima flags it missable: this stretch can't be revisited later."],
[11,"Nibel","Mt. Nibel","Warding Materia","Northern Ridge: at the top of the climbable cliffs, go right instead of forward. On a cliff ledge.",""],
[11,"Nibel","Shinra Manor basement","Barrier Materia","\"Escape Plan\" (Cait Sith), Section N: after the long hallway of breakable boxes, turn left in the next room, near the mako boxes.",""],
[11,"Nibel","Shinra Manor basement","ATK <> MATK Materia","\"Escape Plan\" (Cait Sith), Section E3/E4: before dropping a box on the red vent's switch, go through the blue vent on the left.","m","Prima flags it missable: this section can't be revisited later."],
[11,"Nibel","Nibel open world","Level Boost Materia","Chocobo Sage's Manor, upstairs. Southeast corner of the Nibel region.",""],
[13,"Temple of the Ancients","Temple — Chasing Waterfalls","Chakra Materia","On a ledge after the Rubystar Chamber (GamerGuides).",""],
[13,"Temple of the Ancients","Temple — Chasing Waterfalls","EXP Up Materia","After jumping down the waterfall and turning the Amberstar gear, go up the stairs. Right in front of you.",""],
[13,"Temple of the Ancients","Temple — Further Interference","Steadfast Block Materia","\"Keep Trying\", Order's Altar: after charging the lifestream fonts, go to the third font. Back-left room.",""],
[13,"Temple of the Ancients","Temple — Vessel of Life (Aerith)","Subversion Materia","\"The Hunt Begins Anew\", Salvation's Altar: room to the right of the next lifestream font.",""],
[13,"Temple of the Ancients","Temple — Hall of Resurrection","AP Up Materia","In the trials area of the Hall of Resurrection (GamerGuides).",""],
];
for(const r of MAT){ r[5]=(r[5]||"")+"g"; D.push(r); }
const CACHES = {
  2:["Grasslands",["Mako Pipeline Junction","Thresher Waterwheel","Grassy Viaduct","Forgotten Treads","Jadewind Hill","Mistveil Reservoir","Marshy Mire"]],
  4:["Junon",["Desolate Worksite","Mako Reef","Shinra Construction Site","Cargo Shipwreck","Republic Shipwreck","Fisherman's Strait","Crows Camp","Ruined Treasury"]],
  7:["Corel",["Seabreeze Storehouse","Sunrise Plateau","Cape del Amor","Twilight Hill","Sandswept Modular Reactor","Rustladen Reservoir","Sundappled Storehouses","Drainwater Drift","Desert Watermain","Smugglers' Truck"]],
  9:["Gongaga",["Mushroom Storage","Fishing Hole","Watchman's Lookout","Reactor Construction Site","Mako Wastes","Verdant Vista","Cliffside Storehouse","Woodsprite Haven","Forested Ruins"]],
  10:["Cosmo Canyon",["Salt Miners' Shack","Galeswept Valley","The Celestica","Ancient Baths","Font Shrine","Capital Ruins","Oldewyrm Clearing"]],
  11:["Nibel",["Cliffs of Abjuration","Nidhogg Grotto","Stowaway Cove","Hraesvelgr Perch"]],
  12:["Meridian Ocean",["Pirate King's Grotto α","Pirate King's Grotto β","Pirate King's Grotto γ","Pirate King's Grotto δ"]]
};
for(const [c,[reg,names]] of Object.entries(CACHES)){
  for(const n of names) D.push([+c,"Open world",reg+" — Caches",n+" Cache","Open-world cache in the "+reg+" region. Found caches stay on your map, and all of them are marked automatically after the story.","c"]);
}

const CH_NAMES = {1:"Ch 1 · Fall of a Hero",2:"Ch 2 · A New Journey Begins",3:"Ch 3 · Deeper into Darkness",4:"Ch 4 · Dawn of a New Era",5:"Ch 5 · Blood in the Water",6:"Ch 6 · Fool's Paradise",7:"Ch 7 · Those Left Behind",8:"Ch 8 · All That Glitters",9:"Ch 9 · The Planet Stirs",10:"Ch 10 · Watcher of the Vale",11:"Ch 11 · The Long Shadow of Shinra",12:"Ch 12 · A Golden Key",13:"Ch 13 · Where Angels Fear to Tread",14:"Ch 14 · End of the World"};
const ZONE_NOTES = {
  "Mythril Mine — Cloud, Tifa & Aerith":"Fast travel is off inside the mine and the party splits after the robed man's scene. Clear each half as you go.",
  "Upper Junon":"Linear story section. Once you move on, you can only come back through Chapter Select after the credits.",
  "Junon Harbor":"Linear story section. Once you move on, you can only come back through Chapter Select after the credits.",
  "Shinra-8":"One-time ship section. Chapter Select after the credits is the only way back.",
  "Shinra-8 — Cargo Hold":"One-time ship section. Chapter Select after the credits is the only way back.",
  "Gongaga Reactor — Tifa":"The reactor goes back to normal once Tifa's section ends, so these chests can't be reached again this playthrough.",
  "Gongaga Village":"Revisit any time once you have the chocobo for Gongaga.",
  "Cave of the Gi":"One-time trial with Red XIII and Barret only.",
  "Shinra Manor basement":"Finish looting before the vault door: the room beyond starts a boss fight. Prima notes parts of this section can't be revisited later.",
  "Temple — Vessel of Life (Aerith)":"Some chests are visible early but only reachable after filling the vessels in order."
};
const CH_ALERTS = {
  1:[["note","<b>Flashback:</b> nothing you collect in Chapter 1 carries over to the rest of the game. Open these for completion only."]],
  4:[["note","<b>Under Junon closes for a while</b> once you progress through \"Priscilla's Plan\". Finish anything there first."]],
  6:[["note","No story chests in Chapter 6. Costa del Sol is all minigames and side content."]],
  7:[["note","Boarding the gondola to the Gold Saucer ends the chapter. North Corel and the Corel open world reopen in Chapter 9."]],
  12:[["warn","<b>Point of no return:</b> flying the Tiny Bronco to Northwood locks you into the main story until the credits. Open every cache and open-world chest you want before you go."]],
  14:[["note","No chests found in the Chapter 14 guides. After the credits, Chapter Select (Hard mode) lets you go back for anything you skipped."]]
};

/* ---------- Turn the lists above into the shape app.js reads ---------- */

// Chapter notes may start with "<b>Title:</b>"; split that into a title and plain text.
function splitAlert(alert) {
  const m = /^<b>(.*?)<\/b>\s*(.*)$/.exec(alert[1]);
  return { kind: alert[0], title: m ? m[1].replace(/:$/, '') : '', text: m ? m[2] : alert[1] };
}
const stageNotes = {};
Object.keys(CH_ALERTS).forEach(function (c) { stageNotes[c] = CH_ALERTS[c].map(splitAlert); });

// "Ch 1 · Fall of a Hero" -> "Fall of a Hero"
const stageTitles = {};
Object.keys(CH_NAMES).forEach(function (c) { stageTitles[c] = CH_NAMES[c].replace(/^Ch \d+ · /, ''); });

// What kind of treasure each row is, for the Weapon / Materia / Item / Gil buttons.
// Caches hold a mix, so they have no type and only show when no type is picked.
function typeOf(item, flags) {
  if (flags.indexOf('c') >= 0) return '';
  if (flags.indexOf('g') >= 0 || /Materia$/.test(item)) return 'materia';
  if (flags.indexOf('p') >= 0) return 'weapon';
  if (/Gil$/.test(item)) return 'gil';
  return 'item';
}
const TYPE_TAGS = { weapon: 'Weapon', materia: 'Materia', item: 'Item', gil: 'Gil' };

const count = {};
const treasureItems = D.map(function (r) {
  const flags = r[5] || '', zone = r[0] + '|' + r[2];
  count[zone] = (count[zone] || 0) + 1;
  const isCache = flags.indexOf('c') >= 0;
  const type = typeOf(r[3], flags);
  const item = {
    id: zone + '|' + count[zone], num: count[zone], stage: r[0],
    region: isCache ? '' : r[1], group: r[2], name: r[3], where: r[4], rough: isCache,
    type: type, tags: []
  };
  if (type) item.tags.push(TYPE_TAGS[type]);
  if (isCache) item.tags.push('Cache');
  if (flags.indexOf('r') >= 0) item.tags.push('Reported');
  if (flags.indexOf('m') >= 0) item.miss = r[6] || 'Can be lost for this playthrough once you move on.';
  else if (flags.indexOf('t') >= 0) item.timing = r[6] || 'Grab it before moving the story on.';
  return item;
});

window.GAMES = (window.GAMES || []).concat([{
  id: 'rebirth',
  name: 'Final Fantasy VII Rebirth',
  short: 'FFVII Rebirth',
  art: 'images/rebirth/cover.jpg',
  artPos: 'center 72%',
  tint: ['#3a0d1a', '#b8432a'],
  icon: 'crystal',
  stageName: 'Chapter',
  stages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  stageTitles: stageTitles,
  // Chapter 1 is a flashback whose items don't carry over, so it's left out once you're past it.
  asideStages: [1],
  asideNote: 'Chapter 1 is a flashback and nothing from it carries over, so it only shows while ' +
    '“I’m up to” is on Chapter 1, or with “This chapter only”.',
  collections: [
    {
      id: 'treasure',
      name: 'Treasure',
      blurb: 'Chests, materia on the ground and open-world caches.',
      tint: ['#2a1206', '#a0521c'],
      icon: 'chest',
      showContents: true,
      items: treasureItems,
      types: [['weapon', 'Weapon'], ['materia', 'Materia'], ['item', 'Item'], ['gil', 'Gil']],
      stageNotes: stageNotes,
      groupNotes: ZONE_NOTES,
      footer: 'Story-area chests merge PowerPyx\'s chapter walkthroughs with GamerGuides\' walkthrough, taking whichever ' +
        'lists a chest the other misses. Ground materia from the same guides, with Prima\'s missable notes. ' +
        '"Reported" items come from player reports, not the main guides. Caches hold a mix of items, so they only ' +
        'show when no type button is picked.'
    }
  ]
}]);
})();
