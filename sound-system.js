'use strict';

const AUDIO_SETTINGS_KEY = 'flameCayAudioSettings';

let soundEnabled = true;
let musicVolume = 0.6;
let effectVolume = 0.8;
let audioUnlocked = false;

const backgroundMusic = new Audio(
  'sounds/island-theme.mp3'
);

backgroundMusic.loop = true;

const clickSound = new Audio(
  'sounds/button-click.mp3'
);

function clampVolume(value, fallback) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, number));
}

function applyAudioVolumes() {
  backgroundMusic.volume = soundEnabled
    ? musicVolume
    : 0;

  clickSound.volume = soundEnabled
    ? effectVolume
    : 0;
}

function saveAudioSettings() {
  try {
    const settings = {
      soundEnabled,
      musicVolume,
      effectVolume
    };

    localStorage.setItem(
      AUDIO_SETTINGS_KEY,
      JSON.stringify(settings)
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

function startBackgroundMusic() {
  if (!soundEnabled || !audioUnlocked) {
    return;
  }

  applyAudioVolumes();

  backgroundMusic.play().catch(() => {
    console.log(
      'Music will begin after the player taps the screen.'
    );
  });
}

function unlockAudio() {
  if (audioUnlocked) {
    return;
  }

  audioUnlocked = true;
  startBackgroundMusic();
}

function playClickSound() {
  if (!soundEnabled || !audioUnlocked) {
    return;
  }

  clickSound.currentTime = 0;
  clickSound.volume = effectVolume;

  clickSound.play().catch(() => {});
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  applyAudioVolumes();

  if (soundEnabled) {
    unlockAudio();
    startBackgroundMusic();
  } else {
    backgroundMusic.pause();
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
  applyAudioVolumes();
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
    unlockAudio,
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

window.addEventListener(
  'DOMContentLoaded',
  initializeAudioControls
);