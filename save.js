'use strict';

// The Island of Flames
// Version 3.5.0e — Save System
// Contains save data creation, loading, autosaving, save slots,
// continue-game support, deletion, summaries, and save menus.

const SAVE_PREFIX='islandOfFlames_slot_';
const AUTO_SAVE_KEY='islandOfFlames_autoSave';

function getSaveData(){
return{
saveVersion,
savedAt:new Date().toISOString(),
playerName,
dialogueIndex,
currentLocation,
currentDay,
currentTime,
actionUsed,
eveningEventDone,
relationships,
lucasStats,
mayaStats,
kaiStats,
isabellaStats,
ethanStats,
sofiaStats,
noahStats,
lisaStats,
valentinaStats,
coupledWith,
couplingRomance,
couplingTrust,
ceremonyComplete,
challengeScore,
challengeQuestion,
challengeComplete,
bombshellChoice,
bombshellComplete,
eliminationComplete,
eliminatedPerson,
savedPerson,
atRisk,
dateInvitee,
dateChoice,
dateComplete,
casaStarted,
casaChoice,
casaPartnerReaction,
casaComplete,
recouplingChoice,
recouplingPartnerChoice,
recouplingComplete,
previousPartner,
falloutStarted,
falloutChoice,
falloutComplete,
compatibilityStarted,
compatibilityScore,
compatibilityQuestion,
compatibilityPartner,
compatibilityComplete,
luxuryDateStarted,
luxuryDateChoice,
luxuryDateResult,
luxuryDateComplete,
secretVoteStarted,
secretVoteChoice,
secretVoteResult,
secretVoteComplete,
secondEliminationStarted,
secondEliminationSaved,
secondEliminatedPerson,
secondEliminationComplete,
finalWeekStarted,
familyMessageChoice,
finalWeekChoice,
finalWeekComplete,
finalDateStarted,
finalDatePartner,
finalDateChoice,
finalDatePromise,
finalDateComplete,
finaleStarted,
finalSpeechChoice,
finaleScore,
finaleEnding,
finaleWinner,
keeperChosen,
finaleComplete,
villaLifeVisits,
villaLifeEventIndex,
villaLifeLastLocation,
villaLifeGossip,
villaLifeMemories,
attractionStats,
jealousyStats,
characterMoods,
playerReputation,
reputationHistory,
relationshipHistory,
storyFlags,
choiceHistory,
pendingConsequences,
resolvedConsequences
};
}

