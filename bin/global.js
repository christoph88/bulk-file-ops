#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
const path = args[0];
const files = args[1];
const replaceThis = args[2];
const withThat = args[3];

const myLibrary = require('../lib/index.js');

// Displays the text in the console
myLibrary.rename(path, files, replaceThis, withThat);
