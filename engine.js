'use strict';

// The Island of Flames
// Version 3.6.3 — Clean Reset Core Engine
// Contains game state, scene rendering, navigation, relationship systems,
// villa-life systems, consequence systems, and HUD updates.

let playerName='Player',dialogueIndex=0,typingTimer=null,pendingLocation='',currentLocation='villa',currentDay=1,currentTime='Morning',actionUsed=false,eveningEventDone=false,coupledWith='',couplingRomance=0,couplingTrust=0,ceremonyComplete=false,challengeScore=0,challengeQuestion=0,challengeComplete=false,bombshellChoice='',bombshellComplete=false,eliminationComplete=false,eliminatedPerson='',savedPerson='',atRisk=[],currentSaveSlot=0,lastSaveTime='',saveVersion='3.5.0e',dateInvitee='',dateChoice='',dateComplete=false,casaStarted=false,casaChoice='',casaPartnerReaction='',casaComplete=false,recouplingChoice='',recouplingPartnerChoice='',recouplingComplete=false,previousPartner='',falloutStarted=false,falloutChoice='',falloutComplete=false,compatibilityStarted=false,compatibilityScore=0,compatibilityQuestion=0,compatibilityPartner='',compatibilityComplete=false,luxuryDateStarted=false,luxuryDateChoice='',luxuryDateResult='',luxuryDateComplete=false,secretVoteStarted=false,secretVoteChoice='',secretVoteResult='',secretVoteComplete=false,secondEliminationStarted=false,secondEliminationSaved='',secondEliminatedPerson='',secondEliminationComplete=false,finalWeekStarted=false,familyMessageChoice='',finalWeekChoice='',finalWeekComplete=false,finalDateStarted=false,finalDatePartner='',finalDateChoice='',finalDatePromise='',finalDateComplete=false,finaleStarted=false,finalSpeechChoice='',finaleScore=0,finaleEnding='',finaleWinner=false,keeperChosen=false,finaleComplete=false,villaLifeVisits=0,villaLifeEventIndex=0,villaLifeLastLocation='',villaLifeGossip=[],villaLifeMemories={},attractionStats={},jealousyStats={},characterMoods={},playerReputation=0,reputationHistory=[],relationshipHistory=[],storyFlags={},choiceHistory=[],pendingConsequences=[],resolvedConsequences=[];
let menuBackground='villa',menuBack='openIslandMap';

// Character data loaded from characters.js




// Story data loaded from story.js

// Save and load system loaded from save.js

function resumeSavedProgress(){
['choices','islandMap','walkingScreen','dialogueCard','portraitBox'].forEach(id=>q(id).classList.add('hidden'));

if(finaleComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nSeason 1 is complete.'
});
choices('<button onclick="showVersionComplete()">🏆 View Grand Finale Ending</button>');
return;
}

if(finalDateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Final Date is complete.'
});
choices('<button onclick="startGrandFinale()">🏆 Continue to Grand Finale</button>');
return;
}

if(finalWeekComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nFinal Week has begun.'
});
choices('<button onclick="startFinalDates()">🌅 Continue to Final Dates</button>');
return;
}

if(secondEliminationComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Second Elimination is complete.'
});
choices('<button onclick="startFinalWeek()">🌅 Continue to Final Week</button>');
return;
}

if(secretVoteComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Secret Vote is complete.'
});
choices('<button onclick="startSecondElimination()">🔥 Continue to Second Elimination</button>');
return;
}

if(luxuryDateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Luxury Date is complete.'
});
choices('<button onclick="startSecretVote()">🗳️ Continue to Secret Vote</button>');
return;
}

if(compatibilityComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Compatibility Challenge is complete.'
});
choices('<button onclick="startLuxuryDate()">🌅 Continue to Luxury Date</button>');
return;
}

if(falloutComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nFallout Day is complete.'
});
choices('<button onclick="startCompatibilityChallenge()">🏆 Continue to Compatibility Challenge</button>');
return;
}

if(recouplingComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Casa Recoupling Ceremony is complete.'
});
choices('<button onclick="startFalloutDay()">☀️ Continue to Fallout Day</button>');
return;
}

if(casaComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Casa-style loyalty test is complete.'
});
choices('<button onclick="startCasaRecoupling()">🔥 Continue to Casa Recoupling</button>');
return;
}

if(dateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nValentina’s first date is complete.'
});
choices('<button onclick="startCasaDrama()">🏝️ Continue to the Casa Twist</button>');
return;
}

if(currentDay>=5&&eliminationComplete){
showScene({
speaker:'narrator',
background:'arrival',
text:'💾 SAVE LOADED\n\nDay '+currentDay+' — '+currentTime+'\n\nYour progress has been restored.'
});
choices('<button onclick="openIslandMap()">🗺️ Continue Day '+currentDay+'</button>');
return;
}

