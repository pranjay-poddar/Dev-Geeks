// SELECTOR --------------------------------------------------->
const hamburger = document.querySelector(".hamburger");
const bar = document.querySelectorAll(".bar");
const navMenu = document.querySelector(".nav-menu");
const sovaImg = document.querySelector(".sova-img");
const skillRadio = document.getElementsByName("skill-btn");
const abilitiesBtn = document.querySelectorAll(".abilities-ico");
const abilitiesTextHead = document.getElementById("abilities-text-head");
const abilitiesTextBody = document.getElementById("abilities-text-body");
const abilitiesSrc = document.getElementById("abilities-src");
const agentName = document.querySelector("#agent-name");
const agentPict = document.querySelectorAll(".agent");
const abilities = [
  [
    {
      skill: "Q - Shock Bolt",
      desc: "EQUIP a bow with a shock bolt. FIRE to send the explosive forward, detonating upon collision and damaging players nearby. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt7af29765c99f807d/5ecad882722d20585b2f4a48/Sova_Q_v001_web.mp4",
    },
    {
      skill: "E - Recon Bolt",
      desc: "EQUIP a bow with a recon bolt. FIRE to send the recon bolt forward, activating upon collision and revealing the location of nearby enemies caught in the line of sight of the bolt. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt44b27c0d688217db/5ecad88398f79d6925dbee21/Sova_E_v001_web.mp4",
    },
    {
      skill: "C - Owl Drone",
      desc: "EQUIP an owl drone. FIRE to deploy and take control of movement of the drone. While in control of the drone, FIRE to shoot a marking dart. This dart will reveal the location of any player struck by the dart.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt07d2025ac5dcd792/5ecad883f5bd13348a6cac89/Sova_C_v001_web.mp4",
    },
    {
      skill: "X - Hunters Fury",
      desc: "EQUIP a bow with three long-range wall-piercing energy blasts. FIRE to release an energy blast in a line in front of Sova, dealing damage and revealing the location of enemies caught in the line. This ability can be RE-USED up to two more times while the ability timer is active.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf9fc34106a23479c/5ecad88397b46c1911ad1872/Sova_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Nova Pulse",
      desc: "Place Stars in Astral Form (X) ACTIVATE a Star to detonate a Nova Pulse. The Nova Pulse charges briefly then strikes, concussing all players in its area.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt78e556d97ea93fc9/6036c92572c04c12c9563dff/RIFT21_Astra_Ability_Q.mp4",
    },
    {
      skill: "E - Nebula",
      desc: "Place Stars in Astral Form (X) ACTIVATE a Star to transform it into a Nebula (smoke). Use (F) on a Star to Dissipate it, returning the star to be placed in a new location after a delay. Dissipate briefly forms a fake Nebula at the Star’s location before returning.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3be9010588cba144/6036c924427f5d75042c3ae5/RIFT21_Astra_Ability_E_F.mp4",
    },
    {
      skill: "C - Gravity Well",
      desc: "Place Stars in Astral Form (X) ACTIVATE a Star to form a Gravity Well. Players in the area are pulled toward the center before it explodes, making all players still trapped inside fragile.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaba20d81cc601af4/6036c92599494e6c4f166b19/RIFT21_Astra_Ability_C.mp4",
    },
    {
      skill: "X - Astral Form / Cosmic Divide",
      desc: "ACTIVATE (X) to enter Astral Form where you can place Stars with PRIMARY FIRE. Stars can be reactivated later, transforming them into a Nova Pulse, Nebula, or Gravity Well. When Cosmic Divide is charged, use SECONDARY FIRE in Astral Form to begin aiming it, then PRIMARY FIRE to select two locations. An infinite Cosmic Divide connects the two points you select. Cosmic Divide blocks bullets and heavily dampens audio.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltca94f8d6f8e4c91d/6036c92499494e6c4f166b15/RIFT21_Astra_Ability_ULT.mp4",
    },
  ],
  [
    {
      skill: "Q - Flashpoint",
      desc: "EQUIP a blinding charge. FIRE the charge to set fast-acting burst through the wall. The charge detonates to blind all players looking at it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc2d5631f1babcaf0/5ec840e1bab1845d392dfc39/Breach_Q_v001_web.mp4",
    },
    {
      skill: "E - Fault Line",
      desc: "EQUIP a seismic blast. HOLD FIRE to increase the distance. RELEASE to set off the quake, dazing all players in its zone and in a line up to the zone",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltd09eb47222cc1152/5ec840e287617619e2be955e/Breach_E_v001_web.mp4",
    },
    {
      skill: "C - Aftershock",
      desc: "EQUIP a fusion charge. FIRE the charge to set a slow-acting burst through the wall. The burst does heavy damage to anyone caught in its area.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltfff097ebc7da90e9/5ec840e1e2a559592eb0c0e2/Breach_C_v001_web.mp4",
    },
    {
      skill: "X - Rolling Thunder",
      desc: "EQUIP a seismic charge. FIRE to send a cascading quake through all terrain in a large cone. The quake dazes and knocks up anyone caught in it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0a47675f8b973fda/5ec840e252c5395e0f2dd038/Breach_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Incendiary",
      desc: "EQUIP an incendiary grenade launcher. FIRE to launch a grenade that detonates as it comes to a rest on the floor, creating a lingering fire zone that damages players within the zone.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blte2b9eb1923ef64fa/5ecad7d0f5bd13348a6cac75/Brimstone_Q_v001_web.mp4",
    },
    {
      skill: "E - Sky Smoke",
      desc: "EQUIP a tactical map. FIRE to set locations where Brimstone’s smoke clouds will land. ALTERNATE FIRE to confirm, launching long-lasting smoke clouds that block vision in the selected area.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltcf4359fed083686b/5ecad7d198f79d6925dbee07/Brimstone_E_v001_web.mp4",
    },
    {
      skill: "C - Stim Beacon",
      desc: "EQUIP a stim beacon. FIRE to toss the stim beacon in front of Brimstone. Upon landing, the stim beacon will create a field that grants players RapidFire.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc34c3d692ea83f41/5ecad7d0177c51692beb1fe4/Brimstone_C_v001_web.mp4",
    },
    {
      skill: "X - Orbital Strike",
      desc: "EQUIP a tactical map. FIRE to launch a lingering orbital strike laser at the selected location, dealing high damage-over-time to players caught in the selected area.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3d19d83ba51eb18f/5ecad7d297b46c1911ad1868/Brimstone_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Cyber Cage",
      desc: "INSTANTLY toss the cyber cage in front of Cypher. Activate to create a zone that blocks vision and slows enemies who pass through it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt019fa05d6b7fddef/5ecad7e597b46c1911ad186c/Cypher_Q_v001_web.mp4",
    },
    {
      skill: "E - Spycam",
      desc: "EQUIP a spycam. FIRE to place the spycam at the targeted location. RE-USE this ability to take control of the camera’s view. While in control of the camera, FIRE to shoot a marking dart. This dart will reveal the location of any player struck by the dart.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt47c03800823ce304/5ecad7e64a28e119db562296/Cypher_E_v001_web.mp4",
    },
    {
      skill: "C - Trapwire",
      desc: "EQUIP a trapwire. FIRE to place a destructible and covert tripwire at the targeted location creating a line that spans between the placed location and the wall opposite. Enemy players who cross a tripwire will be tethered, revealed, and dazed after a short period if they do not destroy the device in time. This ability can be picked up to be REDEPLOYED.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt9b7d004dc573791c/5ecad7e85e73766852c8ed8c/Cypher_C_v001_web.mp4",
    },
    {
      skill: "X - Neural Theft",
      desc: "INSTANTLY use on a dead enemy player in your crosshairs to reveal the location of all living enemy players.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29f3571576a3937f/5ecad7e5e2a559592eb0c1b0/Cypher_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Updraft",
      desc: "INSTANTLY propel Jett high into the air.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt2c46e5d7a51be140/5ecad7f552c5395e0f2dd0de/Jett_Q_v001_web.mp4",
    },
    {
      skill: "E - Tailwind",
      desc: "INSTANTLY propel Jett in the direction she is moving. If Jett is standing still, she will propel forward.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5368134438181520/5ecad7f6e2a559592eb0c1b4/Jett_E_v001_web.mp4",
    },
    {
      skill: "C - Cloudburst",
      desc: "INSTANTLY throw a projectile that expands into a brief vision-blocking cloud on impact with a surface. HOLD the ability key to curve the smoke in the direction of your crosshair.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltb15019d03f48b8c3/5ecad7f7beb6c333c3a0f59d/Jett_C_v001_web.mp4",
    },
    {
      skill: "X - Blade Storm",
      desc: "EQUIP a set of highly accurate knives that recharge on killing an opponent. FIRE to throw a single knife at your target. ALTERNATE FIRE to throw all remaining daggers at your target.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blta43d8d506e2f5e00/5ecad7f6957e405e0990574d/Jett_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - FLASH/drive",
      desc: "EQUIP a flash grenade. FIRE to throw. The flash grenade explodes after a short fuse, blinding anyone in line of sight.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltab2fead35a9b412d/60cce5d49b520349ac9d080d/KAYO_C_v002_web.mp4",
    },
    {
      skill: "E - ZERO/point",
      desc: "EQUIP a suppression blade. FIRE to throw. The blade sticks to the first surface it hits, winds up, and suppresses anyone in the radius of the explosion.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt11ab79d777cba68e/60cce41a07060a4ae3f12ff1/KAYO_E_v002_web.mp4",
    },
    {
      skill: "C - FRAG/ment",
      desc: "EQUIP an explosive fragment. FIRE to throw. The fragment sticks to the floor and explodes multiple times, dealing near lethal damage at the center with each explosion.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6372c1b58baf8ca2/60cce401ae0d50495b4f7e31/KAYO_Q_v001_web.mp4",
    },
    {
      skill: "X - NULL/cmd",
      desc: "INSTANTLY overload with polarized radianite energy that empowers KAY/O and causes large energy pulses to emit from his location. Enemies hit with these pulses are suppressed for a short duration.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6cd3a6f6e99152f8/60cce43683f9fe49a6fee835/KAYO_X_v003_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Alarmbot",
      desc: "EQUIP a covert Alarmbot. FIRE to deploy a bot that hunts down enemies that get in range. After reaching its target, the bot explodes, applying Vulernable. HOLD EQUIP to recall a deployed bot.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt9a8fa11ac887550e/5f2203522f812a7c016f5651/AlarmBot_LowQuality.mp4",
    },
    {
      skill: "E - Turret",
      desc: "EQUIP a Turret. FIRE to deploy a turret that fires at enemies in a 180 degree cone. HOLD EQUIP to recall the deployed turret.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0fe3462ae9a025a4/5f220396074360086ccdd908/Turret_LowQuality.mp4",
    },
    {
      skill: "C - Nanoswarm",
      desc: "EQUIP a Nanoswarm grenade. FIRE to throw the grenade. Upon landing, the Nanoswarm goes covert. ACTIVATE the Nanoswarm to deploy a damaging swarm of nanobots.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4aed833e1b0df155/5f2204694be7297d7e6c8449/Grenade_LowQuality.mp4",
    },
    {
      skill: "X - Lockdown",
      desc: "EQUIP the Lockdown device. FIRE to deploy the device. After a long windup, the device Detains all enemies caught in the radius. The device can be destroyed by enemies.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf74d72b162a14692/5f2204ab8ff50d070ad2d192/Ultimate_LowQualityV02.mp4",
    },
  ],
  [
    {
      skill: "Q - Paranoia",
      desc: "INSTANTLY fire a shadow projectile forward, briefly reducing the vision range of all players it touches. This projectile can pass straight through walls.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5babc7e7c6c24fa0/5ecad8154a28e119db56229e/Omen_Q_v001_web.mp4",
    },
    {
      skill: "E - Dark Cover",
      desc: "EQUIP a shadow orb and see its range indicator. FIRE to throw the shadow orb to the marked location, creating a long-lasting shadow sphere that blocks vision. HOLD ALTERNATE FIRE while targeting to move the marker further away. HOLD the ability key with targeting to move the market closer.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt70e2c9db1c0793df/5ecad815c846021917ecbb85/Omen_E_v001_web.mp4",
    },
    {
      skill: "C - Shrouded Step",
      desc: "EQUIP a shadow walk ability and see its range indicator. FIRE to begin a brief channel, then teleport to the marked location.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt63486e54ea52945a/5ecad815bab1845d392dfd07/Omen_C_v001_web.mp4",
    },
    {
      skill: "X - From The Shadows",
      desc: "EQUIP a tactical map. FIRE to begin teleporting to the selected location. While teleporting, Omen will appear as a Shade that can be destroyed by an enemy to cancel his teleport.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt65aa85bf6ba5c0e8/5ecad814a4fe135d37f021a3/Omen_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Curveball",
      desc: "EQUIP a flare orb that takes a curving path and detonates shortly after throwing. FIRE to curve the flare orb to the left, detonating and blinding any player who sees the orb. ALTERNATE FIRE to curve the flare orb to the right.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltad7b0ea9be090042/5ecad82c2f5c7259287654ff/Phoenix_Q_v001_web.mp4",
    },
    {
      skill: "E - Hot Hands",
      desc: "EQUIP a fireball. FIRE to throw a fireball that explodes after a set amount of time or upon hitting the ground, creating a lingering fire zone that damages enemies.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt318f7ee7d6435fac/5ecad82cf5bd13348a6cac7d/Phoenix_E_v001_web.mp4",
    },
    {
      skill: "C - Blaze",
      desc: "EQUIP a flame wall. FIRE to create a line of flame that moves forward, creating a wall of fire that blocks vision and damages players passing through it. HOLD FIRE to bend the wall in the direction of your crosshair.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf0ee7c9d84985ecf/5ecad82d957e405e09905751/Phoenix_C_v001_web.mp4",
    },
    {
      skill: "X - Run It Back",
      desc: "INSTANTLY place a marker at Phoenix’s location. While this ability is active, dying or allowing the timer to expire will end this ability and bring Phoenix back to this location with full health.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt50beaed6524c3219/5ecad82bc846021917ecbb89/Phoenix_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Blast Pack",
      desc: "INSTANTLY throw a Blast Pack that will stick to surfaces. RE-USE the ability after deployment to detonate, damaging and moving anything hit. Raze isn't damaged by this ability, but will still take fall damage if launched up far enough.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf3581aedf43e1ce8/5ecad83cc846021917ecbb8d/Raze_Q_v001_web.mp4",
    },
    {
      skill: "E - Paint Shells",
      desc: "EQUIP a cluster grenade. FIRE to throw the grenade, which does damage and creates sub-munitions, each doing damage to anyone in their range.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltfe61b821c26125b7/5ecad83be2a559592eb0c1ba/Raze_E_v001_web.mp4",
    },
    {
      skill: "C - Boom Bot",
      desc: "EQUIP a Boom Bot. FIRE will deploy the bot, causing it to travel in a straight line on the ground, bouncing off walls. The Boom Bot will lock on to any enemies in its frontal cone and chase them, exploding for heavy damage if it reaches them.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f7d7ee195ecedca/5ecad83c52c5395e0f2dd0e4/Raze_C_v001_web.mp4",
    },
    {
      skill: "X - Showstopper",
      desc: "EQUIP a rocket launcher. FIRE shoots a rocket that does massive area damage on contact with anything.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltb15aa9cb086aed1a/5ecad83c4a28e119db5622a2/Raze_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Devour",
      desc: "Enemies killed by Reyna leave behind Soul Orbs that last 3 seconds. INSTANTLY consume a nearby soul orb, rapidly healing for a short duration. Health gained through this skill exceeding 100 will decay over time. If EMPRESS is active, this skill will automatically cast and not consume the orb.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltb216220f42c804e2/5ecad85d4a28e119db5622a8/Reyna_Q_v001_web.mp4",
    },
    {
      skill: "E - Dismiss",
      desc: "INSTANTLY consume a nearby soul orb, becoming intangible for a short duration. If EMPRESS is active, also become invisible.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt77e99ec99ef3a839/5ecad85e2f5c725928765503/Reyna_E_v002_web.mp4",
    },
    {
      skill: "C - Leer",
      desc: "EQUIP an ethereal destructible eye. ACTIVATE to cast the eye a short distance forward. The eye will Nearsight all enemies who look at it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf6109b8be97e8d96/5ecad85db42d3333c95dd1b2/Reyna_C_v002_web.mp4",
    },
    {
      skill: "X - Empress",
      desc: "INSTANTLY enter a frenzy, increasing firing speed, equip and reload speed dramatically. Scoring a kill renews the duration.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltadf53a38e449cb4d/5ecad85cbab1845d392dfd0f/Reyna_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Slow Orb",
      desc: "EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, creating a lingering field that slows players caught inside of it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4f4fdcc86da69972/5ecad872722d20585b2f4a44/Sage_Q_v001_web.mp4",
    },
    {
      skill: "E - Healing Orb",
      desc: "EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them. ALT FIRE while Sage is damaged to activate a self heal-over-time.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf1d16edc36ba3386/5ecad87152c5395e0f2dd0ea/Sage_E_v001_web.mp4",
    },
    {
      skill: "C - Barrier Orb",
      desc: "EQUIP a barrier orb. FIRE places a solid wall. ALT FIRE rotates the targeter.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5a0edb670c30fbdc/5ecad8732f5c725928765507/Sage_C_v001_web.mp4",
    },
    {
      skill: "X - Resurrection",
      desc: "EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them. After a brief channel, the ally will be brought back to life with full health.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltef1820f276fbaa0c/5ecad871957e405e09905755/Sage_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Trailblazer",
      desc: "EQUIP a Tasmanian tiger trinket. FIRE to send out and take control of the predator. While in control, FIRE to leap forward, exploding in a concussive blast and damaging directly hit enemies.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt90a6f2733b96ce16/5f7faa7dd4fbb50ef307791e/Val_Skye_Q_Ability_Web.mp4",
    },
    {
      skill: "E - Guiding Light",
      desc: "EQUIP a hawk trinket. FIRE to send it forward. HOLD FIRE to guide the hawk in the direction of your crosshair. RE-USE while the hawk is in flight to transform it into a flash that plays a hit confirm if an enemy was within range and line of sight.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8ecea4a77a26c25b/5f7fab7adf178b0ea98495a5/Val_Skye_E_Ability_Web.mp4",
    },
    {
      skill: "C - Regrowth",
      desc: "EQUIP a healing trinket. HOLD FIRE to channel, healing allies in range and line of sight. Can be reused until her healing pool is depleted. Skye cannot heal herself.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0f5403509070a0a2/5f7fabc5879de80eb41b1f33/Val_Skye_C_Ability_Web.mp4",
    },
    {
      skill: "X - Seekers",
      desc: "EQUIP a Seeker trinket. FIRE to send out three Seekers to track down the three closest enemies. If a Seeker reaches its target, it nearsights them.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt966535853a54c58c/5f7fac19df178b0ea98495ad/Val_Skye_X_Ability_Web.mp4",
    },
  ],
  [
    {
      skill: "Q - Poison Cloud",
      desc: "EQUIP a gas emitter. FIRE to throw the emitter that perpetually remains throughout the round. RE-USE the ability to create a toxic gas cloud at the cost of fuel. This ability can be RE-USED more than once and can be picked up to be REDEPLOYED.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blte5200bab40679f96/5ecad8935e73766852c8ed94/Viper_Q_v001_web.mp4",
    },
    {
      skill: "E - Toxic Screen",
      desc: "EQUIP a gas emitter launcher. FIRE to deploy a long line of gas emitters. RE-USE the ability to create a tall wall of toxic gas at the cost of fuel. This ability can be RE-USED more than once.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt66a45c1fe76ca647/5ecad893957e405e0990575d/Viper_E_v001_web.mp4",
    },
    {
      skill: "C - Snake Bite",
      desc: "EQUIP a chemical launcher. FIRE to launch a canister that shatters upon hitting the floor, creating a lingering chemical zone that damages and slows enemies.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5e70987e8ac2f2d6/5ecad893722d20585b2f4a4c/Viper_C_v001_web.mp4",
    },
    {
      skill: "X - Viper’s Pit",
      desc: "EQUIP a chemical sprayer. FIRE to spray a chemical cloud in all directions around Viper, creating a large cloud that reduces the vision range and maximum health of players inside of it.",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt41c75111b2eac6b5/5ecad8923a450a58554b7078/Viper_X_v001_web.mp4",
    },
  ],
  [
    {
      skill: "Q - Blindside",
      desc: "EQUIP to rip an unstable dimensional fragment from reality. FIRE to throw the fragment, activating a flash that winds up once it collides with a hard surface in the world",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt9af4e1e3b962f7b4/5ff77b6fa703d10ab87ebb27/Yoru_Abilities_Blinding_1_1.mp4",
    },
    {
      skill: "E - Gatecrash",
      desc: "EQUIP to harness a rift tether FIRE to send the tether out moving forward ALT FIRE to place a tether in place ACTIVATE to teleport to the tether's location",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0945f456a2bcac77/5ff77b51b529867fcec28402/Yoru_Abilities_Teleport_1_1.mp4",
    },
    {
      skill: "C - Fakeout",
      desc: "EQUIP an echo that mimics footsteps when activated FIRE to activate and send the echo forward ALT FIRE to place an echo in place USE the inactive echo to send it forward",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt47c96a79f14605fc/5ff77bc5b47cdf7fc7d6cd31/Yoru_Abilities_Footsteps_1.mp4",
    },
    {
      skill: "X - Dimensional Drift",
      desc: "EQUIP a mask that can see between dimensions. FIRE to drift into Yoru's dimension, unable to be affected or seen by enemies from the outside",
      video: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt95a89496da772b65/5ff77c0e6aab641cd100f638/Yoru_Abilities_ULT_3_1.mp4",
    },
  ],
];

