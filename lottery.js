const timeout = i => 90 + 1000 * Math.pow(i / 50, 2)
const shuffle = a => a.reduce((a, e) => (a.splice(Math.random() * (a.length + 1), 0, e), a), [])
const qp = p => decodeURI((new RegExp(`[?&#]${p}=([^&#]*)`).exec(window.location.search || window.location.hash) || [])[1] || '')
const candidateElement = document.getElementById('candidate')
const targetElement = document.getElementById('target')
const cornerElement = document.getElementById('corner')
const candidatesElement = document.getElementById('candidates')
const SYMBOLS = {
  pencil: '&#x270e;',
  close: '&times;'
}

let editMode = false
let candidates = (qp('candidates') || 'Yes|No').split('|')
let freewheel, running
let limit, i, j

function start () {
  if (running) {
    freewheel = false
    i = 0
    return
  }
  running = true
  i = j = 0
  candidates = shuffle(candidates)
  limit = 20 + Math.random() * 5
  candidateElement.classList.remove('highlight')
  next()
}

function next () {
  if (i > limit) return setTimeout(end, 100)
  if (freewheel) i++
  candidateElement.innerHTML = candidates[j++ % candidates.length]
  setTimeout(next, timeout(i))
}

function end () {
  running = false
  candidateElement.classList.add('highlight')
}

cornerElement.addEventListener('click', e => {
  if (editMode) {
    candidates = candidatesElement.value.split('\n')
    location.hash = `candidates=${encodeURI(candidates.join('|'))}`
    candidateElement.innerHTML = 'La Marsellerie™'
  } else {
    candidatesElement.value = (qp('candidates') || 'Yes|No').split('|').join('\n')
  }
  editMode = !editMode
  cornerElement.innerHTML = editMode ? SYMBOLS.close : SYMBOLS.pencil
  targetElement.style.display = editMode ? 'none' : 'block'
  candidatesElement.style.display = editMode ? 'block' : 'none'
})

;['mousedown', 'touchstart'].forEach(e =>
  targetElement.addEventListener(e, () => {
    start()
  })
)
document.addEventListener('keydown', e => {
  if (editMode) return
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault()
    start()
  }
})

;['mouseup', 'touchend'].forEach(e =>
  targetElement.addEventListener(e, () => {
    freewheel = true
  })
)
document.addEventListener('keyup', e => {
  if (editMode) return
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault()
    freewheel = true
  }
})
