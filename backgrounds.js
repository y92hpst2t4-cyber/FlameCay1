'use strict';

// The Island of Flames
// Version 3.6.2 — Dynamic Background Manager

const BACKGROUND_SCENES = {
arrival:{top:'#72ddff',middle:'#1f9fc2',bottom:'#07566d',glow:'rgba(255,224,135,.42)',accent:'rgba(255,255,255,.28)',motion:'ocean'},
beach:{top:'#83ecff',middle:'#37b9d3',bottom:'#1383a0',glow:'rgba(255,225,132,.5)',accent:'rgba(255,255,255,.34)',motion:'ocean'},
villa:{top:'#65d6ef',middle:'#1d9fb9',bottom:'#08677e',glow:'rgba(255,205,128,.35)',accent:'rgba(255,255,255,.24)',motion:'breeze'},
afternoon:{top:'#ffc36f',middle:'#e98767',bottom:'#267b91',glow:'rgba(255,236,170,.48)',accent:'rgba(255,255,255,.22)',motion:'sunset'},
night:{top:'#273a77',middle:'#111d48',bottom:'#040711',glow:'rgba(124,145,255,.3)',accent:'rgba(255,255,255,.42)',motion:'stars'},
crystal:{top:'#263f78',middle:'#10214b',bottom:'#050b17',glow:'rgba(160,91,255,.5)',accent:'rgba(112,233,255,.42)',motion:'crystal'},
jungle:{top:'#4d9e64',middle:'#286843',bottom:'#123721',glow:'rgba(170,255,160,.22)',accent:'rgba(222,255,208,.25)',motion:'leaves'},
volcano:{top:'#994c36',middle:'#56271e',bottom:'#1f0b08',glow:'rgba(255,93,45,.5)',accent:'rgba(255,195,120,.25)',motion:'embers'},
firepit:{top:'#34305c',middle:'#1a1833',bottom:'#08070f',glow:'rgba(255,109,45,.5)',accent:'rgba(255,204,145,.25)',motion:'embers'},
pool:{top:'#72e6f2',middle:'#32b4c8',bottom:'#08758d',glow:'rgba(255,244,183,.38)',accent:'rgba(255,255,255,.32)',motion:'water'},
cove:{top:'#344a85',middle:'#16285b',bottom:'#060b19',glow:'rgba(103,205,255,.32)',accent:'rgba(223,244,255,.34)',motion:'moon'},
gym:{top:'#688798',middle:'#385363',bottom:'#18282f',glow:'rgba(255,182,98,.22)',accent:'rgba(255,255,255,.15)',motion:'breeze'},
kitchen:{top:'#f0c989',middle:'#b87d59',bottom:'#654436',glow:'rgba(255,235,187,.35)',accent:'rgba(255,255,255,.18)',motion:'breeze'}
};

const BACKGROUND_ALIASES = {
shrine:'crystal',
moonlight:'cove',
sunset:'afternoon',
evening:'night'
};

// First choice = clean filename.
// Later choices = random filenames already uploaded to GitHub.
const REAL_BACKGROUND_FILES = {
arrival:{
morning:[
'backgrounds/arrival_morning.png',
'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png'
],
afternoon:[
'backgrounds/arrival_afternoon.png'
],
sunset:[
'backgrounds/arrival_sunset.png',
'backgrounds/4C553CF9-D16E-4E9C-B2E9-80DA04217A46.png'
],
night:[
'backgrounds/arrival_night.png',
'backgrounds/2F6337BF-6798-4B05-8970-834F817D4BDC.png'
]
},
villa:{
morning:[
'backgrounds/villa_morning.png',
'backgrounds/82BCE9AD-51C2-47A5-9124-CC87E94CF7C8.png'
],
afternoon:[
'backgrounds/villa_afternoon.png',
'backgrounds/10855D6D-50D2-4CBD-A735-9B4EB6EFA2A8.png'
],
sunset:[
'backgrounds/villa_sunset.png',
'backgrounds/4CFBDC17-4DA6-4D70-9C02-31A7430D16F2.png'
],
night:[
'backgrounds/villa_night.png',
'backgrounds/424BF254-B34F-4989-8DE9-C725F5F62FEE.png'
]
},
pool:{
morning:[
'backgrounds/pool_morning.png',
'backgrounds/IMG_2354.jpeg'
],
afternoon:[
'backgrounds/pool_afternoon.png'
],
sunset:[
'backgrounds/pool_sunset.png',
'backgrounds/IMG_2355.jpeg'
],
night:[
'backgrounds/pool_night.png',
'backgrounds/IMG_2356.jpeg'
]
},
firepit:{
morning:[
'backgrounds/firepit_morning.png',
'backgrounds/IMG_2358.jpeg'
],
afternoon:[
'backgrounds/firepit_afternoon.png',
'backgrounds/IMG_2359.jpeg'
],
sunset:[
'backgrounds/firepit_sunset.png',
'backgrounds/IMG_2360.jpeg'
],
night:[
'backgrounds/firepit_night.png',
'backgrounds/IMG_2361.jpeg'
]
}
};

