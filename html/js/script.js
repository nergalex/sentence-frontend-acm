// Without jQuery
// Define a convenience method and use it
var ready = callback => {
  if (document.readyState != 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

ready(() => {
  let promises = [getSentence(), fadeInBgElements()]

  Promise.all(promises).then(() => {
    console.log('Both Promises done')
    document.querySelector('.spinner#sentence').classList.add('fadeout')
    // Run the sentence entry animation
    wordAnimation()
  })

  // Handlers for plus icons to show input prompt
  document
    .querySelector('.grid-item#adjective > .plus-icon')
    .addEventListener('click', function () {
      showPrompt(
        'Add an adjective',
        'adjective',
        '/api/sentence/adjectives/',
        function (value) {
          console.log('entered ' + value)
        }
      )
    })

  document
    .querySelector('.grid-item#animal > .plus-icon')
    .addEventListener('click', function () {
      showPrompt('Add an animal', 'animal', '/api/sentence/animals/', function (
        value
      ) {
        console.log('entered ' + value)
      })
    })

  document
    .querySelector('.grid-item#color > .plus-icon')
    .addEventListener('click', function () {
      showPrompt('Add an color', 'color', '/api/sentence/colors/', function (
        value
      ) {
        console.log('entered ' + value)
      })
    })

  document
    .querySelector('.grid-item#location > .plus-icon')
    .addEventListener('click', function () {
      showPrompt(
        'Add an location',
        'location',
        '/api/sentence/locations/',
        function (value) {
          console.log('entered ' + value)
        }
      )
    })

  // Plus icon animation
  document.querySelectorAll('.plus-icon').forEach(icon => {
    icon.addEventListener('mouseover', function () {
      this.classList.add('mouseover')
    })
    icon.addEventListener('mouseout', function () {
      this.classList.remove('mouseover')
    })
  })
})

// Success or failure banner
function showBanner (message, word, success) {
  let successBannerMessage = document.querySelector('#success-banner-message')
  let successBannerImage = document.querySelector('#success-banner-image')
  let successBanner = document.querySelector('.success-banner')

  successBannerMessage.innerHTML = ''
  successBannerImage.className = ''
  successBanner.classList.remove('success', 'failure')

  if (success) {
    successBanner.classList.add('success')
    successBannerMessage.innerHTML =
      'Success! Your word ' + word + ' was added!'
    successBannerImage.classList.add('fas', 'fa-check-circle')
  } else {
    successBanner.classList.add('failure')
    successBannerMessage.innerHTML =
      'Failure! Your word ' + word + ' was not added! '
    successBannerImage.classList.add('fas', 'fa-times-circle')
  }

  bannerAnimation()
}

function bannerAnimation () {
  console.log('bannerAnimation')

  let bannerTimeline = anime.timeline({
    targets: '.success-banner',
    easing: 'easeOutExpo',
    duration: 1500,
    delay: 0,
    endDelay: 5000,
    loop: false
  })

  bannerTimeline
    .add({
      translateY: ['-100%', '0%']
    })
    .add({
      translateY: ['0%', '-100%']
    })
}

function wordAnimation () {
  console.log('Word animation')
  document.querySelector('.grid').classList.toggle('hide')

  let animTimeline = anime.timeline({
    loop: false
  })

  animTimeline.add({
    targets: '.word',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1400,
    delay: anime.stagger(200)
  })

  if(checkAuthEnabled()){
    animTimeline.add({
      targets: ['.plus-icon'],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1400
    })
  }
}

async function waitForBackground () {
  return new Promise(function (resolve, reject) {
    document.querySelector('.bg img').onload = resolve()
  })
}

async function animateBackground () {
  const el = document.querySelector('.bg img')
  await onceAnimationEnd(el, 'fadein 3s forwards ease-out').then(() =>
    console.log('Background animated')
  )
}

async function animateLogos () {
  const el = document.querySelector('.logos')
  await onceAnimationEnd(el, 'fadein 2s forwards ease-out').then(() =>
    console.log('Logos animated')
  )
}

let fadeInBgElements = async () => {
  await waitForBackground()
    .then(await animateBackground())
    .then(animateLogos())
}

// Fetches sentence from generator
async function getSentence () {
  document.querySelector('.spinner#sentence').style.display = 'block'
  await fetch('/api/sentence')
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json)
      // Assigns return json values grid items
      // Checks for null return value and remove
      if (json.sentence.adjectives != 'null') {
        document.querySelector('.grid-item#adjective > h1').innerHTML =
          json.sentence.adjectives
      } else {
        document.querySelector('.grid-item#adjective').remove()
      }
      if (json.sentence.animals != 'null') {
        document.querySelector('.grid-item#animal > h1').innerHTML =
          json.sentence.animals
      } else {
        document.querySelector('.grid-item#animal').remove()
      }
      if (json.sentence.colors != 'null') {
        document.querySelector('.grid-item#color > h1').innerHTML =
          json.sentence.colors
      } else {
        document.querySelector('.grid-item#color').remove()
      }
      if (json.sentence.locations != 'null') {
        document.querySelector('.grid-item#location > h1').innerHTML =
          json.sentence.locations
      } else {
        document.querySelector('.grid-item#location').remove()
      }

      // Wrap every word in a span for animation
      document.querySelectorAll('.sentence').forEach(sentence => {
        let text = sentence.textContent
        if (text) {
          // Check if text is not empty
          let words = text.split(' ')

          // Clear current element
          sentence.innerHTML = ''

          // Loop through each word, wrap each letter in a span
          for (let word of words) {
            //let word_split = word.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

            // Wrap another span around each word, add word to header
            sentence.innerHTML += '<span class="word">' + word + '</span>'
          }
        }
      })
      console.log('GetSentence Done')
    })
}

