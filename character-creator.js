'use strict';

const playerSpritePresets = {
  1: 'player-sprites/2FFB9EAD-79CB-47C9-93DB-B75F1A3C0DF5.png',
  2: 'player-sprites/AD4DA575-4307-4915-A00B-5840D120177B.png',
  3: 'player-sprites/E1FB32B8-80B6-436D-9FF4-22DFC345AE83.png',
  4: 'player-sprites/618E0EFF-7956-45BE-BC38-F6E6DF5847A9.png',
  5: 'player-sprites/50DC97F4-3772-4E16-BC7A-9427F3A06FC0.png',
  6: 'player-sprites/DE96B228-6D9B-4C45-BA1F-F8F7869A480A.png',
  7: 'player-sprites/AB762639-536E-41A4-8908-0E8BB4D013E8.png',
  8: 'player-sprites/CB7DD06E-B5B7-4946-BBC2-B8F4489B5D8A.png'
};

// Phase 1 — Player Character Creator

// Phase 1 — Player Character Creator

window.playerProfile = {
  name: '',
  pronouns: 'she/her',
  skinTone: 'light',
  hairstyle: 'short',
  hairColor: 'black',
  outfit: 'island-casual',
  personality: 'romantic'
};

const PLAYER_PROFILE_STORAGE_KEY = 'flameCayPlayerProfile';

function getCharacterCreatorElement(id) {
  return document.getElementById(id);
}

