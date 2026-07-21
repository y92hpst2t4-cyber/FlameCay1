'use strict';

const AUDIO_SETTINGS_KEY = 'flameCayAudioSettings';

let soundEnabled = true;
let musicVolume = 0.6;
let effectVolume = 0.8;

let audioContext = null;
let masterGain = null;
let musicGain = null;
let effectsGain = null;

let currentAtmosphere = 'menu';
let atmosphereNodes = [];

function clampVolume(value, fallback) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, number));
}

function createAudioContext() {
  if (audioContext) {
    return audioContext;
  }

  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;

  if (!AudioContextClass) {
    console.warn('Web Audio is not supported.');
    return null;
  }

  audioContext = new AudioContextClass();

  masterGain = audioContext.createGain();
  musicGain = audioContext.createGain();
  effectsGain = audioContext.createGain();

  musicGain.connect(masterGain);
  effectsGain.connect(masterGain);
  masterGain.connect(audioContext.destination);

  applyAudioVolumes();

  return audioContext;
}

function applyAudioVolumes() {
  if (!masterGain || !musicGain || !effectsGain) {
    return;
  }

  masterGain.gain.value = soundEnabled ? 1 : 0;
  musicGain.gain.value = musicVolume;
  effectsGain.gain.value = effectVolume;
}

function saveAudioSettings() {
  try {
    localStorage.setItem(
      AUDIO_SETTINGS_KEY,
      JSON.stringify({
        soundEnabled,
        musicVolume,
        effectVolume
      })
    );
  } catch (error) {
    console.warn(
      'Audio settings could not be saved.',
      error
    );
  }
}

function loadAudioSettings() {
  try {
    const savedSettings = localStorage.getItem(
      AUDIO_SETTINGS_KEY
    );

    if (!savedSettings) {
      return;
    }

    const settings = JSON.parse(savedSettings);

    soundEnabled =
      settings.soundEnabled !== false;

    musicVolume = clampVolume(
      settings.musicVolume,
      0.6
    );

    effectVolume = clampVolume(
      settings.effectVolume,
      0.8
    );
  } catch (error) {
    console.warn(
      'Audio settings could not be loaded.',
      error
    );
  }
}

async function unlockAudio() {
  const context = createAudioContext();

  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    try {
      await context.resume();
    } catch (error) {
      console.warn(
        'Audio could not be resumed.',
        error
      );
      return;
    }
  }

  applyAudioVolumes();
}

function createOscillator({
  frequency,
  type = 'sine',
  volume = 0.1,
  destination = musicGain
}) {
  if (!audioContext || !destination) {
    return null;
  }

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start();

  atmosphereNodes.push(
    oscillator,
    gain
  );

  return {
    oscillator,
    gain
  };
}

function createNoise({
  volume = 0.05,
  lowpass = 1000
}) {
  if (!audioContext || !musicGain) {
    return null;
  }

  const bufferLength =
    audioContext.sampleRate * 2;

  const buffer =
    audioContext.createBuffer(
      1,
      bufferLength,
      audioContext.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let index = 0;
    index < bufferLength;
    index++
  ) {
    data[index] =
      Math.random() * 2 - 1;
  }

  const source =
    audioContext.createBufferSource();

  const filter =
    audioContext.createBiquadFilter();

  const gain =
    audioContext.createGain();

  source.buffer = buffer;
  source.loop = true;

  filter.type = 'lowpass';
  filter.frequency.value = lowpass;

  gain.gain.value = volume;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);

  source.start();

  atmosphereNodes.push(
    source,
    filter,
    gain
  );

  return {
    source,
    filter,
    gain
  };
}

function stopAtmosphere() {
  atmosphereNodes.forEach(node => {
    try {
      if (
        typeof node.stop === 'function'
      ) {
        node.stop();
      }

      if (
        typeof node.disconnect === 'function'
      ) {
        node.disconnect();
      }
    } catch (error) {
      // Node may already be stopped.
    }
  });

  atmosphereNodes = [];
}

