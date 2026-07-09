let playerName = "Player";

let relationships = {
  lucas: 0,
  maya: 0
};

let dialogueIndex = 0;
let typingSpeed = 35;

const introDialogue = [
  {
    speaker: "Narrator",
    portrait: "🔥",
    text: "🔥 THE ISLAND OF FLAMES\n\nSeason 1: The Crystal Awakens\nEpisode 1: The Arrival"
  },
  {
    speaker: "Narrator",
    portrait: "🌅",
    text: "🌅 The sun rises over the ocean.\n\nA camera flies over bright blue water toward Flame Cay."
  },
  {
    speaker: "Narrator",
    portrait: "🚤",
    text: "🚤 Your boat cuts through the morning fog.\n\nToday, your life changes forever."
  },
  {
    speaker: "Narrator",
    portrait: "🏝️",
    text: "🏝️ Ahead, the island appears.\n\nWhite sand. Palm trees. A shining villa. And something glowing deep in the jungle."
  },
  {
    speaker: "Host",
    portrait: "🎭",
    text: "🎭 A tall Host in a white suit and gold mask steps forward.\n\n\"Welcome... to The Island of Flames.\""
  },
  {
    speaker: "Host",
    portrait: "🎭",
    text: "\"Twenty singles. One island. One million dollars. And maybe... true love.\""
  },
  {
    speaker: "Lucas",
    portrait: "👦",
    text: "👦 Lucas smiles as you step onto the beach.\n\n\"Hey. You must be new. I'm Lucas.\""
  },
  {
    speaker: "Maya",
    portrait: "👩",
    text: "👩 Maya looks past the villa toward the jungle.\n\n\"Something about this island feels ancient.\""
  },
  {
    speaker: "Narrator",
    portrait: "🔥",
    text: "🔥 Far away, the Crystal Flame glows for one second.\n\nNo one notices.\n\nExcept you."
  },
  {
    speaker: "Narrator",
    portrait: "🌴",
    text: "🌴 Your first day on Flame Cay begins now.\n\nWhere do you want to go first?"
  }
];

function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 650;
    gain.gain.value = 0.15;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.08);
    oscillator.stop(audioContext.currentTime + 0.08);
  } catch (error) {
    console.log("Sound blocked by browser.");
  }
}

document.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    playClickSound();
  }
});

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

function showSpeaker(speaker, portrait) {
  document.getElementById("portraitBox").classList.remove("hidden");
  document.getElementById("portrait").innerHTML = portrait;
  document.getElementById("speakerName").innerHTML = speaker;
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
  showSpeaker(introDialogue[dialogueIndex].speaker, introDialogue[dialogueIndex].portrait);
  typeText(introDialogue[dialogueIndex].text);

  document.getElementById("continueButton").style.display = "inline-block";
  document.getElementById("choices").classList.add("hidden");

  updateRelationships();
}

function nextDialogue() {
  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {
    showSpeaker(introDialogue[dialogueIndex].speaker, introDialogue[dialogueIndex].portrait);
    typeText(introDialogue[dialogueIndex].text);
  } else {
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("choices").classList.remove("hidden");
  }
}

function goToVillage() {
  relationships.lucas++;

  showSpeaker("Lucas", "👦");

  typeText(
    "🏠 Lucas walks with you toward the villa.\n\n\"The others are inside. Try not to look nervous,\" he jokes.\n\nLucas seems to trust you a little more."
  );

  updateRelationships();
}

function exploreJungle() {
  relationships.maya++;

  showSpeaker("Maya", "👩");

  typeText(
    "🌴 Maya leads you near the edge of the jungle.\n\n\"See those carvings? They were here before the villa was built. I want to know why.\"\n\nMaya seems interested in you."
  );

  updateRelationships();
}

function crystalRoute() {
  showSpeaker("Narrator", "🔥");

  typeText(
    "🔥 You approach the Crystal Flame from a distance.\n\nThe fire glows brighter, almost like it recognizes you.\n\nFor a second, you hear a whisper:\n\n\"Keeper...\""
  );
}

function updateRelationships() {
  document.getElementById("relationshipBox").innerHTML =
    "❤️ Lucas: " + relationships.lucas +
    "<br>❤️ Maya: " + relationships.maya;
}