'use strict';

// The Island of Flames
// Version 3.6.4 — Complete Save and Load System

const SAVE_PREFIX='islandOfFlames_slot_';
const AUTO_SAVE_KEY='islandOfFlames_autoSave';

function safeObject(value,fallback={}){
return value&&typeof value==='object'&&!Array.isArray(value)
?value
:fallback;
}

function safeArray(value){
return Array.isArray(value)?value:[];
}

function cloneSaveValue(value,fallback){
try{
if(value===undefined)return fallback;
return JSON.parse(JSON.stringify(value));
}catch(error){
return fallback;
}
}

function getSaveData(){
return{
saveVersion:
typeof saveVersion!=='undefined'
?saveVersion
:'3.6.4',

savedAt:new Date().toISOString(),

playerName:
typeof playerName!=='undefined'
?playerName
:'Player',

dialogueIndex:
typeof dialogueIndex!=='undefined'
?dialogueIndex
:0,

currentLocation:
typeof currentLocation!=='undefined'
?currentLocation
:'villa',

pendingLocation:
typeof pendingLocation!=='undefined'
?pendingLocation
:'',

currentDay:
typeof currentDay!=='undefined'
?currentDay
:1,

currentTime:
typeof currentTime!=='undefined'
?currentTime
:'Morning',

actionUsed:
typeof actionUsed!=='undefined'
?actionUsed
:false,

eveningEventDone:
typeof eveningEventDone!=='undefined'
?eveningEventDone
:false,

relationships:cloneSaveValue(
typeof relationships!=='undefined'
?relationships
:{},
{}
),

lucasStats:cloneSaveValue(
typeof lucasStats!=='undefined'
?lucasStats
:{},
{}
),

mayaStats:cloneSaveValue(
typeof mayaStats!=='undefined'
?mayaStats
:{},
{}
),

kaiStats:cloneSaveValue(
typeof kaiStats!=='undefined'
?kaiStats
:{},
{}
),

isabellaStats:cloneSaveValue(
typeof isabellaStats!=='undefined'
?isabellaStats
:{},
{}
),

ethanStats:cloneSaveValue(
typeof ethanStats!=='undefined'
?ethanStats
:{},
{}
),

sofiaStats:cloneSaveValue(
typeof sofiaStats!=='undefined'
?sofiaStats
:{},
{}
),

noahStats:cloneSaveValue(
typeof noahStats!=='undefined'
?noahStats
:{},
{}
),

lisaStats:cloneSaveValue(
typeof lisaStats!=='undefined'
?lisaStats
:{},
{}
),

valentinaStats:cloneSaveValue(
typeof valentinaStats!=='undefined'
?valentinaStats
:{},
{}
),

episodeOneProgress:cloneSaveValue(
typeof episodeOneProgress!=='undefined'
?episodeOneProgress
:{},
{}
),

coupledWith:
typeof coupledWith!=='undefined'
?coupledWith
:'',

couplingRomance:
typeof couplingRomance!=='undefined'
?couplingRomance
:0,

couplingTrust:
typeof couplingTrust!=='undefined'
?couplingTrust
:0,

ceremonyComplete:
typeof ceremonyComplete!=='undefined'
?ceremonyComplete
:false,

challengeScore:
typeof challengeScore!=='undefined'
?challengeScore
:0,

challengeQuestion:
typeof challengeQuestion!=='undefined'
?challengeQuestion
:0,

challengeComplete:
typeof challengeComplete!=='undefined'
?challengeComplete
:false,

bombshellChoice:
typeof bombshellChoice!=='undefined'
?bombshellChoice
:'',

bombshellComplete:
typeof bombshellComplete!=='undefined'
?bombshellComplete
:false,

eliminationComplete:
typeof eliminationComplete!=='undefined'
?eliminationComplete
:false,

eliminatedPerson:
typeof eliminatedPerson!=='undefined'
?eliminatedPerson
:'',

savedPerson:
typeof savedPerson!=='undefined'
?savedPerson
:'',

atRisk:cloneSaveValue(
typeof atRisk!=='undefined'
?atRisk
:[],
[]
),

dateInvitee:
typeof dateInvitee!=='undefined'
?dateInvitee
:'',

dateChoice:
typeof dateChoice!=='undefined'
?dateChoice
:'',

dateComplete:
typeof dateComplete!=='undefined'
?dateComplete
:false,

casaStarted:
typeof casaStarted!=='undefined'
?casaStarted
:false,

casaChoice:
typeof casaChoice!=='undefined'
?casaChoice
:'',

casaPartnerReaction:
typeof casaPartnerReaction!=='undefined'
?casaPartnerReaction
:'',

casaComplete:
typeof casaComplete!=='undefined'
?casaComplete
:false,

recouplingChoice:
typeof recouplingChoice!=='undefined'
?recouplingChoice
:'',

recouplingPartnerChoice:
typeof recouplingPartnerChoice!=='undefined'
?recouplingPartnerChoice
:'',

recouplingComplete:
typeof recouplingComplete!=='undefined'
?recouplingComplete
:false,

previousPartner:
typeof previousPartner!=='undefined'
?previousPartner
:'',

falloutStarted:
typeof falloutStarted!=='undefined'
?falloutStarted
:false,

falloutChoice:
typeof falloutChoice!=='undefined'
?falloutChoice
:'',

falloutComplete:
typeof falloutComplete!=='undefined'
?falloutComplete
:false,

compatibilityStarted:
typeof compatibilityStarted!=='undefined'
?compatibilityStarted
:false,

compatibilityScore:
typeof compatibilityScore!=='undefined'
?compatibilityScore
:0,

compatibilityQuestion:
typeof compatibilityQuestion!=='undefined'
?compatibilityQuestion
:0,

compatibilityPartner:
typeof compatibilityPartner!=='undefined'
?compatibilityPartner
:'',

compatibilityComplete:
typeof compatibilityComplete!=='undefined'
?compatibilityComplete
:false,
luxuryDateStarted:
typeof luxuryDateStarted!=='undefined'
?luxuryDateStarted
:false,

luxuryDateChoice:
typeof luxuryDateChoice!=='undefined'
?luxuryDateChoice
:'',

luxuryDateResult:
typeof luxuryDateResult!=='undefined'
?luxuryDateResult
:'',

luxuryDateComplete:
typeof luxuryDateComplete!=='undefined'
?luxuryDateComplete
:false,

secretVoteStarted:
typeof secretVoteStarted!=='undefined'
?secretVoteStarted
:false,

secretVoteChoice:
typeof secretVoteChoice!=='undefined'
?secretVoteChoice
:'',

secretVoteResult:
typeof secretVoteResult!=='undefined'
?secretVoteResult
:'',

secretVoteComplete:
typeof secretVoteComplete!=='undefined'
?secretVoteComplete
:false,

secondEliminationStarted:
typeof secondEliminationStarted!=='undefined'
?secondEliminationStarted
:false,

secondEliminationSaved:
typeof secondEliminationSaved!=='undefined'
?secondEliminationSaved
:'',

secondEliminatedPerson:
typeof secondEliminatedPerson!=='undefined'
?secondEliminatedPerson
:'',

secondEliminationComplete:
typeof secondEliminationComplete!=='undefined'
?secondEliminationComplete
:false,

finalWeekStarted:
typeof finalWeekStarted!=='undefined'
?finalWeekStarted
:false,

familyMessageChoice:
typeof familyMessageChoice!=='undefined'
?familyMessageChoice
:'',

finalWeekChoice:
typeof finalWeekChoice!=='undefined'
?finalWeekChoice
:'',

finalWeekComplete:
typeof finalWeekComplete!=='undefined'
?finalWeekComplete
:false,

finalDateStarted:
typeof finalDateStarted!=='undefined'
?finalDateStarted
:false,

finalDatePartner:
typeof finalDatePartner!=='undefined'
?finalDatePartner
:'',

finalDateChoice:
typeof finalDateChoice!=='undefined'
?finalDateChoice
:'',

finalDatePromise:
typeof finalDatePromise!=='undefined'
?finalDatePromise
:'',

finalDateComplete:
typeof finalDateComplete!=='undefined'
?finalDateComplete
:false,

finaleStarted:
typeof finaleStarted!=='undefined'
?finaleStarted
:false,

finalSpeechChoice:
typeof finalSpeechChoice!=='undefined'
?finalSpeechChoice
:'',

finaleScore:
typeof finaleScore!=='undefined'
?finaleScore
:0,

finaleEnding:
typeof finaleEnding!=='undefined'
?finaleEnding
:'',

finaleWinner:
typeof finaleWinner!=='undefined'
?finaleWinner
:false,

keeperChosen:
typeof keeperChosen!=='undefined'
?keeperChosen
:false,

finaleComplete:
typeof finaleComplete!=='undefined'
?finaleComplete
:false,

villaLifeVisits:
typeof villaLifeVisits!=='undefined'
?villaLifeVisits
:0,

villaLifeEventIndex:
typeof villaLifeEventIndex!=='undefined'
?villaLifeEventIndex
:0,

villaLifeLastLocation:
typeof villaLifeLastLocation!=='undefined'
?villaLifeLastLocation
:'',

villaLifeGossip:cloneSaveValue(
typeof villaLifeGossip!=='undefined'
?villaLifeGossip
:[],
[]
),

villaLifeMemories:cloneSaveValue(
typeof villaLifeMemories!=='undefined'
?villaLifeMemories
:{},
{}
),

attractionStats:cloneSaveValue(
typeof attractionStats!=='undefined'
?attractionStats
:{},
{}
),

jealousyStats:cloneSaveValue(
typeof jealousyStats!=='undefined'
?jealousyStats
:{},
{}
),

characterMoods:cloneSaveValue(
typeof characterMoods!=='undefined'
?characterMoods
:{},
{}
),

playerReputation:
typeof playerReputation!=='undefined'
?playerReputation
:0,

reputationHistory:cloneSaveValue(
typeof reputationHistory!=='undefined'
?reputationHistory
:[],
[]
),

relationshipHistory:cloneSaveValue(
typeof relationshipHistory!=='undefined'
?relationshipHistory
:[],
[]
),

storyFlags:cloneSaveValue(
typeof storyFlags!=='undefined'
?storyFlags
:{},
{}
),

choiceHistory:cloneSaveValue(
typeof choiceHistory!=='undefined'
?choiceHistory
:[],
[]
),

pendingConsequences:cloneSaveValue(
typeof pendingConsequences!=='undefined'
?pendingConsequences
:[],
[]
),

resolvedConsequences:cloneSaveValue(
typeof resolvedConsequences!=='undefined'
?resolvedConsequences
:[],
[]
)
};
}

