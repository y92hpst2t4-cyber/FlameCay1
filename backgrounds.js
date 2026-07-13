'use strict';

// The Island of Flames
// Version 3.6.3 — Clean Dynamic Background Manager
// Uses exact clean filenames and currentLocation + currentTime.

const REAL_BACKGROUND_FILES = {
arrival: {
morning: 'backgrounds/arrival_morning.png',
afternoon: 'backgrounds/arrival_afternoon.png',
sunset: 'backgrounds/arrival_sunset.png',
night: 'backgrounds/arrival_night.png'
},

villa: {
morning: 'backgrounds/82BCE9AD-51C2-4745-9124-CC87E94CF7C8.png',
afternoon: 'backgrounds/10855D6D-50D2-4CBD-A735-9B4EB6EFA2A8.png',
sunset: 'backgrounds/4CFBDC17-4DA6-4D70-9C02-31A7430D16F2.png',
night: 'backgrounds/424BF254-B34F-4989-8DE9-C725F5F62FEE.png'
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
},

village: {
morning: 'backgrounds/7527C11C-3A72-4DE6-9D90-E061A897CE73.png',
afternoon: 'backgrounds/7527C11C-3A72-4DE6-9D90-E061A897CE73.png',
sunset: 'backgrounds/7527C11C-3A72-4DE6-9D90-E061A897CE73.png',
night: 'backgrounds/7527C11C-3A72-4DE6-9D90-E061A897CE73.png'
}
};

const LOCATION_BACKGROUND_MAP = {
arrival: 'arrival',
beach: 'arrival',

villa: 'villa',
kitchen: 'villa',
gym: 'villa',

pool: 'pool',

firepit: 'firepit',

village: 'village'
};

const SCENE_LOCATION_MAP = {
arrival: 'arrival',
beach: 'arrival',
villa: 'villa',
pool: 'pool',
firepit: 'firepit',
village: 'village'
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
An explicit scene location wins first.
This lets the opening Arrival Beach scene work even though
new games begin with currentLocation set to villa.
*/
if (SCENE_LOCATION_MAP[sceneKey]) {
return SCENE_LOCATION_MAP[sceneKey];
}

/*
Generic scene labels such as afternoon and night use the
player's real map location.
*/
if (LOCATION_BACKGROUND_MAP[locationKey]) {
return LOCATION_BACKGROUND_MAP[locationKey];
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

image.src = src + '?v=363';
});
}

function applyBackgroundImage(src) {
const cacheSafeSrc = src + '?v=363';

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
image.src = src + '?v=363';
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
