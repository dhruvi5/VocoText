const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// var isFirefox = typeof InstallTrigger !== "undefined";
var isChrome = !!window.chrome && !!window.chrome.webstore;

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);
  voiceSelect.innerHTML = "";
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

// if (isFirefox) {
//   getVoices();
// }
if (isChrome) {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }
}

const speak = () => {
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }
  if (textInput.value !== "") {
    // body.style.background =
    //   "#141414 url(https://tenor.com/en-IN/view/sound-wave-gif-25371774)";
    // body.style.backgroundRepeat = "repeat-x";
    // body.style.backgroundSize = "100% 100%";

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
      console.log("Done speaking...");
      //   body.style.background = "#141414";
    };

    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    const selectedVoiceOption = voiceSelect.selectedOptions[0];
    if (selectedVoiceOption) {
      const selectedVoice = selectedVoiceOption.getAttribute("data-name");
      voices.forEach((voice) => {
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      });
    }

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText);
  }
};

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));
voiceSelect.addEventListener("change", (e) => speak());
