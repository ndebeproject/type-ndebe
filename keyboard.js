const Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  theme: "hg-theme-default ndebe-theme",
  debug: true,
  layout: {
    default: [
      "` \uE101 \uE102 \uE103 \uE104 \uE105 \uE106 \uE107 \uE108 \uE109 \uE100 - = {bksp}",
      "{tab} \uE259 \uE300 \uE253 \uE351 \uE350 \uE301 \uE265 \uE354 \uE262 \uE26B [ ] \\",
      "{lock} \uE256 \uE302 \uE353 \uE352 \uE303 \uE250 \uE355 \uE304 \uE268 ; · {enter}",
      "{shift} \uE356 \uE25C \uE305 \uE25F \uE254 \uE26C \uE26D , . / {shift}",
      ".com @ {space}",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} \uE25B \uE10B \uE255 \uE10C \uE10D \uE10E \uE267 \uE10F \uE264 \uE25A { } |",
      '\uE10A \uE258 \uE110 \uE111 \uE112 \uE113 \uE252 \uE266 \uE263 \uE26A : " {enter}',
      "{shift} \uE257 \uE25E \uE251 \uE261 \uE269 \uE25D \uE260 < > ? {shift}",
      ".com @ {space}",
    ]
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */

document.querySelector(".input").addEventListener("input", (event) => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
  updateCharacterCount();
}

function onKeyPress(button) {
  console.log("Button pressed", button);
  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}
