'use strict';

export function getDOM() {
  return {
    body: document.getElementById('body'),
    main: document.getElementById('main'),
    pagesContent: document.querySelector('.pages-content'),
    navTrigger: document.querySelector('.nav-trigger'),
    navLinks: document.querySelectorAll('.nav-link'),
    dataTimeEl: document.querySelector('.data-time'),
    volumeTrigger: document.querySelector('.volume-trigger'),
    iSayHelloHello: document.querySelector('.i-say-hello-hello'),
    iSayHelloMyName: document.querySelector('.i-say-hello-my-name'),
    iSayHelloMyNicname: document.querySelector('.i-say-hello-my-nicname'),
    iSayHelloAndIm: document.querySelector('.i-say-hello-and-im'),
    iSayHelloIndie: document.querySelector('.i-say-hello-indie'),
    iSayHelloDeveloper: document.querySelector('.i-say-hello-developer'),
    langSelectors: document.querySelectorAll('.lang-selectors'),
    domForTranslate: document.getElementsByName('i18n'),
    chatIcon: document.querySelector('.main-chat'),
    chatCount: document.querySelector('.main-chat-count-new'),
    myGames: document.querySelector('.my-games'),
    myGarbige: document.querySelector('.my-garbige'),
    messengerClose: document.querySelector('.messenger-header-close'),
    messengerBody: document.querySelector('.messenger-body'),
    messengerMessage: document.querySelector('.messenger-message-body'),
    messengerInput: document.getElementById('messenger'),
    messengerBtn: document.querySelector('.messenger-send-btn'),
  };
}
