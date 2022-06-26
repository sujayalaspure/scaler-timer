let flag = false;
let noticeFlag = false;
const TIME_THRESHOLD = 2700; // seconds

const bannerElement = `
  <div class="banner__icon cr-banner__icon cr-banner__icon--compact"> <div class="mascot-emoji mascot-emoji--small"> <img class="mascot-emoji__bg" src="https://assets.scaler.com/packs/images/bg-red.6e3c81.svg" alt="character background"/><img class="mascot-emoji__mascot" src="https://assets.scaler.com/packs/images/love.4dd60c.svg" alt="character"/> </div></div><div class="banner__body cr-banner__body"> <div class="banner__title"> <div class="cr-banner-title cr-banner-title--small m-b-5">You are solving this for 45 mins</div></div><div class="banner__subtitle cr-banner__subtitle cr-banner__subtitle--small"> Take a small 5 Min break and come back stronger. <br/> Trust me, Fod donge is baar. </div></div><a class="tappable" id="noticeclose" ><i class="icon-close"></i></a>
`;

const cssText = `position: absolute;top: 50px;right: 10px;z-index: 10;display: none;`;

// Main code start here
let parentElement = null;

chrome.runtime.onMessage.addListener(function (response, sendResponse) {
  if (/(http|https):\/\/www.scaler.com\/academy\/.*\/problems\/[0-9]+.*/.test(response.url)) {
    flag = false;
    if (response.tabstatus === "complete") {
      run();
    } else {
      window["onload"] = function () {
        run();
      };
    }
  } else {
    console.log("from msg incorrect url");
  }
  // return true;
});

function Notice() {
  let noticeRef = document.querySelector("#notice");
  let noticeclose = document.querySelector("#noticeclose");
  if (noticeRef) {
    if (noticeFlag === false) {
      noticeRef.style.display = "flex";
    }
    noticeclose.addEventListener("mouseup", function () {
      noticeRef.style.display = "none";
    });
  }
}

function stopWatch() {
  var playPause = document.querySelector("#playpause");
  var countdown = document.querySelector("#timer");
  let time = 0;
  let gate = false;

  const intervalFn = function () {
    countdown.innerText = new Date(time * 1000).toISOString().substr(11, 8);
    time++;
    if (time >= TIME_THRESHOLD) {
      Notice();
      noticeFlag = true;
    }
  };

  let updatecountDown = setInterval(intervalFn, 1000);

  playPause.addEventListener("mouseup", function () {
    if (gate == false) {
      clearInterval(updatecountDown);
      playPause.innerHTML = `Play`;
      gate = true;
    } else {
      updatecountDown = setInterval(intervalFn, 1000);
      playPause.innerHTML = `Pause`;
      gate = false;
    }
  });
}

function run() {
  const htmlText = `<button class="tappable cr-judge-action btn btn-primary btn-small btn-long m-r-5" id="playpause">Pause</button> <div class="row bold "> <div class="cr-problem-user-score"> <div class="flex row flex-ac h5 no-mgn-b"> <i class="cr-icon-clock m-r-5"></i><span id="timer">00:00:00</span> </div></div></div>`;

  var checkExist = setInterval(function () {
    parentElement = document.querySelector(".cr-problem-header");
    if (flag === false && parentElement) {
      flag = true;
      console.log("Exists!");
      clearInterval(checkExist);
      const currentThirdNode = parentElement.childNodes[1];
      const newNode = document.createElement("div");
      newNode.id = "timer-container";
      newNode.innerHTML = htmlText;
      newNode.style.cssText = "margin-right: 10px; display: flex; flex-direction: row;";

      const NoticeNode = document.createElement("div");
      NoticeNode.id = "notice";
      NoticeNode.className = "banner cr-banner cr-banner--secondary cr-banner--small cr-banner--compact m-10";
      NoticeNode.style.cssText = cssText;
      NoticeNode.innerHTML = bannerElement;

      const hasChild = parentElement.querySelector("#timer-container") != null;
      if (!hasChild) {
        parentElement.insertBefore(NoticeNode, currentThirdNode);
        parentElement.insertBefore(newNode, currentThirdNode);
        stopWatch();
      }
    }
  }, 200); // check every 100ms
}
