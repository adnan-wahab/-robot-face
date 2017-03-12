let namespace = '/test';

var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'I\'m connected!'});
});

setInterval(function() { socket.emit('my_ping'); }, 1000);
socket.on('my_pong', function() { console.log('heart beet') })



let emotions = [
  "angry",
  "bedroom",
  "begging",
  "buckteeth",
  "dead",
  "disgust",
  "dizzy",
  "eyeroll",
  "happy",
  "heart",
  "laughter",
  "mischevious",
  "money",
  "neutral",
  "peeved",
  "sad",
  "stars",
  "stoned",
  "surprised",
  "thinking",
  "worry"
]

let url = '/static/face/eyes-angry-2.svg'
let url2 = '/static/face/eyes-happy-2.svg'



let face = {
  emotion: 'happy',
  eyes: 0,
  speak: function (msg) {


  },
  render: function () {
    let eyes = this.eyes == 'close' ? 0 : 1
    let emotion = this.emotion;
    document.body.className = emotion;
    document.querySelector('.eyes').src = `/static/face/eyes-${emotion}-${eyes}.svg`
    document.querySelector('.mouth').src = `/static/face/mouth-${emotion}-${1}.svg`
  }
}


meSpeak.loadConfig("/static/mespeak_config.json");
meSpeak.loadVoice("/static/voices/en/en-us.json");

function speak () {
  meSpeak.speak("hello my name is mateo", {},function () {

    meSpeak.speak("it burns when i pee");
  });
  
}

socket.on('my_response', function(msg) {
  if (msg.data == 'connected') return;
  if (msg.field == 'speak') return speak(msg)

  face[msg.field] = msg.value
  face.render();
});


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
