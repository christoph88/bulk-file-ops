#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
const path = args[0];
const filter = args[1];
const replace = args[2];
const value = args[3];

const myLibrary = require('../lib/index.js');

// Displays the text in the console
myLibrary.rename(path, filter, replace, value);