/*===== SCROLL REVEAL =====*/
const sr = ScrollReveal({
  origin: "bottom",
  distance: "200px",
  duration: 2000,
});

// EVENT ------------------------------------------------------>

// Header Reveal
sr.reveal(".sova-img-container", { distance: "200px", reset: false });
sr.reveal("#agent-name", {});
sr.reveal(".desc-container", {});

// Abilities
sr.reveal(".skill-container h1", { origin: "left" });
sr.reveal(".abilities-ico", { origin: "left" });
sr.reveal(".abilities-text", { origin: "left" });

// Agents Reveal
sr.reveal(".other-agents h1", { origin: "left" });
sr.reveal(".agent", { delay: 500 });
sr.reveal(".play-now", {});

// Add event listener to hamburger bar
hamburger.addEventListener("click", mobileMenu);

// Add class to give animation
function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  bar.forEach((el) => {
    el.classList.toggle("active");
  });
}

// Make hamburger menu closed once we clicked a link
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

// Give sova image animation
window.addEventListener("scroll", () => {
  let value = window.scrollY;
  sovaImg.style.top = value * -0.2 + "px";

  if (value > 250) {
    sovaImg.style.top = -50 + "px";
  }
  if (value === 0) {
    sovaImg.style.top = 10 + "%";
  }
});

var imported = document.createElement("script");
imported.src = "./agents.mjs";
document.head.appendChild(imported);

// FUNCTION ----------------------------------------------------->
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  bar.forEach((el) => {
    el.classList.remove("active");
  });
}

function addBtn0(n) {
  switch (n) {
    case 0:
      abilitiesBtn[0].classList.add("animate");
      abilitiesBtn[1].classList.remove("animate");
      abilitiesBtn[2].classList.remove("animate");
      abilitiesBtn[3].classList.remove("animate");
      break;
    case 1:
      abilitiesBtn[1].classList.add("animate");
      abilitiesBtn[0].classList.remove("animate");
      abilitiesBtn[2].classList.remove("animate");
      abilitiesBtn[3].classList.remove("animate");
      break;
    case 2:
      abilitiesBtn[2].classList.add("animate");
      abilitiesBtn[0].classList.remove("animate");
      abilitiesBtn[1].classList.remove("animate");
      abilitiesBtn[3].classList.remove("animate");
      break;
    case 3:
      abilitiesBtn[3].classList.add("animate");
      abilitiesBtn[0].classList.remove("animate");
      abilitiesBtn[1].classList.remove("animate");
      abilitiesBtn[2].classList.remove("animate");
      break;
  }
}
