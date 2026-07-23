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
  spritePreset: 0,
  outfit: '',
  profileConfirmed: false,

relationships: {
  lucas: {
    friendship: 0,
    romance: 0,
    trust: 0,
    rivalry: 0
  }
},

lucasFirstResponse: ''
};

function continueAfterLucasResponse() {
  const speaker =
    getCreatorElement(
      'meetIslandersSpeaker'
    );

  const dialogueText =
    getCreatorElement(
      'meetIslandersText'
    );

  const continueButton =
    getCreatorElement(
      'meetIslandersContinue'
    );

  const characterImage =
    getCreatorElement(
      'meetIslandersCharacterImage'
    );

  if (
    !speaker ||
    !dialogueText ||
    !continueButton
  ) {
    return;
  }

  const currentStage =
    continueButton.dataset.stage || 'lucas';

  if (currentStage === 'lucas') {
    speaker.textContent =
      'Narrator';

    dialogueText.textContent =
      'Lucas steps back toward the group, but you notice him glance at you one more time.';

    continueButton.textContent =
      'Continue Meeting the Islanders';

    continueButton.dataset.stage =
      'maya';

    continueButton.disabled =
      false;

    return;
  }

  if (currentStage === 'maya') {
    speaker.textContent =
      'Maya';

    dialogueText.textContent =
      'Maya steps forward with a bright smile. “Welcome to Flame Cay. I have a feeling you and I are going to have a lot to talk about.”';

    if (characterImage) {
      characterImage.classList.add(
        'hidden'
      );

      characterImage.alt =
        'Maya character artwork coming soon';
    }

    continueButton.textContent =
      'Continue';

    continueButton.dataset.stage =
      'maya-introduction';

    continueButton.disabled =
      true;
  }
}

function getCreatorElement(id) {
  return document.getElementById(id);
}

function getPlayerSpritePath(
  presetNumber
) {
  return (
    playerSpritePresets[
      presetNumber
    ] ||
    playerSpritePresets[1]
  );
}