function applySaveData(data){
playerName=data.playerName||'Player';
dialogueIndex=Number(data.dialogueIndex||0);
currentLocation=data.currentLocation||'villa';
currentDay=Number(data.currentDay||1);
currentTime=data.currentTime||'Morning';
actionUsed=Boolean(data.actionUsed);
eveningEventDone=Boolean(data.eveningEventDone);

relationships=Object.assign(
{lucas:0,maya:0,kai:0,isabella:0,ethan:0,sofia:0,noah:0,lisa:0,valentina:0},
data.relationships||{}
);

lucasStats=Object.assign({friendship:0,romance:0,trust:0},data.lucasStats||{});
mayaStats=Object.assign({friendship:0,trust:0,mystery:0},data.mayaStats||{});
kaiStats=Object.assign({friendship:0,romance:0,competition:0},data.kaiStats||{});
isabellaStats=Object.assign({friendship:0,romance:0,social:0},data.isabellaStats||{});
ethanStats=Object.assign({friendship:0,romance:0,strategy:0},data.ethanStats||{});
sofiaStats=Object.assign({friendship:0,romance:0,openness:0},data.sofiaStats||{});
noahStats=Object.assign({friendship:0,romance:0,courage:0},data.noahStats||{});
lisaStats=Object.assign({friendship:0,romance:0,honesty:0},data.lisaStats||{});
valentinaStats=Object.assign({friendship:0,romance:0,boldness:0},data.valentinaStats||{});

coupledWith=data.coupledWith||'';
couplingRomance=Number(data.couplingRomance||0);
couplingTrust=Number(data.couplingTrust||0);
ceremonyComplete=Boolean(data.ceremonyComplete);
challengeScore=Number(data.challengeScore||0);
challengeQuestion=Number(data.challengeQuestion||0);
challengeComplete=Boolean(data.challengeComplete);
bombshellChoice=data.bombshellChoice||'';
bombshellComplete=Boolean(data.bombshellComplete);
eliminationComplete=Boolean(data.eliminationComplete);
eliminatedPerson=data.eliminatedPerson||'';
savedPerson=data.savedPerson||'';
atRisk=Array.isArray(data.atRisk)?data.atRisk:[];
dateInvitee=data.dateInvitee||'';
dateChoice=data.dateChoice||'';
dateComplete=Boolean(data.dateComplete);
casaStarted=Boolean(data.casaStarted);
casaChoice=data.casaChoice||'';
casaPartnerReaction=data.casaPartnerReaction||'';
casaComplete=Boolean(data.casaComplete);
recouplingChoice=data.recouplingChoice||'';
recouplingPartnerChoice=data.recouplingPartnerChoice||'';
recouplingComplete=Boolean(data.recouplingComplete);
previousPartner=data.previousPartner||'';
falloutStarted=Boolean(data.falloutStarted);
falloutChoice=data.falloutChoice||'';
falloutComplete=Boolean(data.falloutComplete);
compatibilityStarted=Boolean(data.compatibilityStarted);
compatibilityScore=Number(data.compatibilityScore||0);
compatibilityQuestion=Number(data.compatibilityQuestion||0);
compatibilityPartner=data.compatibilityPartner||'';
compatibilityComplete=Boolean(data.compatibilityComplete);
luxuryDateStarted=Boolean(data.luxuryDateStarted);
luxuryDateChoice=data.luxuryDateChoice||'';
luxuryDateResult=data.luxuryDateResult||'';
luxuryDateComplete=Boolean(data.luxuryDateComplete);
secretVoteStarted=Boolean(data.secretVoteStarted);
secretVoteChoice=data.secretVoteChoice||'';
secretVoteResult=data.secretVoteResult||'';
secretVoteComplete=Boolean(data.secretVoteComplete);
secondEliminationStarted=Boolean(data.secondEliminationStarted);
secondEliminationSaved=data.secondEliminationSaved||'';
secondEliminatedPerson=data.secondEliminatedPerson||'';
secondEliminationComplete=Boolean(data.secondEliminationComplete);
finalWeekStarted=Boolean(data.finalWeekStarted);
familyMessageChoice=data.familyMessageChoice||'';
finalWeekChoice=data.finalWeekChoice||'';
finalWeekComplete=Boolean(data.finalWeekComplete);
finalDateStarted=Boolean(data.finalDateStarted);
finalDatePartner=data.finalDatePartner||'';
finalDateChoice=data.finalDateChoice||'';
finalDatePromise=data.finalDatePromise||'';
finalDateComplete=Boolean(data.finalDateComplete);
finaleStarted=Boolean(data.finaleStarted);
finalSpeechChoice=data.finalSpeechChoice||'';
finaleScore=Number(data.finaleScore||0);
finaleEnding=data.finaleEnding||'';
finaleWinner=Boolean(data.finaleWinner);
keeperChosen=Boolean(data.keeperChosen);
finaleComplete=Boolean(data.finaleComplete);
villaLifeVisits=Number(data.villaLifeVisits||0);
villaLifeEventIndex=Number(data.villaLifeEventIndex||0);
villaLifeLastLocation=data.villaLifeLastLocation||'';
villaLifeGossip=Array.isArray(data.villaLifeGossip)?data.villaLifeGossip:[];
villaLifeMemories=(data.villaLifeMemories&&typeof data.villaLifeMemories==='object')?data.villaLifeMemories:{};
attractionStats=(data.attractionStats&&typeof data.attractionStats==='object')?data.attractionStats:{};
jealousyStats=(data.jealousyStats&&typeof data.jealousyStats==='object')?data.jealousyStats:{};
characterMoods=(data.characterMoods&&typeof data.characterMoods==='object')?data.characterMoods:{};
playerReputation=Number(data.playerReputation||0);
reputationHistory=Array.isArray(data.reputationHistory)?data.reputationHistory:[];
relationshipHistory=Array.isArray(data.relationshipHistory)?data.relationshipHistory:[];
storyFlags=(data.storyFlags&&typeof data.storyFlags==='object')?data.storyFlags:{};
choiceHistory=Array.isArray(data.choiceHistory)?data.choiceHistory:[];
pendingConsequences=Array.isArray(data.pendingConsequences)?data.pendingConsequences:[];
resolvedConsequences=Array.isArray(data.resolvedConsequences)?data.resolvedConsequences:[];
initializeRelationshipSystem();
initializeChoiceConsequences();
lastSaveTime=data.savedAt||'';

q('playerName').value=playerName;
q('menu').classList.add('hidden');
q('game').classList.remove('hidden');
q('welcome').textContent='Welcome back to Flame Cay, '+playerName+'!';
q('continueButton').style.display='none';

updateTimeDisplay();
updateRelationships();
updateVillaLifeStatus();
resumeSavedProgress();
}

