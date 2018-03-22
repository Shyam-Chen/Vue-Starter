/* eslint-disable */
(function () {
  'use strict';

  window.addEventListener('load', function () {
    var isServiceWorker = 'serviceWorker' in navigator;
    var isHTTPS = window.location.protocol === 'https:';
    var isLocalHost = window.location.hostname === 'localhost';

    if (isServiceWorker && (isHTTPS || isLocalHost)) {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(function (registration) {
          registration.onupdatefound = function () {
            if (navigator.serviceWorker.controller) {
              var installing = registration.installing;

              installing.onstatechange = function () {
                switch (installing.state) {
                  case 'installed':
                    registration.update();
                    break;
                  case 'activated':
                    window.location.reload();
                    break;
                  case 'redundant':
                    throw new Error('The installing service worker became redundant.');
                }
              };
            }
          };
        })
        .catch(function (error) {
          console.error('Error during service worker registration: ', error);
        });
    }
  });
});
