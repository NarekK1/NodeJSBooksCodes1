const { stdout } = require('process');
const { delimiter } = require('path');
const { platform } = require('os');

//this is a test file to unpack an object and use its properties
stdout.write(delimiter + '\n');
//returns the platform of the operating system
stdout.write(platform());