'use strict';

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