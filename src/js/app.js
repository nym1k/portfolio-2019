(function() {
  // var Flickity = require('flickity');

  Init()

  function Init() {
    document.addEventListener('DOMContentLoaded', () => {
      Drawers()
      HeroScrollDown()
      ProjectsCarousel()
      ScrollToLink()
    })
  }

  function Drawers() {
    const els = {
      body: document.body,
      drawer: document.querySelector('[data-drawer]'),
      drawerTrigger: document.querySelector('[data-drawer-trigger]'),
      drawerClose: document.querySelector('[data-drawer-close]'),
      drawersOverlay: document.querySelector('[data-drawers-overlay]'),
      drawerLinks: [].slice.call(document.querySelectorAll('[data-drawer] nav a'))
    }

    // Set up drawer trigger button
    els.drawerTrigger.addEventListener('click', function(e) {
      e.preventDefault();

      els.body.classList.add('utl-DrawerActive')
    })

    // Set up drawer close button
    els.drawerClose.addEventListener('click', function(e) {
      e.preventDefault();

      els.body.classList.remove('utl-DrawerActive')
    })

    // Close drawer on overlay click
    els.drawersOverlay.addEventListener('click', function(e) {
      e.preventDefault();

      els.body.classList.remove('utl-DrawerActive')
    })

    // Close drawer on drawer link click
    els.drawerLinks.forEach(function(link){
      link.addEventListener('click', function() {
        els.body.classList.remove('utl-DrawerActive')
      })
    })
  }

  function HeroScrollDown() {
    const els = {
      header: document.querySelector('.hd-Header'),
      heroButton: document.querySelector('[data-hero-button]')
    }

    els.heroButton.addEventListener('click', function(e) {
      e.preventDefault()

      const windowHeight = window.innerHeight
      const headerHeight = els.header.offsetHeight
      const heroScrollOffset = windowHeight - headerHeight

      ScrollTo(heroScrollOffset)
    })
  }

  function ProjectsCarousel() {
    var flkty = new Flickity( '.prt-Portfolio_Items', {
      cellAlign: 'left',
      cellSelector: '.prt-Portfolio_Item',
      contain: true,
      prevNextButtons: false,
      watchCSS: true
    })
  }

  function ScrollToLink() {
    const els = {
      header: document.querySelector('.hd-Header'),
      links: [].slice.call(document.querySelectorAll('a[href^="#"]'))
    }

    els.links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const headerHeight = els.header.offsetHeight
        const linkHref = link.getAttribute("href").slice(1)
        const linkEl = document.getElementById(linkHref)
        const linkElOffsetTop = linkEl.offsetTop - headerHeight

        e.preventDefault()
        ScrollTo(linkElOffsetTop)
      })
    })
  }

  function ScrollTo(offsetTop) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: offsetTop
    });
  }
})()
