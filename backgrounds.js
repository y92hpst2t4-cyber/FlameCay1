'use strict';

// The Island of Flames
// Version 3.6.2 — Simplified Dynamic Background Manager
// Uses exact clean filenames and currentLocation + currentTime.

const REAL_BACKGROUND_FILES = {
arrival: {
morning: 'backgrounds/arrival_morning.png',
afternoon: 'backgrounds/arrival_afternoon.png',
sunset: 'backgrounds/arrival_sunset.png',
night: 'backgrounds/arrival_night.png'
},

villa: {
morning: 'backgrounds/villa_morning.png',
afternoon: 'backgrounds/villa_afternoon.png',
sunset: 'backgrounds/villa_sunset.png',
night: 'backgrounds/villa_night.png'
},

pool: {
morning: 'backgrounds/pool_morning.png',
afternoon: 'backgrounds/pool_afternoon.png',
sunset: 'backgrounds/pool_sunset.png',
night: 'backgrounds/pool_night.png'
},

firepit: {
morning: 'backgrounds/firepit_morning.png',
afternoon: 'backgrounds/firepit_afternoon.png',
sunset: 'backgrounds/firepit_sunset.png',
night: 'backgrounds/firepit_night.png'
}
};

const LOCATION_BACKGROUND_MAP = {
arrival: 'arrival',
beach: 'arrival',

villa: 'villa',
kitchen: 'villa',
gym: 'villa',

pool: 'pool',

firepit: 'firepit'
};

const SCENE_LOCATION_MAP = {
arrival: 'arrival',
beach: 'arrival',
villa: 'villa',
pool: 'pool',
firepit: 'firepit'
};

let currentBackgroundFile = '';
let backgroundRequestNumber = 0;

function getBackgroundTime(scene) {
const sceneKey = String(scene || '').toLowerCase();

if (sceneKey === 'night') {
return 'night';
}

if (sceneKey === 'sunset') {
return 'sunset';
}

if (typeof currentTime !== 'string') {
return 'morning';
}

if (currentTime === 'Morning') {
return 'morning';
}

if (currentTime === 'Afternoon') {
return 'afternoon';
}

if (currentTime === 'Evening') {
return 'night';
}

return 'morning';
}

function getBackgroundLocation(scene) {
const sceneKey = String(scene || '').toLowerCase();

const locationKey = String(
typeof currentLocation === 'string'
? currentLocation
: ''
).toLowerCase();

/*
The real map location always wins.
This prevents Main Villa from showing Arrival Beach.
*/
if (LOCATION_BACKGROUND_MAP[locationKey]) {
return LOCATION_BACKGROUND_MAP[locationKey];
}

/*
Use the scene name only when there is no known map location.
*/
if (SCENE_LOCATION_MAP[sceneKey]) {
return SCENE_LOCATION_MAP[sceneKey];
}

return null;
}

function preloadBackground(src) {
return new Promise((resolve, reject) => {
const image = new Image();

image.onload = () => resolve(src);
image.onerror = () => reject(
new Error('Background image could not be loaded: ' + src)
);

image.src = src + '?v=3632';
});
}

function applyBackgroundImage(src) {
const cacheSafeSrc = src + '?v=3632';

document.body.style.backgroundImage =
'linear-gradient(rgba(0,0,0,.08),rgba(0,0,0,.22)), url("' +
cacheSafeSrc +
'")';

document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center top';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundAttachment = 'fixed';

document.body.classList.add('has-real-background');
currentBackgroundFile = src;
}

function showFallbackBackground(scene) {
document.body.classList.remove('has-real-background');

document.body.style.backgroundImage =
'linear-gradient(180deg,#70d8ff,#08657e)';

document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundAttachment = 'fixed';

document.body.dataset.background =
String(scene || 'villa').toLowerCase();

currentBackgroundFile = '';
}

async function changeBackground(scene) {
const locationKey = getBackgroundLocation(scene);
const timeKey = getBackgroundTime(scene);
const requestNumber = ++backgroundRequestNumber;

if (
!locationKey ||
!REAL_BACKGROUND_FILES[locationKey] ||
!REAL_BACKGROUND_FILES[locationKey][timeKey]
) {
showFallbackBackground(scene);
return;
}

const src = REAL_BACKGROUND_FILES[locationKey][timeKey];

if (currentBackgroundFile === src) {
return;
}

try {
await preloadBackground(src);

if (requestNumber !== backgroundRequestNumber) {
return;
}

applyBackgroundImage(src);

console.log(
'Background loaded:',
locationKey,
timeKey,
src
);
} catch (error) {
if (requestNumber !== backgroundRequestNumber) {
return;
}

console.warn(error.message);
showFallbackBackground(scene);
}
}

function refreshBackgroundForTime() {
changeBackground(
typeof currentLocation === 'string'
? currentLocation
: 'villa'
);
}

function preloadBackgroundPack() {
Object.values(REAL_BACKGROUND_FILES).forEach(locationSet => {
Object.values(locationSet).forEach(src => {
const image = new Image();
image.src = src + '?v=3632';
});
});
}

function initializeBackgroundSystem() {
changeBackground(
typeof currentLocation === 'string'
? currentLocation
: 'arrival'
);

setTimeout(preloadBackgroundPack, 800);
}

if (document.readyState === 'loading') {
document.addEventListener(
'DOMContentLoaded',
initializeBackgroundSystem,
{ once: true }
);
} else {
initializeBackgroundSystem();
}
