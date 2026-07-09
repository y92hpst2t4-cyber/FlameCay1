let playerName = "Player";

let relationships = {
  lucas: 0,
  maya: 0
};

let dialogueIndex = 0;
let typingSpeed = 30;

const introDialogue = [
{
speaker:"Narrator",
portrait:"🔥",
background:"arrival",
text:"🔥 THE ISLAND OF FLAMES\n\nSeason 1\nEpisode 1 — The Arrival"
},

{
speaker:"Narrator",
portrait:"🌅",
background:"arrival",
text:"The sun slowly rises over the ocean.\n\nA camera flies across the water toward Flame Cay."
},

{
speaker:"Narrator",
portrait:"🚤",
background:"arrival",
text:"Your boat cuts through the morning waves.\n\nToday your life changes forever."
},

{
speaker:"Host",
portrait:"🎭",
background:"arrival",
text:"Welcome... to The Island of Flames.\n\nTwenty singles.\nOne million dollars.\nOne unforgettable summer."
},

{
speaker:"Host",
portrait:"🎭",
background:"villa",
text:"But remember...\n\nEvery choice has consequences."
},

{
speaker:"Lucas",
portrait:"👦",
background:"villa",
text:"Hey!\n\nI'm Lucas.\nWelcome to Flame Cay."
},

{
speaker:"Maya",
portrait:"👩",
background:"villa",
text:"I'm Maya.\n\nThere's something strange about this island..."
},

{
speaker:"Narrator",
portrait:"🔥",
background:"crystal",
text:"Deep inside the jungle...\n\nThe Crystal Flame begins to glow."
},

{
speaker:"Narrator",
portrait:"🌴",
background:"villa",
text:"Your first day has officially begun.\n\nWhere would you like to go?"
}
];

function playClickSound(){

try{

const ctx=new(window.AudioContext||window.webkitAudioContext)();

const osc=ctx.createOscillator();

const gain=ctx.createGain();

osc.type="triangle";

osc.frequency.value=650;

gain.gain.value=.15;

osc.connect(gain);

gain.connect(ctx.destination);

osc.start();

gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.08);

osc.stop(ctx.currentTime+.08);

}catch(e){}

}

document.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

playClickSound();

}

});

function changeBackground(scene){

const body=document.getElementById("bodyBackground");

switch(scene){

case "arrival":
body.style.backgroundImage="none";
break;

case "villa":
body.style.backgroundImage="none";
break;

case "crystal":
body.style.backgroundImage="none";
break;

}

}

function showSpeaker(name,portrait){

document.getElementById("portraitBox").classList.remove("hidden");

document.getElementById("speakerName").innerHTML=name;

document.getElementById("portrait").innerHTML=portrait;

}

function typeText(text){

const story=document.getElementById("story");

story.innerHTML="";

let i=0;

function type(){

if(i<text.length){

const c=text.charAt(i);

if(c=="\n"){

story.innerHTML+="<br>";

}else{

story.innerHTML+=c;

}

i++;

setTimeout(type,typingSpeed);

}

}

type();

}

function startGame(){

const input=document.getElementById("playerName");

if(input.value.trim()!==""){

playerName=input.value.trim();

}

document.getElementById("menu").style.display="none";

document.getElementById("game").classList.remove("hidden");

document.getElementById("welcome").innerHTML="Welcome to Flame Cay, "+playerName+"!";

dialogueIndex=0;

changeBackground(introDialogue[0].background);

showSpeaker(introDialogue[0].speaker,introDialogue[0].portrait);

typeText(introDialogue[0].text);

document.getElementById("continueButton").style.display="inline-block";

document.getElementById("choices").classList.add("hidden");

updateRelationships();

}

function nextDialogue(){

dialogueIndex++;

if(dialogueIndex<introDialogue.length){

changeBackground(introDialogue[dialogueIndex].background);

showSpeaker(introDialogue[dialogueIndex].speaker,introDialogue[dialogueIndex].portrait);

typeText(introDialogue[dialogueIndex].text);

}else{

document.getElementById("continueButton").style.display="none";

document.getElementById("choices").classList.remove("hidden");

}

}function goToVilla(){
  relationships.lucas++;

  changeBackground("villa");
  showSpeaker("Lucas","👦");

  typeText(
    "Lucas walks beside you into the villa.\n\n\"This place is unreal,\" he says.\n\nYou notice him watching out for you."
  );

  updateRelationships();
}

function meetMaya(){
  relationships.maya++;

  changeBackground("villa");
  showSpeaker("Maya","👩");

  typeText(
    "Maya stands near the edge of the garden, studying strange markings on a stone wall.\n\n\"These symbols are older than the villa,\" she says.\n\nShe seems glad you noticed."
  );

  updateRelationships();
}

function crystalRoute(){
  changeBackground("crystal");
  showSpeaker("Narrator","🔥");

  typeText(
    "You look toward the jungle.\n\nFor a second, the Crystal Flame glows brighter.\n\nA whisper crosses the wind:\n\n\"Keeper...\""
  );
}

function updateRelationships(){
  document.getElementById("relationshipBox").innerHTML=
  "❤️ Lucas: "+relationships.lucas+
  "<br>❤️ Maya: "+relationships.maya;
}