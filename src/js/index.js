'use strict';

import '../css/style.scss';
import App from './app/App.js';

window.onload = function() {
  const app = new App();
  app.run();

  // change lang when clicl lang selector
  for (let langSelector of app.DOM.langSelectors) {
    langSelector.onclick = function() {
      console.log(this);
      app.clickLangSelector(this);
    };
  }
};

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
