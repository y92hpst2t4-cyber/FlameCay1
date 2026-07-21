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
      console.warn('Audio could not be resumed.', error);
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
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start();

  atmosphereNodes.push(oscillator, gain);

  return {
    oscillator,
    gain
  };
}

function createNoise({
  volume = 0.05,
  lowpass = 1000
}) {
  const bufferLength =
    audioContext.sampleRate * 2;

  const buffer = audioContext.createBuffer(
    1,
    bufferLength,
    audioContext.sampleRate
  );

  const data = buffer.getChannelData(0);

  for (let index = 0; index < bufferLength; index++) {
    data[index] = Math.random() * 2 - 1;
  }

  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  source.buffer = buffer;
  source.loop = true;

  filter.type = 'lowpass';
  filter.frequency.value = lowpass;

  gain.gain.value = volume;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);

  source.start();

  atmosphereNodes.push(source, filter, gain);

  return {
    source,
    filter,
    gain
  };
}

function stopAtmosphere() {
  atmosphereNodes.forEach(node => {
    try {
      if (typeof node.stop === 'function') {
        node.stop();
      }

      node.disconnect();
    } catch (error) {
      // Node may already be stopped.
    }
  });

  atmosphereNodes = [];
}

function playMenuMusic() {
  // Keep the main menu silent for now.
  // Continuous generated tones can glitch on iPhone Safari.
}

function playIslandAmbience() {
  createNoise({
    volume: 0.018,
    lowpass: 700
  });
}
  
function playBeachWaves() {
  const noise = createNoise({
    volume: 0.08,
    lowpass: 1500
  });

  noise.gain.gain.value = 0.04;

  const waveLfo = audioContext.createOscillator();
  const waveDepth = audioContext.createGain();

  waveLfo.frequency.value = 0.18;
  waveDepth.gain.value = 0.035;

  waveLfo.connect(waveDepth);
  waveDepth.connect(noise.gain.gain);

  waveLfo.start();

  atmosphereNodes.push(waveLfo, waveDepth);
}

function playJungleAmbience() {
  createNoise({
    volume: 0.025,
    lowpass: 1200
  });

  createOscillator({
    frequency: 4200,
    type: 'sine',
    volume: 0.008
  });

  createOscillator({
    frequency: 5100,
    type: 'square',
    volume: 0.003
  });
}

function playFirePitAmbience() {
  createNoise({
    volume: 0.045,
    lowpass: 2800
  });

  createOscillator({
    frequency: 75,
    type: 'sine',
    volume: 0.018
  });
}

function playChallengeMusic() {
  createOscillator({
    frequency: 110,
    type: 'square',
    volume: 0.06
  });

  createOscillator({
    frequency: 165,
    type: 'triangle',
    volume: 0.05
  });

  createOscillator({
    frequency: 440,
    type: 'sawtooth',
    volume: 0.025
  });
}

function playCeremonyMusic() {
  createOscillator({
    frequency: 73.42,
    type: 'sine',
    volume: 0.07
  });

  createOscillator({
    frequency: 146.83,
    type: 'triangle',
    volume: 0.06
  });

  createOscillator({
    frequency: 174.61,
    type: 'sine',
    volume: 0.04
  });
}

function playAtmosphere(type = 'island') {
  currentAtmosphere = type;

  if (!soundEnabled) {
    return;
  }

  const context = createAudioContext();

  if (!context || context.state !== 'running') {
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

  if (!context || context.state !== 'running') {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';

  oscillator.frequency.setValueAtTime(
    420,
    context.currentTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    260,
    context.currentTime + 0.04
  );

  gain.gain.setValueAtTime(
    effectVolume * 0.06,
    context.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
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

  if (currentAtmosphere !== 'menu') {
    playAtmosphere(currentAtmosphere);
  }

  updateSoundButton();
  saveAudioSettings();
}

function updateSoundButton() {
  const button = document.getElementById(
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
  const musicSlider = document.getElementById(
    'musicVolume'
  );

  const effectsSlider = document.getElementById(
    'soundEffectsVolume'
  );

  if (musicSlider) {
    musicSlider.value = String(musicVolume);
  }

  if (effectsSlider) {
    effectsSlider.value = String(effectVolume);
  }
}

function initializeAudioControls() {
  loadAudioSettings();
  updateSoundButton();
  updateAudioSliders();

  const musicSlider = document.getElementById(
    'musicVolume'
  );

  const effectsSlider = document.getElementById(
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
      playAtmosphere(currentAtmosphere);
    }
  },
  { once: true }
);

  document.addEventListener(
    'click',
    function (event) {
      if (event.target.closest('button')) {
        playClickSound();
      }
    }
  );
}

window.playAtmosphere = playAtmosphere;
window.stopAtmosphere = stopAtmosphere;
window.playClickSound = playClickSound;

window.addEventListener(
  'DOMContentLoaded',
  initializeAudioControls
);