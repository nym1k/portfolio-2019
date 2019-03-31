'use strict';

(function () {
  var els = {
    body: document.querySelector('body'),
    drawer: document.querySelector('[data-drawer]'),
    drawerTrigger: document.querySelector('[data-drawer-trigger]'),
    drawerClose: document.querySelector('[data-drawer-close]'),
    drawersOverlay: document.querySelector('[data-drawers-overlay]')

    // Set up drawer trigger button
  };els.drawerTrigger.addEventListener('click', function (e) {
    e.preventDefault();

    document.body.classList.add('utl-DrawerActive');
  });

  // Set up drawer close button
  els.drawerTrigger.addEventListener('click', function (e) {
    e.preventDefault();

    els.body.classList.remove('utl-DrawerActive');
  });
})();
