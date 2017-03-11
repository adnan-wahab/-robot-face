let namespace = '/test';

var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'I\'m connected!'});
});

socket.on('my_response', function(msg) {
  if (msg.command == 'happy') getHappy()
  if (msg.command == 'angry') getMad()
});

var ping_pong_times = [];
var start_time;
setInterval(function() { socket.emit('my_ping'); }, 1000);
socket.on('my_pong', function() { console.log('heart beet') })

let url = '/static/face/eyes-angry-2.svg'
let url2 = '/static/face/eyes-happy-2.svg'

function getMad () {
  document.querySelector('.eyes').src
    = url
  document.body
    .style
    .backgroundColor = 'red'
}

function getHappy() {
  document.querySelector('.eyes').src
    = url2
  document.body
    .style
    .backgroundColor = 'yellow'
}
