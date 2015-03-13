db = require('./db/db');
var io = require('socket.io')();


io.on('connection', function(socket){
  console.log('<<<< socket connection established! >>>>');
  socket.on('update', function(data){
    console.log('Got Update!:');
    console.log(data.data);
    try {
      db.setFullTimeEmailAHTML(data.data);
    } catch(err) {
      console.log('failed to write to database:', err);
    }
  });
});

io.listen(3000);

db.db.on('value', function(dataSnapshot){
  console.log(dataSnapshot.val());
})


db.setFullTimeEmailAMarkdown('this is NOT a test');
