'use strict';

// The Island of Flames
// Version 0.3 — Manual Save System
// Uses the game's existing AUTO_SAVE_KEY and autoSaveGame() system.

const MANUAL_SAVE_KEY='flameCayManualSaveV03';

function saveGame(){
try{
if(typeof autoSaveGame==='function'){
autoSaveGame();
}

const currentSave=localStorage.getItem(AUTO_SAVE_KEY);

if(!currentSave){
alert('No active game data was found to save.');
return;
}

localStorage.setItem(MANUAL_SAVE_KEY,currentSave);
alert('💾 Game saved successfully.');
}catch(error){
console.error('Manual save failed:',error);
alert('The game could not be saved.');
}
}

function loadGame(){
try{
const manualSave=localStorage.getItem(MANUAL_SAVE_KEY);

if(!manualSave){
alert('No manual save was found.');
return;
}

localStorage.setItem(AUTO_SAVE_KEY,manualSave);
location.reload();
}catch(error){
console.error('Manual load failed:',error);
alert('The saved game could not be loaded.');
}
}

function deleteManualSave(){
const manualSave=localStorage.getItem(MANUAL_SAVE_KEY);

if(!manualSave){
alert('No manual save was found.');
return;
}

if(!confirm('Delete your manual save?')){
return;
}

localStorage.removeItem(MANUAL_SAVE_KEY);
alert('🗑️ Manual save deleted.');
}

function hasManualSave(){
return localStorage.getItem(MANUAL_SAVE_KEY)!==null;
}

function getSaveSystemButtons(){
const loadDisabled=hasManualSave()?'':' disabled';

return(
'<button onclick="saveGame()">💾 Save Game</button>'+
'<button onclick="loadGame()"'+loadDisabled+'>📂 Load Game</button>'+
'<button onclick="deleteManualSave()"'+loadDisabled+'>🗑️ Delete Save</button>'
);
}
