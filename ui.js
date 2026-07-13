'use strict';

// The Island of Flames
// Version 3.6.2 — UI System
// Background rendering is controlled only by backgrounds.js
// Contains portrait rendering, dialogue display, typewriter text,
// HUD updates, relationship dashboards, choices, and UI summaries.

const portraitCache={};

function preloadPortraits(){
Object.entries(characters).forEach(([key,character])=>{
if(!character.image)return;
const img=new Image();
img.src=character.image;
portraitCache[key]=img;
});
}

function updateConsequenceSummary(){
if(!q('consequenceSummary'))return;

q('consequenceSummary').textContent=
getConsequenceTitle()+
' • Choices: '+choiceHistory.length+
' • Pending: '+pendingConsequences.length+
' • Resolved: '+resolvedConsequences.length;
}

function formatChoiceEffects(effects){
const parts=[];

if(effects.reputation)parts.push('Reputation '+(effects.reputation>0?'+':'')+effects.reputation);
if(effects.connection){
Object.entries(effects.connection).forEach(([person,amount])=>{
parts.push(characters[person]?.name?.split(' ')[0]+' Connection '+(amount>0?'+':'')+amount);
});
}
if(effects.jealousy){
Object.entries(effects.jealousy).forEach(([person,amount])=>{
parts.push(characters[person]?.name?.split(' ')[0]+' Jealousy '+(amount>0?'+':'')+amount);
});
}

return parts.length?parts.join(' • '):'Story flag updated';
}

function openChoiceConsequencesDashboard(){
initializeChoiceConsequences();

['islandMap','walkingScreen','dialogueCard','portraitBox','choices'].forEach(id=>q(id).classList.add('hidden'));

const activeFlags=Object.entries(storyFlags).filter(([,value])=>value);
const recentChoices=choiceHistory.slice(-12).reverse();
const recentConsequences=resolvedConsequences.slice(-8).reverse();

let html='<div class="card consequenceCard"><h2>🧭 Choice Consequences</h2>'+
'<p><strong>'+getConsequenceTitle()+'</strong></p>'+
'<p>Important choices can unlock scenes, change dialogue, raise jealousy, or return later as delayed consequences.</p>';

html+='<h3>🚩 Active Story Flags</h3>';

if(activeFlags.length===0){
html+='<p>No major flags unlocked yet.</p>';
}else{
activeFlags.forEach(([flag])=>{
html+='<span class="flagTag">'+formatFlagName(flag)+'</span>';
});
}

html+='<h3>📜 Recent Choices</h3>';

if(recentChoices.length===0){
html+='<p>No important choices recorded yet.</p>';
}else{
recentChoices.forEach(choice=>{
html+='<div class="consequenceLog"><strong>Day '+choice.day+' — '+choice.label+'</strong><br>'+
(choice.details||choice.reason||'Choice remembered')+
(choice.effects?'<br><em>'+formatChoiceEffects(choice.effects)+'</em>':'')+
'</div>';
});
}

html+='<h3>⏳ Pending Consequences: '+pendingConsequences.length+'</h3>';

if(pendingConsequences.length===0){
html+='<p>No unresolved consequences.</p>';
}else{
pendingConsequences.forEach(item=>{
html+='<div class="consequenceLog"><strong>'+item.title+'</strong><br>This may return later.</div>';
});
}

html+='<h3>✅ Resolved Consequences</h3>';

if(recentConsequences.length===0){
html+='<p>No delayed consequences have happened yet.</p>';
}else{
recentConsequences.forEach(item=>{
html+='<div class="consequenceLog"><strong>'+item.title+'</strong><br>'+item.text+'</div>';
});
}

html+='<button class="consequenceButton" onclick="triggerNextConsequence()">⚡ Check for Consequences</button>'+
'<button onclick="returnToMainStory()">⬅ Return to Main Story</button></div>';

q('choices').innerHTML=html;
q('choices').classList.remove('hidden');
}

function formatFlagName(flag){
return flag
.replace(/([A-Z])/g,' $1')
.replace(/^./,letter=>letter.toUpperCase());
}

function updateReputationSummary(){
if(!q('reputationSummary'))return;
q('reputationSummary').textContent=
'🔥 Reputation: '+getReputationTitle()+' ('+playerReputation+')';
}

function getStatPercent(value,max=20){
return clampStat((Number(value)||0)/max*100);
}

function relationshipBar(label,value,max=20){
return '<p><strong>'+label+': '+value+'</strong></p>'+
'<div class="statBar"><div class="statFill" style="width:'+getStatPercent(value,max)+'%"></div></div>';
}

