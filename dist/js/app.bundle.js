'use strict';

(function () {
  // Debounce function - taken from https://gist.github.com/nmsdvid/8807205
  var debounceEvent = function debounceEvent(callback) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 80;
    var interval = arguments[2];
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return clearTimeout(interval, interval = setTimeout.apply(undefined, [callback, time].concat(args)));
    };
  };

  Init();

  function Init() {
    document.addEventListener('DOMContentLoaded', function () {
      Drawers();
      HeroScrollDown();
      ProjectsCarousel();
      ScrollToLink();
      window.addEventListener('scroll', headerScroll);
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

  var headerScroll = debounceEvent(function () {
    var headerHeight = document.querySelector('.hd-Header').offsetHeight;

    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
      if (!document.body.classList.contains('utl-HeaderScrolled')) {
        document.body.classList.add('utl-HeaderScrolled');
      }
    } else {
      if (document.body.classList.contains('utl-HeaderScrolled')) {
        document.body.classList.remove('utl-HeaderScrolled');
      }
    }
  });

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
