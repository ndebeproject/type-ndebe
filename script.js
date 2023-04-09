const inputField = document.querySelector('.input');
const characterLimitInfo = document.getElementById('characterLimitInfo');
const charactersRemaining = document.getElementById('charactersRemaining');
const maxCharacters = 24;

function updateCharacterCount() {
  const inputTextLength = inputField.value.length;
  const remainingCharacters = maxCharacters - inputTextLength;
  charactersRemaining.textContent = `${remainingCharacters} characters remaining`;
}
