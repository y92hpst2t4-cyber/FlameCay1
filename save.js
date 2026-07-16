'use strict';

// The Island of Flames
// Version 3.6.4 — Manual Save Slot + Refresh Recovery

const FLAME_AUTO_SAVE_KEY='islandOfFlames_autoSave';
const FLAME_SAVE_PREFIX='islandOfFlames_slot_';

function getStoredAutoSave(){
return localStorage.getItem(FLAME_AUTO_SAVE_KEY);
}

function saveGame(slot=1){
try{
const safeSlot=Number(slot)||1;

if(typeof autoSaveGame==='function'){
autoSaveGame();
}

const currentSave=getStoredAutoSave();

if(!currentSave){
alert('No active game data was found to save.');
return false;
}

JSON.parse(currentSave);

localStorage.setItem(
FLAME_SAVE_PREFIX+safeSlot,
currentSave
);

const savedCopy=localStorage.getItem(
FLAME_SAVE_PREFIX+safeSlot
);

if(savedCopy!==currentSave){
throw new Error('Save verification failed.');
}

if(typeof currentSaveSlot!=='undefined'){
currentSaveSlot=safeSlot;
}

if(typeof refreshSaveMenus==='function'){
refreshSaveMenus();
}

const status=document.getElementById('saveStatus');

if(status){
status.textContent='✅ Saved to Slot '+safeSlot;
}

alert(
'💾 Game saved successfully to Slot '+
safeSlot+
'.'
);

return true;

}catch(error){

console.error(
'Manual save failed:',
error
);

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

function applyStoredSave(rawSave,slot=0){
try{
if(!rawSave){
return false;
}

const saveData=JSON.parse(rawSave);

localStorage.setItem(
FLAME_AUTO_SAVE_KEY,
rawSave
);

if(typeof currentSaveSlot!=='undefined'){
currentSaveSlot=slot;
}

if(typeof applySaveData!=='function'){
console.error(
'applySaveData() is not available.'
);

return false;
}

applySaveData(saveData);

if(typeof refreshSaveMenus==='function'){
refreshSaveMenus();
}

return true;

}catch(error){

console.error(
'Save application failed:',
error
);

return false;
}
}

function loadGame(slot=1){
try{
const safeSlot=Number(slot)||1;

const manualSave=localStorage.getItem(
FLAME_SAVE_PREFIX+safeSlot
);

if(!manualSave){
alert(
'No save was found in Slot '+
safeSlot+
'.'
);

return false;
}

const loaded=applyStoredSave(
manualSave,
safeSlot
);

if(!loaded){
throw new Error(
'The saved information could not be applied.'
);
}

return true;

}catch(error){

console.error(
'Manual load failed:',
error
);

alert(
'The saved game could not be loaded.'
);

return false;
}
}

function continueLatestSave(){
try{
const autoSave=getStoredAutoSave();

if(!autoSave){
alert('No automatic save was found.');
return false;
}

const loaded=applyStoredSave(
autoSave,
0
);

if(!loaded){
throw new Error(
'The automatic save could not be applied.'
);
}

return true;

}catch(error){

console.error(
'Continue game failed:',
error
);

alert(
'The latest save could not be loaded.'
);

return false;
}
}

function deleteSave(slot=1){
const safeSlot=Number(slot)||1;
const key=FLAME_SAVE_PREFIX+safeSlot;

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

if(typeof refreshSaveMenus==='function'){
refreshSaveMenus();
}

alert(
'🗑️ Save Slot '+
safeSlot+
' deleted.'
);
}

function deleteManualSave(slot=1){
deleteSave(slot);
}

function hasManualSave(slot=1){
return localStorage.getItem(
FLAME_SAVE_PREFIX+
(Number(slot)||1)
)!==null;
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

function pageWasRefreshed(){
try{
const navigationEntries=
performance.getEntriesByType('navigation');

if(
navigationEntries.length>0 &&
navigationEntries[0].type==='reload'
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
'Reload detection failed:',
error
);
}

return false;
}

window.addEventListener('load',function(){
if(!pageWasRefreshed()){
return;
}

const autoSave=getStoredAutoSave();

if(!autoSave){
return;
}

setTimeout(function(){
const loaded=applyStoredSave(
autoSave,
0
);

if(!loaded){
console.error(
'Automatic refresh recovery failed.'
);
}
},100);
});