function saveGame(slot,showMessage=true){
try{
const data=getSaveData();
localStorage.setItem(SAVE_PREFIX+slot,JSON.stringify(data));
localStorage.setItem(AUTO_SAVE_KEY,JSON.stringify(data));
currentSaveSlot=slot;
lastSaveTime=data.savedAt;

if(showMessage&&q('saveStatus')){
q('saveStatus').textContent='✅ Saved to Slot '+slot+' — '+formatSaveDate(data.savedAt);
}

refreshSaveMenus();
}catch(error){
if(q('saveStatus')){
q('saveStatus').textContent='❌ Save failed. Your browser may have storage disabled.';
}
}
}

function autoSaveGame(){
try{
const data=getSaveData();
localStorage.setItem(AUTO_SAVE_KEY,JSON.stringify(data));
lastSaveTime=data.savedAt;
refreshContinueButton();
}catch(error){}
}

function loadGame(slot){
try{
const raw=localStorage.getItem(SAVE_PREFIX+slot);
if(!raw)return;
currentSaveSlot=slot;
closeLoadMenu();
closeInGameLoadMenu();
applySaveData(JSON.parse(raw));
}catch(error){
alert('This save file could not be loaded.');
}
}

function continueLatestSave(){
try{
const raw=localStorage.getItem(AUTO_SAVE_KEY);
if(!raw)return;
currentSaveSlot=0;
applySaveData(JSON.parse(raw));
}catch(error){
alert('The latest save could not be loaded.');
}
}

function deleteSave(slot){
try{
localStorage.removeItem(SAVE_PREFIX+slot);
refreshSaveMenus();
refreshContinueButton();
}catch(error){}
}

function formatSaveDate(iso){
if(!iso)return 'Unknown time';
const date=new Date(iso);
if(Number.isNaN(date.getTime()))return 'Unknown time';
return date.toLocaleString();
}

function getSaveSummary(data){
const partner=data.coupledWith&&characters[data.coupledWith]
?characters[data.coupledWith].name
:'Not chosen';

const eliminated=data.eliminatedPerson&&characters[data.eliminatedPerson]
?characters[data.eliminatedPerson].name
:'None';

return{
player:data.playerName||'Player',
day:data.currentDay||1,
time:data.currentTime||'Morning',
partner,
eliminated,
savedAt:formatSaveDate(data.savedAt)
};
}

function buildSaveSlotHtml(slot,inGame=false){
const raw=localStorage.getItem(SAVE_PREFIX+slot);

if(!raw){
return '<div class="slotCard"><h3>Save Slot '+slot+'</h3><p>Empty slot</p>'+
(inGame?'<button class="saveButton" onclick="saveGame('+slot+')">💾 Save Here</button>':'')+
'</div>';
}

try{
const data=JSON.parse(raw);
const summary=getSaveSummary(data);

return '<div class="slotCard">'+
'<h3>Save Slot '+slot+'</h3>'+
'<p><strong>'+summary.player+'</strong></p>'+
'<p>📅 Day '+summary.day+' — '+summary.time+'</p>'+
'<p>❤️ Partner: '+summary.partner+'</p>'+
'<p>❌ Eliminated: '+summary.eliminated+'</p>'+
'<p>🕒 '+summary.savedAt+'</p>'+
'<button class="loadButton" onclick="loadGame('+slot+')">▶ Load Slot '+slot+'</button>'+
(inGame?'<button class="saveButton" onclick="saveGame('+slot+')">💾 Overwrite Slot '+slot+'</button>':'')+
'<button class="deleteButton" onclick="deleteSave('+slot+')">🗑️ Delete Slot '+slot+'</button>'+
'</div>';
}catch(error){
return '<div class="slotCard"><h3>Save Slot '+slot+'</h3><p>Save data is damaged.</p>'+
'<button class="deleteButton" onclick="deleteSave('+slot+')">🗑️ Delete Slot</button></div>';
}
}

function refreshSaveMenus(){
if(q('loadSlotList')){
q('loadSlotList').innerHTML=[1,2,3].map(slot=>buildSaveSlotHtml(slot,false)).join('');
}
if(q('inGameLoadSlotList')){
q('inGameLoadSlotList').innerHTML=[1,2,3].map(slot=>buildSaveSlotHtml(slot,true)).join('');
}
refreshContinueButton();
}

function refreshContinueButton(){
const hasAutoSave=Boolean(localStorage.getItem(AUTO_SAVE_KEY));
if(q('continueGameButton')){
q('continueGameButton').classList.toggle('hidden',!hasAutoSave);
}
}

function openLoadMenu(){
refreshSaveMenus();
q('loadMenu').classList.remove('hidden');
}

function closeLoadMenu(){
q('loadMenu').classList.add('hidden');
}

function openInGameLoadMenu(){
refreshSaveMenus();
q('inGameLoadMenu').classList.remove('hidden');
}

function closeInGameLoadMenu(){
q('inGameLoadMenu').classList.add('hidden');
}