function savePlayerProfile() {
  try {
    localStorage.setItem(
      PLAYER_PROFILE_STORAGE_KEY,
      JSON.stringify(
        window.playerProfile
      )
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

    return JSON.parse(
      savedProfile
    );
  } catch (error) {
    console.warn(
      'Player profile could not be loaded.',
      error
    );

    return null;
  }
}

function showCreatorStep(
  stepNumber
) {
  const steps = {
    1: getCreatorElement(
      'creatorStepOne'
    ),
    2: getCreatorElement(
      'creatorStepTwo'
    ),
    3: getCreatorElement(
      'creatorStepThree'
    ),
    4: getCreatorElement(
      'creatorStepFour'
    ),
    5: getCreatorElement(
      'creatorStepFive'
    ),
    6: getCreatorElement(
      'creatorStepSix'
    ),
    7: getCreatorElement(
      'creatorStepSeven'
    )
  };

  Object.entries(
    steps
  ).forEach(
    ([number, element]) => {
      if (!element) {
        return;
      }

      element.classList.toggle(
        'hidden',
        Number(number) !==
          stepNumber
      );
    }
  );

  window.scrollTo(0, 0);
}

function updateIdentityStep() {
  const nameInput =
    getCreatorElement(
      'playerName'
    );

  const pronounsInput =
    getCreatorElement(
      'playerPronouns'
    );

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

  const name =
    nameInput.value.trim();

  const pronouns =
    pronounsInput.value;

  window.playerProfile.name =
    name;

  window.playerProfile.pronouns =
    pronouns;

  if (!name) {
    preview.textContent =
      'Your introduction will appear here.';

    continueButton.disabled =
      true;

    return;
  }

  preview.textContent =
    `Welcome, ${name}. ` +
    `Your pronouns are ${pronouns}.`;

  continueButton.disabled =
    false;
}

function continueFromIdentityStep() {
  updateIdentityStep();

  if (
    !window.playerProfile.name
  ) {
    return;
  }

  savePlayerProfile();
  updateProfileStep();
  showCreatorStep(2);
}

function updateProfileStep() {
  const ageInput =
    getCreatorElement(
      'playerAge'
    );

  const hometownInput =
    getCreatorElement(
      'playerHometown'
    );

  const occupationInput =
    getCreatorElement(
      'playerOccupation'
    );

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

  const age =
    Number(
      ageInput.value
    );

  const hometown =
    hometownInput.value.trim();

  const occupation =
    occupationInput.value.trim();

  const validAge =
    Number.isInteger(age) &&
    age >= 18 &&
    age <= 99;

  window.playerProfile.age =
    validAge
      ? age
      : '';

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

    continueButton.disabled =
      true;

    return;
  }

  preview.textContent =
    `${window.playerProfile.name}, ` +
    `${age}, is a ${occupation} ` +
    `from ${hometown}.`;

  continueButton.disabled =
    false;
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
    getCreatorElement(
      'playerPersonality'
    );

  const datingGoalInput =
    getCreatorElement(
      'playerDatingGoal'
    );

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

  if (
    !personality ||
    !datingGoal ||
    !firstImpression
  ) {
    preview.textContent =
      'Choose all three options to continue.';

    continueButton.disabled =
      true;

    return;
  }

  const datingGoalNames = {
    love:
      'a serious relationship',

    connection:
      'a real connection',

    adventure:
      'romance and adventure',

    open:
      'an open experience',

    competition:
      'winning the competition'
  };

  preview.textContent =
    `${window.playerProfile.name} ` +
    `is ${personality}, is looking ` +
    `for ${datingGoalNames[datingGoal]}, ` +
    `and plans to enter the villa ` +
    `feeling ${firstImpression}.`;

  continueButton.disabled =
    false;
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

  if (
    !preview ||
    !continueButton
  ) {
    return;
  }

  const selectedPreset =
    Number(
      window.playerProfile.spritePreset
    );

  appearanceOptions.forEach(
    option => {
      const optionPreset =
        Number(
          option.dataset.preset
        );

      const isSelected =
        optionPreset ===
        selectedPreset;

      option.classList.toggle(
        'selected',
        isSelected
      );

      option.setAttribute(
        'aria-pressed',
        String(isSelected)
      );
    }
  );

  if (
    !selectedPreset ||
    !playerSpritePresets[
      selectedPreset
    ]
  ) {
    preview.textContent =
      'Select your appearance to continue.';

    continueButton.disabled =
      true;

    return;
  }

  preview.textContent =
    `Look ${selectedPreset} ` +
    `is selected.`;

  continueButton.disabled =
    false;
}

function selectAppearance(
  presetNumber
) {
  const validPreset =
    Number(
      presetNumber
    );

  if (
    !playerSpritePresets[
      validPreset
    ]
  ) {
    return;
  }

  window.playerProfile.spritePreset =
    validPreset;

  window.playerProfile.profileConfirmed =
    false;

  updateAppearanceStep();
}

function populateReviewStep() {
  const profile =
    window.playerProfile;

  const personalityNames = {
    romantic:
      'Romantic',

    loyal:
      'Loyal',

    bold:
      'Bold',

    strategic:
      'Strategic',

    funny:
      'Funny',

    mysterious:
      'Mysterious'
  };

  const datingGoalNames = {
    love:
      'A serious relationship',

    connection:
      'A real connection',

    adventure:
      'Romance and adventure',

    open:
      'Keeping options open',

    competition:
      'Winning the competition'
  };

  const impressionNames = {
    confident:
      'Confident',

    friendly:
      'Friendly',

    flirty:
      'Flirty',

    calm:
      'Calm',

    mysterious:
      'Mysterious'
  };

  const reviewImage =
    getCreatorElement(
      'creatorReviewImage'
    );

  if (reviewImage) {
    reviewImage.src =
      getPlayerSpritePath(
        profile.spritePreset
      );

    reviewImage.alt =
      `${profile.name}'s selected character`;
  }

  const reviewValues = {
    creatorReviewName:
      profile.name ||
      'New Islander',

    creatorReviewBasicInfo:
      `${profile.age} · ` +
      `${profile.occupation} · ` +
      `${profile.hometown}`,

    creatorReviewPronouns:
      profile.pronouns ||
      '—',

    creatorReviewPersonality:
      personalityNames[
        profile.personality
      ] ||
      '—',

    creatorReviewDatingGoal:
      datingGoalNames[
        profile.datingGoal
      ] ||
      '—',

    creatorReviewFirstImpression:
      impressionNames[
        profile.firstImpression
      ] ||
      '—'
  };

  Object.entries(
    reviewValues
  ).forEach(
    ([id, value]) => {
      const element =
        getCreatorElement(id);

      if (element) {
        element.textContent =
          value;
      }
    }
  );
}

