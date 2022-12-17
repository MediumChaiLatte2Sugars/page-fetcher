
const request = require('request');
const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

// Setting required arugments
const arguments = process.argv.slice(2);
const URL = arguments[0];
const LOCAL_PATH = arguments[1];


request(URL, (error, response, body) => {

  if (error) {
    return console.error('Request failed: ', error);
  }

  // Check to see if we have successful access to provided URL
  if (!(response.statusCode <= 299 && response.statusCode >= 200)) {
    return console.error("Invalid URL provided: ", new Error(`Status: ${response.statusCode}`));
  }

  // Check on provided path
  fs.access(LOCAL_PATH, fs.F_Ok , (err) => {
    
    if (err) {
      console.error("Path access failure: ", err);
    }

    // // Invalid path given
    // if (!stats.isDirectory()) {
    //   throw new Error("Provided path is not a directory!");
    // }

    // Initiaize readline obj to obtain user response
    const rl = readline.createInterface({ input, output });

    // Check if file already exists
    if (stats.isFile()) {

      // Prompt user for control flow decision
      rl.question("File exists, overwrite (Y/N)?  ", (answer) => {

        if (answer.toUpperCase = "Y") {

          // Write to file if path is valid
          fs.writeFile(LOCAL_PATH, body, err => {
            if (err) {
              console.error("Write to disk failed: ", err);
            }
            // Success message(s)
            console.log(`Downloaded and saved ${body.length} bytes to ${LOCAL_PATH}`);
            rl.close();
            process.exit();
          });

        }

        r1.close();
        process.exit();

      });
    }
    // Write to file if path is valid
    fs.writeFile(LOCAL_PATH, body, err, stats => {
      if (err) {
        console.error("Write to disk failed: ", err);
      }
      // Success message(s)
      console.log(`Downloaded and saved ${body.length} bytes to ${LOCAL_PATH}`);
    });



  });
})
