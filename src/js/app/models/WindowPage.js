'use strict';

import * as createDOM from '../services/createDOM';
import { setNewUrl } from '../services/navigation';

export class WindowPage {
  constructor() {}

  /**
   * public function - Menege modal window for error when can't load page
   * @param { string } title
   * @param { string } content
   * @param { object | DOM el } container
   */
  openWindowError(title, content, container) {
    const baseClass = 'window-error';
    const createClases = ['window', 'title', 'close', 'window-body'];
    const windowError = this._createWindow(
      title,
      content,
      baseClass,
      createClases,
    );

    this._viewWindow(container, windowError);
    this._canCloseWindow(windowError, true);
  }

  /**
   * public function - Menege modal window for loading page
   * @param { string } url
   * @param { string } title
   * @param { string } content
   * @param { object | DOM el } container
   */
  openWindowPage(url, title, content, container) {
    const baseClass = 'window-page';
    const createClases = [
      'window',
      'title',
      'full-screen',
      'close',
      'window-body',
    ];
    const windowPage = this._createWindow(
      title,
      content,
      baseClass,
      createClases,
    );

    windowPage.classList.add(url);

    this._viewWindow(container, windowPage);
    this._setActiveWhenClickThisWindow(url, windowPage);
    this._canFullScreenSize(windowPage);
    this._canDragAndDrop(windowPage);
    this._canCloseWindow(windowPage, false);
  }

  /**
   * Create with classes, fill content and build new DOM el
   * Return false if el presente in DOM
   * @param { string } title
   * @param { string } content
   * @param { string } baseClass
   * @param { array } createClases
   * @returns { object | DOM el }
   */
  _createWindow(title, content, baseClass, createClases) {
    let els = createDOM.createDOMElements(baseClass, createClases);

    return createDOM.buildDOMElement(
      createDOM.fillDOMElements(
        els,
        [title, content],
        ['title', 'window-body'],
      ),
    );
  }

  /**
   * Set el active, other els not active.
   * Append el in contaimer.
   * Or change el classList for show it, if it was added earlier.
   * @param { object | DOM el } el
   * @param { object | DOM el } container, in this - (main)
   */
  _viewWindow(container, el) {
    this._setActive(el.classList[1], el);

    if (this._isMissingInContainer(el.classList.value)) {
      container.appendChild(el);
    } else {
      this._showHidenWindow(el.classList.value);
    }
  }

  /**
   * Return true if el with classes in classList missing in DOM
   * Return false if el presente in DOM
   * @param { string } classesForSelect, example: "window-page-window my-games"
   * @returns { boolean }
   */
  _isMissingInContainer(classesForSelect) {
    if (this._getElementForSelector(classesForSelect)) return false;

    return true;
  }

  /**
   * Remove class in classList finding DOM, as a result el change css style
   * @param { string } classesForSelect, example: "window-page-window my-games"
   */
  _showHidenWindow(classesForSelect) {
    this._getElementForSelector(classesForSelect).classList.remove(
      'closed-window',
    );
  }

  /**
   * Change classList for el and els in finding NodeList.
   * For el remove 'not-active' and it becomes active (z-index: 6000)
   * For other els add 'not-active' and it becomes not active (z-index: 5000)
   * Set new url for active el, if it not close
   * Use { setNewUrl } from '../services/navigation';
   * @param { string } url
   * @param { object | DOM el } el
   */
  _setActive(url, el) {
    let allWindows = this._getAllElementsForSelector(el.classList);

    for (let windowInAll of allWindows) {
      if (!windowInAll.classList.contains(el.classList[1])) {
        if (windowInAll) windowInAll.classList.add('not-active');
      } else {
        windowInAll.classList.remove('not-active');
      }
    }

    if (!el.classList.contains('closed-window')) setNewUrl(el.classList[1]);
  }

  /**
   * Set el active when click on it, if it has class 'not-active'
   * @param { string } url
   * @param { object | DOM el } el
   */
  _setActiveWhenClickThisWindow(url, el) {
    el.onclick = () => {
      if (el.classList.contains('not-active')) this._setActive(url, el);
    };
  }