function continueFromAppearanceStep() {
  updateAppearanceStep();

  const selectedPreset =
    Number(
      window.playerProfile.spritePreset
    );

  if (
    !playerSpritePresets[
      selectedPreset
    ]
  ) {
    return;
  }

  savePlayerProfile();
  populateReviewStep();
  showCreatorStep(5);
}

function confirmContestantProfile() {
  window.playerProfile.profileConfirmed =
    false;

  savePlayerProfile();
  updateOutfitStep();
  showCreatorStep(6);
}

function updateOutfitStep() {
  const outfitOptions =
    document.querySelectorAll(
      '.creatorOutfitOption'
    );

  const preview =
    getCreatorElement(
      'creatorOutfitPreview'
    );

  const continueButton =
    getCreatorElement(
      'creatorStepSixContinue'
    );

  const selectedOutfit =
    window.playerProfile.outfit;

  const outfitNames = {
    sunset:
      'Sunset Glow',

    ocean:
      'Ocean Breeze',

    midnight:
      'Midnight Flame',

    tropical:
      'Tropical Heat'
  };

  outfitOptions.forEach(
    option => {
      const isSelected =
        option.dataset.outfit ===
        selectedOutfit;

      option.classList.toggle(
        'selected',
        isSelected
      );

      option.setAttribute(
        'aria-pressed',
        String(isSelected)
      );
    }
  );

  if (
    !outfitNames[
      selectedOutfit
    ]
  ) {
    if (preview) {
      preview.textContent =
        'Select your arrival outfit to continue.';
    }

    if (continueButton) {
      continueButton.disabled =
        true;
    }

    return;
  }

  if (preview) {
    preview.textContent =
      `${outfitNames[selectedOutfit]} selected.`;
  }

  if (continueButton) {
    continueButton.disabled =
      false;
  }
}

function selectOutfit(outfit) {
  const validOutfits = [
    'sunset',
    'ocean',
    'midnight',
    'tropical'
  ];

  if (
    !validOutfits.includes(
      outfit
    )
  ) {
    return;
  }

  window.playerProfile.outfit =
    outfit;

  window.playerProfile.profileConfirmed =
    false;

  updateOutfitStep();
}

function continueFromOutfitStep() {
  if (
    !window.playerProfile.outfit
  ) {
    return;
  }

  window.playerProfile.profileConfirmed =
    true;

  savePlayerProfile();
  populateArrivalStep();
  showCreatorStep(7);
}

function populateArrivalStep() {
  const profile =
    window.playerProfile;

  const personalityNames = {
    romantic:
      'Romantic',

    loyal:
      'Loyal',

    bold:
      'Bold',

    strategic:
      'Strategic',

    funny:
      'Funny',

    mysterious:
      'Mysterious'
  };

  const datingGoalNames = {
    love:
      'A serious relationship',

    connection:
      'A real connection',

    adventure:
      'Romance and adventure',

    open:
      'Keeping options open',

    competition:
      'Winning the competition'
  };

  const impressionNames = {
    confident:
      'Confident',

    friendly:
      'Friendly',

    flirty:
      'Flirty',

    calm:
      'Calm',

    mysterious:
      'Mysterious'
  };

  const outfitNames = {
    sunset:
      '🌅 Sunset Glow',

    ocean:
      '🌊 Ocean Breeze',

    midnight:
      '🌙 Midnight Flame',

    tropical:
      '🌴 Tropical Heat'
  };

  const arrivalImage =
    getCreatorElement(
      'creatorArrivalImage'
    );

  if (arrivalImage) {
    arrivalImage.src =
      getPlayerSpritePath(
        profile.spritePreset
      );

    arrivalImage.alt =
      `${profile.name}'s contestant`;
  }

  const arrivalValues = {
    creatorArrivalName:
      profile.name ||
      'New Islander',

    creatorArrivalMessage:
      `${profile.name || 'New Islander'}, ` +
      `the boat is waiting. Your first day ` +
      `on Flame Cay is about to begin.`,

    creatorArrivalBasicInfo:
      `${profile.age} · ` +
      `${profile.occupation} · ` +
      `${profile.hometown}`,

    creatorArrivalPronouns:
      profile.pronouns ||
      '—',

    creatorArrivalPersonality:
      personalityNames[
        profile.personality
      ] ||
      '—',

    creatorArrivalDatingGoal:
      datingGoalNames[
        profile.datingGoal
      ] ||
      '—',

    creatorArrivalFirstImpression:
      impressionNames[
        profile.firstImpression
      ] ||
      '—',

    creatorArrivalOutfit:
      outfitNames[
        profile.outfit
      ] ||
      '—'
  };

  Object.entries(
    arrivalValues
  ).forEach(
    ([id, value]) => {
      const element =
        getCreatorElement(id);

      if (element) {
        element.textContent =
          value;
      }
    }
  );
}

