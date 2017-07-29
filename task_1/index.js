"use strict";

//----------------------------------------------------

const fs          = require('fs');
const crypto      = require('crypto');
const Transform   = require("stream").Transform;

//----------------------------------------------------

const input   = fs.createReadStream('message.txt', {encoding: 'utf-8'});
input
  .pipe(process.stdout);

var hash = crypto.createHash('md5').update(input.toString()).digest('hex');

const output  = fs.createWriteStream('copy.txt');

output.end(hash);



input
  .pipe(process.stdout)
  .pipe(output);

