'use strict';

import { locale } from '../gettext/locale';

/**
 * Return current language user browser
 * @returns { string }
 */
export function getCurrentLang() {
  const userLanguage = (
    navigator.language || navigator.userLanguage
  ).toLowerCase();

  return ~userLanguage.indexOf('en') ? 'en' : 'ru';
}

/**
 * Run translate DOM els with data-i18n
 * @param { object | DOM el } body, in this <body>
 * @param { string } lang
 * @param { object | DOM els } domForTranslate, with data-i18n
 * @param { boolean } pageLoad, default: false, (false -> translate say-hello els)
 */
export function changeLang(body, lang, domForTranslate, pageLoad = false) {
  body.setAttribute('lang', lang);

  if (pageLoad) _gettextTranslateWithoutAnimation(lang, domForTranslate);
  else _gettextTranslate(lang, domForTranslate);
}

/**
 * Translate in loop DOM els with data-i18n and without say-hello els
 * @param { string } lang
 * @param { object | DOM els } domForTranslate, with data-i18n
 */
function _gettextTranslateWithoutAnimation(lang, domForTranslate) {
  for (let el of domForTranslate) {
    if (el.getAttribute('load') != 'false') {
      _elementTranslate(el, lang);
    }
  }
}

/**
 * Translate in loop DOM els with data-i18n and with say-hello els
 * @param { string } lang
 * @param { object | DOM els } domForTranslate, with data-i18n
 */
function _gettextTranslate(lang, domForTranslate) {
  for (let el of domForTranslate) {
    _elementTranslate(el, lang);
  }
}

/**
 * Translate single DOM el
 * @param { object | DOM el } el
 * @param { string } lang
 */
function _elementTranslate(el, lang) {
  el.textContent = locale[lang][el.getAttribute('data-i18n')];
}