function enterFlameCay() {
  if (
    !window.playerProfile.profileConfirmed
  ) {
    return;
  }

  savePlayerProfile();

  const profile =
    window.playerProfile;

  const outfitNames = {
    sunset:
      '🌅 Sunset Glow',

    ocean:
      '🌊 Ocean Breeze',

    midnight:
      '🌙 Midnight Flame',

    tropical:
      '🌴 Tropical Heat'
  };

  getCreatorElement(
    'characterCreator'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'menu'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'game'
  )?.classList.remove(
    'hidden'
  );

  getCreatorElement(
    'arrivalScene'
  )?.classList.remove(
    'hidden'
  );

  getCreatorElement(
    'openingDialogueScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'openingChoiceScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'openingChoiceResultScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'mainGameInterface'
  )?.classList.add(
    'hidden'
  );

  const arrivalPlayerImage =
    getCreatorElement(
      'arrivalScenePlayerImage'
    );

  if (arrivalPlayerImage) {
    arrivalPlayerImage.src =
      getPlayerSpritePath(
        profile.spritePreset
      );

    arrivalPlayerImage.alt =
      `${profile.name}'s Islander`;
  }

  const arrivalPlayerName =
    getCreatorElement(
      'arrivalScenePlayerName'
    );

  if (arrivalPlayerName) {
    arrivalPlayerName.textContent =
      profile.name ||
      'New Islander';
  }

  const arrivalPlayerOutfit =
    getCreatorElement(
      'arrivalScenePlayerOutfit'
    );

  if (arrivalPlayerOutfit) {
    arrivalPlayerOutfit.textContent =
      outfitNames[
        profile.outfit
      ] ||
      'Arrival outfit';
  }

  window.scrollTo(0, 0);
}

let openingDialogueIndex = 0;

const openingDialogueLines = [
  {
    speaker:
      'Narrator',

    text:
      'Warm ocean air reaches you as the boat approaches the shore.'
  },

  {
    speaker:
      'Narrator',

    text:
      'Ahead, the Flame Cay villa rises between palm trees and the bright blue ocean.'
  },

  {
    speaker:
      'Player',

    text:
      'This is it. My new life on Flame Cay starts now.'
  },

  {
    speaker:
      'Narrator',

    text:
      'You take one final breath as the boat reaches the dock.'
  }
];

function continueArrivalScene() {
  openingDialogueIndex = 0;

  getCreatorElement(
    'arrivalScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'openingDialogueScene'
  )?.classList.remove(
    'hidden'
  );

  const playerImage =
    getCreatorElement(
      'openingDialoguePlayerImage'
    );

  if (playerImage) {
    playerImage.src =
      getPlayerSpritePath(
        window.playerProfile.spritePreset
      );

    playerImage.alt =
      `${window.playerProfile.name}'s Islander`;
  }

  showOpeningDialogueLine();
  window.scrollTo(0, 0);
}

