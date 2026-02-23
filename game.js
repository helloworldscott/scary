// FLOOR 13
// How to run: open index.html in any modern browser. Add your own images to /assets using names like floor01_v1.png.

const GAME_DATA = {
  settings: {
    maxFear: 100,
    minFear: 0,
    corruptionFearThreshold: 70,
    jumpFearThreshold: 80,
    jumpFearDrop: 30,
    cluesToLeave: 3,
    autoReturnMs: 1500
  },
  jumpscares: [
    { text: "THE TENANT BLINKS FIRST." },
    { text: "YOU ARE ALREADY INSIDE." },
    { text: "WRONG FLOOR. WRONG NAME." }
  ],
  floors: {
    1: { name: "Lobby", variations: {
      1: makeVar("floor01_v1.png", ["clean tile", "clipboard scratch", "distant fan"], ["The lobby desk is arranged as if guests are still expected.", "A sign reads MEMORY REHABILITATION FACILITY, though the letters are peeling.", "The guest log is open to today, and your name is already written in patient handwriting."], optionSet("Sign the line anyway", "You add a second signature beneath your own. The ink twitches.", 12, 1), optionSet("Check the intercom", "Only static answers, then a breath that is not yours.", 4, 0), optionSet("Step back into the elevator", "You refuse to touch the log. The page turns itself.", -3, -1)),
      2: makeVar("floor01_v2.png", ["lights stutter", "wet footprints"], ["The guest log has dozens of your signatures, all with different dates.", "The desk bell rings every few seconds without being touched."], optionSet("Ring the bell back", "A voice says, 'Next identity.'", 13, 1), optionSet("Read previous entries", "Every visitor line says TENANT in your handwriting.", 5, 0), optionSet("Close the book", "You shut the cover and the ringing slows.", -2, -1)),
      3: makeVar("floor01_v3.png", ["alarm flicker", "cold draft"], ["The lobby doors are chained from the outside.", "Someone has crossed out your name and written THE TENANT over it in red marker."], optionSet("Scratch out THE TENANT", "The marker bleeds through your skin onto the page.", 15, 1), optionSet("Call for help", "A chorus answers from ceiling vents: 'You stayed.'", 6, 0), optionSet("Leave the desk untouched", "You back away before the chains begin to rattle.", -1, -1))
    }},
    2: { name: "Security Office", variations: {
      1: makeVar("floor02_v1.png", ["CRT hum", "camera grain"], ["Rows of CRT monitors show hallways from impossible angles.", "One screen catches a figure standing where no hallway should be."], optionSet("Zoom that monitor", "The figure turns. It has your posture.", 12, 1), optionSet("Cycle camera feeds", "Most feeds loop by exactly thirteen seconds.", 4, 0), optionSet("Power down the nearest monitor", "The glow drops and your pulse settles a little.", -3, -1)),
      2: makeVar("floor02_v2.png", ["burning dust", "tape rewind"], ["The monitors now show the elevator interior from behind you.", "Glitch bars briefly spell T E N A N T."], optionSet("Talk to the screen", "It mouths your words half a second too early.", 13, 1), optionSet("Review recorded footage", "You find clips of yourself choosing floors you don't remember.", 5, 0), optionSet("Cover the active monitor", "You drape a jacket over the image and the room quiets.", -2, -1)),
      3: makeVar("floor02_v3.png", ["feedback scream", "ozone"], ["Every monitor shows your face, but each one blinks at different times.", "In the center feed, the entity leans close and smiles."], optionSet("Stare back", "Its smile widens until the screen cracks.", 15, 1), optionSet("Pull the recording drive", "The footage keeps playing without hardware.", 6, 0), optionSet("Kill main breaker", "For a heartbeat, the room goes truly dark.", -1, -1))
    }},
    3: { name: "Offices", variations: {
      1: makeVar("floor03_v1.png", ["ringing phone", "paper rustle"], ["Cubicles are frozen mid-shift with half-finished reports.", "A desk phone rings and a whisper leaks through: 'You stayed too long.'"], optionSet("Answer the call", "Breathing fills the line, then your own voice says your name.", 11, 1), optionSet("Read a report", "Most pages are therapy transcripts with sections blacked out.", 4, 0), optionSet("Unplug the phone", "The ringing stops, but only for this floor.", -3, -1)),
      2: makeVar("floor03_v2.png", ["fluorescent buzz", "clock tick"], ["Sticky notes form arrows toward a closed manager office.", "The phone now rings from inside a locked drawer."], optionSet("Force the drawer", "Inside is a receiver still warm from use.", 12, 1), optionSet("Follow sticky-note arrows", "They lead to a mirror where your name tag says TENANT.", 5, 0), optionSet("Sit and breathe", "The clock slows to match your breathing.", -2, -1)),
      3: makeVar("floor03_v3.png", ["whisper loop", "cold static"], ["Every desk chair is turned to face you.", "The whisper is louder now: 'You stayed too long. We replaced you.'"], optionSet("Shout back", "The whisper becomes applause.", 14, 1), optionSet("Search manager office", "Performance reviews list you as discharged, then readmitted under a new code.", 6, 0), optionSet("Back to elevator silently", "The chairs rotate away as you retreat.", -1, -1))
    }},
    4: { name: "Break Room", variations: {
      1: makeVar("floor04_v1.png", ["microwave hum", "coffee stale"], ["A microwave runs with no timer showing.", "Someone left food on the table with your initials on the lid."], optionSet("Open the container", "Steam spills out carrying hospital antiseptic.", 10, 1), optionSet("Check the fridge", "Shelves hold patient meal plans and one birthday cake with no date.", 4, 0), optionSet("Stop the microwave", "The hum dies and your shoulders unclench.", -3, -1)),
      2: makeVar("floor04_v2.png", ["vending clack", "neon flicker"], ["The microwave door reflects a room that has one extra chair.", "The untouched meal is now warm and freshly plated."], optionSet("Sit in the extra chair", "The chair across from you scrapes forward on its own.", 12, 1), optionSet("Read labels on the meal", "One sticker reads 'Identity Replacement Protocol'.", 5, 0), optionSet("Leave before eating", "You step out before hunger can decide for you.", -2, -1)),
      3: makeVar("floor04_v3.png", ["burnt sugar", "deep hum"], ["All microwaves run at once, doors glowing from inside.", "A fork scratches words into the table: YOU WERE FED MEMORIES."], optionSet("Open a running microwave", "Inside sits your room key, burning hot.", 14, 1), optionSet("Photograph the table", "The words shift in the photo to: THE TENANT EATS FIRST.", 6, 0), optionSet("Cover your ears and leave", "The hum follows until the elevator closes.", 0, -1))
    }},
    5: { name: "Hallway", variations: {
      1: makeVar("floor05_v1.png", ["long corridor", "distant silhouette"], ["A corridor stretches farther than the building should allow.", "At the far end, a silhouette waits without moving."], optionSet("Walk toward the silhouette", "Each step makes it seem farther away.", 11, 1), optionSet("Count door numbers", "They skip from 509 to 513 to 509 again.", 4, 0), optionSet("Stay near the elevator", "The silhouette does not approach.", -3, -1)),
      2: makeVar("floor05_v2.png", ["motion sensor click", "echo"], ["The silhouette is closer now, still faceless.", "Emergency lights pulse in sets of three."], optionSet("Call out to it", "It lifts a hand in perfect imitation of your own.", 12, 1), optionSet("Inspect the walls", "Paint is peeled to reveal old apartment wallpaper beneath.", 5, 0), optionSet("Do not break eye contact; back away", "It remains at distance when you refuse to turn.", -2, -1)),
      3: makeVar("floor05_v3.png", ["heartbeat bass", "wet carpet"], ["The silhouette stands two doors away now, profile wrong by a few degrees.", "When lights dim, you see your own badge clipped to its collar."], optionSet("Rush it", "It is smoke until it stands behind you.", 15, 1), optionSet("Check the badge", "The name line reads REPLACEMENT TENANT.", 6, 0), optionSet("Step into elevator light", "The figure stops where the light ends.", -1, -1))
    }},
    6: { name: "Stairwell", variations: {
      1: makeVar("floor06_v1.png", ["concrete damp", "looping steps"], ["The stairwell door opens to stairs marked both UP and DOWN on every landing.", "Graffiti across the wall reads: DON'T GO UP."], optionSet("Climb anyway", "You pass the same gum stain three times.", 11, 1), optionSet("Check fire map", "The evacuation map labels this building as SITE 13.", 4, 0), optionSet("Return to elevator immediately", "You avoid the loop's pull.", -3, -1)),
      2: makeVar("floor06_v2.png", ["dripping pipe", "metal groan"], ["The graffiti has changed to DON'T GO YOU.", "Each landing has your initials carved into wet paint."], optionSet("Follow the initials", "They end at a locked maintenance hatch breathing warm air.", 12, 1), optionSet("Read old notices", "A memo warns staff not to mirror patient memories.", 5, 0), optionSet("Descend without counting", "The disorientation softens when you stop tracking steps.", -2, -1)),
      3: makeVar("floor06_v3.png", ["siren pulse", "shadow climb"], ["Footsteps above and below match your pace exactly.", "The graffiti now screams: THE TENANT LIVES UPSTAIRS."], optionSet("Run upward", "You burst through a door and re-enter the same landing.", 14, 1), optionSet("Kick the maintenance hatch", "Inside is an empty hospital bed and restraints.", 6, 0), optionSet("Hold railing, retreat", "The matching footsteps hesitate as you leave.", 0, -1))
    }},
    7: { name: "Apartment", variations: {
      1: makeVar("floor07_v1.png", ["familiar scent", "framed photos"], ["The apartment layout matches a place you once called home.", "A framed photo shows your family, but your face is scratched out."], optionSet("Touch the scratched photo", "Glass flakes off and reveals your face beneath someone else's name.", 10, 1), optionSet("Search bedroom drawers", "You find medication labels with your patient ID.", 4, 0), optionSet("Take the photo carefully", "You pocket the frame backing: a treatment date is written there.", -1, -1, "CLUE_PHOTO")),
      2: makeVar("floor07_v2.png", ["TV static", "faint lullaby"], ["The photo wall now has one blank frame where your picture should be.", "A lease contract on the counter lists occupant: THE TENANT."], optionSet("Sign the lease", "Your signature auto-completes in unfamiliar handwriting.", 12, 1), optionSet("Read old mail", "Envelopes are addressed to both your name and THE TENANT.", 5, 0), optionSet("Take the scratched portrait shard", "You keep a piece with your eye still visible.", 0, -1, "CLUE_PHOTO")),
      3: makeVar("floor07_v3.png", ["furniture drag", "closet knock"], ["The apartment is stripped bare except for the scratched photo nailed to the wall.", "Behind it is a mirror where your reflection wears another face."], optionSet("Knock on closet door", "Something knocks back in your exact rhythm.", 14, 1), optionSet("Look into the mirror", "The other face whispers: 'I pay the rent now.'", 6, 0), optionSet("Rip down the photo and keep it", "Its back reads: SUBJECT COMPLIANCE PHASE 7.", -1, -1, "CLUE_PHOTO"))
    }},
    8: { name: "Laundry Room", variations: {
      1: makeVar("floor08_v1.png", ["washer churn", "bleach"], ["Machines run with no lights in the room.", "A missing person poster hangs crookedly, featuring a face close to yours."], optionSet("Open a running washer", "Inside are hospital gowns stitched with your initials.", 10, 1), optionSet("Check detergent shelf", "A clipboard logs 'memory wash cycles' by floor.", 4, 0), optionSet("Take the missing poster", "You fold it and notice the date from this week.", -1, -1, "CLUE_POSTER")),
      2: makeVar("floor08_v2.png", ["spin cycle knock", "steam"], ["The poster now has your current clothes drawn over the missing figure.", "Dryers thump in a pattern like coded knocks."], optionSet("Decode the knocks", "The rhythm spells out 1-3-7 over and over.", 11, 1, "CLUE_137"), optionSet("Read service log", "A note says 'Tenant garments separated from patient garments.'", 5, 0), optionSet("Remove the poster from the wall", "On the back: 'If found, do not return to room.'", 0, -1, "CLUE_POSTER")),
      3: makeVar("floor08_v3.png", ["detergent fog", "metal slam"], ["All machines open at once, empty and dripping black water.", "The missing person poster now says FOUND and shows your face crossed out."], optionSet("Step between the machines", "The doors slam shut behind you like jaws.", 14, 1), optionSet("Inspect drain grate", "A patient bracelet with your name is wedged inside.", 6, 0), optionSet("Take the poster and retreat", "You keep proof before the ink can rewrite itself.", -1, -1, "CLUE_POSTER"))
    }},
    9: { name: "Mirror Floor", variations: {
      1: makeVar("floor09_v1.png", ["mirror sheen", "delay"], ["A wall-length mirror reflects you a beat too late.", "Scratched into the lower corner: 1 3 7."], optionSet("Trace the scratched numbers", "Your fingertip comes away with fresh paint.", 10, 1, "CLUE_137"), optionSet("Test reflection delay", "The delay lengthens when you say your name.", 4, 0), optionSet("Photograph the mirror", "The image captures 1 3 7 clearly before it fades.", 0, -1, "CLUE_137")),
      2: makeVar("floor09_v2.png", ["light smear", "breath on glass"], ["Your reflection smiles before you do.", "The scratched 1 3 7 is deeper now, almost carved through."], optionSet("Press palm to glass", "A second hand meets yours from the other side.", 12, 1), optionSet("Count mirror tiles", "Tile seams map to an elevator panel pattern ending at 13.", 5, 0, "CLUE_137"), optionSet("Keep eyes lowered; leave mark", "You copy 1 3 7 into your notebook and step away.", -1, -1, "CLUE_137")),
      3: makeVar("floor09_v3.png", ["glass whine", "double footsteps"], ["There are two reflections now, one half a second late, one half a second early.", "Both mouths silently form THE TENANT around the carved 1 3 7."], optionSet("Break the mirror", "Shards reflect corridors you have never walked.", 15, 1), optionSet("Read lips carefully", "They mouth: 'Find thirteen to end me.'", 6, 0, "CLUE_137"), optionSet("Back away without turning", "The extra reflection stays when you leave.", 0, -1))
    }},
    10: { name: "Storage", variations: {
      1: makeVar("floor10_v1.png", ["cardboard dust", "label tape"], ["Stacks of boxes are labeled by years of your life.", "A box marked TODAY holds an elevator key and a note: 'You never left.'"], optionSet("Take the key", "The metal is warm, as if just returned.", 10, 1), optionSet("Open old-year boxes", "They contain duplicated childhood objects in hospital packaging.", 4, 0), optionSet("Pocket the note only", "You keep the warning and avoid touching the key.", -1, -1)),
      2: makeVar("floor10_v2.png", ["paper tear", "faint lull"], ["More boxes now say TOMORROW and YESTERDAY in identical handwriting.", "TODAY's box is empty except for key-shaped dust."], optionSet("Search deeper shelf", "You find maintenance records of repeated elevator resets.", 11, 1), optionSet("Read the reset logs", "Each loop ends with the same initials as yours.", 5, 0), optionSet("Close every box", "The room grows quieter when sealed.", -2, -1)),
      3: makeVar("floor10_v3.png", ["crate thud", "paper whisper"], ["Boxes now tower to the ceiling, closing in as if breathing.", "A fresh note is pinned to TODAY: 'The Tenant keeps what you drop.'"], optionSet("Climb the stack", "From above, the boxes form the number 13.", 14, 1), optionSet("Collect pinned notes", "Most are apologies written in your handwriting.", 6, 0), optionSet("Leave the key where it lies", "For once, you choose not to feed the loop.", 0, -1))
    }},
    11: { name: "Hospital Room", variations: {
      1: makeVar("floor11_v1.png", ["monitor beep", "antiseptic"], ["A hospital bed sits beneath a chart clipped to the rail.", "Patient name: yours. Diagnosis: Memory Dissociation."], optionSet("Read full chart", "Treatment notes mention 'replacement identity stabilization.'", 10, 1), optionSet("Check bedside drawer", "You find old wristbands from previous admissions.", 4, 0), optionSet("Turn off monitor", "The room calms to near silence.", -3, -1)),
      2: makeVar("floor11_v2.png", ["drip count", "curtain drag"], ["The chart now has two columns: YOU and TENANT.", "Medication times are offset by thirteen minutes."], optionSet("Compare both columns", "TENANT doses increase as yours decrease.", 12, 1), optionSet("Inspect wall calendar", "Every day is circled except the day you arrived.", 5, 0), optionSet("Sit by bed and ground yourself", "You repeat your name until it sounds real again.", -2, -1)),
      3: makeVar("floor11_v3.png", ["flatline hiss", "cold draft"], ["The bed is occupied by a shape under sheets sized exactly to you.", "The chart is signed by a physician named The Tenant."], optionSet("Pull the sheet", "Beneath it is an empty gown still warm.", 15, 1), optionSet("Read physician signature", "The handwriting matches your own from the lobby log.", 6, 0), optionSet("Leave before checking the bed", "The flatline softens as doors close.", 0, -1))
    }},
    12: { name: "Dark Floor", variations: {
      1: makeVar("floor12_v1.png", ["total dim", "delayed footsteps"], ["The corridor is almost black; emergency strips pulse weakly.", "Your footsteps echo back late, as if someone follows one beat behind."], optionSet("Call out into darkness", "Your voice returns with one extra syllable.", 12, 1), optionSet("Follow the strip lights", "They lead to a dead-end door engraved with your initials.", 5, 0), optionSet("Stand still and breathe", "The delayed footsteps pause with you.", -2, -1)),
      2: makeVar("floor12_v2.png", ["cold breath", "wire buzz"], ["Breath fogs in front of you despite the stale heat.", "A shape passes between pulses, just outside each flash."], optionSet("Chase the shape", "You run into a wall that wasn't there before.", 13, 1), optionSet("Inspect engraved door", "Under your initials are carved words: FLOOR 13 WAITS.", 6, 0), optionSet("Keep to the lit path", "You avoid the shape and keep your footing.", -1, -1)),
      3: makeVar("floor12_v3.png", ["sub-bass throb", "close whisper"], ["The darkness leans in. Footsteps now precede your own by a beat.", "Something near your ear whispers plainly: 'I am the Tenant. Open thirteen.'"], optionSet("Whisper back 'Who am I?'", "It answers with your full legal name and patient number.", 15, 1), optionSet("Touch the engraved door", "The metal warms and a hidden 13 appears under your hand.", 7, 0), optionSet("Return before lights die", "You retreat while the whisper laughs softly.", 0, -1))
    }},
    13: {
      name: "True Floor",
      variations: {
        1: {
          image: "floor13_v1.png",
          ambient: ["silent hall", "heartbeat", "nameplate"],
          narrative: [
            "A single door waits at the end of a perfect corridor. Your full name is engraved in the brass.",
            "When you open it, the room contains both your apartment and your hospital bed, layered on top of each other.",
            "The Tenant speaks from your reflection: 'I was built from everything you could not carry. Every loop feeds me.'"
          ],
          options: [{ buttonText: "Open the door", resultText: "Truth floods in: you never left this program. You only switched places with what it made to survive.", fearDelta: 0, floorDelta: 0 }]
        }
      }
    }
  }
};

