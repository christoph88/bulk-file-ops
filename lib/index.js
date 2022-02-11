// ./lib/index.js

/**
* Rename files within a folder
* 
* @param {path} Path where to look for files
* @param {filter} Regex filter to only select certain files
* @param {replace} Value to replace
* @param {value} New value that will be used
*/

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const rename = function (path, filter, replace, value) {
  if (
    typeof path === 'undefined' ||
    typeof filter === 'undefined' ||
    typeof replace === 'undefined' ||
    typeof value === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-rename ./temp .png display discovery')
  }

  // general information
  console.log(`Select files containing ${filter} in location ${path}`)
  console.log(`Rename ${replace} with ${value}`)

  // read files in directory and process
  fs.readdir(path, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });
  return;
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.rename = rename;
