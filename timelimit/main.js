


// document.cookie = "username=Debra White; path=/";
// document.cookie = "userId=wjgye264s; path=/";
// let cookies = document.cookie;
// console.log(cookies); // expected output: username=Debra White; userId=wjgye264s


// define global variables
  // object that tracks ms on each site
  // singe variable "lastTime" that's defaults to current time

const timeWasters = {
  // populated with the sites we want to avoid
  'www.youtube.com' : 0,
  'www.facebook.com': 0,
  'www.twitter.com' : 0
}

let lastTime;
let msElapsed = 0;

let currentDomain = document.location.host;

const reset = object => {
  localStorage.setItem(currentDomain, 0);
};

const checkSite = (site, object) => {

  Object.keys(object).forEach(key => {
    if (site === key) {
      msElapsed = Number(localStorage.getItem(currentDomain));
      if (!msElapsed) {
        localStorage.setItem(currentDomain, 0);
      }
    } 
  })
}


// initilize function
  // call look for cookies function
  // call our loop function

const initilizeLoop = () => {
  lastTime = Date.now();
  checkSite(currentDomain, timeWasters);
  looper();
};


// loop
const looper = () => {
  if(!document.hidden) {
    msElapsed += Date.now() - lastTime;
    localStorage.setItem(currentDomain, msElapsed);
  }

  lastTime = Date.now();

setTimeout(looper, 100);
console.log(msElapsed)

}

const resetBtn = document.querySelector('button');
resetBtn.style.color = 'red'; 

initilizeLoop();
reset();