function makeVar(image, ambient, narrative, risky, neutral, safe) {
  return { image, ambient, narrative, options: [risky, neutral, safe] };
}
function optionSet(buttonText, resultText, fearDelta, floorDelta, clueId) {
  return { buttonText, resultText, fearDelta, floorDelta, clueId };
}

const el = {
  fearValue: document.getElementById("fearValue"), fearMeter: document.getElementById("fearMeter"), clueValue: document.getElementById("clueValue"), lockStatus: document.getElementById("lockStatus"),
  hub: document.getElementById("hubScreen"), scene: document.getElementById("sceneScreen"), ending: document.getElementById("endingScreen"),
  floorGrid: document.getElementById("floorGrid"), leaveBtn: document.getElementById("leaveBtn"), resetBtn: document.getElementById("resetBtn"), hardResetBtn: document.getElementById("hardResetBtn"),
  log: document.getElementById("log"), doorWrap: document.getElementById("doorWrap"), image: document.getElementById("sceneImage"), imgFallback: document.getElementById("imgFallback"),
  tags: document.getElementById("ambientTags"), narrative: document.getElementById("narrative"), options: document.getElementById("options"), result: document.getElementById("result"), returnBtn: document.getElementById("returnBtn"),
  endingTitle: document.getElementById("endingTitle"), endingText: document.getElementById("endingText"), restartLoopBtn: document.getElementById("restartLoopBtn"), go13Btn: document.getElementById("go13Btn"),
  jumpscare: document.getElementById("jumpscare"), jumpText: document.getElementById("jumpText")
};

