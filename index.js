var database = require('./db/db');
var io = require('socket.io')();
var htmlToText = require('html-to-text');

// set up listeners for incoming socket connections
io.on('connection', function(socket){

  console.log('Socket connection established.');

  socket.on('fetchFullTimeA', function(){
    try {
      database.db.child('/fullTime/emailA').once('value', function(data){
        console.log(data.val());
        socket.emit('populateFullTimeA', data.val());
      });
    } catch(err) {
      console.log('failed to fetch data:', err)
    }
  });

  socket.on('fetchFullTimeB', function(){
    try {
      database.db.child('/fullTime/emailB').once('value', function(data){
        console.log(data.val());
        socket.emit('populateFullTimeB', data.val());
      });
    } catch(err) {
      console.log('failed to fetch data:', err)
    }
  });

  socket.on('fetchPartTimeA', function(){
    try {
      database.db.child('/partTime/emailA').once('value', function(data){
        console.log(data.val());
        socket.emit('populatePartTimeA', data.val());
      });
    } catch(err) {
      console.log('failed to fetch data:', err)
    }
  });

  socket.on('fetchPartTimeB', function(){
    try {
      database.db.child('/partTime/emailB').once('value', function(data){
        console.log(data.val());
        socket.emit('populatePartTimeB', data.val());
      });
    } catch(err) {
      console.log('failed to fetch data:', err)
    }
  });

  socket.on('updateFullTimeA', function(data){
    if (!data){ console.log('transmission error:', data); return;}
    var html = data.html;
    var text = htmlToText.fromString(data.html, {wordwrap: 130});
    var markdown = data.markdown;
    try {
      database.setFullTimeEmailA(text, html, markdown);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updateFullTimeB', function(data){
    if (!data){ console.log('transmission error:', data); return;}
    var html = data.html;
    var text = htmlToText.fromString(data.html, {wordwrap: 130});
    var markdown = data.markdown;
    try {
      database.setFullTimeEmailB(text, html, markdown);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeA', function(data){
    if (!data){ console.log('transmission error:', data); return;}
    var html = data.html;
    var text = htmlToText.fromString(data.html, {wordwrap: 130});
    var markdown = data.markdown;
    try {
      database.setPartTimeEmailA(text, html, markdown);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeB', function(data){
    if (!data){ console.log('transmission error:', data); return;}
    var html = data.html;
    var text = htmlToText.fromString(data.html, {wordwrap: 130});
    var markdown = data.markdown;
    try {
      database.setPartTimeEmailB(text, html, markdown);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

});

io.listen(3000);