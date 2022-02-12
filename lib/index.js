// ./lib/index.js

/**
* Rename files within a folder
*
* @param {path} Path where to look for files
* @param {filter} Regex filter to only select certain files
* @param {replace} Value to replace
* @param {value} New value that will be used
*/

// requiring path and fs modules
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

const ops = (operation, path, filter, replace, value) => {
  // check for operation name
  if (operation !== 'rename') {
    return console.log('Please define operation as first argument e.g bulk-file-ops rename');
  }

  // execute renaming operation
  if (operation === 'rename') {
    rename(path, filter, replace, value);
  }
};
const rename = (path, filter, replace, value) => {
  if (
    typeof path === 'undefined'
    || typeof filter === 'undefined'
    || typeof replace === 'undefined'
    || typeof value === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-ops rename ./temp .png display discovery');
  }

  // general information
  console.log(`\nSelect files containing ${filter} in location ${path}...\n`);

  // read files in directory and process
  fs.readdir(path, (err, files) => {
    // handling error
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    // filtering files
    const filteredFiles = files.filter((file) => {
      const re = new RegExp(filter, 'ig');
      return file.match(re);
    });
    if (filteredFiles.length === 0) {
      return console.log('No matches found');
    }
    // listing all files using forEach
    console.log(`Replacing regex ${replace} with value ${value}...\n`);
    const renamedFiles = filteredFiles.map((file) => {
      const oldName = file;
      const re = new RegExp(replace, 'ig');
      const newName = oldName.replace(re, value);
      console.log(`${oldName} >> ${newName}`);
      return { old: `${path}/${oldName}`, new: `${path}/${newName}` };
    });
    // ask if we can write the changes
    rl.question('\nWrite changes to filesystem? y/n\n', async (answer) => {
      if (answer === 'n') {
        console.log('Aborting changes');
        process.exit(1);
      }
      if (answer === 'y') {
        for (const file of renamedFiles) {
          await fs.rename(file.old, file.new, (err) => {
            if (err) console.log(`Renaming error: ${err}`);
          });
        }
        console.log('Files are renamed!');
        console.log(renamedFiles.map((file) => file.new).join('\n'));
        process.exit(1);
      }
    });
  });
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.ops = ops;
