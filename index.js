var db = require('./db/db');
var io = require('socket.io')();
var htmlToText = require('html-to-text');


io.on('connection', function(socket){
  console.log('Socket connection established.');

  socket.on('updateFullTimeA', function(data){
    console.log(data.data);
    try {
      db.setFullTimeEmailA(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updateFullTimeB', function(data){
    console.log(data.data);
    try {
      db.setFullTimeEmailB(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeA', function(data){
    console.log(data.data);
    try {
      db.setFullTimeEmailA(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeB', function(data){
    console.log(data.data);
    try {
      db.setFullTimeEmailB(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

});

io.listen(3000);

db.db.on('value', function(dataSnapshot){
  console.log(dataSnapshot.val());
})