const defaultRunState = () => ({
  fear: 0,
  clues: [],
  visitedFloors: [],
  floorState: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 1, 1])),
  hasEscaped: false,
  floor13Unlocked: false
});

let state = loadState();
let currentFloor = null;
let chosenOption = false;

renderHub();

function loadState() {
  const raw = localStorage.getItem("floor13_state");
  if (!raw) return defaultRunState();
  try {
    const parsed = JSON.parse(raw);
    const fresh = defaultRunState();
    return {
      ...fresh,
      ...parsed,
      floorState: { ...fresh.floorState, ...(parsed.floorState || {}) }
    };
  } catch {
    return defaultRunState();
  }
}

function saveState() { localStorage.setItem("floor13_state", JSON.stringify(state)); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function clueSet() { return new Set(state.clues); }

function renderHub() {
  unlockCheck();
  updateTopBar();
  el.floorGrid.innerHTML = "";
  for (let i = 1; i <= 13; i++) {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = i === 13 ? "13" : String(i);
    if (i === 13 && !state.floor13Unlocked) {
      btn.disabled = true;
      btn.textContent = "13 🔒";
    }
    btn.addEventListener("click", () => chooseFloor(i));
    el.floorGrid.appendChild(btn);
  }
  el.leaveBtn.classList.toggle("hidden", clueSet().size < GAME_DATA.settings.cluesToLeave);
  showScreen("hub");
}

function updateTopBar() {
  el.fearValue.textContent = state.fear;
  el.fearMeter.style.width = `${state.fear}%`;
  el.clueValue.textContent = `${clueSet().size}/${GAME_DATA.settings.cluesToLeave}`;
  el.lockStatus.textContent = state.floor13Unlocked ? "UNLOCKED" : "LOCKED";
}

function showScreen(name) {
  el.hub.classList.add("hidden"); el.scene.classList.add("hidden"); el.ending.classList.add("hidden");
  if (name === "hub") el.hub.classList.remove("hidden");
  if (name === "scene") el.scene.classList.remove("hidden");
  if (name === "ending") el.ending.classList.remove("hidden");
}

async function chooseFloor(floorNum) {
  if (floorNum === 13 && !state.floor13Unlocked) return;
  currentFloor = floorNum;
  if (state.fear >= GAME_DATA.settings.jumpFearThreshold) {
    await triggerJumpscare();
  }
  loadFloorScene(floorNum);
}

function loadFloorScene(floorNum) {
  chosenOption = false;
  el.result.textContent = "";
  el.returnBtn.classList.add("hidden");
  el.returnBtn.disabled = true;
  showScreen("scene");

  if (!state.visitedFloors.includes(floorNum)) state.visitedFloors.push(floorNum);

  const v = floorNum === 13 ? 1 : state.floorState[floorNum] || 1;
  const floor = GAME_DATA.floors[floorNum];
  const scene = floor.variations[v];

  el.doorWrap.classList.remove("open");
  setTimeout(() => el.doorWrap.classList.add("open"), 100);

  const imagePath = `assets/${scene.image}`;
  el.image.classList.remove("hidden");
  el.imgFallback.classList.add("hidden");
  el.image.onerror = () => {
    el.image.classList.add("hidden");
    el.imgFallback.classList.remove("hidden");
  };
  el.image.onload = () => {
    el.image.classList.remove("hidden");
    el.imgFallback.classList.add("hidden");
  };
  el.image.src = imagePath;

  el.tags.textContent = `Floor ${floorNum}: ${floor.name} // ${scene.ambient.join(" • ")}`;
  el.narrative.innerHTML = scene.narrative.map((p) => `<p>${p}</p>`).join("");
  el.narrative.classList.toggle("glitch", floorNum !== 13 && v === 3);

  el.options.innerHTML = "";
  scene.options.forEach((opt) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.textContent = opt.buttonText;
    b.addEventListener("click", () => handleOption(opt));
    el.options.appendChild(b);
  });
  saveState();
  updateTopBar();
  logMsg(`Arrived at Floor ${floorNum} (${floor.name}) [v${v}]`);
}

