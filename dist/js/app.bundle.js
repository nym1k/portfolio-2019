'use strict';

(function () {
  // Check if iOS
  if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    document.body.classList.add('utl-iOS');
  }

  // Check if IE
  if (/MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    document.body.classList.add('utl-IE');
  }

  // Check if Edge
  if (/Edge\/\d./i.test(navigator.userAgent)) {
    document.body.classList.add('utl-Edge');
  }

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

  // kick off the polyfill!

  Init();

  function Init() {
    document.addEventListener('DOMContentLoaded', function () {
      heroFullHeight();
      window.addEventListener('resize', heroFullHeightDebounce);
      Drawers();
      smoothScrollPolyfill();
      ScrollToLink();
      HeroScrollDown();
      window.addEventListener('scroll', headerScroll);
      inViewSVGs();
      ProjectsCarousel();
    });
  }

  function inViewSVGs() {
    inView('.crd-Service_Icon').on('enter', function (el) {
      el.classList.add('crd-Service_Icon-inView');
    });
    inView('.crd-Service_Title').on('enter', function (el) {
      el.classList.add('crd-Service_Title-inView');
    });
    inView('.crd-Service_Text').on('enter', function (el) {
      el.classList.add('crd-Service_Text-inView');
    });
    inView('.utl-FadeIn').on('enter', function (el) {
      el.classList.add('utl-FadedIn');
    });
  }

  function heroFullHeight() {
    document.querySelector('.her-Hero').style.height = window.innerHeight + 'px';
    objectFitVideos();
  }

  var heroFullHeightDebounce = debounceEvent(function () {
    document.querySelector('.her-Hero').style.height = window.innerHeight + 'px';
  });

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
      heroButton: document.querySelector('[data-hero-button]'),
      sections: [].slice.call(document.querySelectorAll('section'))
    };

    var nextSection = document.getElementById(els.sections[1].id);

    els.heroButton.addEventListener('click', function (e) {
      e.preventDefault();

      var headerHeight = els.header.offsetHeight;
      var heroScrollOffset = nextSection.offsetTop - headerHeight;

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

    flkty.on('dragStart', function (event, pointer) {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    });

    flkty.on('dragEnd', function (event, pointer) {
      document.ontouchmove = function (e) {
        return true;
      };
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
