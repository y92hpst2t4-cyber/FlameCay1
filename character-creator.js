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
  personality: '',
  datingGoal: '',
  firstImpression: '',
  spritePreset: 0
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
  const steps = {
    1: getCreatorElement('creatorStepOne'),
    2: getCreatorElement('creatorStepTwo'),
    3: getCreatorElement('creatorStepThree'),
    4: getCreatorElement('creatorStepFour'),
    5: getCreatorElement(
      'creatorStepFivePlaceholder'
    )
  };

  Object.entries(steps).forEach(
    ([number, element]) => {
      if (!element) {
        return;
      }

      element.classList.toggle(
        'hidden',
        Number(number) !== stepNumber
      );
    }
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
  updateProfileStep();
  showCreatorStep(2);
}

function updateProfileStep() {
  const ageInput =
    getCreatorElement('playerAge');

  const hometownInput =
    getCreatorElement('playerHometown');

  const occupationInput =
    getCreatorElement('playerOccupation');

  const preview =
    getCreatorElement(
      'creatorProfilePreview'
    );

  const continueButton =
    getCreatorElement(
      'creatorStepTwoContinue'
    );

  if (
    !ageInput ||
    !hometownInput ||
    !occupationInput ||
    !preview ||
    !continueButton
  ) {
    return;
  }

  const age = Number(ageInput.value);
  const hometown =
    hometownInput.value.trim();

  const occupation =
    occupationInput.value.trim();

  const validAge =
    Number.isInteger(age) &&
    age >= 18 &&
    age <= 99;

  window.playerProfile.age =
    validAge ? age : '';

  window.playerProfile.hometown =
    hometown;

  window.playerProfile.occupation =
    occupation;

  const profileComplete =
    validAge &&
    hometown.length > 0 &&
    occupation.length > 0;

  if (!profileComplete) {
    preview.textContent =
      'Complete your profile to continue.';

    continueButton.disabled = true;
    return;
  }

  preview.textContent =
    `${window.playerProfile.name}, ${age}, ` +
    `is a ${occupation} from ${hometown}.`;

  continueButton.disabled = false;
}

function continueFromProfileStep() {
  updateProfileStep();

  if (
    !window.playerProfile.age ||
    !window.playerProfile.hometown ||
    !window.playerProfile.occupation
  ) {
    return;
  }

  savePlayerProfile();
  updatePersonalityStep();
  showCreatorStep(3);
}

function updatePersonalityStep() {
  const personalityInput =
    getCreatorElement('playerPersonality');

  const datingGoalInput =
    getCreatorElement('playerDatingGoal');

  const firstImpressionInput =
    getCreatorElement(
      'playerFirstImpression'
    );

  const preview =
    getCreatorElement(
      'creatorPersonalityPreview'
    );

  const continueButton =
    getCreatorElement(
      'creatorStepThreeContinue'
    );

  if (
    !personalityInput ||
    !datingGoalInput ||
    !firstImpressionInput ||
    !preview ||
    !continueButton
  ) {
    return;
  }

  const personality =
    personalityInput.value;

  const datingGoal =
    datingGoalInput.value;

  const firstImpression =
    firstImpressionInput.value;

  window.playerProfile.personality =
    personality;

  window.playerProfile.datingGoal =
    datingGoal;

  window.playerProfile.firstImpression =
    firstImpression;

  const personalityComplete =
    personality &&
    datingGoal &&
    firstImpression;

  if (!personalityComplete) {
    preview.textContent =
      'Choose all three options to continue.';

    continueButton.disabled = true;
    return;
  }

  const datingGoalNames = {
    love: 'a serious relationship',
    connection: 'a real connection',
    adventure: 'romance and adventure',
    open: 'an open experience',
    competition: 'winning the competition'
  };

  preview.textContent =
    `${window.playerProfile.name} is ` +
    `${personality}, is looking for ` +
    `${datingGoalNames[datingGoal]}, ` +
    `and plans to enter the villa feeling ` +
    `${firstImpression}.`;

  continueButton.disabled = false;
}

function continueFromPersonalityStep() {
  updatePersonalityStep();

  if (
    !window.playerProfile.personality ||
    !window.playerProfile.datingGoal ||
    !window.playerProfile.firstImpression
  ) {
    return;
  }

  savePlayerProfile();
  updateAppearanceStep();
  showCreatorStep(4);
}

function updateAppearanceStep() {
  const appearanceOptions =
    document.querySelectorAll(
      '.creatorAppearanceOption'
    );

  const preview =
    getCreatorElement(
      'creatorAppearancePreview'
    );

  const continueButton =
    getCreatorElement(
      'creatorStepFourContinue'
    );

  if (!preview || !continueButton) {
    return;
  }

  const selectedPreset =
    Number(
      window.playerProfile.spritePreset
    );

  appearanceOptions.forEach(option => {
    const optionPreset =
      Number(option.dataset.preset);

    const isSelected =
      optionPreset === selectedPreset;

    option.classList.toggle(
      'selected',
      isSelected
    );

    option.setAttribute(
      'aria-pressed',
      String(isSelected)
    );
  });

  if (
    !selectedPreset ||
    !playerSpritePresets[selectedPreset]
  ) {
    preview.textContent =
      'Select your appearance to continue.';

    continueButton.disabled = true;
    return;
  }

  preview.textContent =
    `Look ${selectedPreset} is selected.`;

  continueButton.disabled = false;
}

function selectAppearance(presetNumber) {
  const validPreset =
    Number(presetNumber);

  if (!playerSpritePresets[validPreset]) {
    return;
  }

  window.playerProfile.spritePreset =
    validPreset;

  updateAppearanceStep();
}

