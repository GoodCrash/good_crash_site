'use strict';

import '../css/style.scss';

window.onload = function() {
  console.log('window onload');
};

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