function applySaveData(data){
if(!data||typeof data!=='object'){
throw new Error('Invalid save data.');
}

playerName=data.playerName||'Player';
dialogueIndex=Number(data.dialogueIndex||0);
currentLocation=data.currentLocation||'villa';
pendingLocation=data.pendingLocation||'';
currentDay=Number(data.currentDay||1);
currentTime=data.currentTime||'Morning';
actionUsed=Boolean(data.actionUsed);
eveningEventDone=Boolean(data.eveningEventDone);

relationships=Object.assign(
{
lucas:0,
maya:0,
kai:0,
isabella:0,
ethan:0,
sofia:0,
noah:0,
lisa:0,
valentina:0
},
safeObject(data.relationships)
);

lucasStats=Object.assign(
{friendship:0,romance:0,trust:0},
safeObject(data.lucasStats)
);

mayaStats=Object.assign(
{friendship:0,trust:0,mystery:0},
safeObject(data.mayaStats)
);

kaiStats=Object.assign(
{friendship:0,romance:0,competition:0},
safeObject(data.kaiStats)
);

isabellaStats=Object.assign(
{friendship:0,romance:0,social:0},
safeObject(data.isabellaStats)
);

ethanStats=Object.assign(
{friendship:0,romance:0,strategy:0},
safeObject(data.ethanStats)
);

sofiaStats=Object.assign(
{friendship:0,romance:0,openness:0},
safeObject(data.sofiaStats)
);

noahStats=Object.assign(
{friendship:0,romance:0,courage:0},
safeObject(data.noahStats)
);

lisaStats=Object.assign(
{friendship:0,romance:0,honesty:0},
safeObject(data.lisaStats)
);

valentinaStats=Object.assign(
{friendship:0,romance:0,boldness:0},
safeObject(data.valentinaStats)
);

if(
typeof episodeOneProgress!=='undefined' &&
data.episodeOneProgress
){
Object.assign(
episodeOneProgress,
{
charactersMet:[],
activityComplete:false,
crystalClueFound:false,
relationshipChoice:'',
cliffhangerComplete:false
},
safeObject(data.episodeOneProgress)
);
}

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
atRisk=safeArray(data.atRisk);

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
villaLifeGossip=safeArray(data.villaLifeGossip);
villaLifeMemories=safeObject(data.villaLifeMemories);

attractionStats=safeObject(data.attractionStats);
jealousyStats=safeObject(data.jealousyStats);
characterMoods=safeObject(data.characterMoods);

playerReputation=Number(data.playerReputation||0);
reputationHistory=safeArray(data.reputationHistory);
relationshipHistory=safeArray(data.relationshipHistory);

storyFlags=safeObject(data.storyFlags);
choiceHistory=safeArray(data.choiceHistory);
pendingConsequences=safeArray(data.pendingConsequences);
resolvedConsequences=safeArray(data.resolvedConsequences);

lastSaveTime=data.savedAt||'';

if(typeof initializeRelationshipSystem==='function'){
initializeRelationshipSystem();
}

if(typeof initializeChoiceConsequences==='function'){
initializeChoiceConsequences();
}

const playerNameInput=document.getElementById('playerName');

if(playerNameInput){
playerNameInput.value=playerName;
}

const menu=document.getElementById('menu');
const game=document.getElementById('game');
const welcome=document.getElementById('welcome');
const continueButton=document.getElementById('continueButton');

if(menu){
menu.classList.add('hidden');
}

if(game){
game.classList.remove('hidden');
}

if(welcome){
welcome.textContent='Welcome back to Flame Cay, '+playerName+'!';
}

if(continueButton){
continueButton.style.display='none';
}

if(typeof updateTimeDisplay==='function'){
updateTimeDisplay();
}

if(typeof updateRelationships==='function'){
updateRelationships();
}

if(typeof updateVillaLifeStatus==='function'){
updateVillaLifeStatus();
}

if(typeof updateReputationSummary==='function'){
updateReputationSummary();
}

if(typeof updateConsequenceSummary==='function'){
updateConsequenceSummary();
}

if(typeof resumeSavedProgress==='function'){
resumeSavedProgress();
}
}

