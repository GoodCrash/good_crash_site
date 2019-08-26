'use strict';

import { animateIntervals } from './animateIntervals.js';

/**
 * Animated text printing
 * @param { object | DOM el } container
 * @param { object } text
 * @returns { Promise }
 */
export function printText(container, text) {
  return new Promise(resolve => {
    let countStrings = Object.keys(text).length;
    let i = 0;

    let printStrings = (string, print) => {
      print();
    };

    let printWords = () => {
      let chars = text[i].split('');
      let n = 0;

      setTimeout(function animate() {
        printChar(chars[n]);

        if (n < chars.length - 1)
          setTimeout(animate, animateIntervals.timePrintText);
        else if (n == chars.length - 1) {
          clearTimeout(animate);
          i++;
          if (i < countStrings) {
            setTimeout(() => {
              addLineBreak();
              printStrings(text[i], () => {
                printWords();
              });
            }, 250);
          } else if (i == countStrings) {
            resolve();
          }
        }

        n++;
      }, animateIntervals.timePrintText);
    };

    let printChar = char => {
      container.innerHTML += char;
    };

    let addLineBreak = () => {
      container.innerHTML += ' </br>';
    };

    printStrings(text[i], () => {
      printWords();
    });
  });
}

/**
 * Animated text delete
 * @param { object | DOM el } container
 * @param { object } text
 * @returns { Promise }
 */
export function deleteText(container, text) {
  return new Promise(resolve => {
    let countStrings = Object.keys(text).length;
    let i = countStrings - 1;

    let deleteStrings = (string, backspaceText) => {
      backspaceText();
    };

    let deleteChar = n => {
      container.innerHTML = '';
      container.innerHTML = text[i].substring(0, n);
    };

    let deleteWords = () => {
      let n = text[i].length - 1;

      setTimeout(function animate() {
        deleteChar(n);

        if (n > 0) setTimeout(animate, animateIntervals.timePrintText);
        else if (n == 0) {
          clearTimeout(animate);
          if (i != 0) i--;
          if (i < countStrings && i != 0) {
            setTimeout(() => {
              deleteStrings(text[i], () => {
                deleteWords();
              });
            }, 250);
          } else if (i == 0) {
            resolve();
          }
        }

        n--;
      }, animateIntervals.timePrintText);
    };

    deleteStrings(text[i], () => {
      deleteWords();
    });
  });
}

/**
 * Set pause duration specified in the param
 * @param { number } time, default 2000ms
 * @returns { Promise }
 */
export function pauseBetween(time = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
