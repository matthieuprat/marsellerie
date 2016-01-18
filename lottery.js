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
  return decodeURI((new RegExp('[?&]' + p + '=([^&#]*)').exec(location.search) || [])[1] || '');
};
var target = document.getElementById('target');

var candidates = (qp('candidates') || 'Yes|No').split('|');
var freewheel = undefined,
    running = undefined;
var limit = undefined,
    i = undefined,
    j = undefined;

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
  target.classList.remove('highlight');
  next();
}

function next() {
  if (i > limit) return setTimeout(end, 100);
  if (freewheel) i++;
  target.innerHTML = candidates[j++ % candidates.length];
  setTimeout(next, timeout(i));
}

function end() {
  running = false;
  target.classList.add('highlight');
}

;['mousedown', 'touchstart', 'keydown'].forEach(function (e) {
  return document.addEventListener(e, function (e) {
    if (e instanceof MouseEvent || e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      start();
    }
  });
});['mouseup', 'touchend', 'keyup'].forEach(function (e) {
  return document.addEventListener(e, function (e) {
    if (e instanceof MouseEvent || e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      freewheel = true;
    }
  });
});