function continueFromAppearanceStep() {
  updateAppearanceStep();

  const selectedPreset =
    Number(
      window.playerProfile.spritePreset
    );

  if (!playerSpritePresets[selectedPreset]) {
    return;
  }

  savePlayerProfile();

  const title =
    getCreatorElement(
      'creatorAppearanceSavedTitle'
    );

  const text =
    getCreatorElement(
      'creatorAppearanceSavedText'
    );

  if (title) {
    title.textContent =
      `${window.playerProfile.name}, your look is ready`;
  }

  if (text) {
    text.textContent =
      `Look ${selectedPreset} will represent you ` +
      `during your story on Flame Cay.`;
  }

  showCreatorStep(5);
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

function restoreCreatorForm() {
  const savedProfile =
    loadPlayerProfile();

  if (savedProfile) {
    window.playerProfile = {
      ...window.playerProfile,
      ...savedProfile,
      spritePreset:
        Number(savedProfile.spritePreset) || 0
    };
  }

  const fieldValues = {
    playerName:
      window.playerProfile.name || '',

    playerPronouns:
      window.playerProfile.pronouns ||
      'she/her',

    playerAge:
      window.playerProfile.age || '',

    playerHometown:
      window.playerProfile.hometown || '',

    playerOccupation:
      window.playerProfile.occupation || '',

    playerPersonality:
      window.playerProfile.personality || '',

    playerDatingGoal:
      window.playerProfile.datingGoal || '',

    playerFirstImpression:
      window.playerProfile.firstImpression || ''
  };

  Object.entries(fieldValues).forEach(
    ([id, value]) => {
      const element =
        getCreatorElement(id);

      if (element) {
        element.value = value;
      }
    }
  );

  updateIdentityStep();
  updateProfileStep();
  updatePersonalityStep();
  updateAppearanceStep();
}

function renderPlayerScenePortrait() {
  const profile =
    window.playerProfile;

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
    strategic: '🧠 Strategic Islander',
    funny: '😄 Funny Islander',
    mysterious: '🌙 Mysterious Islander'
  };

  const spritePath =
    getPlayerSpritePath(
      profile.spritePreset
    );

  sceneAvatar.className =
    'playerSceneAvatar';

  sceneAvatar.style.overflow =
    'hidden';

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

  sceneName.textContent =
    profile.name;

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

  const ageInput =
    getCreatorElement('playerAge');

  const hometownInput =
    getCreatorElement('playerHometown');

  const occupationInput =
    getCreatorElement('playerOccupation');

  const personalityInput =
    getCreatorElement('playerPersonality');

  const datingGoalInput =
    getCreatorElement('playerDatingGoal');

  const firstImpressionInput =
    getCreatorElement(
      'playerFirstImpression'
    );

  const appearanceOptions =
    document.querySelectorAll(
      '.creatorAppearanceOption'
    );

  const stepOneContinue =
    getCreatorElement(
      'creatorStepOneContinue'
    );

  const stepTwoContinue =
    getCreatorElement(
      'creatorStepTwoContinue'
    );

  const stepThreeContinue =
    getCreatorElement(
      'creatorStepThreeContinue'
    );

  const stepFourContinue =
    getCreatorElement(
      'creatorStepFourContinue'
    );

  const backToMenuButton =
    getCreatorElement(
      'creatorBackToMenu'
    );

  const stepTwoBack =
    getCreatorElement(
      'creatorStepTwoBack'
    );

  const stepThreeBack =
    getCreatorElement(
      'creatorStepThreeBack'
    );

  const stepFourBack =
    getCreatorElement(
      'creatorStepFourBack'
    );

  const returnToStepFour =
    getCreatorElement(
      'creatorReturnToStepFour'
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

  [
    ageInput,
    hometownInput,
    occupationInput
  ].forEach(input => {
    if (!input) {
      return;
    }

    input.addEventListener(
      'input',
      updateProfileStep
    );

    input.addEventListener(
      'change',
      updateProfileStep
    );
  });

  [
    personalityInput,
    datingGoalInput,
    firstImpressionInput
  ].forEach(select => {
    if (!select) {
      return;
    }

    select.addEventListener(
      'change',
      updatePersonalityStep
    );
  });

  appearanceOptions.forEach(option => {
    option.addEventListener(
      'click',
      function () {
        selectAppearance(
          this.dataset.preset
        );
      }
    );
  });

  if (stepOneContinue) {
    stepOneContinue.addEventListener(
      'click',
      continueFromIdentityStep
    );
  }

  if (stepTwoContinue) {
    stepTwoContinue.addEventListener(
      'click',
      continueFromProfileStep
    );
  }

  if (stepThreeContinue) {
    stepThreeContinue.addEventListener(
      'click',
      continueFromPersonalityStep
    );
  }

  if (stepFourContinue) {
    stepFourContinue.addEventListener(
      'click',
      continueFromAppearanceStep
    );
  }

  if (backToMenuButton) {
    backToMenuButton.addEventListener(
      'click',
      returnToMainMenu
    );
  }

  if (stepTwoBack) {
    stepTwoBack.addEventListener(
      'click',
      function () {
        showCreatorStep(1);
      }
    );
  }

  if (stepThreeBack) {
    stepThreeBack.addEventListener(
      'click',
      function () {
        showCreatorStep(2);
      }
    );
  }

  if (stepFourBack) {
    stepFourBack.addEventListener(
      'click',
      function () {
        showCreatorStep(3);
      }
    );
  }

  if (returnToStepFour) {
    returnToStepFour.addEventListener(
      'click',
      function () {
        showCreatorStep(4);
      }
    );
  }

  restoreCreatorForm();
  showCreatorStep(1);
}

window.renderPlayerScenePortrait =
  renderPlayerScenePortrait;

window.addEventListener(
  'DOMContentLoaded',
  initializeCharacterCreator
);