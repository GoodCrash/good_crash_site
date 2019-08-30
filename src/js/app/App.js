'use strict';

import { getDOM } from './services/getDOM';
import { locale } from './gettext/locale';
import { runClock } from './services/clock';
import * as i18n from './services/i18n';
import * as animate from './services/animate/index.js';
import { Messenger } from './models/Messenger';

export default class App {
  constructor() {
    this.DOM = getDOM();
    this.lang = i18n.getCurrentLang();
    this.messenger = new Messenger(this);
    this._isLoaded = false;
    this._isSoundVolue = true;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  set isLoaded(value) {
    this._isLoaded = value;
  }

  get isSoundVolue() {
    return this._isSoundVolue;
  }

  set isSoundVolue(value) {
    this._isSoundVolue = value;
  }

  /**
   * Set clock in header tools and run preloader
   */
  init() {
    runClock(this.DOM.dataTimeEl);
    this.run();
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

  ofOnSound(el) {
    el.setAttribute('volume', !this.isSoundVolue);
    this.isSoundVolue = !this.isSoundVolue;
  }

  /**
   * Loading page and run hello animation
   */
  _start() {
    this._loadPage();
    this._sayHello();
  }

  /**
   * Load page with current url and run listen window.history
   */
  _loadPage() {
    this._loadWithCurrentLang();
  }

  /**
   * Hello animation, animated print text in DOM el '.say-hello'
   */
  _sayHello() {
    (async () => {
      await animate.pauseBetween();
      await animate.printText(
        this.DOM.iSayHelloHello,
        locale[this.lang]['main']['hello'],
      );
      await animate.printText(
        this.DOM.iSayHelloMyName,
        locale[this.lang]['main']['aleks'],
      );
      await animate.printText(
        this.DOM.iSayHelloMyNicname,
        locale[this.lang]['main']['goodcrash'],
      );
      await animate.printText(
        this.DOM.iSayHelloAndIm,
        locale[this.lang]['main']['i'],
      );
      await animate.printText(
        this.DOM.iSayHelloIndie,
        locale[this.lang]['main']['indie'],
      );
      await animate.printText(
        this.DOM.iSayHelloDeveloper,
        locale[this.lang]['main']['dev'],
      );
      await animate.pauseBetween();
    })()
      .then(() => {
        this.DOM.body.classList.add('load');
        this.isLoaded = true;
      })
      .catch(err => {
        throw new Error(err.message);
      });
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
