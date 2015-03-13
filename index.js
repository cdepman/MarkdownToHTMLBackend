var database = require('./db/db');
var io = require('socket.io')();
var htmlToText = require('html-to-text');

// set up listeners for incoming socket connections
io.on('connection', function(socket){

  console.log('Socket connection established.');

  socket.on('initialFetch', function(){
    try {
      database.db.once('value', function(data){
        socket.emit(data);
      })
    } catch(err) {
      console.log('failed to fetch data:', err)
    }
  })

  socket.on('updateFullTimeA', function(data){
    console.log(data.data);
    try {
      database.setFullTimeEmailA(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updateFullTimeB', function(data){
    console.log(data.data);
    try {
      database.setFullTimeEmailB(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeA', function(data){
    console.log(data.data);
    try {
      database.setPartTimeEmailA(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

  socket.on('updatePartTimeB', function(data){
    console.log(data.data);
    try {
      database.setPartTimeEmailB(htmlToText.fromString(data.data, {wordwrap: 130}), data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });

});

io.listen(3000);

// set up listeners for db changes
database.db.child('/fullTime/emailA').on('change', function(dataSnapshot){
    console.log(dataSnapshot.val());
    io.emit('fullTimeEmailAChange', dataSnapshot);
})

database.db.child('/fullTime/emailB').on('change', function(dataSnapshot){
    console.log(dataSnapshot.val());
    io.emit('fullTimeEmailBChange', dataSnapshot);
})

database.db.child('/partTime/emailA').on('change', function(dataSnapshot){
    console.log(dataSnapshot.val());
    io.emit('fullTimeEmailAChange', dataSnapshot);
})

database.db.child('/partTime/emailB').on('change', function(dataSnapshot){
    console.log(dataSnapshot.val());
    io.emit('fullTimeEmailAChange', dataSnapshot);
})