if(eliminationComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe first elimination is complete.'
});
choices('<button onclick="beginDayFive()">☀️ Continue to Day 5</button>');
return;
}

if(bombshellComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nValentina has arrived on Flame Cay.'
});
choices('<button onclick="startFirstElimination()">🔥 Continue to the Elimination</button>');
return;
}

if(challengeComplete){
showScene({
speaker:'narrator',
background:'afternoon',
text:'💾 SAVE LOADED\n\nThe First Challenge is complete.'
});
choices('<button onclick="startBombshellArrival()">💥 Continue to the Bombshell Arrival</button>');
return;
}

if(ceremonyComplete){
showScene({
speaker:'narrator',
background:'arrival',
text:'💾 SAVE LOADED\n\nYou are officially coupled with '+characters[coupledWith].name+'.'
});
choices('<button onclick="beginDayFour()">☀️ Continue to Day 4</button>');
return;
}

if(currentDay===3){
showScene({
speaker:'narrator',
background:'arrival',
text:'💾 SAVE LOADED\n\nDay 3 Morning has been restored.'
});
choices('<button onclick="openIslandMap()">🗺️ Continue Day 3</button>');
return;
}

showScene({
speaker:'narrator',
background:'arrival',
text:'💾 SAVE LOADED\n\nDay '+currentDay+' — '+currentTime+' has been restored.'
});
choices('<button onclick="openIslandMap()">🗺️ Continue Game</button>');
}




function initializeChoiceConsequences(){
const defaults={
flirtedOutsideCouple:false,
stayedLoyalToPartner:false,
sharedPrize:false,
keptPrize:false,
savedSomeoneTwice:false,
choseCrystalMystery:false,
followedHeart:false,
gaveInToTemptation:false,
returnedSingle:false,
repairedFriendship:false,
choseFutureTogether:false
};

Object.keys(defaults).forEach(key=>{
if(storyFlags[key]===undefined)storyFlags[key]=defaults[key];
});

updateConsequenceSummary();
}

function setStoryFlag(flag,value=true,reason=''){
initializeChoiceConsequences();
storyFlags[flag]=value;

if(reason){
choiceHistory.push({
flag,
value,
reason,
day:currentDay,
time:currentTime,
at:new Date().toISOString()
});
if(choiceHistory.length>80)choiceHistory.shift();
}

updateConsequenceSummary();
}

function hasStoryFlag(flag){
initializeChoiceConsequences();
return Boolean(storyFlags[flag]);
}

function recordChoice(id,label,details='',effects={}){
initializeChoiceConsequences();

choiceHistory.push({
id,
label,
details,
effects,
day:currentDay,
time:currentTime,
at:new Date().toISOString()
});

if(choiceHistory.length>80)choiceHistory.shift();
updateConsequenceSummary();
}

function scheduleConsequence(id,title,text,conditionFlag='',delayVisits=1,effects={}){
initializeChoiceConsequences();

if(pendingConsequences.some(item=>item.id===id)||
resolvedConsequences.some(item=>item.id===id)){
return;
}

pendingConsequences.push({
id,
title,
text,
conditionFlag,
delayVisits,
createdAtVisit:villaLifeVisits,
effects
});

updateConsequenceSummary();
}

function applyConsequenceEffects(effects={}){
if(effects.reputation)changeReputation(effects.reputation,'Delayed consequence');

if(effects.connection){
Object.entries(effects.connection).forEach(([person,amount])=>{
if(relationships[person]!==undefined){
relationships[person]+=amount;
recordRelationshipChange(person,'Connection',amount,'Delayed consequence');
}
});
}

if(effects.attraction){
Object.entries(effects.attraction).forEach(([person,amount])=>{
changeAttraction(person,amount,'Delayed consequence');
});
}

if(effects.jealousy){
Object.entries(effects.jealousy).forEach(([person,amount])=>{
changeJealousy(person,amount,'Delayed consequence');
});
}
}

function getReadyConsequences(){
initializeChoiceConsequences();

return pendingConsequences.filter(item=>{
const enoughVisits=villaLifeVisits-item.createdAtVisit>=item.delayVisits;
const flagReady=!item.conditionFlag||hasStoryFlag(item.conditionFlag);
return enoughVisits&&flagReady;
});
}

