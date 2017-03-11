//var ws = new WebSocket('ws://localhost:5000/echo');
// ws.onmessage = (evt) => {
//   console.log(evt.data)
// }

let textarea = document.querySelector('textarea')


document.body.addEventListener('keydown', (e) => {
  if (e.which !== 13) return;

  let val = textarea.value
  textarea.value = '';

  let message = {
    place: 'voice',
    command: val
  }

  sendMessage(message)
})

document.body.addEventListener('click', (e) => {
  let target = e.target

  if (target.tagName  !== 'BUTTON') return;
  let message = {
    place: target.parentElement.firstElementChild.textContent,
    command: target.textContent
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
