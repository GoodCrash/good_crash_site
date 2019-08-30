'use strict';

import { locale } from '../gettext/locale';
import * as createDOM from '../services/createDOM';

export class Messenger {
  constructor(app) {
    this.app = app;
    this.rington = new Audio('../../audio/new-message.mp3');
    this.iAnswer = 0;
    this._isSendedFirstMessage = false;
    this._isFirstAnswer = true;
  }

  get isSendedFirstMessage() {
    return this._isSendedFirstMessage;
  }

  set isSendedFirstMessage(value) {
    this._isSendedFirstMessage = value;
  }

  get isFirstAnswer() {
    return this._isFirstAnswer;
  }

  set isFirstAnswer(value) {
    this._isFirstAnswer = value;
  }

  openMessenger() {
    this._decreaseAmountInIcon();
    this._messegerWindow();
    this._startDialogue();
  }

  closeMessenger() {
    this._messegerWindow();
  }

  sendFirstMessage() {
    this._playRigton();
    this._greetingFromGoodCrash();
    this._increaseAmountInIcon(1);
    this.isSendedFirstMessage = true;
  }

  _playRigton() {
    if (this.app.isSoundVolue) this.rington.play().catch();
  }

  _messegerWindow() {
    this.app.DOM.body.classList.toggle('messenger-open');
  }

  _greetingFromGoodCrash() {
    this.app.DOM.messengerMessage.textContent =
      locale[this.app.lang]['messenger']['hello'];
  }

  /**
   * Increase count new messages in message icon in header
   * @param { number } numberOfNewMessage
   */
  _increaseAmountInIcon(numberOfNewMessage) {
    setTimeout(() => {
      this.app.DOM.chatIcon.classList.add('new-message-arrived');
      this.app.DOM.chatCount.textContent =
        this._getCurrentAmountInIcon() + numberOfNewMessage;
    }, 1000);
  }

  /**
   * Parse current count new message in message icon in header
   */
  _getCurrentAmountInIcon() {
    return parseInt(this.app.DOM.chatCount.textContent, 10);
  }

  /**
   * Resets to zero count new message in message icon in header
   */
  _decreaseAmountInIcon() {
    this.app.DOM.chatIcon.classList.remove('new-message-arrived');
    this.app.DOM.chatCount.textContent = 0;
  }

  /**
   * Run dialog when user send message (click btn send)
   */
  _startDialogue() {
    this.app.DOM.messengerBtn.onclick = () => {
      let value = this.app.DOM.messengerInput.value;

      if (value != '') this._sendMessageFromUser(value);
      this.app.DOM.messengerInput.value = '';
    };
  }

  /**
   * Get user message. add it in dialog and run print answer
   */
  _sendMessageFromUser(value) {
    let message = this._createNewMessage('you', this._validValue(value));
    this._viewNewMessage(message);
    this._goodCrashAnswers();
  }

  /**
   * Play animation for print answer and add answer in dialog
   */
  _goodCrashAnswers() {
    this._startAnimateAnswer();

    setTimeout(() => {
      this._stopAnimateAnswer();
      this._viewNewMessage(this._getAnswresMessage());

      if (this.isFirstAnswer) this.isFirstAnswer = false;
    }, 2000);
  }

  _startAnimateAnswer() {
    let els = this._createDOMElements('messenger-message', [
      'animate',
      'animate-pen',
      'animate-dotted',
    ]);
    this._viewNewMessage(
      this._buildMessage(
        this._fillMessageWithContent(els, ['...'], ['animate-dotted']),
      ),
    );
  }

  _stopAnimateAnswer() {
    document.querySelector('.messenger-message-animate').remove();
  }

  _getAnswresMessage() {
    return this._createNewMessage('GoodCrash', this._getAnswresMessageValue());
  }

  /**
   * Take the answer in order according to this.iAnswer
   */
  _getAnswresMessageValue() {
    let value = this.isFirstAnswer
      ? locale[this.app.lang]['messenger']['first message']
      : locale[this.app.lang]['messenger']['second message'][this.iAnswer];

    if (!this.isFirstAnswer && this.iAnswer < 8) this.iAnswer += 1;
    if (this.iAnswer == 8) this.iAnswer = 0;

    return value;
  }

  _createNewMessage(author, value) {
    let els = this._createDOMElements('messenger-message', [
      'ctx',
      'author',
      'body',
    ]);
    return this._buildMessage(
      this._fillMessageWithContent(els, [author, value], ['author', 'body']),
    );
  }

  _createDOMElements(baseClass, createdClasses) {
    return createDOM.createDOMElements(baseClass, createdClasses);
  }

  _fillMessageWithContent(els, msg, elsForFill) {
    if (msg[0] == 'you') els['ctx'].classList.add(msg[0]);
    return createDOM.fillDOMElements(els, msg, elsForFill);
  }

  _buildMessage(els) {
    return createDOM.buildDOMElement(els);
  }

  _validValue(value) {
    return value.replace(/</g, ' ').replace(/>/g, ' ');
  }

  _viewNewMessage(message) {
    const messengerBody = this.app.DOM.messengerBody;

    messengerBody.appendChild(message);

    if (messengerBody.clientHeight < messengerBody.scrollHeight) {
      messengerBody.scrollTop +=
        messengerBody.scrollHeight - messengerBody.clientHeight;
    }
  }
}