function playMenuMusic() {
  // Main menu stays quiet.
}

function playIslandAmbience() {
  const breeze = createNoise({
    volume: 0.006,
    lowpass: 260
  });

  if (!breeze) {
    return;
  }

  const breezeLfo =
    audioContext.createOscillator();

  const breezeDepth =
    audioContext.createGain();

  breezeLfo.type = 'sine';
  breezeLfo.frequency.value = 0.07;
  breezeDepth.gain.value = 0.003;

  breezeLfo.connect(breezeDepth);
  breezeDepth.connect(
    breeze.gain.gain
  );

  breezeLfo.start();

  atmosphereNodes.push(
    breezeLfo,
    breezeDepth
  );
}

function playBeachWaves() {
  const noise = createNoise({
    volume: 0.025,
    lowpass: 1500
  });

  if (!noise) {
    return;
  }

  noise.gain.gain.value = 0.012;

  const waveLfo =
    audioContext.createOscillator();

  const waveDepth =
    audioContext.createGain();

  waveLfo.type = 'sine';
  waveLfo.frequency.value = 0.18;
  waveDepth.gain.value = 0.01;

  waveLfo.connect(waveDepth);
  waveDepth.connect(
    noise.gain.gain
  );

  waveLfo.start();

  atmosphereNodes.push(
    waveLfo,
    waveDepth
  );
}

function playJungleAmbience() {
  const insectOne = createOscillator({
    frequency: 4800,
    type: 'sine',
    volume: 0.002
  });

  createOscillator({
    frequency: 5600,
    type: 'sine',
    volume: 0.0015
  });

  if (!insectOne) {
    return;
  }

  const jungleLfo =
    audioContext.createOscillator();

  const jungleDepth =
    audioContext.createGain();

  jungleLfo.type = 'sine';
  jungleLfo.frequency.value = 3.5;
  jungleDepth.gain.value = 0.0015;

  jungleLfo.connect(jungleDepth);
  jungleDepth.connect(
    insectOne.gain.gain
  );

  jungleLfo.start();

  atmosphereNodes.push(
    jungleLfo,
    jungleDepth
  );
}

function playFirePitAmbience() {
  const fireNoise = createNoise({
    volume: 0.012,
    lowpass: 1800
  });

  if (!fireNoise) {
    return;
  }

  const crackleLfo =
    audioContext.createOscillator();

  const crackleDepth =
    audioContext.createGain();

  crackleLfo.type = 'square';
  crackleLfo.frequency.value = 5;
  crackleDepth.gain.value = 0.009;

  crackleLfo.connect(crackleDepth);
  crackleDepth.connect(
    fireNoise.gain.gain
  );

  crackleLfo.start();

  atmosphereNodes.push(
    crackleLfo,
    crackleDepth
  );
}

function playChallengeMusic() {
  createOscillator({
    frequency: 110,
    type: 'triangle',
    volume: 0.018
  });

  createOscillator({
    frequency: 165,
    type: 'sine',
    volume: 0.012
  });
}

function playCeremonyMusic() {
  createOscillator({
    frequency: 73.42,
    type: 'sine',
    volume: 0.018
  });

  createOscillator({
    frequency: 146.83,
    type: 'triangle',
    volume: 0.012
  });
}

function playAtmosphere(type = 'island') {
  currentAtmosphere = type;

  if (!soundEnabled) {
    return;
  }

  const context = createAudioContext();

  if (
    !context ||
    context.state !== 'running'
  ) {
    return;
  }

  stopAtmosphere();

  const atmosphereMap = {
    menu: playMenuMusic,
    island: playIslandAmbience,
    villa: playIslandAmbience,
    beach: playBeachWaves,
    arrival: playBeachWaves,
    jungle: playJungleAmbience,
    firepit: playFirePitAmbience,
    challenge: playChallengeMusic,
    ceremony: playCeremonyMusic
  };

  const atmosphere =
    atmosphereMap[type] ||
    playIslandAmbience;

  atmosphere();
}