function handleOption(opt) {
  if (chosenOption) return;
  chosenOption = true;

  state.fear = clamp(state.fear + opt.fearDelta, GAME_DATA.settings.minFear, GAME_DATA.settings.maxFear);
  if (currentFloor >= 1 && currentFloor <= 12) {
    const before = state.floorState[currentFloor] || 1;
    state.floorState[currentFloor] = clamp(before + opt.floorDelta, 1, 3);
  }

  const clues = clueSet();
  if (opt.clueId) clues.add(opt.clueId);
  state.clues = [...clues];

  el.result.textContent = opt.resultText;

  if (state.fear >= GAME_DATA.settings.corruptionFearThreshold) {
    spreadCorruption();
  }

  if (state.fear >= 100) {
    saveState();
    updateTopBar();
    return setTimeout(() => showEnding("overwhelmed"), 500);
  }

  unlockCheck();
  saveState();
  updateTopBar();

  if (currentFloor === 13) {
    return setTimeout(() => showEnding("truth"), 700);
  }

  el.returnBtn.classList.remove("hidden");
  el.returnBtn.disabled = false;
  el.returnBtn.onclick = backToHub;
  setTimeout(backToHub, GAME_DATA.settings.autoReturnMs);
}

function spreadCorruption() {
  const choices = Array.from({ length: 12 }, (_, i) => i + 1).filter((n) => !state.visitedFloors.includes(n));
  if (!choices.length) return;
  const target = choices[Math.floor(Math.random() * choices.length)];
  state.floorState[target] = clamp((state.floorState[target] || 1) + 1, 1, 3);
  logMsg("Somewhere above, something shifts.");
}

