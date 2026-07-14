'use strict';

let soundEnabled=true;
let musicVolume=0.35;
let effectVolume=0.6;

const backgroundMusic=new Audio('sounds/island-theme.mp3');
backgroundMusic.loop=true;
backgroundMusic.volume=musicVolume;

const clickSound=new Audio('sounds/button-click.mp3');
clickSound.volume=effectVolume;

function startBackgroundMusic(){
if(!soundEnabled)return;

backgroundMusic.play().catch(()=>{
console.log('Music will begin after the player taps the screen.');
});
}

function playClickSound(){
if(!soundEnabled)return;

clickSound.currentTime=0;
clickSound.play().catch(()=>{});
}

function toggleSound(){
soundEnabled=!soundEnabled;

if(soundEnabled){
startBackgroundMusic();
}else{
backgroundMusic.pause();
}

updateSoundButton();
}

function updateSoundButton(){
const button=document.getElementById('soundToggle');

if(!button)return;

button.textContent=soundEnabled
?'🔊 Sound On'
:'🔇 Sound Off';
}