function autoSaveGame(){
try{
const saveData=getSaveData();
const saveText=JSON.stringify(saveData);

localStorage.setItem(
AUTO_SAVE_KEY,
saveText
);

lastSaveTime=saveData.savedAt;

refreshContinueButton();

return true;
}catch(error){
console.error(
'Automatic save failed:',
error
);

return false;
}
}

function saveGame(slot=1,showMessage=true){
try{
const safeSlot=Math.max(
1,
Math.min(3,Number(slot)||1)
);

const saveData=getSaveData();
const saveText=JSON.stringify(saveData);

localStorage.setItem(
SAVE_PREFIX+safeSlot,
saveText
);

localStorage.setItem(
AUTO_SAVE_KEY,
saveText
);

const storedSave=localStorage.getItem(
SAVE_PREFIX+safeSlot
);

if(!storedSave){
throw new Error('The save slot was not created.');
}

JSON.parse(storedSave);

currentSaveSlot=safeSlot;
lastSaveTime=saveData.savedAt;

const status=document.getElementById('saveStatus');

if(showMessage&&status){
status.textContent=
'✅ Saved to Slot '+
safeSlot+
' — '+
formatSaveDate(saveData.savedAt);
}

refreshSaveMenus();

if(showMessage){
alert(
'💾 Game saved successfully to Slot '+
safeSlot+
'.'
);
}

return true;
}catch(error){
console.error(
'Manual save failed:',
error
);

const status=document.getElementById('saveStatus');

if(status){
status.textContent='❌ Save failed.';
}

alert(
'The game could not be saved. Error: '+
(
error&&error.message
?error.message
:'Unknown error'
)
);

return false;
}
}