function showOpeningDialogueLine() {
  const currentLine =
    openingDialogueLines[
      openingDialogueIndex
    ];

  if (!currentLine) {
    finishOpeningDialogue();
    return;
  }

  const speaker =
    getCreatorElement(
      'openingDialogueSpeaker'
    );

  const text =
    getCreatorElement(
      'openingDialogueText'
    );

  const continueButton =
    getCreatorElement(
      'openingDialogueContinue'
    );

  if (speaker) {
    speaker.textContent =
      currentLine.speaker ===
      'Player'
        ? window.playerProfile.name
        : currentLine.speaker;
  }

  if (text) {
    text.textContent =
      currentLine.text;
  }

  if (continueButton) {
    continueButton.textContent =
      openingDialogueIndex ===
      openingDialogueLines.length - 1
        ? 'Enter the Villa'
        : 'Continue';
  }
}

function finishOpeningDialogue() {
  getCreatorElement(
    'openingDialogueScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'openingChoiceScene'
  )?.classList.remove(
    'hidden'
  );

  window.scrollTo(0, 0);
}

function advanceOpeningDialogue() {
  openingDialogueIndex += 1;

  if (
    openingDialogueIndex >=
    openingDialogueLines.length
  ) {
    finishOpeningDialogue();
    return;
  }

  showOpeningDialogueLine();
}

function selectOpeningChoice(choice) {
  const validChoices = [
    'confident',
    'friendly',
    'mysterious'
  ];

  if (
    !validChoices.includes(
      choice
    )
  ) {
    return;
  }

  window.playerProfile.firstImpression =
    choice;

  savePlayerProfile();

  const choiceResults = {
    confident: {
      title:
        'You make a bold entrance.',

      text:
        'You walk through the doors with confidence. Every Islander turns to look at you.'
    },

    friendly: {
      title:
        'You enter with a warm smile.',

      text:
        'Your friendly energy immediately relaxes the group, and several Islanders smile back.'
    },

    mysterious: {
      title:
        'You keep them guessing.',

      text:
        'You enter calmly without revealing too much. The Islanders immediately become curious about you.'
    }
  };

  const selectedResult =
    choiceResults[
      choice
    ];

  getCreatorElement(
    'openingChoiceScene'
  )?.classList.add(
    'hidden'
  );

  getCreatorElement(
    'openingChoiceResultScene'
  )?.classList.remove(
    'hidden'
  );

  const resultTitle =
    getCreatorElement(
      'openingChoiceResultTitle'
    );

  const resultText =
    getCreatorElement(
      'openingChoiceResultText'
    );

  if (resultTitle) {
    resultTitle.textContent =
      selectedResult.title;
  }

  if (resultText) {
    resultText.textContent =
      selectedResult.text;
  }

  window.scrollTo(0, 0);
}

function continueFromOpeningChoiceResult() {
  const resultScene =
    getCreatorElement(
      'openingChoiceResultScene'
    );

  const meetIslandersScene =
    getCreatorElement(
      'meetIslandersScene'
    );

  if (resultScene) {
    resultScene.classList.add(
      'hidden'
    );
  }

  if (meetIslandersScene) {
    meetIslandersScene.classList.remove(
      'hidden'
    );
  }

  window.scrollTo(0, 0);
}

function selectLucasFirstResponse(choice) {
  const validChoices = [
    'confident',
    'friendly',
    'mysterious'
  ];

  if (
  !validChoices.includes(choice)
) {
  return;
}

  const lucasRelationship =
    window.playerProfile.relationships.lucas;

  const reactions = {
    confident: {
      text:
        'Lucas raises an eyebrow and smiles. “Competition? I like your confidence. This villa could get interesting.”',
      relationship:
        'rivalry'
    },

    friendly: {
      text:
        'Lucas smiles warmly. “It’s really nice to meet you too. I think you’re going to fit in here.”',
      relationship:
        'friendship'
    },

    mysterious: {
      text:
        'Lucas studies you for a moment. “Keeping your secrets already? Now you have my attention.”',
      relationship:
        'romance'
    }
  };

  const selectedReaction =
    reactions[choice];

  window.playerProfile.lucasFirstResponse =
    choice;

  lucasRelationship[
    selectedReaction.relationship
  ] += 1;

  savePlayerProfile();

  const choices =
    getCreatorElement(
      'meetIslandersChoices'
    );

  const dialogueText =
    getCreatorElement(
      'meetIslandersText'
    );

  const continueButton =
    getCreatorElement(
      'meetIslandersContinue'
    );

  if (choices) {
    choices.classList.add(
      'hidden'
    );
  }

  if (dialogueText) {
    dialogueText.textContent =
      selectedReaction.text;
  }

  if (continueButton) {
    continueButton.classList.remove(
      'hidden'
    );
  }
}

