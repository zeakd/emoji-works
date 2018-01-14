const emojiInput = document.querySelector('#num-to-emoji .emoji');
const digitInput = document.querySelector('#num-to-emoji .digit');
const hexInput = document.querySelector('#num-to-emoji .hex');

console.log(emojiInput, digitInput, hexInput);

emojiInput.addEventListener('change', (e) => {
  const value = e.target.value;

  emojiManager.setEmoji(value);
})

digitInput.addEventListener('change', (e) => {
  const value = e.target.value;

  emojiManager.setDigit(value);
})

hexInput.addEventListener('change', (e) => {
  const value = e.target.value;

  emojiManager.setHex(value);
})

class EmojiManager {
  constructor() {
    this.events = {}

    this.values = {}
  }

  setEmoji(emoji) {
    console.log(emoji);
    if (!emoji) return;

    this.values.emoji = emoji;
    this.values.digit = emoji.codePointAt(0);
    this.values.hex = this.values.digit.toString(16);

    this.runOnChangeCallbacks();
  } 

  setDigit(digit) {
    this.values.digit = Number(digit);
    this.values.emoji = String.fromCodePoint(digit);
    this.values.hex = this.values.digit.toString(16);

    this.runOnChangeCallbacks();
  } 

  setHex(hex) {
    this.values.hex = hex;
    this.values.digit = parseInt(hex, 16);
    this.values.emoji = String.fromCodePoint(this.values.digit);

    this.runOnChangeCallbacks();
  } 

  runOnChangeCallbacks() {
    this.events['change'].forEach(cb => {
      cb();
    });
  }

  on(eventName, cb) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(cb); 
  }
}

const emojiManager = new EmojiManager();

emojiManager.on('change', function () {
  digitInput.value = emojiManager.values.digit;
  hexInput.value = emojiManager.values.hex;
  emojiInput.value = emojiManager.values.emoji;
});