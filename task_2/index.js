"use strict";

//----------------------------------------------------

const fs          = require('fs');
const crypto      = require('crypto');
const Transform   = require("stream").Transform;

//----------------------------------------------------

class MD5 extends Transform  {

  _transform(chunk, encoding, done) {
    let hash = crypto.createHash('md5').update(chunk).digest('hex');
    console.log(hash)
    this.push(hash);
    done();
  }
}

//----------------------------------------------------

const input   = fs.createReadStream('message.txt', {encoding: 'utf-8'});
const output  = fs.createWriteStream("copy.txt");


input
  .pipe(new MD5())
  .pipe(output);

