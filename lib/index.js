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

// check which op is to be executed
const ops = (operation, path, filter, replace, value) => {
  // check for operation name
  if (operation !== 'rename'
    && operation !== 'remove') {
    return console.log('Please define operation as first argument e.g bulk-file-ops rename');
  }

  // execute renaming operation
  if (operation === 'rename') {
    rename(path, filter, replace, value);
  }

  // execute remove operation
  if (operation === 'remove') {
    remove(path, filter);
  }
};

// Rename files
const rename = (path, filter, replace, value) => {
  // check if required params are present
  if (
    typeof path === 'undefined'
    || typeof filter === 'undefined'
    || typeof replace === 'undefined'
    || typeof value === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-ops rename ./temp .png(regex) display discovery');
  }

  // general information
  console.log(`\nSelect files containing ${filter} in location ${path}...\n`);

  // read files in directory and process
  const readdir = fs.readdirSync(path, { withFileTypes: true });
  const files = readdir
    .filter((file) => file.isFile())
    .map((file) => file.name);

  // filtering files
  const filteredFiles = files.filter((file) => {
    const re = new RegExp(filter, 'ig');
    return file.match(re);
  });
  if (filteredFiles.length === 0) {
    console.log('No matches found');
    process.exit(1);
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
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.question('\nWrite changes to filesystem? y/n\n', (answer) => {
    if (answer === 'n') {
      console.log('Aborting changes');
      process.exit(1);
    }
    if (answer === 'y') {
      for (const file of renamedFiles) {
        fs.renameSync(file.old, file.new);
      }
      console.log('Files are renamed!');
      process.exit(1);
    }
  });
};

// Remove files
const remove = (path, filter) => {
  // check if required params are present
  if (
    typeof path === 'undefined'
    || typeof filter === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-ops remove ./temp .png(regex)');
  }

  // general information
  console.log(`\nSelect files containing ${filter} in location ${path}...\n`);

  // read files in directory and process
  const readdir = fs.readdirSync(path, { withFileTypes: true });
  const files = readdir
    .filter((file) => file.isFile())
    .map((file) => file.name);

  // filtering files
  const filteredFiles = files.filter((file) => {
    const re = new RegExp(filter, 'ig');
    return file.match(re);
  });
  if (filteredFiles.length === 0) {
    console.log('No matches found');
    process.exit(1);
  }

  // add path to files
  const filesWithPath = filteredFiles.map((file) => `${path}/${file}`);
  console.log(filesWithPath.join('\n'));

  // ask if we can write the changes
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.question('\nRemove files? y/n\n', (answer) => {
    if (answer === 'n') {
      console.log('Aborting changes');
      process.exit(1);
    }
    if (answer === 'y') {
      for (const file of filesWithPath) {
        fs.unlinkSync(file);
      }
      console.log('Files are remove!');
      process.exit(1);
    }
  });
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.ops = ops;
