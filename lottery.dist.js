'use strict';

var timeout = function timeout(i) {
  return 90 + 1000 * Math.pow(i / 50, 2);
};
var shuffle = function shuffle(a) {
  return a.reduce(function (a, e) {
    return a.splice(Math.random() * (a.length + 1), 0, e), a;
  }, []);
};
var qp = function qp(p) {
  return decodeURI((new RegExp('[?&#]' + p + '=([^&#]*)').exec(window.location.search || window.location.hash) || [])[1] || '');
};
var candidateElement = document.getElementById('candidate');
var targetElement = document.getElementById('target');
var cornerElement = document.getElementById('corner');
var candidatesElement = document.getElementById('candidates');
var SYMBOLS = {
  pencil: '&#x270e;',
  close: '&times;'
};

var editMode = false;
var candidates = (qp('candidates') || 'Yes|No').split('|');
var freewheel = void 0,
    running = void 0;
var limit = void 0,
    i = void 0,
    j = void 0;

function start() {
  if (running) {
    freewheel = false;
    i = 0;
    return;
  }
  running = true;
  i = j = 0;
  candidates = shuffle(candidates);
  limit = 20 + Math.random() * 5;
  candidateElement.classList.remove('highlight');
  next();
}

function next() {
  if (i > limit) return setTimeout(end, 100);
  if (freewheel) i++;
  candidateElement.innerHTML = candidates[j++ % candidates.length];
  setTimeout(next, timeout(i));
}

function end() {
  running = false;
  candidateElement.classList.add('highlight');
}

cornerElement.addEventListener('click', function (e) {
  if (editMode) {
    candidates = candidatesElement.value.split('\n');
    location.hash = 'candidates=' + encodeURI(candidates.join('|'));
    candidateElement.innerHTML = 'Press the space key';
  } else {
    candidatesElement.value = (qp('candidates') || 'Yes|No').split('|').join('\n');
  }
  editMode = !editMode;
  cornerElement.innerHTML = editMode ? SYMBOLS.close : SYMBOLS.pencil;
  targetElement.style.display = editMode ? 'none' : 'block';
  candidatesElement.style.display = editMode ? 'block' : 'none';
});['mousedown', 'touchstart'].forEach(function (e) {
  return targetElement.addEventListener(e, function () {
    start();
  });
});
document.addEventListener('keydown', function (e) {
  if (editMode) return;
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    start();
  }
});['mouseup', 'touchend'].forEach(function (e) {
  return targetElement.addEventListener(e, function () {
    freewheel = true;
  });
});
document.addEventListener('keyup', function (e) {
  if (editMode) return;
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    freewheel = true;
  }
});
