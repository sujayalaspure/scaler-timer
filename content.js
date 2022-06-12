var currentUrl = window.location.href;
let flag = false;
if (/(http|https):\/\/www.scaler.com\/academy\/.*\/problems\/[0-9]+.*/.test(currentUrl)) {
  console.log("main correct");
  flag = false;
} else {
  console.log("main incorrect");
}

// Main code start here

chrome.runtime.onMessage.addListener(function (response, sendResponse) {
  // console.log("Mesage->> ", response.url);

  if (/(http|https):\/\/www.scaler.com\/academy\/.*\/problems\/[0-9]+.*/.test(response.url)) {
    flag = false;
    if (response.tabstatus === "complete") {
      run("messaage ");
    } else {
      window["onload"] = function () {
        run("message1");
      };
    }
  } else {
    console.log("from msg incorrect url");
  }
  // return true;
});

function stopWatch() {
  var playPause = document.querySelector("#playpause");
  var countdown = document.querySelector("#timer");
  let time = 0;
  let gate = false;

  const intervalFn = function () {
    countdown.innerText = new Date(time * 1000).toISOString().substr(11, 8);
    time++;
  };

  let updatecountDown = setInterval(intervalFn, 1000);

  playPause.addEventListener("mouseup", function () {
    lala = 0;
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

function run(from = "main") {
  // console.log(from, "run");
  // let parentElement = null;

  const htmlText = `
      <button class="tappable btn btn-primary btn-small btn-long m-r-5" id="playpause">Pause</button>
      <div class="row bold ">
        <div class="cr-problem-user-score">
          <div class="flex row flex-ac h5 no-mgn-b">
            <i class="cr-icon-clock m-r-5"></i><span id="timer">00:00:00</span>
          </div>
        </div>
      </div>`;

  let parentElement = null;
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
      // newNode.style.marginRight = "20px";
      // newNode.style.display = "flex";
      // newNode.style.flexDirection = "row";
      // newNode.style.alignItems = "center";
      const hasChild = parentElement.querySelector("#timer-container") != null;
      if (!hasChild) {
        parentElement.insertBefore(newNode, currentThirdNode);
        stopWatch();
      }
    }
  }, 200); // check every 100ms
}
