// ./lib/index.js

/**
 * Displays a string in the console
  * 
   * @param {string_to_say} String string to show in the console
    */

const rename = function (path, filter, replace, value) {
  if (
    typeof path = 'undefined' ||
      typeof filter = 'undefined' ||
        typeof replace = 'undefined' ||
          typeof value = 'undefined' 

  ) {
  return console.log('Please use following arguments: path, filter, replace, value')
}
const string_to_say = `Replace ${replaceThis} in files containing ${files} with ${withThat} in ${path}`
return console.log(string_to_say);
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.rename = rename;
