// ======================================
// THE ISLAND OF FLAMES
// Version 0.2
// ======================================

let playerName = "Player";

let relationships = {
  lucas: 0,
  maya: 0
};

function startGame() {
  const input = document.getElementById("playerName");

  if (input && input.value.trim() !== "") {
    playerName = input.value.trim();
  }

  localStorage.setItem("playerName", playerName);

  const menu = document.getElementById("menu");
  const game = document.getElementById("game");

  if (menu) menu.style.display = "none";
  if (game) game.style.display = "block";

  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.innerHTML = "Welcome to Flame Cay, " + playerName + "!";
  }
}

function goToVilla() {
  relationships.lucas++;

  updateRelationships();

  document.getElementById("story").innerHTML =
    "🏠 Lucas welcomes you into the villa. The other contestants are watching you carefully.";
}

function exploreJungle() {
  relationships.maya++;

  updateRelationships();

  document.getElementById("story").innerHTML =
    "🌴 You discover strange symbols carved into the trees. Someone has been here before.";
}

function crystalFlame() {
  document.getElementById("story").innerHTML =
    "🔥 The Crystal Flame glows brighter as you step closer. You feel like it's reacting to you.";
}

function updateRelationships() {
  localStorage.setItem(
    "relationships",
    JSON.stringify(relationships)
  );
}