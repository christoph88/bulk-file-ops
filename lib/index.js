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

const rename = (path, filter, replace, value) => {
  if (
    typeof path === 'undefined' ||
    typeof filter === 'undefined' ||
    typeof replace === 'undefined' ||
    typeof value === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-rename ./temp .png display discovery')
  }

  // general information
  console.log(`Select files containing ${filter} in location ${path}...\n\n`)

  // read files in directory and process
  fs.readdir(path, (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // filtering files
    const filteredFiles = files.filter((file) => {
      const re = new RegExp(filter, 'ig')
      return file.match(re);

    });
    if (filteredFiles.length === 0) {
      return console.log('No matches found');
    }
    //listing all files using forEach
    filteredFiles.forEach((file) => {
      const oldName = file;
      const newName = oldName.replace(replace, value);
      console.log(`${oldName} >> ${newName}`);
    });
  });
  return;
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.rename = rename;
