'use strict';

import { getPreloaderDOM } from '../services/getDOM';
import * as animate from '../services/animate/index.js';

export class Preloader {
  constructor() {
    this.DOM = getPreloaderDOM();
    this.timePrinted = 30;

    this.text = {
      'success preload': {
        '0': '[ OK ] Begin initializing scripts...',
        '1': '[ OK ] Start processes ',
        '2': '[ OK ] Downloading resources ',
        '3': '[ OK ] Build |> Run... ',
      },
      'error preload': {
        '0': '[ ERROR ] ...',
      },
      'crash preload': {
        '0': '[ CRASH ] ...',
      },
      'goodcrash preload': {
        '0': '[ GOODCRASH ] ...',
      },
    };
    //this.ctx = this.app.DOM.preloaderCtx;
    this.run = async () => {
      await this._preloadingAnimation();
    };
  }

  /**
   * Run animation steps and when its played remove DOM el '.perloader' in DOM
   * @returns { Promise }
   */
  _preloadingAnimation() {
    return new Promise(resolve => {
      const animationSteps = async () => {
        await this._loadingSuccessScene();
        await animate.pauseBetween();
        await this._glitchScreen();
        await animate.pauseBetween();
        await this._loadingCrashIcon();
        await animate.pauseBetween();
        await this._loadingGoodCrashIcon();
        await animate.pauseBetween(4000);
      };

      animationSteps().then(() => {
        this.DOM.preloader.remove();
        resolve();
      });
    });
  }

  /**
   * Step 1:
   * - animated print text in DOM el '.preloader-ctx'
   * @returns { Promise }
   */
  _loadingSuccessScene() {
    return new Promise(resolve => {
      const print = async () => {
        await animate.printText(
          this.DOM.preloaderCtx,
          this.text['success preload'],
        );
      };

      print()
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(`Preloader._loadingSuccessScene: ${err}`);
        });
    });
  }

  /**
   * Step 2:
   * - clear text in DOM el '.preloader-ctx'
   * - add class in classList DOM el '.preloader'
   * - set data-text to DOM el '.preloader-ctx' for it animation on css
   * - animated print into DOM el '.preloader-ctx' new text
   * @returns { Promise }
   */
  _glitchScreen() {
    return new Promise(resolve => {
      this.DOM.preloaderCtx.innerHTML = '';
      this.DOM.preloader.classList.add('glitch');
      this.DOM.preloaderCtx.dataset.text += this.text['error preload']['0'];

      const print = async () => {
        await animate.printText(
          this.DOM.preloaderCtx,
          this.text['error preload'],
        );
      };

      print()
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(`Preloader._glitchScreen: ${err}`);
        });
    });
  }

  /**
   * Step 3:
   * - add Crash logo in screen (add class in classList DOM el '.preloader')
   * - clear data-text value to DOM el '.preloader-ctx' and set it new value
   * - animated delete text in DOM el '.preloader-ctx' and print new
   * @returns { Promise }
   */
  _loadingCrashIcon() {
    return new Promise(resolve => {
      this.DOM.preloader.classList.add('crash');
      this.DOM.preloaderCtx.dataset.text = '';
      this.DOM.preloaderCtx.dataset.text += this.text['crash preload']['0'];

      const drawCrashIcon = async () => {
        await animate.deleteText(
          this.DOM.preloaderCtx,
          this.text['error preload'],
        );
        await animate.printText(
          this.DOM.preloaderCtx,
          this.text['crash preload'],
        );
      };

      drawCrashIcon()
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(`Preloader._loadingCrashIcon: ${err}`);
        });
    });
  }

  /**
   * Step 4:
   * - change classList for DOM el '.preloader' and data-text for DOM el '.preloader-ctx'
   * - animated delete text in DOM el '.preloader-ctx' and print new
   * @returns { Promise }
   */
  _loadingGoodCrashIcon() {
    return new Promise(resolve => {
      const addClass = () => {
        this.DOM.preloader.classList.add('good-crash');
        this.DOM.preloaderCtx.dataset.text = '';
        this.DOM.preloaderCtx.dataset.text += this.text['goodcrash preload'][
          '0'
        ];
      };

      const drawGoodCrashIcon = async () => {
        await animate.deleteText(
          this.DOM.preloaderCtx,
          this.text['crash preload'],
        );
        await addClass();
        await animate.printText(
          this.DOM.preloaderCtx,
          this.text['goodcrash preload'],
        );
      };

      drawGoodCrashIcon()
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(`Preloader._loadingCrashIcon: ${err}`);
        });
    });
  }
}