function unlockCheck() {
  if (state.floor13Unlocked) return;
  if (clueSet().size >= 3 || state.hasEscaped) {
    state.floor13Unlocked = true;
    logMsg("Floor 13 unlocked.");
  }
}

function backToHub() {
  if (el.hub.classList.contains("hidden")) {
    el.doorWrap.classList.remove("open");
    setTimeout(renderHub, 350);
  }
}

function tryToLeave() {
  if (clueSet().size < GAME_DATA.settings.cluesToLeave) return;
  if (state.fear < 80) {
    state.hasEscaped = true;
    state.floor13Unlocked = true;
    saveState();
    showEnding("escape");
  } else {
    showEnding("overwhelmed");
  }
}

function showEnding(type) {
  const endings = {
    escape: {
      title: "Escape Ending",
      text: "You force the lobby doors and stumble into dawn. Outside, the building is condemned and empty. In your pocket, the elevator key is still warm. You escaped once, and Floor 13 remembers."
    },
    overwhelmed: {
      title: "Overwhelmed Ending",
      text: "The elevator lights cut to red. The Tenant steps into your outline and the doors close on your name. When they open again, the run begins with one more signature in the guest log."
    },
    truth: {
      title: "Truth Ending",
      text: "The Tenant is not a stranger; it is the identity this place grew to survive your fractures. You can restart the loop and carry the truth, or descend again to become it."
    }
  };
  const e = endings[type];
  el.endingTitle.textContent = e.title;
  el.endingText.textContent = e.text;
  el.go13Btn.classList.toggle("hidden", !state.floor13Unlocked);
  showScreen("ending");
  saveState();
}

