'use strict';

import '../css/style.scss';
import '../audio/new-message.mp3';
import App from './app/App.js';

window.onload = function() {
  const app = new App();
  app.init();

  app.DOM.navTrigger.onclick = () => {
    app.openCloseNav();
  };

  document.onclick = () => {
    if (app.isLoaded && !app.messenger.isSendedFirstMessage) {
      app.messenger.sendFirstMessage();
    }
  };

  app.DOM.chatIcon.onclick = () => {
    if (app.isLoaded && app.messenger.isSendedFirstMessage)
      app.messenger.openMessenger();
  };

  app.DOM.messengerClose.onclick = () => {
    if (app.isLoaded && app.messenger.isSendedFirstMessage)
      app.messenger.closeMessenger();
  };

  app.DOM.volumeTrigger.onclick = function() {
    app.ofOnSound(this);
  };

  // change lang when clicl lang selector
  for (let langSelector of app.DOM.langSelectors) {
    langSelector.onclick = function() {
      app.clickLangSelector(this);
    };
  }
};

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
