
let startTime = Date.now
let timeOnSite 

const timeTracker = {
  "tt_youtube" : 0,
  "tt_fb" : 0,
  "tt_tw" : 0
}

const init = () => {

}

const test = () => {
  if (!document.hidden) {
    //console.log("test " + Math.random());
  }
  setTimeout(test, 300);
}

setTimeout(test, 300);

let ourCookie = document.cookie;

let testArrayOfCookies = document.cookie.split("test_cookie=");
let testArrayOfCookies2 =testArrayOfCookies[1].split(";");

alert(testArrayOfCookies2[0]);

if (testArrayOfCookies2[0] === 'mymessage2'){
  alert("we remember you");
}
else document.cookie = "tt_youtube = 5000";

ourCookie = document.cookie;
alert("should be someting:" + ourCookie);



// define global variables
  // object that tracks ms on each site
  // singe variable "lastTime" that's defaults to current time

// initilize function
  // call look for cookies function
  // call our loop function

// look for cookies, and if found, popuplate time spent object with saved time

// loop
  // if display is hidden
    // just rsest lastTime to current

  // else
    // compare lastTime to current time, add difference to timeSpent
    // rest lastTime to currenTime

  // save time spent to cookie

  // loop?

// make a reset button that clears data for this page, cookie, vars, etc 




