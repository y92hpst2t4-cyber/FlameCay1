'use strict';

// The Island of Flames
// Version 3.6.4 — Background System Fix

const BACKGROUND_VERSION = '364';

const REAL_BACKGROUND_FILES = {
  arrival: {
    morning: 'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png',
    afternoon: 'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png',
    sunset: 'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png',
    night: 'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png'
  },

  villa: {
    morning: 'backgrounds/051FD550-8E9A-4166-BEC1-AE5773E97D21.png',
    afternoon: 'backgrounds/10855D6D-50D2-4CBD-A735-9B4EB6EFA2A8.png',
    sunset: 'backgrounds/4CFBDC17-4DA6-4D70-9C02-31A7430D16F2.png',
    night: 'backgrounds/424BF254-B34F-4989-8DE9-C725F5F62FEE.png'
  },

  pool: {
    morning: 'backgrounds/IMG_2354.jpeg',
    afternoon: 'backgrounds/IMG_2354.jpeg',
    sunset: 'backgrounds/IMG_2355.jpeg',
    night: 'backgrounds/IMG_2355.jpeg'
  }
};

const LOCATION_ALIASES = {
  arrival: 'arrival',
  'arrival beach': 'arrival',
  beach: 'arrival',

  villa: 'villa',
  'main villa': 'villa',
  lounge: 'villa',
  kitchen: 'villa',
  gym: 'villa',

  pool: 'pool',
  'infinity pool': 'pool'
};

let currentBackgroundFile = '';
let backgroundRequestNumber = 0;

function normalizeLocation(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function getBackgroundTime(scene) {
  const sceneKey = normalizeLocation(scene);

  if (sceneKey.includes('sunset')) {
    return 'sunset';
  }

  if (sceneKey.includes('night')) {
    return 'night';
  }

  if (sceneKey.includes('afternoon')) {
    return 'afternoon';
  }

  if (sceneKey.includes('morning')) {
    return 'morning';
  }

  const timeKey = normalizeLocation(
    typeof currentTime === 'string' ? currentTime : 'morning'
  );

  if (timeKey === 'afternoon') {
    return 'afternoon';
  }

  if (timeKey === 'evening' || timeKey === 'night') {
    return 'night';
  }

  return 'morning';
}

function getBackgroundLocation(scene) {
  const sceneKey = normalizeLocation(scene);
  const locationKey = normalizeLocation(
    typeof currentLocation === 'string' ? currentLocation : ''
  );

  if (LOCATION_ALIASES[sceneKey]) {
    return LOCATION_ALIASES[sceneKey];
  }

  for (const alias of Object.keys(LOCATION_ALIASES)) {
    if (sceneKey.includes(alias)) {
      return LOCATION_ALIASES[alias];
    }
  }

  if (LOCATION_ALIASES[locationKey]) {
    return LOCATION_ALIASES[locationKey];
  }

  return null;
}

function preloadBackground(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const cacheSafeSrc = `${src}?v=${BACKGROUND_VERSION}`;

    image.onload = () => resolve(cacheSafeSrc);
    image.onerror = () => {
      reject(new Error(`Background could not load: ${src}`));
    };

    image.src = cacheSafeSrc;
  });
}

function applyBackgroundImage(src, loadedSrc) {
  document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.25)), url("${loadedSrc}")`;

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
    'linear-gradient(180deg, #70d8ff 0%, #238fb7 45%, #08657e 100%)';

  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';

  document.body.dataset.background =
    normalizeLocation(scene) || 'unknown';

  currentBackgroundFile = '';
}

async function changeBackground(scene) {
  const locationKey = getBackgroundLocation(scene);
  const timeKey = getBackgroundTime(scene);
  const requestNumber = ++backgroundRequestNumber;

  if (!locationKey || !REAL_BACKGROUND_FILES[locationKey]) {
    console.warn('No background location found for:', scene);
    showFallbackBackground(scene);
    return;
  }

  const locationBackgrounds = REAL_BACKGROUND_FILES[locationKey];

  const src =
    locationBackgrounds[timeKey] ||
    locationBackgrounds.morning ||
    Object.values(locationBackgrounds)[0];

  if (!src) {
    showFallbackBackground(scene);
    return;
  }

  if (currentBackgroundFile === src) {
    return;
  }

  try {
    const loadedSrc = await preloadBackground(src);

    if (requestNumber !== backgroundRequestNumber) {
      return;
    }

    applyBackgroundImage(src, loadedSrc);

    console.log('Background loaded:', {
      location: locationKey,
      time: timeKey,
      file: src
    });
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
  const uniqueFiles = new Set();

  Object.values(REAL_BACKGROUND_FILES).forEach(locationSet => {
    Object.values(locationSet).forEach(src => {
      if (src) {
        uniqueFiles.add(src);
      }
    });
  });

  uniqueFiles.forEach(src => {
    const image = new Image();
    image.src = `${src}?v=${BACKGROUND_VERSION}`;
  });
}

function initializeBackgroundSystem() {
  changeBackground(
    typeof currentLocation === 'string'
      ? currentLocation
      : 'arrival'
  );

  window.setTimeout(preloadBackgroundPack, 800);
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