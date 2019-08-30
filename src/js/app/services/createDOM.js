'use strict';

export function createDOMElements(baseClass, createdClasses) {
  let els = [];

  createdClasses.forEach(i => {
    els[i] = document.createElement('div');
    els[i].className = `${baseClass}-${i}`;
  });

  return els;
}

export function fillDOMElements(els, ctx, value) {
  value.forEach((arg, i) => {
    els[arg].innerHTML = ctx[i];
  });

  return els;
}

export function buildDOMElement(els) {
  let arrayForEls = Object.keys(els);

  for (let i = 1; i < arrayForEls.length; i++) {
    els[arrayForEls[0]].appendChild(els[arrayForEls[i]]);
  }

  return els[arrayForEls[0]];
}
