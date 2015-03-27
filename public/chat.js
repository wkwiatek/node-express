var socket = io();

document.getElementById('newMsgForm').addEventListener('submit', function(e) {
  e.preventDefault();
  socket.emit('chat message', {
    user: window.user,
    msg: document.getElementById('msgInput').value
  });
});

socket.on('chat message', function(data) {
  addMsg(data);
});

function addMsg(data) {
  var li = document.createElement('li');
  var ul = document.getElementById('messages');
  li.innerHTML = data.user + ': ' + data.msg;
  ul.appendChild(li);
}