async function triggerJumpscare() {
  const variant = GAME_DATA.jumpscares[Math.floor(Math.random() * GAME_DATA.jumpscares.length)];
  el.jumpText.textContent = variant.text;
  el.jumpscare.classList.remove("hidden");
  document.body.classList.add("shake");
  beep();
  await delay(700);
  el.jumpscare.classList.add("hidden");
  document.body.classList.remove("shake");
  state.fear = clamp(state.fear - GAME_DATA.settings.jumpFearDrop, 0, 100);
  logMsg("The elevator jerks. Your breathing steadies, slightly.");
  saveState();
  updateTopBar();
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // No audio support.
  }
}

function resetRun(keepUnlock = true) {
  const unlocked = keepUnlock ? state.floor13Unlocked : false;
  state = defaultRunState();
  state.floor13Unlocked = unlocked;
  saveState();
  logMsg(keepUnlock ? "Loop restarted. Floor 13 status preserved." : "Hard reset complete. All records wiped.");
  renderHub();
}

function logMsg(msg) {
  const p = document.createElement("p");
  p.textContent = `• ${msg}`;
  el.log.prepend(p);
  while (el.log.children.length > 8) el.log.removeChild(el.log.lastChild);
}

function delay(ms) { return new Promise((res) => setTimeout(res, ms)); }

el.leaveBtn.addEventListener("click", tryToLeave);
el.resetBtn.addEventListener("click", () => resetRun(true));
el.hardResetBtn.addEventListener("click", () => resetRun(false));
el.restartLoopBtn.addEventListener("click", () => resetRun(true));
el.go13Btn.addEventListener("click", () => chooseFloor(13));

logMsg("Elevator online. Choose any floor 1-12.");
