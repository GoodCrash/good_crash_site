'use strict';

const request = new XMLHttpRequest();
const response = {
  error: null,
  ok: null,
};

export const getRequest = async (url, dir) => {
  await _sendRequest(url, dir);
};

function _sendRequest(url, dir) {
  return new Promise(resolve => {
    request.open('GET', `${__dirname + dir + '/' + url}.html`, true);
    request.setRequestHeader('Content-Type', 'text/html');
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState != 4) return;

      if (request.status != 200) {
        _returnError(request.status, request.statusText);
      } else {
        try {
          _returnOk(request.responseText);
        } catch (e) {
          _returnError(request.status, e.message);
        }
      }

      resolve();
    };
  });
}

function _returnError(status, msg) {
  response.ok = null;
  response.error = { status: status, msg: msg };
}

function _returnOk(responseText) {
  response.error = null;
  response.ok = responseText;
}

export function getResponse() {
  return response;
}
