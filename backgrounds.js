'use strict';

// The Island of Flames
// Version 3.6.0 — Animated Background System

const BACKGROUND_SCENES = {
arrival:{
top:'#72ddff',
middle:'#1f9fc2',
bottom:'#07566d',
glow:'rgba(255,224,135,.42)',
accent:'rgba(255,255,255,.28)',
motion:'ocean'
},
beach:{
top:'#83ecff',
middle:'#37b9d3',
bottom:'#1383a0',
glow:'rgba(255,225,132,.5)',
accent:'rgba(255,255,255,.34)',
motion:'ocean'
},
villa:{
top:'#65d6ef',
middle:'#1d9fb9',
bottom:'#08677e',
glow:'rgba(255,205,128,.35)',
accent:'rgba(255,255,255,.24)',
motion:'breeze'
},
afternoon:{
top:'#ffc36f',
middle:'#e98767',
bottom:'#267b91',
glow:'rgba(255,236,170,.48)',
accent:'rgba(255,255,255,.22)',
motion:'sunset'
},
night:{
top:'#273a77',
middle:'#111d48',
bottom:'#040711',
glow:'rgba(124,145,255,.3)',
accent:'rgba(255,255,255,.42)',
motion:'stars'
},
crystal:{
top:'#263f78',
middle:'#10214b',
bottom:'#050b17',
glow:'rgba(160,91,255,.5)',
accent:'rgba(112,233,255,.42)',
motion:'crystal'
},
jungle:{
top:'#4d9e64',
middle:'#286843',
bottom:'#123721',
glow:'rgba(170,255,160,.22)',
accent:'rgba(222,255,208,.25)',
motion:'leaves'
},
volcano:{
top:'#994c36',
middle:'#56271e',
bottom:'#1f0b08',
glow:'rgba(255,93,45,.5)',
accent:'rgba(255,195,120,.25)',
motion:'embers'
},
firepit:{
top:'#34305c',
middle:'#1a1833',
bottom:'#08070f',
glow:'rgba(255,109,45,.5)',
accent:'rgba(255,204,145,.25)',
motion:'embers'
},
pool:{
top:'#72e6f2',
middle:'#32b4c8',
bottom:'#08758d',
glow:'rgba(255,244,183,.38)',
accent:'rgba(255,255,255,.32)',
motion:'water'
},
cove:{
top:'#344a85',
middle:'#16285b',
bottom:'#060b19',
glow:'rgba(103,205,255,.32)',
accent:'rgba(223,244,255,.34)',
motion:'moon'
},
gym:{
top:'#688798',
middle:'#385363',
bottom:'#18282f',
glow:'rgba(255,182,98,.22)',
accent:'rgba(255,255,255,.15)',
motion:'breeze'
},
kitchen:{
top:'#f0c989',
middle:'#b87d59',
bottom:'#654436',
glow:'rgba(255,235,187,.35)',
accent:'rgba(255,255,255,.18)',
motion:'breeze'
}
};

const BACKGROUND_ALIASES = {
shrine:'crystal',
moonlight:'cove',
sunset:'afternoon',
evening:'night'
};

let currentBackgroundScene='arrival';

function normalizeBackgroundScene(scene){
const requested=String(scene||'villa').toLowerCase();
return BACKGROUND_SCENES[requested]
?requested
:(BACKGROUND_ALIASES[requested]||'villa');
}

function changeBackground(scene){
const key=normalizeBackgroundScene(scene);
const config=BACKGROUND_SCENES[key];
const body=document.body;

currentBackgroundScene=key;

body.classList.add('game-background');
body.dataset.background=key;
body.dataset.motion=config.motion;

body.style.setProperty('--scene-top',config.top);
body.style.setProperty('--scene-middle',config.middle);
body.style.setProperty('--scene-bottom',config.bottom);
body.style.setProperty('--scene-glow',config.glow);
body.style.setProperty('--scene-accent',config.accent);
}

function refreshBackgroundForTime(){
if(currentTime==='Evening'){
changeBackground('night');
return;
}
if(currentTime==='Afternoon'){
changeBackground('afternoon');
return;
}
changeBackground(currentLocation||'villa');
}

function initializeBackgroundSystem(){
changeBackground('arrival');
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',initializeBackgroundSystem,{once:true});
}else{
initializeBackgroundSystem();
}
