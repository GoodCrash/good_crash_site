'use strict';

import { Preloader } from './models/Preloader';
import { getDOM } from './services/getDOM';
import { locale } from './gettext/locale';
import { runClock } from './services/clock';
import * as i18n from './services/i18n';
import * as animate from './services/animate/index.js';
import * as navigation from './services/navigation';
import { Messenger } from './models/Messenger';

export default class App {
  constructor() {
    this.DOM = getDOM();
    this.lang = i18n.getCurrentLang();
    this.messenger = new Messenger(this);
    this._isLoaded = true;
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
    this._preload();
  }

  run() {
    this._start();
  }

  openCloseNav() {
    this.DOM.body.classList.toggle('nav-is-open');
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

  navigate(url) {
    this._removeClassListForNav();
    console.log(url);
    navigation.navigatingToUrl(url, this.lang, this.DOM.pagesContent);
  }

  /**
   * When preloader.run() finish -> run this.start()
   */
  _preload() {
    const preloader = new Preloader();
    preloader.run().then(() => {
      this._start();
    });
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

    let url = navigation.getCurrentUrl();
    if (url != '/') {
      navigation.navigatingToUrl(url, this.lang, this.DOM.pagesContent, false);
    }

    navigation.listenToHistiryPages(this.lang, this.DOM.pagesContent);
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
    i18n.changeLang(this.DOM.body, this.lang, this.DOM.domForTranslate, true);
  }

  _removeClassListForNav() {
    if (this.DOM.body.classList.contains('nav-is-open')) {
      this.DOM.body.classList.remove('nav-is-open');
    }
  }
}