  /**
   * Toggle class in classList el, as a result el change css style
   * @param { object | DOM el } el
   */
  _canFullScreenSize(el) {
    let fullScreenTrigger = this._getChildNodeForSelector(
      el.classList,
      'full-screen',
    );

    el.querySelector(`.${fullScreenTrigger}`).onclick = () => {
      el.classList.toggle('full-screen');
      el.style.top = 31 + 'px';
      el.style.left = 1 + 'px';
    };
  }

  /**
   * Changes position el in the capture of title in el, if el
   * hasn't class full-screen
   * @param { object | DOM el } el
   */
  _canDragAndDrop(el) {
    let titleTrigger = this._getChildNodeForSelector(el.classList, 'title');

    el.querySelector(`.${titleTrigger}`).onmousedown = event => {
      if (!el.classList.contains('full-screen')) this._dragAndDrop(el, event);
    };
  }

  /**
   * Drag and Drop effect witn el
   * @param { object | DOM el } el
   * @param { event | event mouse/touchpad } event
   */
  _dragAndDrop(el, event) {
    const coords = _getCoords(el);
    const shiftX = event.pageX - coords.left;
    const shiftY = event.pageY - coords.top;

    _moveAt(event);

    document.onmousemove = function(e) {
      _moveAt(e);
    };

    el.onmouseup = function() {
      document.onmousemove = null;
      el.onmouseup = null;
    };

    function _getCoords(element) {
      const box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    }

    function _moveAt(e) {
      el.style.left = e.pageX - shiftX + 'px';
      el.style.top = e.pageY - shiftY + 'px';
    }

    el.ondragstart = function() {
      return false;
    };
  }

  /**
   * Remove windowError and Hide windowPage when click close window icon
   * Set new url for activ not closed window or root ('/')
   * Use { setNewUrl } from '../services/navigation';
   * @param { object | DOM el } el
   * @param { boolean } remove
   */
  _canCloseWindow(el, remove = true) {
    let closeTrigger = this._getChildNodeForSelector(el.classList, 'close');

    el.querySelector(`.${closeTrigger}`).onclick = () => {
      if (remove) {
        el.remove();
      } else {
        el.classList.add('closed-window');
        setNewUrl(this._classActiveWindow(el));
      }
    };
  }

  /**
   * Find remaining open windows, and get class on last on NodeList
   * Return url math class
   * @param { object | DOM el } el
   * @returns { string }
   */
  _classActiveWindow(el) {
    let remainingEl;
    let nodeList = this._getAllElementsForSelector(el.classList);

    for (let node of nodeList) {
      if (!node.classList.contains('closed-window')) {
        remainingEl = node;
      }
    }

    if (remainingEl) return remainingEl.classList[1];

    return '/';
  }

  /**
   * Return finding DOM el with building class selector
   * @param { string } classesForSelect, example: "window-page-window my-games"
   * @returns { object | DOM el }
   */
  _getElementForSelector(classesForSelect) {
    let selector = classesForSelect.split(' ').join('.');

    return document.querySelector(`.${selector}`);
  }

  /**
   * Return building class selector for find child in el
   * @param { object | DOMTokenList } classList, example: ["window-page-window", "my-games", value: "..."]
   * @param { string } key
   * @returns { string }
   */
  _getChildNodeForSelector(classList, key) {
    let firstPartForBuildSelector = classList[0].split('-');
    firstPartForBuildSelector.length = 2;

    return firstPartForBuildSelector.join('-') + '-' + key;
  }

  /**
   * Return finding NodeList els with building class selector
   * @param { object | DOMTokenList } classList, example: ["window-page-window", "my-games", value: "..."]
   * @returns { object | NodeList }
   */
  _getAllElementsForSelector(classList) {
    let selector = classList[0];

    return document.querySelectorAll(`.${selector}`);
  }
}
