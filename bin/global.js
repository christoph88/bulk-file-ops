#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
const operation = args[0];
const path = args[1];
const filter = args[2];
const replace = args[3];
const value = args[4];

const myLibrary = require('../lib/index.js');

// Displays the text in the console
myLibrary.ops(operation, path, filter, replace, value);
