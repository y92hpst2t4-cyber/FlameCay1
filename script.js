let playerName = "Player";

let relationships = {
  lucas: 0,
  maya: 0
};

let dialogueIndex = 0;

const introDialogue = [
  "🌅 The sun rises over the ocean.",
  "🚤 Your boat cuts through the morning fog.",
  "🏝️ Ahead, Flame Cay appears for the first time.",
  "🔥 A glowing Crystal Flame burns at the center of the island.",
  "🏖️ You step onto Arrival Beach. Someone is waiting for you..."
];

function startGame() {
  const input = document.getElementById("playerName");

  if (input.value.trim() !== "") {
    playerName = input.value.trim();
  }

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("welcome").innerHTML =
    "Welcome to Flame Cay, " + playerName + "!";

  dialogueIndex = 0;

  document.getElementById("story").innerHTML =
    introDialogue[dialogueIndex];

  document.getElementById("continueButton").style.display = "inline-block";

  document.getElementById("choices").classList.add("hidden");

  updateRelationships();
}

function nextDialogue() {
  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {
    document.getElementById("story").innerHTML =
      introDialogue[dialogueIndex];
  } else {
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("choices").classList.remove("hidden");
  }
}

function goToVillage() {
  relationships.lucas++;

  document.getElementById("story").innerHTML =
    "🏠 Lucas welcomes you into the village.<br><br>" +
    "\"I'm Lucas. We've been expecting someone like you.\"";

  updateRelationships();
}

function exploreJungle() {
  relationships.maya++;

  document.getElementById("story").innerHTML =
    "🌴 Deep in the jungle you meet Maya studying ancient ruins.<br><br>" +
    "\"These symbols have been here for centuries,\" she says.";

  updateRelationships();
}

function crystalRoute() {
  document.getElementById("story").innerHTML =
    "🔥 You approach the Crystal Flame.<br><br>" +
    "The fire glows brighter as if it recognizes you...";
}

function updateRelationships() {
  document.getElementById("relationshipBox").innerHTML =
    "❤️ Lucas: " + relationships.lucas +
    "<br>❤️ Maya: " + relationships.maya;
}