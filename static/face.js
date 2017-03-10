


let url = '/static/face/eyes-angry-2.svg'

function getMad () {
  document.querySelector('.eyes').src
    = url
  document.body
    .style
    .backgroundColor = 'red'
}
setTimeout(getMad, 1000)



// var tts = new GoogleTTS('zh-CN');
// tts.play('fuck')

