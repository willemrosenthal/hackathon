document.addEventListener("DOMContentLoaded", () => {
  // document.querySelector('body').appendChild(title);
  // make AJAX call here....

  // VARIABLES TO STORE OUR DATA //
  const url1 = "https://api.ebay.com/buy/browse/v1/item_summary/search?q=iphone";


  // HELPER FUNCTIONS

  // fetch our data
  const fetchData = () => {
    // fetch from url
    fetch(url1)
      // once sucessful...
      .then((response) => {
        // if responce is sucessfull: i.e. 200-299 message
        if (response.status >= 200 && response.status < 300) {
          // parses the responce
          return response.json();
        } else {
          throw new Error("STATUS FAIL: " + response.status);
        }
      })
      // if the responce is sucessfull...
      .then((response) => {
        // pass our data to our data parcer
        console.log(response);
      })
      // if error, log error
      .catch((error) => {
        console.warn(error);
      });
  };

  fetchData();
});