function loadGame(slot=1){
try{
const safeSlot=Math.max(
1,
Math.min(3,Number(slot)||1)
);

const rawSave=localStorage.getItem(
SAVE_PREFIX+safeSlot
);

if(!rawSave){
alert(
'No save was found in Slot '+
safeSlot+
'.'
);

return false;
}

const saveData=JSON.parse(rawSave);

currentSaveSlot=safeSlot;

localStorage.setItem(
AUTO_SAVE_KEY,
rawSave
);

closeLoadMenu();
closeInGameLoadMenu();

applySaveData(saveData);

return true;
}catch(error){
console.error(
'Manual load failed:',
error
);

alert(
'The saved game could not be loaded. Error: '+
(
error&&error.message
?error.message
:'Unknown error'
)
);

return false;
}
}

function continueLatestSave(){
try{
const rawSave=localStorage.getItem(
AUTO_SAVE_KEY
);

if(!rawSave){
alert('No automatic save was found.');
return false;
}

const saveData=JSON.parse(rawSave);

currentSaveSlot=0;
applySaveData(saveData);

return true;
}catch(error){
console.error(
'Continue latest save failed:',
error
);

alert(
'The latest save could not be loaded. Error: '+
(
error&&error.message
?error.message
:'Unknown error'
)
);

return false;
}
}
function deleteSave(slot=1){
try{
const safeSlot=Math.max(
1,
Math.min(3,Number(slot)||1)
);

const key=SAVE_PREFIX+safeSlot;

if(!localStorage.getItem(key)){
alert(
'No save was found in Slot '+
safeSlot+
'.'
);

return;
}

if(!confirm(
'Delete Save Slot '+
safeSlot+
'?'
)){
return;
}

localStorage.removeItem(key);

refreshSaveMenus();

alert(
'🗑️ Save Slot '+
safeSlot+
' deleted.'
);
}catch(error){
console.error(
'Delete save failed:',
error
);
}
}

