// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
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
},{}]},{},[7])