
let blacklistBtn = document.getElementById('blacklistBtn')
blacklistBtn.addEventListener('click', addToBlacklist)

let resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', reset)

const currentDomain = document.location.host;


function addToBlacklist() {
  alert("added to blacklist: " + currentDomain);
  chrome.tabs.query(
    {active:true},
    tabs=>{
               const tab=tabs[0];
               alert("URL:", tab.url)
               }
                );
  localStorage.setItem(currentDomain+"_bl", true);
}


// resets this domain's time
function reset() {
  localStorage.setItem(currentDomain, 0);
};

// local saved data vars
  // current site is on blacklist
  // ms elapsed on current site
