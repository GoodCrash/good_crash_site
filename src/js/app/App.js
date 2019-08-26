'use strict';

import { getDOM } from './services/getDOM';
import * as i18n from './services/i18n';

export default class App {
  constructor() {
    this.DOM = getDOM();
    this.lang = i18n.getCurrentLang();
    this._isLoaded = true;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  set isLoaded(value) {
    this._isLoaded = value;
  }

  run() {
    console.log(this.lang);
    this._start();
  }

  clickLangSelector(langSelector) {
    this.lang = langSelector.textContent;

    /**
     * if isLoaded == true
     * translation by clicking on the language selector is allowed
     */
    if (this.isLoaded) {
      i18n.changeLang(this.DOM.body, this.lang, this.DOM.domForTranslate);
    } else {
      i18n.changeLang(this.DOM.body, this.lang, this.DOM.domForTranslate, true);
    }
  }

  /**
   * Loading page and run hello animation
   */
  _start() {
    this._loadPage();
  }

  /**
   * Load page with current url and run listen window.history
   */
  _loadPage() {
    this._loadWithCurrentLang();
  }

  /**
   * Use i18n for translate site when window onload
   */
  _loadWithCurrentLang() {
    if (document.documentElement.getAttribute('lang') != this.lang) {
      i18n.changeLang(this.DOM.body, this.lang, this.DOM.domForTranslate, true);
    }
  }
}
