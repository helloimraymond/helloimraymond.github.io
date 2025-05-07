const typedText = document.getElementById('typed-text');
const phrases = ["science", "animator", "science designer", "science communicator"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseBetweenPhrases = 1500;

function typeEffect() {
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, currentCharIndex--);
  } else {
    typedText.textContent = currentPhrase.substring(0, currentCharIndex++);
  }

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, pauseBetweenPhrases);
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
