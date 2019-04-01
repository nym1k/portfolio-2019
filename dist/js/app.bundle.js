'use strict';

(function () {
  // var Flickity = require('flickity');

  Init();

  function Init() {
    document.addEventListener('DOMContentLoaded', function () {
      Drawers();
      HeroScrollDown();
      ProjectsCarousel();
      ScrollToLink();
    });
  }

  function Drawers() {
    var els = {
      body: document.body,
      drawer: document.querySelector('[data-drawer]'),
      drawerTrigger: document.querySelector('[data-drawer-trigger]'),
      drawerClose: document.querySelector('[data-drawer-close]'),
      drawersOverlay: document.querySelector('[data-drawers-overlay]'),
      drawerLinks: [].slice.call(document.querySelectorAll('[data-drawer] nav a'))

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

    // Close drawer on drawer link click
    els.drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        els.body.classList.remove('utl-DrawerActive');
      });
    });
  }

  function HeroScrollDown() {
    var els = {
      header: document.querySelector('.hd-Header'),
      heroButton: document.querySelector('[data-hero-button]')
    };

    els.heroButton.addEventListener('click', function (e) {
      e.preventDefault();

      var windowHeight = window.innerHeight;
      var headerHeight = els.header.offsetHeight;
      var heroScrollOffset = windowHeight - headerHeight;

      ScrollTo(heroScrollOffset);
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

  function ScrollToLink() {
    var els = {
      header: document.querySelector('.hd-Header'),
      links: [].slice.call(document.querySelectorAll('a[href^="#"]'))
    };

    els.links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var headerHeight = els.header.offsetHeight;
        var linkHref = link.getAttribute("href").slice(1);
        var linkEl = document.getElementById(linkHref);
        var linkElOffsetTop = linkEl.offsetTop - headerHeight;

        e.preventDefault();
        ScrollTo(linkElOffsetTop);
      });
    });
  }

  function ScrollTo(offsetTop) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: offsetTop
    });
  }
})();
