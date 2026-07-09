let playerName = "Player";
let dialogueIndex = 0;

let relationships = {
  lucas: 0,
  maya: 0
};

function startGame(){
  const input = document.getElementById("playerName");

  if(input.value.trim() !== ""){
    playerName = input.value.trim();
  }

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("welcome").innerHTML =
    "Welcome to Flame Cay, " + playerName + "!";

  dialogueIndex = 0;
  showScene(introDialogue[dialogueIndex]);

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("choices").classList.add("hidden");

  updateRelationships();
}

function showScene(scene){
  const character = characters[scene.speaker];

  changeBackground(scene.background);

  document.getElementById("portraitBox").classList.remove("hidden");
  document.getElementById("portrait").innerHTML = character.portrait;
  document.getElementById("speakerName").innerHTML = character.name;
  document.getElementById("speakerTitle").innerHTML = character.title;

  typeText(scene.text);
}

function nextDialogue(){
  dialogueIndex++;

  if(dialogueIndex < introDialogue.length){
    showScene(introDialogue[dialogueIndex]);
  }else{
    document.getElementById("continueButton").style.display = "none";
    document.getElementById("choices").classList.remove("hidden");
  }
}

function changeBackground(sceneName){
  const body = document.getElementById("bodyBackground");

  if(backgrounds[sceneName]){
    body.style.background = backgrounds[sceneName].colors;
  }

  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

function typeText(text){
  const story = document.getElementById("story");
  story.innerHTML = "";

  let i = 0;

  function type(){
    if(i < text.length){
      const char = text.charAt(i);

      if(char === "\n"){
        story.innerHTML += "<br>";
      }else{
        story.innerHTML += char;
      }

      i++;
      setTimeout(type, ui.typingSpeed);
    }
  }

  type();
}

function goToVilla(){
  relationships.lucas++;

  showScene({
    speaker: "lucas",
    background: "villa",
    text: "Lucas walks beside you into the villa.\n\n\"This place is unreal,\" he says.\n\nYou notice him watching out for you."
  });

  updateRelationships();
}

function meetMaya(){
  relationships.maya++;

  showScene({
    speaker: "maya",
    background: "villa",
    text: "Maya stands near the edge of the garden, studying strange markings on a stone wall.\n\n\"These symbols are older than the villa,\" she says.\n\nShe seems glad you noticed."
  });

  updateRelationships();
}

function crystalRoute(){
  showScene({
    speaker: "narrator",
    background: "crystal",
    text: "You look toward the jungle.\n\nFor a second, the Crystal Flame glows brighter.\n\nA whisper crosses the wind:\n\n\"Keeper...\""
  });
}

function updateRelationships(){
  document.getElementById("relationshipBox").innerHTML =
    "❤️ Lucas: " + relationships.lucas +
    "<br>❤️ Maya: " + relationships.maya;
}

window.addEventListener("DOMContentLoaded", function(){
  document.getElementById("continueButton").addEventListener("click", nextDialogue);
  document.getElementById("villaButton").addEventListener("click", goToVilla);
  document.getElementById("mayaButton").addEventListener("click", meetMaya);
  document.getElementById("crystalButton").addEventListener("click", crystalRoute);
});