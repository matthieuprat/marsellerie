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
var running = false;
var limit = undefined,
    i = undefined,
    j = undefined;

function disp() {
  if (i > limit) return setTimeout(stop, 100);

  target.innerHTML = candidates[j++ % candidates.length];
  setTimeout(disp, timeout(i++));
}

function start() {
  if (running) {
    i = 0;
    return;
  }
  running = true;
  i = j = 0;
  candidates = shuffle(candidates);
  limit = 20 + Math.random() * 5;
  target.classList.remove('highlight');
  disp();
}

function stop() {
  target.classList.add('highlight');
  running = false;
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    start();
  }
});

window.addEventListener('click', function (e) {
  e.preventDefault();
  start();
});
