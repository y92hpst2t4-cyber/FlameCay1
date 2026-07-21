'use strict';

const PLAYER_PROFILE_STORAGE_KEY =
  'flameCayPlayerProfile';

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

window.playerSpritePresets =
  playerSpritePresets;

window.playerProfile = {
  name: '',
  pronouns: 'she/her',
  age: '',
  hometown: '',
  occupation: '',
  spritePreset: 1,
  personality: 'romantic'
};

function getCreatorElement(id) {
  return document.getElementById(id);
}

function getPlayerSpritePath(presetNumber) {
  return (
    playerSpritePresets[presetNumber] ||
    playerSpritePresets[1]
  );
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
    const savedProfile =
      localStorage.getItem(
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

function showCreatorStep(stepNumber) {
  const stepOne =
    getCreatorElement('creatorStepOne');

  const stepTwo =
    getCreatorElement(
      'creatorStepTwoPlaceholder'
    );

  if (!stepOne || !stepTwo) {
    return;
  }

  stepOne.classList.toggle(
    'hidden',
    stepNumber !== 1
  );

  stepTwo.classList.toggle(
    'hidden',
    stepNumber !== 2
  );

  window.scrollTo(0, 0);
}

function updateIdentityStep() {
  const nameInput =
    getCreatorElement('playerName');

  const pronounsInput =
    getCreatorElement('playerPronouns');

  const preview =
    getCreatorElement(
      'creatorIdentityPreview'
    );

  const continueButton =
    getCreatorElement(
      'creatorStepOneContinue'
    );

  if (
    !nameInput ||
    !pronounsInput ||
    !preview ||
    !continueButton
  ) {
    return;
  }

  const name = nameInput.value.trim();
  const pronouns = pronounsInput.value;

  window.playerProfile.name = name;
  window.playerProfile.pronouns = pronouns;

  if (!name) {
    preview.textContent =
      'Your introduction will appear here.';

    continueButton.disabled = true;
    return;
  }

  preview.textContent =
    `Welcome, ${name}. Your pronouns are ${pronouns}.`;

  continueButton.disabled = false;
}

function continueFromIdentityStep() {
  updateIdentityStep();

  if (!window.playerProfile.name) {
    return;
  }

  savePlayerProfile();

  const savedName =
    getCreatorElement('creatorSavedName');

  if (savedName) {
    savedName.textContent =
      `Welcome, ${window.playerProfile.name}`;
  }

  showCreatorStep(2);
}

function returnToMainMenu() {
  const creator =
    getCreatorElement('characterCreator');

  const menu =
    getCreatorElement('menu');

  if (creator) {
    creator.classList.add('hidden');
  }

  if (menu) {
    menu.classList.remove('hidden');
  }

  showCreatorStep(1);
  window.scrollTo(0, 0);
}

function restoreIdentityStep() {
  const savedProfile =
    loadPlayerProfile();

  if (savedProfile) {
    window.playerProfile = {
      ...window.playerProfile,
      ...savedProfile,
      spritePreset:
        Number(savedProfile.spritePreset) || 1
    };
  }

  const nameInput =
    getCreatorElement('playerName');

  const pronounsInput =
    getCreatorElement('playerPronouns');

  if (nameInput) {
    nameInput.value =
      window.playerProfile.name || '';
  }

  if (pronounsInput) {
    pronounsInput.value =
      window.playerProfile.pronouns ||
      'she/her';
  }

  updateIdentityStep();
}

function renderPlayerScenePortrait() {
  const profile = window.playerProfile;

  if (!profile || !profile.name) {
    return;
  }

  const portraitContainer =
    getCreatorElement(
      'playerScenePortrait'
    );

  const sceneAvatar =
    getCreatorElement('playerSceneAvatar');

  const sceneName =
    getCreatorElement('playerSceneName');

  const scenePersonality =
    getCreatorElement(
      'playerScenePersonality'
    );

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

  const spritePath =
    getPlayerSpritePath(
      profile.spritePreset
    );

  sceneAvatar.className =
    'playerSceneAvatar';

  sceneAvatar.style.overflow = 'hidden';
  sceneAvatar.style.background =
    'transparent';

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
    personalityTitles[
      profile.personality
    ] || 'New Islander';

  portraitContainer.classList.remove(
    'hidden'
  );
}

function initializeCharacterCreator() {
  const nameInput =
    getCreatorElement('playerName');

  const pronounsInput =
    getCreatorElement('playerPronouns');

  const continueButton =
    getCreatorElement(
      'creatorStepOneContinue'
    );

  const backToMenuButton =
    getCreatorElement(
      'creatorBackToMenu'
    );

  const returnToStepOneButton =
    getCreatorElement(
      'creatorReturnToStepOne'
    );

  if (nameInput) {
    nameInput.addEventListener(
      'input',
      updateIdentityStep
    );
  }

  if (pronounsInput) {
    pronounsInput.addEventListener(
      'change',
      updateIdentityStep
    );
  }

  if (continueButton) {
    continueButton.addEventListener(
      'click',
      continueFromIdentityStep
    );
  }

  if (backToMenuButton) {
    backToMenuButton.addEventListener(
      'click',
      returnToMainMenu
    );
  }

  if (returnToStepOneButton) {
    returnToStepOneButton.addEventListener(
      'click',
      function () {
        showCreatorStep(1);
      }
    );
  }

  restoreIdentityStep();
  showCreatorStep(1);
}

window.renderPlayerScenePortrait =
  renderPlayerScenePortrait;

window.addEventListener(
  'DOMContentLoaded',
  initializeCharacterCreator
);