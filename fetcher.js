
const request = require('request');
const fs = require('fs');

// Setting required arugments
const arguments = process.argv.slice(2);
const URL = arguments[0];
const LOCAL_PATH = arguments[1];

// TODO: perform check on args

request(URL, (error, response, body) => {
  
  if (error){
    return console.error('Request failed: ', error);
  }

  fs.writeFile(LOCAL_PATH, body, err => {
    if (err) {
      console.error("Write to disk failed: ", err);
    }

    // Success message(s)
    console.log(`Downloaded and saved ${body.length} bytes to ${LOCAL_PATH}`)
  });

});