function deleteManualSave(slot=1){
deleteSave(slot);
}

function hasManualSave(slot=1){
const safeSlot=Math.max(
1,
Math.min(3,Number(slot)||1)
);

return localStorage.getItem(
SAVE_PREFIX+safeSlot
)!==null;
}

function formatSaveDate(iso){
if(!iso){
return 'Unknown time';
}

const date=new Date(iso);

if(Number.isNaN(date.getTime())){
return 'Unknown time';
}

return date.toLocaleString();
}

function getSaveSummary(data){
const partner=
data.coupledWith &&
typeof characters!=='undefined' &&
characters[data.coupledWith]
?characters[data.coupledWith].name
:'Not chosen';

const eliminated=
data.eliminatedPerson &&
typeof characters!=='undefined' &&
characters[data.eliminatedPerson]
?characters[data.eliminatedPerson].name
:'None';

return{
player:data.playerName||'Player',
day:Number(data.currentDay||1),
time:data.currentTime||'Morning',
partner,
eliminated,
savedAt:formatSaveDate(data.savedAt)
};
}

function buildSaveSlotHtml(slot,inGame=false){
const rawSave=localStorage.getItem(
SAVE_PREFIX+slot
);

if(!rawSave){
return(
'<div class="slotCard">'+
'<h3>Save Slot '+slot+'</h3>'+
'<p>Empty slot</p>'+
(
inGame
?'<button class="saveButton" onclick="saveGame('+slot+')">💾 Save Here</button>'
:''
)+
'</div>'
);
}

try{
const saveData=JSON.parse(rawSave);
const summary=getSaveSummary(saveData);

return(
'<div class="slotCard">'+
'<h3>Save Slot '+slot+'</h3>'+
'<p><strong>'+summary.player+'</strong></p>'+
'<p>📅 Day '+summary.day+' — '+summary.time+'</p>'+
'<p>❤️ Partner: '+summary.partner+'</p>'+
'<p>❌ Eliminated: '+summary.eliminated+'</p>'+
'<p>🕒 '+summary.savedAt+'</p>'+
'<button class="loadButton" onclick="loadGame('+slot+')">▶ Load Slot '+slot+'</button>'+
(
inGame
?'<button class="saveButton" onclick="saveGame('+slot+')">💾 Overwrite Slot '+slot+'</button>'
:''
)+
'<button class="deleteButton" onclick="deleteSave('+slot+')">🗑️ Delete Slot '+slot+'</button>'+
'</div>'
);
}catch(error){
return(
'<div class="slotCard">'+
'<h3>Save Slot '+slot+'</h3>'+
'<p>Save data is damaged.</p>'+
'<button class="deleteButton" onclick="deleteSave('+slot+')">🗑️ Delete Slot</button>'+
'</div>'
);
}
}