function openRelationshipDashboard(){
initializeRelationshipSystem();

['islandMap','walkingScreen','dialogueCard','portraitBox','choices'].forEach(id=>q(id).classList.add('hidden'));

let html='<div class="card relationshipCard"><h2>❤️ Relationship Dashboard</h2>'+
'<div class="reputationBox">🔥 Reputation: '+getReputationTitle()+' ('+playerReputation+')</div>';

relationshipPeople.forEach(person=>{
const eliminated=[eliminatedPerson,secondEliminatedPerson].includes(person);
const level=getRelationshipLevel(person);
const mood=updateCharacterMood(person);

html+='<div class="card">'+
'<h3>'+characters[person].emoji+' '+characters[person].name+(eliminated?' — Eliminated':'')+'</h3>'+
'<span class="relationshipLevel">'+level+'</span>'+
'<span class="moodBadge">Mood: '+mood+'</span>'+
relationshipBar('Connection',getConnectionScore(person),20)+
relationshipBar('Romance',getRomanceScore(person),12)+
relationshipBar('Friendship',getFriendshipScore(person),12)+
relationshipBar('Trust',getTrustScore(person),15)+
relationshipBar('Attraction',attractionStats[person],100)+
relationshipBar('Jealousy',jealousyStats[person],100)+
'<button class="relationshipButton" onclick="showRelationshipMemory(\''+person+'\')">🧠 View Memories</button>'+
'</div>';
});

html+='<button onclick="returnToMainStory()">⬅ Return to Main Story</button></div>';

q('choices').innerHTML=html;
q('choices').classList.remove('hidden');
}

function showRelationshipMemory(person){
initializeRelationshipSystem();

const memories=relationshipHistory
.filter(item=>item.person===person)
.slice(-8);

let text='🧠 '+characters[person].name.toUpperCase()+' MEMORIES\n\n';
text+='Relationship Level: '+getRelationshipLevel(person)+'\n';
text+='Current Mood: '+updateCharacterMood(person)+'\n\n';

if(memories.length===0){
text+='No special relationship memories yet.';
}else{
memories.forEach(memory=>{
const sign=memory.amount>=0?'+':'';
text+='Day '+memory.day+' '+memory.time+': '+memory.stat+' '+sign+memory.amount;
if(memory.reason)text+=' — '+memory.reason;
text+='\n\n';
});
}

showScene({
speaker:person,
background:'villa',
text:text
});

choices(
'<button class="relationshipButton" onclick="openRelationshipDashboard()">📊 Back to Dashboard</button>'+
'<button onclick="returnToMainStory()">⬅ Return to Main Story</button>'
);
}

function updateVillaLifeStatus(){
if(!q('villaLifeStatus'))return;
q('villaLifeStatus').textContent=
'Villa visits: '+villaLifeVisits+
' • Gossip found: '+villaLifeGossip.length+
' • Remembered interactions: '+getVillaLifeMemoryTotal();
}

function q(id){return document.getElementById(id)}

function choices(html){q('choices').innerHTML=html;q('choices').classList.remove('hidden')}

function backMap(){return '<button onclick="openIslandMap()">⬅ Back to Map</button>'}

function showScene(s){
const c=characters[s.speaker];
changeBackground(s.background);
q('dialogueCard').classList.remove('hidden');
q('portraitBox').classList.remove('hidden');
q('portraitBox').style.animation='none';
q('portraitBox').offsetHeight;
q('portraitBox').style.animation='characterEnter .6s ease';
q('speakerName').textContent=c.name;
q('speakerTitle').textContent=c.title;
const portraitImg=q('portraitImage');
portraitImg.classList.remove('loaded');

if(c.image){
q('portrait').style.display='flex';
q('portrait').textContent=c.emoji;
portraitImg.style.display='none';

const cached=portraitCache[s.speaker];

const revealPortrait=()=>{
portraitImg.src=c.image;
portraitImg.style.display='block';
q('portrait').style.display='none';
requestAnimationFrame(()=>portraitImg.classList.add('loaded'));
};

if(cached&&cached.complete){
revealPortrait();
}else{
const loader=cached||new Image();
loader.onload=revealPortrait;
loader.onerror=()=>{
portraitImg.style.display='none';
q('portrait').style.display='flex';
q('portrait').textContent=c.emoji;
};
loader.src=c.image;
portraitCache[s.speaker]=loader;
}
}else{
portraitImg.style.display='none';
q('portrait').style.display='flex';
q('portrait').textContent=c.emoji;
}
typeText(s.text);
}

// Animated background rendering is loaded from backgrounds.js

function typeText(t){
if(typingTimer)clearTimeout(typingTimer);
q('story').innerHTML='';
let i=0;
(function go(){if(i<t.length){q('story').innerHTML+=t[i]==='\n'?'<br>':t[i];i++;typingTimer=setTimeout(go,20)}})();
}

function updateTimeDisplay(){
q('dayNumber').textContent=currentDay;
q('timePeriod').textContent=currentTime;
q('timeIcon').textContent=getTimeIcon();
q('actionStatus').textContent=actionUsed?'✅ Activity complete':'⭐ One activity available';
}

function getTimeIcon(){return currentTime==='Morning'?'☀️':currentTime==='Afternoon'?'🌤️':'🌙'}

