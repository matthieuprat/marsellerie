const timeout = i => 90 + 1000 * Math.pow(i / 50, 2)
const shuffle = a => a.reduce((a, e) => (a.splice(Math.random() * (a.length + 1), 0, e), a), [])
const qp = p => decodeURI((new RegExp(`[?&]${p}=([^&#]*)`).exec(location.search) || [])[1] || '')
const target = document.getElementById('target')

let candidates = (qp('candidates') || 'Yes|No').split('|')
let freewheel, running
let limit, i, j

function start() {
  if (running) {
    freewheel = false
    i = 0
    return
  }
  running = true
  i = j = 0
  candidates = shuffle(candidates)
  limit = 20 + Math.random() * 5
  target.classList.remove('highlight')
  next()
}

function next() {
  if (i > limit) return setTimeout(end, 100)
  if (freewheel) i++
  target.innerHTML = candidates[j++ % candidates.length]
  setTimeout(next, timeout(i))
}

function end() {
  running = false
  target.classList.add('highlight')
}

;['mousedown', 'touchstart', 'keydown'].forEach(e =>
  document.addEventListener(e, e => {
    if (e instanceof MouseEvent || e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      start()
    }
  })
)

;['mouseup', 'touchend', 'keyup'].forEach(e =>
  document.addEventListener(e, e => {
    if (e instanceof MouseEvent || e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      freewheel = true
    }
  })
)
