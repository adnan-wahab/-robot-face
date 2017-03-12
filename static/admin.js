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

emotions.forEach( (emo) => {
  let butt = document.createElement('button')
  butt.textContent = emo
  document.querySelector('.emotions').appendChild(butt);
});

//var ws = new WebSocket('ws://localhost:5000/echo');
// ws.onmessage = (evt) => {
//   console.log(evt.data)
// }

let textarea = document.querySelector('textarea')


// document.body.addEventListener('keydown', (e) => {
//   if (e.which !== 13) return;

//   let val = textarea.value
//   textarea.value = '';

//   let message = {
//     field: 'voice',
//     value: val
//   }

//   sendMessage(message)
// })



function speak () {

  let message = {
    field: 'speak',
    value: document.querySelector('textarea').textContent
  }

    sendMessage(message)
}

document.body.addEventListener('click', (e) => {
  let target = e.target

  if (target.tagName !== 'BUTTON') return;
  if (target.className == 'speak') return speak();

  let message = {
    field: target.parentElement.firstElementChild.textContent,
    value:
      target.textContent
  }

  sendMessage(message)

})


function sendMessage(message) {
  console.log('sending message', message)

  let headers = new Headers();
  headers.set('Content-Type', 'application/json');

  let req = new Request(
    '/message', {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(message)
    }
  )

  fetch(req).then(() => {
    console.log('done')
  })


}
