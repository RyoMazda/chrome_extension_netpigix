let llnFlag = false;

// id for the custom parent DOM element
const customSubtitleId = "netpigix-subtitle-container";
// save the subtitles in this array
let textsOnView: string[] = [];


function main(): void {
  console.log("Netpigix v2.0.0 Start!");
  setTimeout(
    function () {
      if (document.getElementsByClassName('lln-bottom-panel').length >= 1) {
        llnFlag = true;
        console.log("You use lln.");
        if (!llnFlag) {
          // execute the main function every 1000ms
          // This must be a dumb way but at least it works without much problem
          setInterval(updateCustomSubtitle, 1000);
        }
      }
    },
    2000
  );
}

function updateCustomSubtitle(): void {
  const rootElement = <HTMLElement> document.getElementsByClassName("player-timedtext-text-container")[0];
  if (document.contains(rootElement)) {
    // console.log("found it");
    // get the latest subtitle as newTexts
    let newTexts: string[] = [];
    for (let i = 0; i < rootElement.childElementCount; i++) {
      const target = <HTMLElement> rootElement.children[i];
      if (target != null) {
        const text = target.innerText;
        newTexts.push(text);
      }
    }
    // update
    if (isTextsChanged(textsOnView, newTexts)) updateTextsOnView(newTexts);
  }
}


function isTextsChanged(baseTexts: string[], newTexts: string[]): boolean {
  let len = newTexts.length;
  let targetRange = baseTexts.slice(- len);
  for (let i = 0; i < len; i++) {
    if (targetRange[i] !== newTexts[i]) {return true}
  }
  return false
}


function updateTextsOnView(newTexts: string[]): void {
  // console.log("update texts");
  // console.log("current:");
  // console.log(textsOnView);
  // console.log("new:");
  // console.log(newTexts);

  // put newTexts at the end of textsOnView
  Array.prototype.push.apply(textsOnView, newTexts);

  // if textsOnView has too many contents, remove some
  const numLinesOnView = 6;
  let numTexts = textsOnView.length;
  if (numTexts > numLinesOnView) {
    for (let i = 0; i < numTexts - numLinesOnView; i++) {
      textsOnView.shift();
    }
  }

  updateView();
}


function updateView(): void {
  // console.log("I'm updateView");
  // console.log(textsOnView);

  let hiddenFlag = false;
  const target = document.getElementById(customSubtitleId);
  // wipe out the old one first
  if (target != null) {
    if (target.classList.contains('netpigix-hide')) hiddenFlag = true;
    target.remove();
  }

  let mySubtitleElement = document.createElement("div");
  mySubtitleElement.id = customSubtitleId;
  if (hiddenFlag) mySubtitleElement.classList.add("netpigix-hide");
  for (let i = 0; i < textsOnView.length; i++) {
    let textElement = document.createElement("div");
    textElement.classList.add("netpigix-text");
    textElement.innerText = textsOnView[i];
    mySubtitleElement.appendChild(textElement);
  }

  const element = document.getElementsByClassName("VideoContainer")[0];
  element.appendChild(mySubtitleElement);
}


// --------------------
// For User Controls
// --------------------
function isPlaying(): boolean {
  const playOrStopButton = document.getElementsByClassName("PlayerControlsNeo__button-control-row")[0].children[0];
  return playOrStopButton.classList.toString().split(" ").indexOf("button-nfplayerPlay") >= 0;
}


function toggleSubtitle(): void {
  const target = document.getElementById(customSubtitleId);
  if (target != null) {
    target.classList.toggle("netpigix-hide");
  }
}

function toggleSubtitleLln(): void {
  const target = document.getElementsByClassName('AkiraPlayer')[0];
  if (target != null) {
    target.classList.toggle("netpigix-AkiraPlayer--full");
  }
  const bottomPanel = document.getElementsByClassName('lln-bottom-panel')[0];
  if (bottomPanel != null) {
    bottomPanel.classList.toggle("netpigix-hide");
  }
}

function turnOffSubtitle(): void {
  const target = document.getElementById(customSubtitleId);
  if (target != null) {
    target.classList.add("netpigix-hide");
  }
}

function goBack(): void {
  let e = new KeyboardEvent("keydown", {
    bubbles : true,
    cancelable : true,
    key : "ArrowLeft",
    code: "ArrowLeft",
    // @ts-ignore
    keyCode: 37,
    shiftKey : false
  });
  document.getElementsByClassName("controls-full-hit-zone")[0].dispatchEvent(e);
}


// Speech Recognition Interface
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
const {webkitSpeechRecognition} : IWindow = (window as any);
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();
recognition.stop();

recognition.onresult = (event: any): void => {
  const text = event.results[0][0]["transcript"].toLocaleLowerCase();
  console.log("From Speech Recognition: " + text);
  if (text === "show me") {
    toggleSubtitle();
  } else if (text === "go back") {
    goBack();
  } else if (text.slice(0, 7) === "go back" && text.slice(-7) == "seconds") {
    let time = parseInt(text.slice(8, -8));
    while (time > 0) {
      goBack();
      time -= 10;
    }
  }
};

recognition.onspeechend = (): void => {
  recognition.stop();
};


// Keyboard Interface
window.document.onkeydown = function(event){
  console.log(event);
  if (llnFlag) {
    if (event.key === "Alt" || event.key === "x") {
      toggleSubtitleLln();
    }
  } else {
    if (event.key === "Alt") {
      toggleSubtitle();
    }

    if (event.code === "Space") {
      // Turn off subtitles always
      turnOffSubtitle();

      // For speech input
      if (!isPlaying()) {
        recognition.start();
        setTimeout((): void => {
          setTimeout(recognition.stop());
        },2000);
      }
    }
  }
};


main();
