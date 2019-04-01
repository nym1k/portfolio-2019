'use strict';

(function () {
  // var Flickity = require('flickity');

  Init();

  function Init() {
    document.addEventListener('DOMContentLoaded', function () {
      Drawers();
      ProjectsCarousel();
    });
  }

  function Drawers() {
    var els = {
      body: document.body,
      drawer: document.querySelector('[data-drawer]'),
      drawerTrigger: document.querySelector('[data-drawer-trigger]'),
      drawerClose: document.querySelector('[data-drawer-close]'),
      drawersOverlay: document.querySelector('[data-drawers-overlay]')

      // Set up drawer trigger button
    };els.drawerTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      els.body.classList.add('utl-DrawerActive');
    });

    // Set up drawer close button
    els.drawerClose.addEventListener('click', function (e) {
      e.preventDefault();

      els.body.classList.remove('utl-DrawerActive');
    });

    // Close drawer on overlay click
    els.drawersOverlay.addEventListener('click', function (e) {
      e.preventDefault();

      els.body.classList.remove('utl-DrawerActive');
    });
  }

  function ProjectsCarousel() {
    var flkty = new Flickity('.prt-Portfolio_Items', {
      cellAlign: 'left',
      cellSelector: '.prt-Portfolio_Item',
      contain: true,
      prevNextButtons: false,
      watchCSS: true
    });
  }
})();