// Example POST method implementation:
async function postData (url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

// Show input prompt
function showPrompt (text, word, post_uri, callback) {
  const form = document.getElementById('prompt-form')
  const container = document.getElementById('prompt-form-container')
  const message = document.getElementById('prompt-message')
  const info = document.getElementById('prompt-info')
  const spinner = document.querySelector('.spinner#post')

  message.innerHTML = text
  info.innerHTML = ''
  form.submit.classList.remove('input-error')
  form.text.value = ''

  function complete (value) {
    onceAnimationEnd(container, 'fadeout 200ms forwards').then(() =>
      container.classList.add('hide')
    )
    document.onkeydown = null
    callback(value)
  }

  form.onsubmit = function (event) {
    console.log('submit')
    info.innerHTML = ''
    form.text.classList.remove('input-error')

    let value = form.text.value

    value = sanitizeString(value)
    console.log(value)
    if (value == '') {
      form.innerHTML = 'Required'
      form.text.classList.add('input-error')
      return false
    }

    spinner.classList.remove('hide')
    //posts data to generator
    postData(post_uri, { value: value }).then(data => {
      console.log(data) // JSON data parsed by `data.json()` call
      spinner.classList.add('hide')
      if (data.value != '') {
        console.log('accepted')
        showBanner(data.info, data.value, true)
      } else {
        console.log('not accepted')
        showBanner(data.info, data.value, false)
      }
    })

    complete(value)
    return false
  }

  form.cancel.onclick = function () {
    complete(null)
  }

  document.onkeydown = function (e) {
    if (e.key == 'Escape') {
      complete(null)
    }
  }

  let lastElem = form.elements[form.elements.length - 1]
  let firstElem = form.elements[0]

  lastElem.onkeydown = function (e) {
    if (e.key == 'Tab' && !e.shiftKey) {
      firstElem.focus()
      return false
    }
  }

  firstElem.onkeydown = function (e) {
    if (e.key == 'Tab' && e.shiftKey) {
      lastElem.focus()
      return false
    }
  }

  container.classList.remove('hide')
  onceAnimationEnd(container, 'fadein 200ms forwards')
  form.elements.text.focus()
}

function sanitizeString (str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')
  return str.trim()
}

// We can declare a generic helper method for one-time animationend listening
let onceAnimationEnd = (el, animation) => {
  return new Promise(resolve => {
    const onAnimationEndCb = () => {
      el.removeEventListener('animationend', onAnimationEndCb)
      resolve()
    }
    el.addEventListener('animationend', onAnimationEndCb)
    el.style.animation = animation
  })
}

function getIdToken() {
    // GET id_token in query parameter
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.id_token != "") {
        console.log("id_token present")
    } else {
        console.log("id_token absent")
    }
    return params.id_token;
}

function checkAuthEnabled() {
  var els = document.getElementsByClassName('login-button')

  // login mode enabled
  if(els.length > 0) {
    console.log("Login mode enabled");
    var cookie_name = "sentence_session_token";

    // set or refresh id_token
    var id_token = getIdToken();
    console.log("id_token: " + id_token);
    if (id_token != null) {
        setCookie(cookie_name, id_token, 1);
        console.log("cookie " + cookie_name + " set")
    }

    // Authenticated user
    var id_token = getCookie(cookie_name);
    if (id_token != "") {
        console.log("cookie " + cookie_name + " present");
        return true;
    }

    // Not authenticated user
    console.log("cookie " + cookie_name + " absent");
    return false;
  }

  // login mode disabled
  else{
    console.log("login mode disabled");
    return true;
  }
}

// Cookie function
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let cookie = getCookie(cname);
  if (cookie != "") {
    console.log("cookie " + cname + " exists")
    return true
  } else {
    console.log("cookie " + cname + " missing")
    return false
  }
}