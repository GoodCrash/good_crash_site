'use strict';

import { locale } from '../gettext/locale';
import { WindowPage } from '../models/WindowPage';
import { getRequest, getResponse } from './xhRequest';

const windowPage = new WindowPage();
const dir = 'pages';

/**
 * Loded page when change window.history (click browser btn prev next)
 * @param { string } lang
 * @param { object | DOM el } container, in this - (main)
 */
export function listenToHistiryPages(lang, container) {
  window.onpopstate = event => {
    navigatingToUrl(event.state.path, lang, container, false);
  };
}

/**
 * Return current url
 * @returns { string }, example: "/" or "my-games"
 */
export function getCurrentUrl() {
  return window.location.pathname != '/'
    ? window.location.pathname.substring(1)
    : '/';
}

/**
 * Set new url and push it in window.history
 * @param { string } url
 */
export function setNewUrl(url) {
  let newUrl = window.location.origin + '/' + (url != '/') ? url : '';
  window.history.pushState({ path: newUrl }, '', `${newUrl}`);
}

/**
 * Loads the page on the specified url into the container based on the current lang
 * @param { string } url
 * @param { string } lang
 * @param { object | DOM el } container, in this - (main)
 * @param { bollean } equal, default: true (if true -> check for equality url)
 */
export function navigatingToUrl(url, lang, container, equal = true) {
  if (url != getCurrentUrl() && equal) _loadPageToUrl(url, lang, container);
  else if (!equal) _loadPageToUrl(url, lang, container);
}

/**
 * Send XMLHttpRequest, get response. open modal window and fill into it page or error
 * Use { getRequest, getResponse } from './xhRequest';
 * @param { string } url
 * @param { string } lang
 * @param { object | DOM el } container, in this - (main)
 */
function _loadPageToUrl(url, lang, container) {
  getRequest(url, dir)
    .then(() => {
      _fillPage(url, lang, container, getResponse());
    })
    .catch(err => {
      // TODO send me mail with error
      console.log(err.message);
    });
}

/**
 * Open modal window and fill into it page or error
 * Use { WindowPage } from '../models/WindowPage';
 * @param { string } url
 * @param { string } lang
 * @param { object | DOM el } container, in this - main
 * @param { object } response, in this - from getResponse()
 */
function _fillPage(url, lang, container, response) {
  if (response.error) {
    windowPage.openWindowError('Error', locale[lang]['error load'], container);
    console.log(url, response.error);
    // TODO send me mail with error
  } else {
    windowPage.openWindowPage(url, locale[lang][url], response.ok, container);
  }
}