function formatCharacterOption(value) {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function updateCharacterPreview() {
  const nameInput = getCharacterCreatorElement('playerName');
  const pronounsInput = getCharacterCreatorElement('playerPronouns');
  const skinToneInput = getCharacterCreatorElement('playerSkinTone');
  const hairstyleInput = getCharacterCreatorElement('playerHairstyle');
  const hairColorInput = getCharacterCreatorElement('playerHairColor');
  const outfitInput = getCharacterCreatorElement('playerOutfit');
  const personalityInput = getCharacterCreatorElement('playerPersonality');

  if (
    !nameInput ||
    !pronounsInput ||
    !skinToneInput ||
    !hairstyleInput ||
    !hairColorInput ||
    !outfitInput ||
    !personalityInput
  ) {
    return;
  }

  const name = nameInput.value.trim();

  window.playerProfile = {
    name,
    pronouns: pronounsInput.value,
    skinTone: skinToneInput.value,
    hairstyle: hairstyleInput.value,
    hairColor: hairColorInput.value,
    outfit: outfitInput.value,
    personality: personalityInput.value
  };

  const previewName = getCharacterCreatorElement('playerPreviewName');
  const avatarPreview = getCharacterCreatorElement('playerAvatarPreview');
  const previewDetails = getCharacterCreatorElement('playerPreviewDetails');
  const confirmButton = getCharacterCreatorElement('confirmCharacterButton');

  if (
    !previewName ||
    !avatarPreview ||
    !previewDetails ||
    !confirmButton
  ) {
    return;
  }

  const skinColors = {
    light: '#f6d2b8',
    'medium-light': '#e8b98f',
    medium: '#c98a5b',
    'medium-dark': '#9a5f3d',
    dark: '#5c3425'
  };

  const hairColors = {
    black: '#1f1a17',
    brown: '#4a2d1f',
    blonde: '#d8b45a',
    red: '#8f3f2b',
    silver: '#b9bcc2'
  };

  previewName.textContent = name || 'Your Islander';

  avatarPreview.className = '';
  avatarPreview.id = 'playerAvatarPreview';
  avatarPreview.classList.add(window.playerProfile.hairstyle);

  avatarPreview.style.setProperty(
    '--avatar-skin',
    skinColors[window.playerProfile.skinTone] || skinColors.light
  );

  avatarPreview.style.setProperty(
    '--avatar-hair',
    hairColors[window.playerProfile.hairColor] || hairColors.black
  );

  previewDetails.textContent =
    formatCharacterOption(window.playerProfile.hairColor) +
    ' ' +
    formatCharacterOption(window.playerProfile.hairstyle) +
    ' • ' +
    formatCharacterOption(window.playerProfile.outfit) +
    ' • ' +
    formatCharacterOption(window.playerProfile.personality);

  confirmButton.disabled = name.length === 0;
}

function savePlayerProfile() {
  try {
    localStorage.setItem(
      PLAYER_PROFILE_STORAGE_KEY,
      JSON.stringify(window.playerProfile)
    );
  } catch (error) {
    console.warn('Player profile could not be saved.', error);
  }
}

function loadPlayerProfile() {
  try {
    const savedProfile = localStorage.getItem(
      PLAYER_PROFILE_STORAGE_KEY
    );

    if (!savedProfile) {
      return null;
    }

    return JSON.parse(savedProfile);
  } catch (error) {
    console.warn('Player profile could not be loaded.', error);
    return null;
  }
}

function renderPlayerScenePortrait() {
  const profile = window.playerProfile;

  if (!profile || !profile.name) {
    return;
  }

  const portraitContainer =
    getCharacterCreatorElement('playerScenePortrait');

  const sceneAvatar =
    getCharacterCreatorElement('playerSceneAvatar');

  const sceneName =
    getCharacterCreatorElement('playerSceneName');

  const scenePersonality =
    getCharacterCreatorElement('playerScenePersonality');

  if (
    !portraitContainer ||
    !sceneAvatar ||
    !sceneName ||
    !scenePersonality
  ) {
    return;
  }

  const skinColors = {
    light: '#f6d2b8',
    'medium-light': '#e8b98f',
    medium: '#c98a5b',
    'medium-dark': '#9a5f3d',
    dark: '#5c3425'
  };

  const hairColors = {
    black: '#1f1a17',
    brown: '#4a2d1f',
    blonde: '#d8b45a',
    red: '#8f3f2b',
    silver: '#b9bcc2'
  };

  const outfitColors = {
    'island-casual': '#2f9e83',
    'summer-glam': '#d95d93',
    sporty: '#315fa8',
    elegant: '#282833',
    bold: '#e0522d'
  };

  const personalityTitles = {
    romantic: '💕 Romantic Islander',
    loyal: '💚 Loyal Islander',
    bold: '🔥 Bold Islander',
    strategic: '🧠 Strategic Islander'
  };

  sceneAvatar.className = 'playerSceneAvatar';
  sceneAvatar.classList.add(profile.hairstyle);

  sceneAvatar.style.setProperty(
    '--scene-skin',
    skinColors[profile.skinTone] || skinColors.light
  );

  sceneAvatar.style.setProperty(
    '--scene-hair',
    hairColors[profile.hairColor] || hairColors.black
  );

  sceneAvatar.style.setProperty(
    '--scene-outfit',
    outfitColors[profile.outfit] || outfitColors['island-casual']
  );

  sceneName.textContent = profile.name;

  scenePersonality.textContent =
    personalityTitles[profile.personality] || 'New Islander';

  portraitContainer.classList.remove('hidden');
}

function restorePlayerCreatorForm() {
  const savedProfile = loadPlayerProfile();

  if (!savedProfile) {
    return;
  }

  window.playerProfile = {
    ...window.playerProfile,
    ...savedProfile
  };

  const fieldMap = {
    playerName: 'name',
    playerPronouns: 'pronouns',
    playerSkinTone: 'skinTone',
    playerHairstyle: 'hairstyle',
    playerHairColor: 'hairColor',
    playerOutfit: 'outfit',
    playerPersonality: 'personality'
  };

  Object.entries(fieldMap).forEach(([elementId, profileKey]) => {
    const element = getCharacterCreatorElement(elementId);

    if (
      element &&
      window.playerProfile[profileKey] !== undefined
    ) {
      element.value = window.playerProfile[profileKey];
    }
  });
}

function confirmPlayerCharacter() {
  updateCharacterPreview();

  if (!window.playerProfile.name) {
    alert('Please enter your character name.');
    return;
  }

  window.playerPronouns = window.playerProfile.pronouns;
  window.playerSkinTone = window.playerProfile.skinTone;
  window.playerHairstyle = window.playerProfile.hairstyle;
  window.playerHairColor = window.playerProfile.hairColor;
  window.playerOutfit = window.playerProfile.outfit;
  window.playerPersonality = window.playerProfile.personality;

  savePlayerProfile();

  getCharacterCreatorElement('characterCreator')
    .classList.add('hidden');

  startGame();
  renderPlayerScenePortrait();
}

function initializeCharacterCreator() {
  const controlIds = [
    'playerName',
    'playerPronouns',
    'playerSkinTone',
    'playerHairstyle',
    'playerHairColor',
    'playerOutfit',
    'playerPersonality'
  ];

  controlIds.forEach(id => {
    const control = getCharacterCreatorElement(id);

    if (!control) {
      return;
    }

    control.addEventListener('input', updateCharacterPreview);
    control.addEventListener('change', updateCharacterPreview);
  });

  const confirmButton = getCharacterCreatorElement(
    'confirmCharacterButton'
  );

  if (confirmButton) {
    confirmButton.addEventListener(
      'click',
      confirmPlayerCharacter
    );
  }

  restorePlayerCreatorForm();
  updateCharacterPreview();
}

window.addEventListener(
  'DOMContentLoaded',
  initializeCharacterCreator
);