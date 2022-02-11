// ./lib/index.js

/**
 * Displays a string in the console
  * 
   * @param {string_to_say} String string to show in the console
    */

const rename = function (path, filter, replace, value) {
  if (
    typeof path === 'undefined' ||
    typeof filter === 'undefined' ||
    typeof replace === 'undefined' ||
    typeof value === 'undefined'

  ) {
    return console.log('Please use arguments e.g. bulk-file-rename ./temp .png display discovery')
  }
  console.log(`Select files containing ${filter} in location ${path}`)
  console.log(`Rename ${replace} with ${value}`)
  return;
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.rename = rename;
