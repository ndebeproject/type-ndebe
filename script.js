const inputField = document.querySelector('.input');
const characterLimitInfo = document.getElementById('characterLimitInfo');
const charactersRemaining = document.getElementById('charactersRemaining');
const maxCharacters = 24;

function updateCharacterCount() {
  const inputTextLength = inputField.value.length;
  const remainingCharacters = maxCharacters - inputTextLength;
  charactersRemaining.textContent = `${remainingCharacters} characters remaining`;
}

function makeKeyboardResponsive() {
  // Set the breakpoint for mobile size (e.g., 768px)
  const mobileBreakpoint = 768;

  function toggleMobileKeyboard() {
  // Function to update the element text based on screen size
    if (window.innerWidth <= mobileBreakpoint) {
      keyboard.setOptions({
        mergeDisplay: true,
        layout: ndebeMobileLayout,
        display: ndebeMobileDisplay
      });
    } else {
      keyboard.setOptions({
        layout: ndebeMainLayout
      });
    }
  }

  toggleMobileKeyboard();

  // Attach the updateText function to the window resize event
  window.addEventListener("resize", toggleMobileKeyboard);
}

// Call the function
// Wait for DOM content to load before calling the function
document.addEventListener("DOMContentLoaded", makeKeyboardResponsive);