function returnToMainMenu() {
  const hiddenSections = [
    'characterCreator',
    'game',
    'arrivalScene',
    'openingDialogueScene',
    'openingChoiceScene',
    'openingChoiceResultScene',
    'meetIslandersScene',
    'mainGameInterface'
  ];

  hiddenSections.forEach(
    id => {
      getCreatorElement(
        id
      )?.classList.add(
        'hidden'
      );
    }
  );

  getCreatorElement(
    'menu'
  )?.classList.remove(
    'hidden'
  );

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
        Number(
          savedProfile.spritePreset
        ) || 0,

      outfit:
        savedProfile.outfit || '',

      relationships: {
        lucas: {
          friendship:
            savedProfile.relationships
              ?.lucas
              ?.friendship || 0,

          romance:
            savedProfile.relationships
              ?.lucas
              ?.romance || 0,

          trust:
            savedProfile.relationships
              ?.lucas
              ?.trust || 0,

          rivalry:
            savedProfile.relationships
              ?.lucas
              ?.rivalry || 0
        }
      },

      lucasFirstResponse:
        savedProfile.lucasFirstResponse || ''
    };
  }

  const fieldValues = {
    playerName:
      window.playerProfile.name ||
      '',

    playerPronouns:
      window.playerProfile.pronouns ||
      'she/her',

    playerAge:
      window.playerProfile.age ||
      '',

    playerHometown:
      window.playerProfile.hometown ||
      '',

    playerOccupation:
      window.playerProfile.occupation ||
      '',

    playerPersonality:
      window.playerProfile.personality ||
      '',

    playerDatingGoal:
      window.playerProfile.datingGoal ||
      '',

    playerFirstImpression:
      window.playerProfile.firstImpression ||
      ''
  };

  Object.entries(
    fieldValues
  ).forEach(
    ([id, value]) => {
      const element =
        getCreatorElement(id);

      if (element) {
        element.value =
          value;
      }
    }
  );

  updateIdentityStep();
  updateProfileStep();
  updatePersonalityStep();
  updateAppearanceStep();
  populateReviewStep();
  updateOutfitStep();
  populateArrivalStep();
}

