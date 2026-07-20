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

window.playerSpritePresets = playerSpritePresets;

window.playerProfile = {
  name: '',
  pronouns: 'she/her',
  spritePreset: 1,
  personality: 'romantic'
};

const PLAYER_PROFILE_STORAGE_KEY = 'flameCayPlayerProfile';

function getCharacterCreatorElement(id) {
  return document.getElementById(id);
}

function getSelectedSpritePreset() {
  const selectedPreset = document.querySelector(
    'input[name="playerSpritePreset"]:checked'
  );

  if (!selectedPreset) {
    return 1;
  }

  const presetNumber = Number(selectedPreset.value);

  return playerSpritePresets[presetNumber]
    ? presetNumber
    : 1;
}

function getPlayerSpritePath(presetNumber) {
  return playerSpritePresets[presetNumber] ||
    playerSpritePresets[1];
}

function updatePresetCardSelection() {
  const presetCards = document.querySelectorAll(
    '.playerPresetCard'
  );

  presetCards.forEach(card => {
    const radio = card.querySelector(
      'input[name="playerSpritePreset"]'
    );

    card.classList.toggle(
      'selected',
      Boolean(radio && radio.checked)
    );
  });
}

function renderCreatorPreview() {
  const avatarPreview = getCharacterCreatorElement(
    'playerAvatarPreview'
  );

  if (!avatarPreview) {
    return;
  }

  const spritePath = getPlayerSpritePath(
    window.playerProfile.spritePreset
  );

  avatarPreview.className = 'playerPresetMainPreview';

  avatarPreview.style.width = '100%';
  avatarPreview.style.maxWidth = '280px';
  avatarPreview.style.height = '380px';
  avatarPreview.style.margin = '0 auto';
  avatarPreview.style.background = 'transparent';
  avatarPreview.style.border = 'none';
  avatarPreview.style.borderRadius = '0';
  avatarPreview.style.overflow = 'hidden';

  avatarPreview.innerHTML = `
    <img
      src="${spritePath}"
      alt="Selected player character"
      style="
        display:block;
        width:100%;
        height:100%;
        object-fit:contain;
        object-position:center bottom;
      "
    >
  `;
}

function updateCharacterPreview() {
  const nameInput = getCharacterCreatorElement('playerName');
  const pronounsInput =
    getCharacterCreatorElement('playerPronouns');
  const personalityInput =
    getCharacterCreatorElement('playerPersonality');

  if (
    !nameInput ||
    !pronounsInput ||
    !personalityInput
  ) {
    return;
  }

  const name = nameInput.value.trim();
  const spritePreset = getSelectedSpritePreset();

  window.playerProfile = {
    name,
    pronouns: pronounsInput.value,
    spritePreset,
    personality: personalityInput.value
  };

  const previewName =
    getCharacterCreatorElement('playerPreviewName');

  const previewDetails =
    getCharacterCreatorElement('playerPreviewDetails');

  const confirmButton =
    getCharacterCreatorElement('confirmCharacterButton');

  if (
    !previewName ||
    !previewDetails ||
    !confirmButton
  ) {
    return;
  }

  previewName.textContent = name || 'Your Islander';

  previewDetails.textContent =
    `Preset ${spritePreset} • ` +
    `${personalityInput.options[
      personalityInput.selectedIndex
    ].text}`;

  confirmButton.disabled = name.length === 0;

  updatePresetCardSelection();
  renderCreatorPreview();
}

function savePlayerProfile() {
  try {
    localStorage.setItem(
      PLAYER_PROFILE_STORAGE_KEY,
      JSON.stringify(window.playerProfile)
    );
  } catch (error) {
    console.warn(
      'Player profile could not be saved.',
      error
    );
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
    console.warn(
      'Player profile could not be loaded.',
      error
    );

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

  const personalityTitles = {
    romantic: '💕 Romantic Islander',
    loyal: '💚 Loyal Islander',
    bold: '🔥 Bold Islander',
    strategic: '🧠 Strategic Islander'
  };

  const spritePath = getPlayerSpritePath(
    profile.spritePreset
  );

  sceneAvatar.className = 'playerSceneAvatar';

  sceneAvatar.style.overflow = 'hidden';
  sceneAvatar.style.background = 'transparent';

  sceneAvatar.innerHTML = `
    <img
      src="${spritePath}"
      alt="${profile.name}"
      style="
        display:block;
        width:100%;
        height:100%;
        object-fit:contain;
        object-position:center bottom;
      "
    >
  `;

  sceneName.textContent = profile.name;

  scenePersonality.textContent =
    personalityTitles[profile.personality] ||
    'New Islander';

  portraitContainer.classList.remove('hidden');
}

function restorePlayerCreatorForm() {
  const savedProfile = loadPlayerProfile();

  if (!savedProfile) {
    return;
  }

  window.playerProfile = {
    ...window.playerProfile,
    ...savedProfile,
    spritePreset:
      Number(savedProfile.spritePreset) || 1
  };

  const nameInput =
    getCharacterCreatorElement('playerName');

  const pronounsInput =
    getCharacterCreatorElement('playerPronouns');

  const personalityInput =
    getCharacterCreatorElement('playerPersonality');

  if (nameInput) {
    nameInput.value = window.playerProfile.name || '';
  }

  if (pronounsInput) {
    pronounsInput.value =
      window.playerProfile.pronouns || 'she/her';
  }

  if (personalityInput) {
    personalityInput.value =
      window.playerProfile.personality || 'romantic';
  }

  const savedPreset = document.querySelector(
    `input[name="playerSpritePreset"][value="${window.playerProfile.spritePreset}"]`
  );

  if (savedPreset) {
    savedPreset.checked = true;
  }
}

function confirmPlayerCharacter() {
  updateCharacterPreview();

  if (!window.playerProfile.name) {
    alert('Please enter your character name.');
    return;
  }

  window.playerPronouns =
    window.playerProfile.pronouns;

  window.playerSpritePreset =
    window.playerProfile.spritePreset;

  window.playerPersonality =
    window.playerProfile.personality;

  savePlayerProfile();

  try {
    startGame();

    const creator =
      getCharacterCreatorElement('characterCreator');

    if (creator) {
      creator.classList.add('hidden');
    }

    renderPlayerScenePortrait();
  } catch (error) {
    console.error('New game startup error:', error);

    alert(
      'Game startup error: ' +
      (error?.message || String(error))
    );
  }
}

function initializeCharacterCreator() {
  const controlIds = [
    'playerName',
    'playerPronouns',
    'playerPersonality'
  ];

  controlIds.forEach(id => {
    const control = getCharacterCreatorElement(id);

    if (!control) {
      return;
    }

    control.addEventListener(
      'input',
      updateCharacterPreview
    );

    control.addEventListener(
      'change',
      updateCharacterPreview
    );
  });

  const presetInputs = document.querySelectorAll(
    'input[name="playerSpritePreset"]'
  );

  presetInputs.forEach(input => {
    input.addEventListener(
      'change',
      updateCharacterPreview
    );
  });

  const confirmButton =
    getCharacterCreatorElement(
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