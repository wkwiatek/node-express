module.exports = function(io) {
  io.on('connection', function(socket) {

    console.log('Hello socket!');

    socket.on('chat message', function(msg) {
      socket.broadcast.emit('chat message', msg);
    });

  });
};