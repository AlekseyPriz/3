"use strict";

//----------------------------------------------------

const fs          = require("fs");

const Readable    = require("stream").Readable;
const Writable    = require("stream").Writable;
const Transform   = require("stream").Transform;

//----------------------------------------------------

class CReadable extends Readable {
  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _read() {

    this.push( gen()  );

    function gen() {
      const idx = Math.round( Math.random() * 1000 );
      return idx.toString();
    }
  }
}

class CTransform extends Transform {

  constructor(options = {}) {
    options.objectMode = true;

    super(options);
  }

  _transform(chunk, encoding, done) {
    setTimeout(function() {
      done(null, JSON.stringify( {Value: chunk} ));
    }, 1000);
  }
}

class CWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, done) {
    console.log("поток на запись подучил: " + chunk.toString());
    done();
  }
}


//--------------)>

const read = new CReadable({"highWaterMark": 1});
const write = new CWritable();
const trans = new CTransform();

read.pipe(trans).pipe(write);