function getAdvanceButtonText(){
if(currentDay===3&&currentTime==='Morning')return '🔥 Begin First Coupling Ceremony';
if(currentDay===4&&currentTime==='Morning')return '🏆 Begin First Challenge';
if(currentDay===5&&currentTime==='Morning')return '🌤️ Continue to Day 5 Afternoon';
if(currentDay===5&&currentTime==='Afternoon')return '💖 Begin Valentina’s First Date';
return currentTime==='Morning'?'⏰ Continue to Afternoon':currentTime==='Afternoon'?'⏰ Continue to Evening':'🔥 Go to the Fire Pit';
}

function updateRelationships(){
initializeRelationshipSystem();
updateAllCharacterMoods();
updateReputationSummary();

q('relationshipBox').innerHTML=
'<strong>🔥 Reputation: '+getReputationTitle()+' ('+playerReputation+')</strong><br><br>'+
(coupledWith
?'<strong>🔥 Official Couple: '+playerName+' + '+characters[coupledWith].name+'</strong>'+
'<br>&nbsp;&nbsp;💕 Couple Romance: '+couplingRomance+
'<br>&nbsp;&nbsp;💚 Couple Trust: '+couplingTrust+
(challengeComplete?'<br>&nbsp;&nbsp;🏆 Challenge Score: '+challengeScore+' / 9':'')+
'<br><br>'
:'<strong>🔥 Official Couple: Single</strong><br><br>')+
((eliminatedPerson==='lucas'||secondEliminatedPerson==='lucas')?'❌ Lucas — ELIMINATED':'❤️ Lucas Connection: '+relationships.lucas)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+lucasStats.friendship+
'<br>&nbsp;&nbsp;❤️ Romance: '+lucasStats.romance+
'<br>&nbsp;&nbsp;💚 Trust: '+lucasStats.trust+

'<br><br>'+((eliminatedPerson==='maya'||secondEliminatedPerson==='maya')?'❌ Maya — ELIMINATED':'❤️ Maya Connection: '+relationships.maya)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+mayaStats.friendship+
'<br>&nbsp;&nbsp;💚 Trust: '+mayaStats.trust+
'<br>&nbsp;&nbsp;🔥 Mystery: '+mayaStats.mystery+

'<br><br>'+((eliminatedPerson==='kai'||secondEliminatedPerson==='kai')?'❌ Kai — ELIMINATED':'❤️ Kai Connection: '+relationships.kai)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+kaiStats.friendship+
'<br>&nbsp;&nbsp;❤️ Romance: '+kaiStats.romance+
'<br>&nbsp;&nbsp;🏆 Competition: '+kaiStats.competition+

'<br><br>'+((eliminatedPerson==='isabella'||secondEliminatedPerson==='isabella')?'❌ Isabella — ELIMINATED':'❤️ Isabella Connection: '+relationships.isabella)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+isabellaStats.friendship+
'<br>&nbsp;&nbsp;💕 Romance: '+isabellaStats.romance+
'<br>&nbsp;&nbsp;🎭 Social: '+isabellaStats.social+

'<br><br>'+((eliminatedPerson==='ethan'||secondEliminatedPerson==='ethan')?'❌ Ethan — ELIMINATED':'❤️ Ethan Connection: '+relationships.ethan)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+ethanStats.friendship+
'<br>&nbsp;&nbsp;❤️ Romance: '+ethanStats.romance+
'<br>&nbsp;&nbsp;🧠 Strategy: '+ethanStats.strategy+

'<br><br>'+((eliminatedPerson==='sofia'||secondEliminatedPerson==='sofia')?'❌ Sofia — ELIMINATED':'❤️ Sofia Connection: '+relationships.sofia)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+sofiaStats.friendship+
'<br>&nbsp;&nbsp;💕 Romance: '+sofiaStats.romance+
'<br>&nbsp;&nbsp;💬 Openness: '+sofiaStats.openness+

'<br><br>'+((eliminatedPerson==='noah'||secondEliminatedPerson==='noah')?'❌ Noah — ELIMINATED':'❤️ Noah Connection: '+relationships.noah)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+noahStats.friendship+
'<br>&nbsp;&nbsp;❤️ Romance: '+noahStats.romance+
'<br>&nbsp;&nbsp;💪 Courage: '+noahStats.courage+

'<br><br>'+((eliminatedPerson==='lisa'||secondEliminatedPerson==='lisa')?'❌ Lisa — ELIMINATED':'❤️ Lisa Connection: '+relationships.lisa)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+lisaStats.friendship+
'<br>&nbsp;&nbsp;💕 Romance: '+lisaStats.romance+
'<br>&nbsp;&nbsp;🎭 Honesty: '+lisaStats.honesty+

'<br><br>'+((secondEliminatedPerson==='valentina')?'❌ Valentina — ELIMINATED':'❤️ Valentina Connection: '+relationships.valentina)+
'<br>&nbsp;&nbsp;🤝 Friendship: '+valentinaStats.friendship+
'<br>&nbsp;&nbsp;💕 Romance: '+valentinaStats.romance+
'<br>&nbsp;&nbsp;🔥 Boldness: '+valentinaStats.boldness;
}
