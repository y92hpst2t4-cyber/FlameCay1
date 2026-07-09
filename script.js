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

let typingSpeed = 35;

function typeText(text) {
  const story = document.getElementById("story");
  story.innerHTML = "";

  let i = 0;

  function type() {
    if (i < text.length) {
      const char = text.charAt(i);

      if (char === "\n") {
        story.innerHTML += "<br>";
      } else {
        story.innerHTML += char;
      }

      i++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
}

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

  typeText(introDialogue[dialogueIndex]);

  document.getElementById("continueButton").style.display = "inline-block";
  document.getElementById("choices").classList.add("hidden");

  updateRelationships();
}

function nextDialogue() {
  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {
    typeText(introDialogue[dialogueIndex]);
  } else {
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("choices").classList.remove("hidden");
  }
}

function goToVillage() {
  relationships.lucas++;

  typeText(
    "🏠 Lucas welcomes you into the village.\n\n\"I'm Lucas. We've been expecting someone like you.\""
  );

  updateRelationships();
}

function exploreJungle() {
  relationships.maya++;

  typeText(
    "🌴 Deep in the jungle you meet Maya studying ancient ruins.\n\n\"These symbols have been here for centuries,\" she says."
  );

  updateRelationships();
}

function crystalRoute() {
  typeText(
    "🔥 You approach the Crystal Flame.\n\nThe fire glows brighter as if it recognizes you..."
  );
}

function updateRelationships() {
  document.getElementById("relationshipBox").innerHTML =
    "❤️ Lucas: " + relationships.lucas +
    "<br>❤️ Maya: " + relationships.maya;
}