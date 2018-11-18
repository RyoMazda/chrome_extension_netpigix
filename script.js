// id for the custom parent DOM element
const customSubtitleId = "netpigix-subtitle-container";
// save the subtitles in this array
let textsOnView = [];

// execute the main function every 1000ms
// This must be a dumb way but at least it works file now
setInterval(main, 1000);

function main() {
  if (document.contains(document.getElementsByClassName("player-timedtext-text-container")[0])) {
    // console.log("found it");
    let ele = document.getElementsByClassName("player-timedtext-text-container")[0];
    // get the latest subtitle as newTexts
    let newTexts = [];
    for (let i = 0; i < ele.childElementCount; i++) {
      let text = ele.children[i].innerText;
      newTexts.push(text);
    }
    // update
    if (isTextsChanged(textsOnView, newTexts)) updateTextsOnView(newTexts);
  }
}


function isTextsChanged(baseTexts, newTexts) {
  let len = newTexts.length;
  let targetRange = baseTexts.slice(- len);
  for (let i = 0; i < len; i++) {
    if (targetRange[i] !== newTexts[i]) {return true}
  }
  return false
}


function updateTextsOnView(newTexts) {
  // console.log("update texts");
  // console.log("current:");
  // console.log(textsOnView);
  // console.log("new:");
  // console.log(newTexts);

  // put newTexts at the end of textsOnView
  Array.prototype.push.apply(textsOnView, newTexts);

  // if textsOnView has too many contents, remove some
  let numTexts = textsOnView.length;
  if (numTexts > 4) {
    for (let i = 0; i < numTexts - 4; i++) {
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
    document.getElementById(customSubtitleId).remove();
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

  let element = document.getElementsByClassName("VideoContainer")[0];
  element.appendChild(mySubtitleElement);
}


// toggle the custom subtitle
let off_flag = true;
window.document.onkeydown = function(event){
  console.log(event);
  if (event.key === 'Alt') {
    console.log('toggle!');
    let target = document.getElementById(customSubtitleId);
    target.classList.toggle("netpigix-hide");
    off_flag = !off_flag;
  }
};