function triggerNextConsequence(){
const ready=getReadyConsequences();
if(ready.length===0)return false;

const item=ready[0];
pendingConsequences=pendingConsequences.filter(entry=>entry.id!==item.id);
resolvedConsequences.push({
...item,
resolvedDay:currentDay,
resolvedTime:currentTime,
resolvedAt:new Date().toISOString()
});

applyConsequenceEffects(item.effects);
updateRelationships();
updateConsequenceSummary();
autoSaveGame();

showScene({
speaker:'narrator',
background:currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'villa',
text:'🧭 CONSEQUENCE\n\n'+item.title+'\n\n'+item.text
});

choices(
'<button class="consequenceButton" onclick="openChoiceConsequencesDashboard()">📜 View Choice History</button>'+
'<button onclick="returnToMainStory()">⬅ Continue Story</button>'
);

return true;
}

function getConsequenceTitle(){
const total=choiceHistory.length;
const unresolved=pendingConsequences.length;

if(total>=20)return 'Choices Shape Everything';
if(total>=10)return 'Your Story Is Changing';
if(total>=4)return 'The Villa Remembers';
return 'Your Journey Is Beginning';
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

function getChoiceConsequenceDialogue(person){
initializeChoiceConsequences();

if(person===coupledWith&&hasStoryFlag('flirtedOutsideCouple')){
return '"I remember what happened with someone else," '+characters[person].name.split(' ')[0]+' says. "Trust takes time to rebuild."';
}

if(person===coupledWith&&hasStoryFlag('stayedLoyalToPartner')){
return '"You stayed loyal when it mattered," '+characters[person].name.split(' ')[0]+' says. "I have not forgotten that."';
}

if(person==='valentina'&&hasStoryFlag('gaveInToTemptation')){
return '"You made your choice once," Valentina says. "I wonder if you would make it again."';
}

if(person==='maya'&&hasStoryFlag('choseCrystalMystery')){
return '"The Crystal Flame reacted because you chose to investigate it," Maya whispers.';
}

if(hasStoryFlag('returnedSingle')){
return '"You chose to stand alone before," '+characters[person].name.split(' ')[0]+' says. "That took courage."';
}

return '';
}

const relationshipPeople=['lucas','maya','kai','isabella','ethan','sofia','noah','lisa','valentina'];

function initializeRelationshipSystem(){
relationshipPeople.forEach(person=>{
if(attractionStats[person]===undefined)attractionStats[person]=0;
if(jealousyStats[person]===undefined)jealousyStats[person]=0;
if(!characterMoods[person])characterMoods[person]='Neutral';
});
updateAllCharacterMoods();
updateReputationSummary();
}

function clampStat(value,min=0,max=100){
return Math.max(min,Math.min(max,Number(value)||0));
}

function changeAttraction(person,amount,reason=''){
initializeRelationshipSystem();
attractionStats[person]=clampStat(attractionStats[person]+amount);
recordRelationshipChange(person,'Attraction',amount,reason);
}

function changeJealousy(person,amount,reason=''){
initializeRelationshipSystem();
jealousyStats[person]=clampStat(jealousyStats[person]+amount);
recordRelationshipChange(person,'Jealousy',amount,reason);
}

function changeReputation(amount,reason=''){
playerReputation=clampStat(playerReputation+amount,-100,100);
reputationHistory.push({
amount,
reason,
day:currentDay,
time:currentTime,
at:new Date().toISOString()
});
if(reputationHistory.length>30)reputationHistory.shift();
updateReputationSummary();
}

function recordRelationshipChange(person,stat,amount,reason=''){
relationshipHistory.push({
person,
stat,
amount,
reason,
day:currentDay,
time:currentTime,
at:new Date().toISOString()
});
if(relationshipHistory.length>60)relationshipHistory.shift();
}

function getConnectionScore(person){
return Number(relationships[person]||0);
}

function getRomanceScore(person){
if(person==='lucas')return lucasStats.romance||0;
if(person==='kai')return kaiStats.romance||0;
if(person==='isabella')return isabellaStats.romance||0;
if(person==='ethan')return ethanStats.romance||0;
if(person==='sofia')return sofiaStats.romance||0;
if(person==='noah')return noahStats.romance||0;
if(person==='lisa')return lisaStats.romance||0;
if(person==='valentina')return valentinaStats.romance||0;
return 0;
}

function getFriendshipScore(person){
if(person==='lucas')return lucasStats.friendship||0;
if(person==='maya')return mayaStats.friendship||0;
if(person==='kai')return kaiStats.friendship||0;
if(person==='isabella')return isabellaStats.friendship||0;
if(person==='ethan')return ethanStats.friendship||0;
if(person==='sofia')return sofiaStats.friendship||0;
if(person==='noah')return noahStats.friendship||0;
if(person==='lisa')return lisaStats.friendship||0;
if(person==='valentina')return valentinaStats.friendship||0;
return 0;
}

function getTrustScore(person){
if(person===coupledWith)return couplingTrust;
if(person==='lucas')return lucasStats.trust||0;
if(person==='maya')return mayaStats.trust||0;
return Math.max(0,Math.floor(getConnectionScore(person)/3));
}

function getRelationshipLevel(person){
const total=
getConnectionScore(person)*2+
getRomanceScore(person)*4+
getFriendshipScore(person)*2+
getTrustScore(person)*3+
attractionStats[person]*0.4-
jealousyStats[person]*0.3;

if(total>=90)return 'Soulmate';
if(total>=65)return 'Strong Connection';
if(total>=42)return 'Growing Romance';
if(total>=25)return 'Close Friend';
if(total>=10)return 'Friendly';
if(total<=-5)return 'Rival';
return 'Stranger';
}

function updateCharacterMood(person){
const jealousy=jealousyStats[person]||0;
const connection=getConnectionScore(person);
const attraction=attractionStats[person]||0;
const trust=getTrustScore(person);

let mood='Neutral';

if(person===eliminatedPerson||person===secondEliminatedPerson){
mood='Eliminated';
}else if(jealousy>=70){
mood='Very Jealous';
}else if(jealousy>=40){
mood='Jealous';
}else if(trust>=10&&connection>=12){
mood='Secure';
}else if(attraction>=60){
mood='Flirty';
}else if(connection>=10){
mood='Happy';
}else if(connection<0){
mood='Upset';
}

characterMoods[person]=mood;
return mood;
}

function updateAllCharacterMoods(){
relationshipPeople.forEach(updateCharacterMood);
}

function getReputationTitle(){
if(playerReputation>=70)return 'Villa Favorite';
if(playerReputation>=40)return 'Trusted Islander';
if(playerReputation>=15)return 'Well Liked';
if(playerReputation<=-50)return 'Villa Villain';
if(playerReputation<=-20)return 'Drama Magnet';
return 'New Arrival';
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

function getReactiveDialogue(person){
initializeRelationshipSystem();
initializeChoiceConsequences();

const consequenceLine=getChoiceConsequenceDialogue(person);
if(consequenceLine)return consequenceLine;

const mood=updateCharacterMood(person);
const level=getRelationshipLevel(person);
const memory=villaLifeMemories[person]||{};

if(mood==='Very Jealous'){
return '"You have been spending a lot of time with other people," '+characters[person].name.split(' ')[0]+' says. "I noticed."';
}
if(mood==='Jealous'){
return characters[person].name.split(' ')[0]+' gives you a careful look. "Should I be worried about someone else?"';
}
if(level==='Soulmate'){
return '"After everything we survived, I trust you more than anyone here."';
}
if(level==='Strong Connection'){
return '"I feel like we understand each other now."';
}
if((memory.ignored||0)>=2){
return '"You walked away from me before," '+characters[person].name.split(' ')[0]+' says. "Are you actually staying this time?"';
}
if((memory.gossip||0)>=2){
return '"You always want the real story," '+characters[person].name.split(' ')[0]+' says with a smile.';
}
if(attractionStats[person]>=60){
return characters[person].name.split(' ')[0]+' holds your gaze longer than usual. "You are making this difficult."';
}
return '"It is good to see you," '+characters[person].name.split(' ')[0]+' says.';
}

function applyRelationshipChoiceEffects(person,choice){
initializeRelationshipSystem();

if(choice==='listen'){
changeReputation(1,'Listened respectfully');
changeAttraction(person,1,'Calm confidence');
changeJealousy(person,-2,'Felt included');
}else if(choice==='join'){
changeReputation(2,'Joined a villa conversation');
changeAttraction(person,3,'Positive interaction');
changeJealousy(person,-1,'Received attention');
}else if(choice==='gossip'){
changeReputation(-1,'Asked for villa gossip');
changeAttraction(person,1,'Shared a secret');
changeJealousy(person,3,'Drama increased');
}else if(choice==='leave'){
changeReputation(-1,'Walked away from a conversation');
changeJealousy(person,2,'Felt ignored');
}

if(coupledWith&&person!==coupledWith&&(choice==='join'||choice==='gossip')){
changeJealousy(coupledWith,choice==='gossip'?6:3,'Player bonded with another Islander');
}

if(person===coupledWith&&(choice==='listen'||choice==='join')){
changeJealousy(person,-4,'Partner received attention');
changeAttraction(person,2,'Couple time');
}

updateAllCharacterMoods();
updateReputationSummary();
}

const villaLifeSchedules={
Morning:[
{loc:'kitchen',label:'🍳 Kitchen',people:['lucas','sofia'],activity:'making breakfast and arguing over the coffee machine'},
{loc:'beach',label:'🏖 Arrival Beach',people:['kai','noah'],activity:'training beside the waves'},
{loc:'shrine',label:'💎 Crystal Shrine',people:['maya','valentina'],activity:'studying a new symbol'},
{loc:'pool',label:'🏊 Infinity Pool',people:['isabella','lisa'],activity:'sharing villa gossip'},
{loc:'gym',label:'💪 Gym',people:['ethan','lucas'],activity:'competing during a workout'}
],
Afternoon:[
{loc:'pool',label:'🏊 Infinity Pool',people:['kai','isabella'],activity:'planning a pool game'},
{loc:'villa',label:'🏡 Main Villa',people:['sofia','noah'],activity:'talking quietly in the lounge'},
{loc:'beach',label:'🏖 Arrival Beach',people:['valentina','lisa'],activity:'discussing who is playing the game'},
{loc:'jungle',label:'🌿 Whispering Jungle',people:['maya','ethan'],activity:'following a hidden trail'},
{loc:'firepit',label:'🔥 Fire Pit',people:['lucas','kai'],activity:'debating loyalty after Casa'}
],
Evening:[
{loc:'firepit',label:'🔥 Fire Pit',people:['lucas','sofia'],activity:'talking about the strongest couples'},
{loc:'cove',label:'🌙 Moonlight Cove',people:['valentina','kai'],activity:'having a secret conversation'},
{loc:'villa',label:'🏡 Main Villa',people:['isabella','noah'],activity:'trying to calm the villa'},
{loc:'kitchen',label:'🍳 Kitchen',people:['lisa','ethan'],activity:'making a late-night snack'},
{loc:'shrine',label:'💎 Crystal Shrine',people:['maya','lucas'],activity:'watching the Flame change color'}
]
};

const villaLifeDialogue={
kitchen:[
'"You always use too much sugar," one Islander says.',
'"At least I know how to make coffee," the other answers.'
],
beach:[
'"The villa feels different when nobody is watching," one of them says.',
'"Somebody is always watching," the other replies.'
],
shrine:[
'"This symbol was not here yesterday," Maya whispers.',
'"Maybe the island changes when we make choices," the other Islander says.'
],
pool:[
'"I heard someone wants to switch couples again," one Islander says.',
'"That rumor better not be about me," the other answers.'
],
gym:[
'"You train like every challenge is the finale," one Islander jokes.',
'"That is because every challenge matters," the other replies.'
],
villa:[
'"Nobody says what they really think at the Fire Pit," one Islander says.',
'"Then maybe we should start now," the other answers.'
],
jungle:[
'"There are footprints here," one Islander says.',
'"They lead away from the villa," the other replies.'
],
firepit:[
'"Loyalty is easy until a Bombshell walks in," one Islander says.',
'"Real loyalty survives the test," the other answers.'
],
cove:[
'"This place is perfect for secrets," one Islander says.',
'"Secrets never stay secret on Flame Cay," the other replies.'
]
};

function getActiveVillaLifeSchedule(){
const period=villaLifeSchedules[currentTime]?currentTime:'Morning';
return villaLifeSchedules[period].filter(event=>{
return ![eliminatedPerson,secondEliminatedPerson].includes(event.people[0]) &&
![eliminatedPerson,secondEliminatedPerson].includes(event.people[1]);
});
}

function openVillaLifeHub(){
if(triggerNextConsequence())return;

['islandMap','walkingScreen','dialogueCard','portraitBox','choices'].forEach(id=>q(id).classList.add('hidden'));

const schedule=getActiveVillaLifeSchedule();
let html='<div class="card villaLifeCard"><h2>🏡 Living Villa</h2>'+
'<p>'+getTimeIcon()+' Day '+currentDay+' — '+currentTime+'</p>'+
'<p>Islanders move, talk, and create drama even when you are not part of the conversation.</p>';

schedule.forEach((event,index)=>{
html+='<button class="villaLifeButton" onclick="visitVillaLifeEvent('+index+')">'+
event.label+' — '+characters[event.people[0]].name.split(' ')[0]+' & '+characters[event.people[1]].name.split(' ')[0]+
'</button>';
});

html+='<button onclick="showVillaLifeGossip()">🗣️ Review Gossip</button>'+
'<button onclick="returnToMainStory()">⬅ Return to Main Story</button></div>';

q('choices').innerHTML=html;
q('choices').classList.remove('hidden');
}

function visitVillaLifeEvent(index){
const schedule=getActiveVillaLifeSchedule();
const event=schedule[index];
if(!event){
openVillaLifeHub();
return;
}

villaLifeEventIndex=index;
villaLifeLastLocation=event.loc;
villaLifeVisits++;

const first=event.people[0];
const second=event.people[1];
const dialogue=(villaLifeDialogue[event.loc]||villaLifeDialogue.villa)[villaLifeVisits%2];

showScene({
speaker:first,
background:getVillaLifeBackground(event.loc),
text:characters[first].name+' and '+characters[second].name+' are '+event.activity+'.\n\n'+dialogue+'\n\n'+getReactiveDialogue(first)
});

choices(
'<button class="listenButton" onclick="handleVillaLifeChoice(\'listen\')">👂 Listen quietly</button>'+
'<button class="joinButton" onclick="handleVillaLifeChoice(\'join\')">💬 Join the conversation</button>'+
'<button class="gossipButton" onclick="handleVillaLifeChoice(\'gossip\')">🗣️ Ask for the real gossip</button>'+
'<button class="leaveButton" onclick="handleVillaLifeChoice(\'leave\')">🚶 Walk away</button>'
);
}

function getVillaLifeBackground(loc){
if(loc==='shrine')return 'crystal';
if(loc==='jungle')return 'jungle';
if(loc==='beach'||loc==='pool'||loc==='cove')return currentTime==='Evening'?'night':'beach';
if(loc==='firepit')return currentTime==='Evening'?'night':'afternoon';
return currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'villa';
}

function rememberVillaLife(person,key){
if(!villaLifeMemories[person]){
villaLifeMemories[person]={talked:0,listened:0,gossip:0,ignored:0};
}
villaLifeMemories[person][key]=(villaLifeMemories[person][key]||0)+1;
}

function addVillaLifeConnection(person,amount){
if(relationships[person]===undefined)return;
relationships[person]+=amount;
}

function handleVillaLifeChoice(choice){
const event=getActiveVillaLifeSchedule()[villaLifeEventIndex];
if(!event){
openVillaLifeHub();
return;
}

const first=event.people[0];
const second=event.people[1];
let result='';

applyRelationshipChoiceEffects(first,choice);
applyRelationshipChoiceEffects(second,choice==='gossip'?'listen':choice);
recordChoice(
'villa_'+choice+'_'+villaLifeVisits,
'Villa interaction: '+choice,
'You chose to '+choice+' during a conversation between '+characters[first].name+' and '+characters[second].name+'.',
{}
);

if(choice==='listen'){
addVillaLifeConnection(first,1);
addVillaLifeConnection(second,1);
rememberVillaLife(first,'listened');
rememberVillaLife(second,'listened');
result='You stay nearby and listen without interrupting.\n\nBoth Islanders notice that you respected their space.\n\n❤️ '+characters[first].name.split(' ')[0]+' Connection +1\n❤️ '+characters[second].name.split(' ')[0]+' Connection +1';
}else if(choice==='join'){
addVillaLifeConnection(first,2);
addVillaLifeConnection(second,1);
rememberVillaLife(first,'talked');
rememberVillaLife(second,'talked');
result='You join naturally instead of taking over the conversation.\n\n'+characters[first].name+' welcomes you into the discussion.\n\n❤️ '+characters[first].name.split(' ')[0]+' Connection +2\n❤️ '+characters[second].name.split(' ')[0]+' Connection +1';
}else if(choice==='gossip'){
addVillaLifeConnection(first,1);
rememberVillaLife(first,'gossip');
const gossip=createVillaLifeGossip(first,second,event.loc);
if(!villaLifeGossip.includes(gossip)){
villaLifeGossip.push(gossip);
}
result='You ask what is really happening in the villa.\n\n'+characters[first].name+' lowers their voice.\n\n"'+gossip+'"\n\n🗣️ New gossip saved\n❤️ '+characters[first].name.split(' ')[0]+' Connection +1';
}else{
rememberVillaLife(first,'ignored');
rememberVillaLife(second,'ignored');
result='You decide not to interrupt.\n\nThe Islanders continue their conversation without you.';
}

updateRelationships();
updateVillaLifeStatus();
autoSaveGame();

showScene({
speaker:choice==='leave'?'narrator':first,
background:getVillaLifeBackground(event.loc),
text:result+'\n\nMemory updated: these Islanders can remember this interaction.'
});

choices(
'<button class="villaLifeButton" onclick="openVillaLifeHub()">🏡 Keep Exploring</button>'+
'<button onclick="returnToMainStory()">⬅ Return to Main Story</button>'
);
}

function createVillaLifeGossip(first,second,loc){
const options=[
characters[second].name.split(' ')[0]+' may be questioning their current connection.',
'Someone plans to confront Valentina before the next Fire Pit.',
'The Crystal Flame reacted during a private conversation.',
'One Islander thinks the strongest couple is only pretending.',
'A secret chat happened near '+(locationNames[loc]||'the villa')+'.'
];
return options[(villaLifeVisits+villaLifeGossip.length)%options.length];
}

function showVillaLifeGossip(){
let text='🗣️ VILLA GOSSIP\n\n';

if(villaLifeGossip.length===0){
text+='You have not discovered any gossip yet.\n\nExplore the villa and ask Islanders what is happening.';
}else{
villaLifeGossip.slice(-6).forEach((item,index)=>{
text+=(index+1)+'. '+item+'\n\n';
});
}

showScene({
speaker:'narrator',
background:'villa',
text:text
});

choices(
'<button class="villaLifeButton" onclick="openVillaLifeHub()">🏡 Return to Living Villa</button>'+
'<button onclick="returnToMainStory()">⬅ Return to Main Story</button>'
);
}

function getVillaLifeMemoryTotal(){
return Object.values(villaLifeMemories).reduce((total,memory)=>{
return total+(memory.talked||0)+(memory.listened||0)+(memory.gossip||0)+(memory.ignored||0);
},0);
}

function updateVillaLifeStatus(){
if(!q('villaLifeStatus'))return;
q('villaLifeStatus').textContent=
'Villa visits: '+villaLifeVisits+
' • Gossip found: '+villaLifeGossip.length+
' • Remembered interactions: '+getVillaLifeMemoryTotal();
}

function returnToMainStory(){
updateVillaLifeStatus();
resumeSavedProgress();
}


function startGame(){
preloadPortraits();
playerName=q('playerName').value.trim()||'Player';
q('menu').classList.add('hidden');
q('game').classList.remove('hidden');
q('welcome').textContent='Welcome to Flame Cay, '+playerName+'!';
dialogueIndex=0;currentDay=1;currentTime='Morning';actionUsed=false;eveningEventDone=false;currentLocation='villa';pendingLocation='';coupledWith='';couplingRomance=0;couplingTrust=0;ceremonyComplete=false;challengeScore=0;challengeQuestion=0;challengeComplete=false;bombshellChoice='';bombshellComplete=false;eliminationComplete=false;eliminatedPerson='';savedPerson='';atRisk=[];currentSaveSlot=0;lastSaveTime='';dateInvitee='';dateChoice='';dateComplete=false;casaStarted=false;casaChoice='';casaPartnerReaction='';casaComplete=false;recouplingChoice='';recouplingPartnerChoice='';recouplingComplete=false;previousPartner='';falloutStarted=false;falloutChoice='';falloutComplete=false;compatibilityStarted=false;compatibilityScore=0;compatibilityQuestion=0;compatibilityPartner='';compatibilityComplete=false;luxuryDateStarted=false;luxuryDateChoice='';luxuryDateResult='';luxuryDateComplete=false;secretVoteStarted=false;secretVoteChoice='';secretVoteResult='';secretVoteComplete=false;secondEliminationStarted=false;secondEliminationSaved='';secondEliminatedPerson='';secondEliminationComplete=false;finalWeekStarted=false;familyMessageChoice='';finalWeekChoice='';finalWeekComplete=false;finalDateStarted=false;finalDatePartner='';finalDateChoice='';finalDatePromise='';finalDateComplete=false;finaleStarted=false;finalSpeechChoice='';finaleScore=0;finaleEnding='';finaleWinner=false;keeperChosen=false;finaleComplete=false;villaLifeVisits=0;villaLifeEventIndex=0;villaLifeLastLocation='';villaLifeGossip=[];villaLifeMemories={};attractionStats={};jealousyStats={};characterMoods={};playerReputation=0;reputationHistory=[];relationshipHistory=[];storyFlags={};choiceHistory=[];pendingConsequences=[];resolvedConsequences=[];
relationships={lucas:0,maya:0,kai:0,isabella:0,ethan:0,sofia:0,noah:0,lisa:0,valentina:0};
lucasStats={friendship:0,romance:0,trust:0};
mayaStats={friendship:0,trust:0,mystery:0};
kaiStats={friendship:0,romance:0,competition:0};
isabellaStats={friendship:0,romance:0,social:0};
ethanStats={friendship:0,romance:0,strategy:0};
sofiaStats={friendship:0,romance:0,openness:0};
noahStats={friendship:0,romance:0,courage:0};
lisaStats={friendship:0,romance:0,honesty:0};
q('continueButton').style.display = 'block';
q('continueButton').disabled = false;
q('continueButton').textContent = '⏩ Finish Text';

['choices', 'islandMap', 'walkingScreen'].forEach(id => {
  q(id).classList.add('hidden');
});

q('dialogueCard').classList.remove('hidden');

showScene(introDialogue[0]);
initializeRelationshipSystem();
initializeChoiceConsequences();
updateTimeDisplay();
updateRelationships();
updateVillaLifeStatus();
updateReputationSummary();
updateConsequenceSummary();
}

function nextDialogue() {
  /*
    First tap while text is typing:
    immediately finishes the current sentence.

    Second tap:
    moves to the next dialogue scene.
  */
  if (isTyping) {
    finishTypingImmediately();
    return;
  }

  dialogueIndex++;

  if (dialogueIndex < introDialogue.length) {
    q('choices').classList.add('hidden');
    showScene(introDialogue[dialogueIndex]);
    return;
  }

  q('continueButton').style.display = 'none';
  q('dialogueCard').classList.add('hidden');
  q('portraitBox').classList.add('hidden');

  openIslandMap();
}

function openIslandMap(){
['choices','walkingScreen','dialogueCard','portraitBox'].forEach(x=>q(x).classList.add('hidden'));
q('islandMap').classList.remove('hidden');
q('mapTimeText').textContent=getTimeIcon()+' Day '+currentDay+' — '+currentTime;
q('mapActionText').textContent=actionUsed?'✅ Your activity for this time period is complete.':'Choose one main activity for this time period.';
q('advanceTimeButton').textContent=actionUsed?getAdvanceButtonText():'⏰ Skip This Time Period';
}

function actionAlreadyUsed(){
if(!actionUsed)return false;
showScene({speaker:'narrator',background:currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'villa',text:'You already completed your main activity for this time period.\n\nReturn to the map and advance time to continue.'});
choices('<button onclick="openIslandMap()">🗺️ Return to Map</button>');
return true;
}

function completeAction(){actionUsed=true;updateTimeDisplay();autoSaveGame()}

function advanceTime(){
if(currentDay===3&&currentTime==='Morning'){
startCouplingCeremony();
return;
}

if(currentDay===4&&currentTime==='Morning'){
startFirstChallenge();
return;
}

if(currentDay===5&&currentTime==='Morning'){
beginDayFiveAfternoon();
return;
}

if(currentDay===5&&currentTime==='Afternoon'){
startValentinaDate();
return;
}

if(currentTime==='Evening'){
q('islandMap').classList.add('hidden');
q('walkingScreen').classList.add('hidden');
q('dialogueCard').classList.remove('hidden');
q('choices').classList.remove('hidden');
visitFirePit();
return;
}

if(currentTime==='Morning'){currentTime='Afternoon'}else{currentTime='Evening'}

actionUsed=false;
eveningEventDone=false;
updateTimeDisplay();
q('islandMap').classList.add('hidden');
q('dialogueCard').classList.remove('hidden');

if(currentTime==='Afternoon'){
showScene({speaker:'narrator',background:'afternoon',text:'The morning fades into afternoon.\n\nThe Islanders move to new locations.\n\n⭐ One new activity is available.'});
}else{
showScene({speaker:'narrator',background:'night',text:'The sun disappears beyond the ocean.\n\nThe Islanders gather at the Fire Pit tonight.'});
}
choices('<button onclick="openIslandMap()">🗺️ Return to Map</button>');
}

function startWalking(loc){
pendingLocation=loc;
['islandMap','choices','dialogueCard','portraitBox'].forEach(x=>q(x).classList.add('hidden'));
q('walkingScreen').classList.remove('hidden');
q('walkingTitle').textContent='🚶 Walking to '+locationNames[loc];
q('walkingText').innerHTML='You leave '+(locationNames[currentLocation]||'your current location')+' and follow the island path toward '+locationNames[loc]+'.<br><br>The scenery slowly changes around you.';
}

function finishWalking(){
q('walkingScreen').classList.add('hidden');
currentLocation=pendingLocation;
visitLocation(pendingLocation);
pendingLocation='';
}

function visitLocation(loc){
q('islandMap').classList.add('hidden');
q('dialogueCard').classList.remove('hidden');
q('choices').classList.remove('hidden');

if(currentDay===5&&currentTime==='Morning'){
visitDayFiveLocation(loc);
return;
}

if(currentDay===5&&currentTime==='Afternoon'){
visitDayFiveAfternoonLocation(loc);
return;
}

({
beach:visitBeach,
villa:visitVilla,
village:visitVillage,
shrine:visitShrine,
jungle:visitJungle,
gym:visitGym,
kitchen:visitKitchen,
pool:visitPool,
firepit:visitFirePit,
cove:visitCove,
volcano:visitVolcano
}[loc]||visitVilla)();

/* DAY 1 + DAY 2 + DAY 3 MORNING + DAY 4 MORNING SCHEDULES */

// Season 1 story and event functions loaded from story.js

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

window.addEventListener('load',()=>{
preloadPortraits();
initializeRelationshipSystem();
initializeChoiceConsequences();
refreshSaveMenus();
});