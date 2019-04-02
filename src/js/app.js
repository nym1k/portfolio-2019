(function() {
  // Check if iOS
  if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    document.body.classList.add('utl-iOS')
  }
  // Debounce function - taken from https://gist.github.com/nmsdvid/8807205
  const debounceEvent = (callback, time = 80, interval) =>
    (...args) =>
      clearTimeout(interval, interval = setTimeout(callback, time, ...args));

  Init()

  function Init() {
    document.addEventListener('DOMContentLoaded', () => {
      heroFullHeight()
      window.addEventListener('resize', heroFullHeight)
      Drawers()
      HeroScrollDown()
      ProjectsCarousel()
      ScrollToLink()
      window.addEventListener('scroll', headerScroll)
    })
  }

  const heroFullHeight = debounceEvent(function() {
    document.querySelector('.her-Hero').style.height = `${window.innerHeight}px`
  })

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

  const headerScroll = debounceEvent(function() {
    const headerHeight = document.querySelector('.hd-Header').offsetHeight

    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
      if (!document.body.classList.contains('utl-HeaderScrolled')) {
        document.body.classList.add('utl-HeaderScrolled')
      }
    } else {
      if (document.body.classList.contains('utl-HeaderScrolled')) {
        document.body.classList.remove('utl-HeaderScrolled')
      }
    }
  })

  function HeroScrollDown() {
    const els = {
      header: document.querySelector('.hd-Header'),
      heroButton: document.querySelector('[data-hero-button]'),
      sections: [].slice.call(document.querySelectorAll('section'))
    }

    const nextSection = document.getElementById(els.sections[1].id)

    els.heroButton.addEventListener('click', function(e) {
      e.preventDefault()

      const headerHeight = els.header.offsetHeight
      const heroScrollOffset = nextSection.offsetTop - headerHeight

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