const PACKED_LOCATION_ALIASES = {
arrival:'arrival',
beach:'arrival',
villa:'villa',
kitchen:'villa',
gym:'villa',
pool:'pool',
firepit:'firepit'
};

let currentBackgroundScene='arrival';
let currentRealBackground='';
let backgroundRequestId=0;
const loadedBackgroundCache=new Set();

function normalizeBackgroundScene(scene){
const requested=String(scene||'villa').toLowerCase();
return BACKGROUND_SCENES[requested]
?requested
:(BACKGROUND_ALIASES[requested]||'villa');
}

function getPackedLocation(scene){
const sceneKey=String(scene||'').toLowerCase();
const currentKey=String(
typeof currentLocation==='string'?currentLocation:''
).toLowerCase();

if(PACKED_LOCATION_ALIASES[currentKey]){
return PACKED_LOCATION_ALIASES[currentKey];
}

return PACKED_LOCATION_ALIASES[sceneKey]||null;
}

function getBackgroundTime(scene){
const sceneKey=String(scene||'').toLowerCase();

if(sceneKey==='night')return 'night';
if(sceneKey==='sunset')return 'sunset';

const time=typeof currentTime==='string'?currentTime:'Morning';

if(time==='Morning')return 'morning';
if(time==='Afternoon')return 'afternoon';
if(time==='Evening')return 'night';

return 'morning';
}

function ensureBackgroundLayers(){
if(document.getElementById('realBackgroundA'))return;

const layerA=document.createElement('div');
const layerB=document.createElement('div');

layerA.id='realBackgroundA';
layerB.id='realBackgroundB';
layerA.className='realSceneBackground active';
layerB.className='realSceneBackground';

document.body.prepend(layerB);
document.body.prepend(layerA);
}

function loadFirstAvailableBackground(candidates,index=0){
return new Promise((resolve,reject)=>{
if(!Array.isArray(candidates)||index>=candidates.length){
reject(new Error('No background file found.'));
return;
}

const src=candidates[index];
const image=new Image();

image.onload=()=>{
loadedBackgroundCache.add(src);
resolve(src);
};

image.onerror=()=>{
loadFirstAvailableBackground(candidates,index+1)
.then(resolve)
.catch(reject);
};

image.src=src;
});
}

function crossfadeToBackground(src){
ensureBackgroundLayers();

const first=document.getElementById('realBackgroundA');
const second=document.getElementById('realBackgroundB');
const active=first.classList.contains('active')?first:second;
const incoming=active===first?second:first;

if(currentRealBackground===src)return;

incoming.style.backgroundImage=`url("${src}")`;
incoming.classList.add('active');
active.classList.remove('active');

currentRealBackground=src;
document.body.classList.add('has-real-background');
}

function clearRealBackground(){
ensureBackgroundLayers();
document.getElementById('realBackgroundA').classList.remove('active');
document.getElementById('realBackgroundB').classList.remove('active');
currentRealBackground='';
document.body.classList.remove('has-real-background');
}

async function applyRealBackground(scene){
const packedLocation=getPackedLocation(scene);

if(!packedLocation||!REAL_BACKGROUND_FILES[packedLocation]){
clearRealBackground();
return;
}

const timeKey=getBackgroundTime(scene);
const candidates=REAL_BACKGROUND_FILES[packedLocation][timeKey];
const requestId=++backgroundRequestId;

try{
const src=await loadFirstAvailableBackground(candidates);
if(requestId!==backgroundRequestId)return;
crossfadeToBackground(src);
}catch(error){
if(requestId!==backgroundRequestId)return;
clearRealBackground();
console.warn(
`Background missing for ${packedLocation} ${timeKey}.`,
candidates
);
}
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

applyRealBackground(scene);
}

function refreshBackgroundForTime(){
changeBackground(
typeof currentLocation==='string'&&currentLocation
?currentLocation
:'villa'
);
}

function preloadBackgroundPack(){
const important=[
REAL_BACKGROUND_FILES.arrival.morning,
REAL_BACKGROUND_FILES.villa.morning,
REAL_BACKGROUND_FILES.pool.afternoon,
REAL_BACKGROUND_FILES.firepit.night
];

important.forEach(candidates=>{
loadFirstAvailableBackground(candidates).catch(()=>{});
});
}

function initializeBackgroundSystem(){
ensureBackgroundLayers();
changeBackground('arrival');

if('requestIdleCallback' in window){
requestIdleCallback(preloadBackgroundPack,{timeout:2500});
}else{
setTimeout(preloadBackgroundPack,1200);
}
}

if(document.readyState==='loading'){
document.addEventListener(
'DOMContentLoaded',
initializeBackgroundSystem,
{once:true}
);
}else{
initializeBackgroundSystem();
}
