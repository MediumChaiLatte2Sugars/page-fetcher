
const request = require('request');
const fs = require('fs');

// Setting required arugments
const arguments = process.argv.slice(2);
const URL = arguments[0];
const LOCAL_PATH = arguments[1];

// TODO: perform check on args

// TODO: HTTP request

request(URL, (error, response, body) => {
  
  if (error){
    return console.error('Request failed: ', error);
  }

  // TODO: writing recieved data to file

});