function refreshSaveMenus(){
const loadSlotList=document.getElementById(
'loadSlotList'
);

const inGameLoadSlotList=document.getElementById(
'inGameLoadSlotList'
);

if(loadSlotList){
loadSlotList.innerHTML=[1,2,3]
.map(slot=>buildSaveSlotHtml(slot,false))
.join('');
}

if(inGameLoadSlotList){
inGameLoadSlotList.innerHTML=[1,2,3]
.map(slot=>buildSaveSlotHtml(slot,true))
.join('');
}

refreshContinueButton();
}

function refreshContinueButton(){
const continueGameButton=document.getElementById(
'continueGameButton'
);

if(!continueGameButton){
return;
}

const hasAutoSave=Boolean(
localStorage.getItem(AUTO_SAVE_KEY)
);

continueGameButton.classList.toggle(
'hidden',
!hasAutoSave
);
}

function openLoadMenu(){
refreshSaveMenus();

const loadMenu=document.getElementById(
'loadMenu'
);

if(loadMenu){
loadMenu.classList.remove('hidden');
}
}

function closeLoadMenu(){
const loadMenu=document.getElementById(
'loadMenu'
);

if(loadMenu){
loadMenu.classList.add('hidden');
}
}

function openInGameLoadMenu(){
refreshSaveMenus();

const inGameLoadMenu=document.getElementById(
'inGameLoadMenu'
);

if(inGameLoadMenu){
inGameLoadMenu.classList.remove('hidden');
}
}

function closeInGameLoadMenu(){
const inGameLoadMenu=document.getElementById(
'inGameLoadMenu'
);

if(inGameLoadMenu){
inGameLoadMenu.classList.add('hidden');
}
}

function getSaveSystemButtons(){
return(
'<button onclick="saveGame(1)">💾 Save Slot 1</button>'+
'<button onclick="saveGame(2)">💾 Save Slot 2</button>'+
'<button onclick="saveGame(3)">💾 Save Slot 3</button>'+
'<button onclick="loadGame(1)">📂 Load Slot 1</button>'+
'<button onclick="loadGame(2)">📂 Load Slot 2</button>'+
'<button onclick="loadGame(3)">📂 Load Slot 3</button>'
);
}

function shouldRecoverAfterRefresh(){
try{
const entries=performance.getEntriesByType(
'navigation'
);

if(
entries.length>0 &&
entries[0].type==='reload'
){
return true;
}

if(
performance.navigation &&
performance.navigation.type===1
){
return true;
}
}catch(error){
console.error(
'Refresh detection failed:',
error
);
}

return false;
}

window.addEventListener('load',function(){
refreshSaveMenus();

if(!shouldRecoverAfterRefresh()){
return;
}

const rawSave=localStorage.getItem(
AUTO_SAVE_KEY
);

if(!rawSave){
return;
}

setTimeout(function(){
try{
applySaveData(
JSON.parse(rawSave)
);
}catch(error){
console.error(
'Automatic refresh recovery failed:',
error
);
}
},150);
});