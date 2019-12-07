// id for the custom parent DOM element
const customSubtitleId = "netpigix-subtitle-container";
// save the subtitles in this array
let textsOnView: string[] = [];

// execute the main function every 1000ms
// This must be a dumb way but at least it works without much problem
setInterval(main, 1000);

function main() {
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


function isTextsChanged(baseTexts: string[], newTexts: string[]) {
  let len = newTexts.length;
  let targetRange = baseTexts.slice(- len);
  for (let i = 0; i < len; i++) {
    if (targetRange[i] !== newTexts[i]) {return true}
  }
  return false
}


function updateTextsOnView(newTexts: string[]) {
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


function updateView(){
  // console.log("I'm updateView");
  // console.log(textsOnView);

  // wipe out the old one first
  if (document.contains(document.getElementById(customSubtitleId))) {
    const target = document.getElementById(customSubtitleId);
    if (target != null) {
      target.remove();
    }
  }

  let mySubtitleElement = document.createElement("div");
  mySubtitleElement.id = customSubtitleId;
  if (off_flag) mySubtitleElement.classList.add("netpigix-hide");
  for (let i = 0; i < textsOnView.length; i++) {
    let textElement = document.createElement("div");
    textElement.classList.add("netpigix-text");
    textElement.innerText = textsOnView[i];
    mySubtitleElement.appendChild(textElement);
  }

  const element = document.getElementsByClassName("VideoContainer")[0];
  element.appendChild(mySubtitleElement);
}


// toggle the custom subtitle
let off_flag = true;
window.document.onkeydown = function(event){
  // console.log(event);
  if (event.key === 'Alt') {
    // console.log('toggle!');
    const target = document.getElementById(customSubtitleId);
    if (target != null) {
      target.classList.toggle("netpigix-hide");
      off_flag = !off_flag;
    }
  }
  // when Space is pressed, the custom subtitle should be off always
  if (event.code === 'Space' && !off_flag) {
    const target = document.getElementById(customSubtitleId);
    if (target != null) {
      target.classList.add("netpigix-hide");
      off_flag = true;
    }
  }
};
