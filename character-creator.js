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

function getCharacterCreatorElement(id) {
  return document.getElementById(id);
}

function formatCharacterOption(value) {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getPlayerPreviewEmoji(pronouns, skinTone) {
  const skinToneEmoji = {
    light: '🏻',
    'medium-light': '🏼',
    medium: '🏽',
    'medium-dark': '🏾',
    dark: '🏿'
  };

  let personEmoji = '🧑';

  if (pronouns === 'she/her') {
    personEmoji = '👩';
  } else if (pronouns === 'he/him') {
    personEmoji = '👨';
  }

  return personEmoji + (skinToneEmoji[skinTone] || '');
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
  const previewEmoji = getCharacterCreatorElement('playerPreviewEmoji');
  const previewDetails = getCharacterCreatorElement('playerPreviewDetails');
  const confirmButton = getCharacterCreatorElement('confirmCharacterButton');

  previewName.textContent = name || 'Your Islander';

  previewEmoji.textContent = getPlayerPreviewEmoji(
    window.playerProfile.pronouns,
    window.playerProfile.skinTone
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

function confirmPlayerCharacter() {
  updateCharacterPreview();

  if (!window.playerProfile.name) {
    alert('Please enter your character name.');
    return;
  }

  // These values are available to the rest of the game.
  window.playerPronouns = window.playerProfile.pronouns;
  window.playerSkinTone = window.playerProfile.skinTone;
  window.playerHairstyle = window.playerProfile.hairstyle;
  window.playerHairColor = window.playerProfile.hairColor;
  window.playerOutfit = window.playerProfile.outfit;
  window.playerPersonality = window.playerProfile.personality;

  getCharacterCreatorElement('characterCreator').classList.add('hidden');

  startGame();
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

  updateCharacterPreview();
}

window.addEventListener('DOMContentLoaded', initializeCharacterCreator);