function renderPlayerScenePortrait() {
  const profile =
    window.playerProfile;

  if (
    !profile ||
    !profile.name
  ) {
    return;
  }

  const portraitContainer =
    getCreatorElement(
      'playerScenePortrait'
    );

  const sceneAvatar =
    getCreatorElement(
      'playerSceneAvatar'
    );

  const sceneName =
    getCreatorElement(
      'playerSceneName'
    );

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
    romantic:
      '💕 Romantic Islander',

    loyal:
      '💚 Loyal Islander',

    bold:
      '🔥 Bold Islander',

    strategic:
      '🧠 Strategic Islander',

    funny:
      '😄 Funny Islander',

    mysterious:
      '🌙 Mysterious Islander'
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
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center bottom;
      "
    >
  `;

  sceneName.textContent =
    profile.name;

  scenePersonality.textContent =
    personalityTitles[
      profile.personality
    ] ||
    'New Islander';

  portraitContainer.classList.remove(
    'hidden'
  );
}

function initializeCharacterCreator() {
  const nameInput =
    getCreatorElement(
      'playerName'
    );

  const pronounsInput =
    getCreatorElement(
      'playerPronouns'
    );

  const ageInput =
    getCreatorElement(
      'playerAge'
    );

  const hometownInput =
    getCreatorElement(
      'playerHometown'
    );

  const occupationInput =
    getCreatorElement(
      'playerOccupation'
    );

  const personalityInput =
    getCreatorElement(
      'playerPersonality'
    );

  const datingGoalInput =
    getCreatorElement(
      'playerDatingGoal'
    );

  const firstImpressionInput =
    getCreatorElement(
      'playerFirstImpression'
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
  ].forEach(
    input => {
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
    }
  );

  [
    personalityInput,
    datingGoalInput,
    firstImpressionInput
  ].forEach(
    select => {
      if (!select) {
        return;
      }

      select.addEventListener(
        'change',
        updatePersonalityStep
      );
    }
  );

  document.querySelectorAll(
    '.creatorAppearanceOption'
  ).forEach(
    option => {
      option.addEventListener(
        'click',
        function () {
          selectAppearance(
            this.dataset.preset
          );
        }
      );
    }
  );

  document.querySelectorAll(
    '.creatorOutfitOption'
  ).forEach(
    option => {
      option.addEventListener(
        'click',
        function () {
          selectOutfit(
            this.dataset.outfit
          );
        }
      );
    }
  );

  document.querySelectorAll(
    '.openingChoiceButton'
  ).forEach(
    button => {
      button.addEventListener(
        'click',
        function () {
          selectOpeningChoice(
            this.dataset.openingChoice
          );
        }
      );
    }
  );

  getCreatorElement(
    'creatorStepOneContinue'
  )?.addEventListener(
    'click',
    continueFromIdentityStep
  );

  getCreatorElement(
    'creatorStepTwoContinue'
  )?.addEventListener(
    'click',
    continueFromProfileStep
  );

  getCreatorElement(
    'creatorStepThreeContinue'
  )?.addEventListener(
    'click',
    continueFromPersonalityStep
  );

  getCreatorElement(
    'creatorStepFourContinue'
  )?.addEventListener(
    'click',
    continueFromAppearanceStep
  );

  getCreatorElement(
    'creatorStepFiveContinue'
  )?.addEventListener(
    'click',
    confirmContestantProfile
  );

  getCreatorElement(
    'creatorStepSixContinue'
  )?.addEventListener(
    'click',
    continueFromOutfitStep
  );

  getCreatorElement(
    'creatorEnterIsland'
  )?.addEventListener(
    'click',
    enterFlameCay
  );

  getCreatorElement(
    'arrivalSceneContinue'
  )?.addEventListener(
    'click',
    continueArrivalScene
  );

  getCreatorElement(
    'openingDialogueContinue'
  )?.addEventListener(
    'click',
    advanceOpeningDialogue
  );

  getCreatorElement(
    'openingChoiceResultContinue'
  )?.addEventListener(
    'click',
    continueFromOpeningChoiceResult
  );

  getCreatorElement(
    'creatorBackToMenu'
  )?.addEventListener(
    'click',
    returnToMainMenu
  );

  getCreatorElement(
    'creatorStepTwoBack'
  )?.addEventListener(
    'click',
    function () {
      showCreatorStep(1);
    }
  );

  getCreatorElement(
    'creatorStepThreeBack'
  )?.addEventListener(
    'click',
    function () {
      showCreatorStep(2);
    }
  );

  getCreatorElement(
    'creatorStepFourBack'
  )?.addEventListener(
    'click',
    function () {
      showCreatorStep(3);
    }
  );

  getCreatorElement(
    'creatorStepFiveBack'
  )?.addEventListener(
    'click',
    function () {
      showCreatorStep(4);
    }
  );

  getCreatorElement(
    'creatorStepSixBack'
  )?.addEventListener(
    'click',
    function () {
      populateReviewStep();
      showCreatorStep(5);
    }
  );

  getCreatorElement(
    'creatorReturnToStepSix'
  )?.addEventListener(
    'click',
    function () {
      updateOutfitStep();
      showCreatorStep(6);
    }
  );

document.querySelectorAll(
  '.meetIslandersChoiceButton'
).forEach(
  button => {
    button.addEventListener(
      'click',
      function () {
        selectLucasFirstResponse(
          this.dataset.lucasChoice
        );
      }
    );
  }
);

getCreatorElement(
  'meetIslandersContinue'
)?.addEventListener(
  'click',
  continueAfterLucasResponse
);

  restoreCreatorForm();
  showCreatorStep(1);
}

window.renderPlayerScenePortrait =
  renderPlayerScenePortrait;

window.addEventListener(
  'DOMContentLoaded',
  initializeCharacterCreator
);