function playClickSound() {
  if (!soundEnabled) {
    return;
  }

  const context = createAudioContext();

  if (
    !context ||
    context.state !== 'running' ||
    !effectsGain
  ) {
    return;
  }

  const oscillator =
    context.createOscillator();

  const gain =
    context.createGain();

  oscillator.type = 'sine';

  oscillator.frequency.setValueAtTime(
    420,
    context.currentTime
  );

  oscillator.frequency
    .exponentialRampToValueAtTime(
      260,
      context.currentTime + 0.04
    );

  gain.gain.setValueAtTime(
    effectVolume * 0.06,
    context.currentTime
  );

  gain.gain
    .exponentialRampToValueAtTime(
      0.001,
      context.currentTime + 0.05
    );

  oscillator.connect(gain);
  gain.connect(effectsGain);

  oscillator.start();

  oscillator.stop(
    context.currentTime + 0.06
  );
}

async function toggleSound() {
  soundEnabled = !soundEnabled;

  if (!soundEnabled) {
    stopAtmosphere();
    applyAudioVolumes();
    updateSoundButton();
    saveAudioSettings();
    return;
  }

  await unlockAudio();

  applyAudioVolumes();
  stopAtmosphere();

  if (
    currentAtmosphere !== 'menu'
  ) {
    playAtmosphere(
      currentAtmosphere
    );
  }

  updateSoundButton();
  saveAudioSettings();
}

function updateSoundButton() {
  const button =
    document.getElementById(
      'soundToggle'
    );

  if (!button) {
    return;
  }

  button.textContent = soundEnabled
    ? '🔊 Sound On'
    : '🔇 Sound Off';
}

function updateAudioSliders() {
  const musicSlider =
    document.getElementById(
      'musicVolume'
    );

  const effectsSlider =
    document.getElementById(
      'soundEffectsVolume'
    );

  if (musicSlider) {
    musicSlider.value =
      String(musicVolume);
  }

  if (effectsSlider) {
    effectsSlider.value =
      String(effectVolume);
  }
}

function initializeAudioControls() {
  loadAudioSettings();
  updateSoundButton();
  updateAudioSliders();

  const musicSlider =
    document.getElementById(
      'musicVolume'
    );

  const effectsSlider =
    document.getElementById(
      'soundEffectsVolume'
    );

  if (musicSlider) {
    musicSlider.addEventListener(
      'input',
      function () {
        musicVolume = clampVolume(
          musicSlider.value,
          0.6
        );

        applyAudioVolumes();
        saveAudioSettings();
      }
    );
  }

  if (effectsSlider) {
    effectsSlider.addEventListener(
      'input',
      function () {
        effectVolume = clampVolume(
          effectsSlider.value,
          0.8
        );

        applyAudioVolumes();
        saveAudioSettings();
      }
    );
  }

  document.addEventListener(
    'pointerdown',
    async function () {
      await unlockAudio();

      if (
        soundEnabled &&
        currentAtmosphere !== 'menu' &&
        atmosphereNodes.length === 0
      ) {
        playAtmosphere(
          currentAtmosphere
        );
      }
    },
    { once: true }
  );

  document.addEventListener(
    'click',
    function (event) {
      const button =
        event.target.closest('button');

      if (!button) {
        return;
      }

      if (
        button.id !== 'soundToggle'
      ) {
        playClickSound();
      }
    }
  );
}

window.playAtmosphere =
  playAtmosphere;

window.stopAtmosphere =
  stopAtmosphere;

window.playClickSound =
  playClickSound;

window.toggleSound =
  toggleSound;

window.addEventListener(
  'DOMContentLoaded',
  initializeAudioControls
);