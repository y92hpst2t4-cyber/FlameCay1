'use strict';

// The Island of Flames
// Version 3.6.4 — Manual Save Slot Fix
// Uses the existing automatic save without depending on AUTO_SAVE_KEY being global.

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

// Confirm that the save is valid JSON before storing it.
JSON.parse(currentSave);

localStorage.setItem(FLAME_SAVE_PREFIX+safeSlot,currentSave);

const savedCopy=localStorage.getItem(FLAME_SAVE_PREFIX+safeSlot);
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

alert('💾 Game saved successfully to Slot '+safeSlot+'.');
return true;
}catch(error){
console.error('Manual save failed:',error);
alert('The game could not be saved. Error: '+(error&&error.message?error.message:'Unknown error'));
return false;
}
}

function loadGame(slot=1){
try{
const safeSlot=Number(slot)||1;
const manualSave=localStorage.getItem(FLAME_SAVE_PREFIX+safeSlot);

if(!manualSave){
alert('No save was found in Slot '+safeSlot+'.');
return false;
}

JSON.parse(manualSave);
localStorage.setItem(FLAME_AUTO_SAVE_KEY,manualSave);
location.reload();
return true;
}catch(error){
console.error('Manual load failed:',error);
alert('The saved game could not be loaded.');
return false;
}
}

function deleteSave(slot=1){
const safeSlot=Number(slot)||1;
const key=FLAME_SAVE_PREFIX+safeSlot;

if(!localStorage.getItem(key)){
alert('No save was found in Slot '+safeSlot+'.');
return;
}

if(!confirm('Delete Save Slot '+safeSlot+'?')){
return;
}

localStorage.removeItem(key);

if(typeof refreshSaveMenus==='function'){
refreshSaveMenus();
}

alert('🗑️ Save Slot '+safeSlot+' deleted.');
}

function deleteManualSave(slot=1){
deleteSave(slot);
}

function hasManualSave(slot=1){
return localStorage.getItem(FLAME_SAVE_PREFIX+(Number(slot)||1))!==null;
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
