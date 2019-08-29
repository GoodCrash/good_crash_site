'use strict';

/**
 * Set date/time in header
 * @param { object | DOM el } el
 */
export function runClock(el) {
  _setTimeView(el);

  setTimeout(function currentTime() {
    _setTimeView(el);
    setTimeout(currentTime, 1000);
  }, 1000);
}

function _setTimeView(el) {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const hourse = _setFormat(date.getHours());
  const minutes = _setFormat(date.getMinutes());

  el.textContent = `${day}.${_setFormat(month + 1)} | ${hourse}:${minutes}`;
}

function _setFormat(timeFormat) {
  if (timeFormat < 10) timeFormat = '0' + timeFormat;

  return timeFormat;
}
