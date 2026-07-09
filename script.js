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
  "👤 HOST: Welcome to Flame Cay. Every choice you make here will be remembered."
];

function startGame() {
  const input = document.getElementById("playerName");
  const choices = document.getElementById("choices");
  const continueButton = document.getElementById("continueButton");

  if (input && input.value.trim() !== "") {
    playerName = input.value.trim();
  }

  localStorage.setItem("playerName", playerName);

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.getElementById("welcome").textContent =
    "Welcome to Flame Cay, " + playerName + "!";

  dialogueIndex = 0;
  document.getElementById("story").textContent = introDialogue[0];

  continueButton.style.display = "block";
  choices.style.display = "none";
}

function nextDialogue() {
  const choices = document.getElementById("choices");
  const continueButton = document.getElementById("continueButton");

  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {
    document.getElementById("story").textContent = introDialogue[dialogueIndex];
  } else {
    document.getElementById("story").textContent =
      "🏖️ You step onto Arrival Beach. Where do you want to go first?";

    continueButton.style.display = "none";
    choices.style.display = "block";
  }
}

function goToVilla() {
  relationships.lucas++;
  updateRelationships();

  document.getElementById("story").textContent =
    "🏠 Lucas welcomes you into the villa. The other contestants are watching you carefully.";
}

function exploreJungle() {
  relationships.maya++;
  updateRelationships();

  document.getElementById("story").textContent =
    "🌴 You discover strange symbols carved into the trees. Someone has been here before.";
}

function crystalFlame() {
  document.getElementById("story").textContent =
    "🔥 The Crystal Flame glows brighter as you step closer. You feel like it is reacting to you.";
}

function updateRelationships() {
  localStorage.setItem("relationships", JSON.stringify(relationships));

  document.getElementById("relationshipBox").innerHTML =
    "❤️ Lucas: " + relationships.lucas + "<br>" +
    "❤️ Maya: " + relationships.maya;
}