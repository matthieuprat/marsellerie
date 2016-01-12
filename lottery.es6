const timeout = i => 90 + 1000 * Math.pow(i / 50, 2)
const shuffle = a => a.reduce((a, e) => (a.splice(Math.random() * (a.length + 1), 0, e), a), [])
const qp = p => decodeURI((new RegExp(`[?&]${p}=([^&#]*)`).exec(location.search) || [])[1] || '')
const target = document.getElementById('target')

let candidates = (qp('candidates') || 'Yes|No').split('|')
let running = false
let limit, i, j

function disp() {
  if (i > limit)
    return setTimeout(stop, 100)

  target.innerHTML = candidates[j++ % candidates.length]
  setTimeout(disp, timeout(i++))
}

function start() {
  if (running) {
    i = 0
    return
  }
  running = true
  i = j = 0
  candidates = shuffle(candidates)
  limit = 20 + Math.random() * 5
  target.classList.remove('highlight')
  disp()
}

function stop() {
  target.classList.add('highlight')
  running = false
}

window.addEventListener('keydown', e => {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault()
    start()
  }
})
