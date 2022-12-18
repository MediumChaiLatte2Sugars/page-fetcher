
const request = require('request');
const fs = require('fs');
const readline = require('node:readline');
const path = require('node:path');
const { stdin: input, stdout: output } = require('node:process');

// Setting required arugments
const arguments = process.argv.slice(2);
const URL = arguments[0];
const INSTALL_PATH = arguments[1];

// Path deconstructing for parsing purposes
let newPath = path.parse(INSTALL_PATH);
newPath.base = '';
newPath.ext = '';
newPath.name = '';


// Initiaize readline obj to obtain user response
const rl = readline.createInterface({ input, output });

request(URL, (error, response, body) => {

  if (error) {
    return console.error('Request failed: ', error);
  }

  // Check to see if we have successful access to provided URL
  if (!(response.statusCode <= 299 && response.statusCode >= 200)) {
    return console.error("Invalid URL provided: ", new Error(`Status: ${response.statusCode}`));
  }

  // Check on provided path
  fs.access(path.format(newPath), fs.F_Ok , (err) => {
    
    if (err) {
      return console.error("Ivalid path provided: ", err);
    }
    
    // Check if file exists
    fs.access(INSTALL_PATH, fs.F_Ok , (err) => {  

      // File doesn't exist
      if (err){
       writeToFile();
       console.log(`Downloaded and saved ${body.length} bytes to ${INSTALL_PATH}`);
       process.exit();
      }
       
      // Prompt user for control flow decision
      rl.question("File exists, overwrite (Y/N)? ", (answer) => {

        if (answer.toUpperCase() === "Y") {

          // Write to file and close input
          writeToFile();
          rl.close();
          console.log(`Downloaded and saved ${body.length} bytes to ${INSTALL_PATH}`);
          process.exit();
        }

        process.exit();
    });

    });
  });

  const writeToFile = () => {

    fs.writeFile(INSTALL_PATH, body, err => {
      if (err) {
        console.error("Write to disk failed: ", err);
      }
    });
  
  }
});
