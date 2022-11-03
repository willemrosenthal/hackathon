// GLOBAL VARS
// last tiemstamp
let lastTime;
// total elapsed time
let msElapsed = 0;
// get current domain
let currentDomain = document.location.host;
// ref to our graph object
let graph;
// ref to graph bar
let bar;
// ref to our controls object
let controls;
let graphContent;
// max time limit per site in ms
let siteLimit = 1000;
const minConversion = 60000;

let loopTimeoutId;

// const barStartColor;
// const barEndColor;

// bool to determine if we've gone past max time
let exceededTime = false;


const initilizeLoop = () => {
  lastTime = Date.now();
  //checkSite(currentDomain, timeWasters);

  // if site is on blacklist, start loop
  loopCheckForOnBlacklist();
};

const loopCheckForOnBlacklist = () => {
  if (checkIfBlacklistedAndSetupInitialValues()) {
    document.getElementById('tracker').style.height = 230+"px";
    graphContent.style.display = 'block';
    controls.style.display = "none";
    looper();
  }
  else {
    controls.style.display = "block";
    setTimeout(loopCheckForOnBlacklist, 100);
  }
}

const checkIfBlacklistedAndSetupInitialValues = () => {
  // check if site on saved blacklist
  if (checkIfBlacklisted()) {
    msElapsed = Number(localStorage.getItem(currentDomain+"_ms"));

    // get limit and update label
    siteLimit = Number(localStorage.getItem(currentDomain+"_limit"));
    updateGraphTimeLimitLabel();

    return true;
  }
  return false;
}

const checkIfBlacklisted = () => {
  return (localStorage.getItem(currentDomain+"_bl") === "true");
}

const addToBlacklist = () => {
  // set time limit to whatever is in the input field
  siteLimit = Number(document.getElementById('timeLimit').value) * minConversion;
  // update the time limit label on the graph
  updateGraphTimeLimitLabel();

  // add site to bl
  localStorage.setItem(currentDomain+"_bl", true);
  localStorage.setItem(currentDomain+"_ms", 0)
  localStorage.setItem(currentDomain+"_limit", siteLimit)
  
  // initilize loop again
  initilizeLoop();
}

const updateGraphTimeLimitLabel = () => {
  const labelText = (siteLimit / minConversion) + "m";
  document.getElementById('limitLabel').innerHTML = labelText;
}

// unblacklist
const removeFromBlacklist = () => {
  document.getElementById('tracker').style.height = 70+"px";

  if (msElapsed >= siteLimit) {
    location.reload();
  }
  
  // add site to bl
  localStorage.setItem(currentDomain+"_bl", false);
  localStorage.setItem(currentDomain+"_ms", 0)
  localStorage.setItem(currentDomain+"_limit", 1000)
  msElapsed = 0;
  
  // initilize loop again
  graphContent.style.display = "none";
  controls.style.display = "block";

  clearTimeout(loopTimeoutId);
}



// the actual loop
const looper = () => {
  if(!document.hidden) {
    msElapsed += Date.now() - lastTime;
    localStorage.setItem(currentDomain+"_ms", msElapsed);
  }

  // visualize time
  console.log("limit: " + siteLimit + " current: " + msElapsed);
  let percent = (msElapsed/siteLimit) * 100;
  if (percent > 100 && !exceededTime) timeExceeded();
  if (percent > 110) percent = 110;
  bar.style.height = (percent) + "%";

  // reset last time to now
  lastTime = Date.now();

  if (checkIfBlacklisted()) loopTimeoutId = setTimeout(looper, 100);
  updateGraph();
}

// time exceeded function
const timeExceeded = () => {
  exceededTime = true;
  fuckWithSite();
}

// let curDomain = document.location;
// const faviconStr = "https://s2.googleusercontent.com/s2/favicons?domain=www.stackoverflow.com";

// const buildControls = () => {
//   controls = document.createElement("div");
//   controls.setAttribute("class", "dontMove");
//   document.body.appendChild(controls);

//   controls.innerHTML += `
//   <div id="controls" class="dontMove">
//     <input  class="dontMove" type="text" style="width: 100%" id="timeLimit" value="1"></input>
//     <button  class="dontMove" style="width: 100%" id="blacklistBtn">Blacklist Site</button>
//   </div>
//   `;

//   let blacklistBtn = document.getElementById('blacklistBtn')
//   blacklistBtn.addEventListener('click', addToBlacklist)
// }




// function to display graph initially
const buildGraph = () => {
  // create div to hold graph object
  graph = document.createElement("div");
  graph.setAttribute("class", "dontMove");
  document.body.appendChild(graph);

  // build template graph
  graph.innerHTML += `
      <div id="tracker" class="dontMove">
      <div id="graphContent" class="dontMove">

        <div id="graph" class="dontMove">
          <div id="limit" class="dontMove">
            <div id="limitLabel" class="dontMove">1m</div>
          </div>
          <div id="barArea" class="dontMove">
            <div class="barContainer dontMove"><div class="bar dontMove" id="timeBar"></div></div>
          </div>
        </div>
        <div id="siteList" class="dontMove">
          <div class="site dontMove"><img class="dontMove favIconImg" src="https://s2.googleusercontent.com/s2/favicons?domain=${currentDomain}"></div>
        </div>
        <button style="width: 100%" class="dontMove" id="removeBlacklistBtn">Unblacklist</button>

      </div>

      <div id="controls" class="dontMove">
        <input  class="dontMove" type="text" style="width: 100%" id="timeLimit" value="1"></input>
        <button  class="dontMove" style="width: 100%" id="blacklistBtn">Blacklist Site</button>
      </div>

    </div>

    `;

  controls = document.getElementById("controls");
  graphContent = document.getElementById("graphContent");

  let removeFromBlacklistBtn = document.getElementById('removeBlacklistBtn')
  removeFromBlacklistBtn.addEventListener('click', removeFromBlacklist);

  let blacklistBtn = document.getElementById('blacklistBtn')
  blacklistBtn.addEventListener('click', addToBlacklist)

  // makes tracker small
  document.getElementById('tracker').style.height = 70+"px";

  //console.log("icons: " + )
  // populate limit based on limit max
  // call update graph
  bar = document.querySelector('#timeBar');

  // hide graph
  graphContent.style.display = 'none';
}

const updateGraph = () => {
  // jpdate the grapj
}


// function to upate graph
  // update limit time label to equal limit time
  // itterate over timewasters obj
  // update each bar to reflect time spent



const fuckWithSite = () => {
  if (!document.hidden) {
    const matches = document.querySelectorAll("p, span, a, input:not(.dontMove), form, button:not(.dontMove), img:not(.dontMove)"); //div:not(.dontMove)

    const numItemsToMessWith = 14;

    for (let i = 0; i < numItemsToMessWith; i++) {
      const div = matches[Math.floor(Math.random() * matches.length)];

      div.style.transition = `all ${Math.random() + 0.3}s`;
      div.style.position = "absolute";
      div.style.top = (Math.random() * 90) + "%";
      div.style.left = (Math.random() * 90) + "%";
      div.style.maxWidth = "inherit";
      console.log("SHOULD WORK?");
      console.log(div);
    }
  }

  // call again
  setTimeout(fuckWithSite, 300);
}

//fuckWithSite();

// start app
buildGraph();
initilizeLoop();