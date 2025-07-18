// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed')

  // ... (Sticky Navigation, Mobile Nav Toggle, Smooth Scroll - KEEP AS IS) ...
  const header = document.querySelector('.main-header')
  if (header) {
    const stickyNavThreshold = 50
    function handleScroll() {
      if (window.pageYOffset > stickyNavThreshold) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle')
  const mainNav = document.querySelector('.main-nav')

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active')
      const isExpanded = mainNav.classList.contains('active')
      mobileNavToggle.setAttribute('aria-expanded', isExpanded)
      mobileNavToggle.innerHTML = isExpanded ? '✕' : '☰'
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href.length > 1 && href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault()
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active')
          if (mobileNavToggle) mobileNavToggle.innerHTML = '☰'
          mobileNavToggle.setAttribute('aria-expanded', 'false')
        }
      }
    })
  })

  // --- Hero Carousel Function (UPDATED FOR PAUSE ON HOVER/TOUCH) ---
  function initializeCarousel(carouselId, intervalTime = 5000) {
    // Default to 5 seconds
    const carouselElement = document.getElementById(carouselId)
    if (!carouselElement) {
      // console.warn(`Carousel with ID "${carouselId}" not found.`);
      return
    }

    // We need a direct container for the slides to attach hover/touch events
    const slidesContainer = carouselElement.querySelector('.hero-slides-wrapper') // NEW: Wrapper for slides
    if (!slidesContainer) {
      // console.warn(`Slides wrapper not found for carousel "${carouselId}". Carousel needs a div with class 'hero-slides-wrapper' containing the .hero-slide elements.`);
      return
    }

    const slides = slidesContainer.querySelectorAll('.hero-slide')
    const nextBtn = carouselElement.querySelector('.next-btn')
    const prevBtn = carouselElement.querySelector('.prev-btn')
    const indicatorsContainer = carouselElement.querySelector('.carousel-indicators')
    let currentSlide = 0
    let slideInterval
    let isPaused = false // Flag to track if carousel is paused

    if (slides.length <= 1) {
      if (slides.length === 1) slides[0].classList.add('active')
      if (nextBtn) nextBtn.style.display = 'none'
      if (prevBtn) prevBtn.style.display = 'none'
      if (indicatorsContainer) indicatorsContainer.style.display = 'none'
      return
    }

    const dots = []
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = ''
      slides.forEach((_, index) => {
        const dot = document.createElement('button')
        dot.classList.add('indicator-dot')
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`)
        dot.addEventListener('click', () => {
          goToSlide(index)
          if (!isPaused) resetInterval() // Only reset if not manually paused
        })
        indicatorsContainer.appendChild(dot)
        dots.push(dot)
      })
    }

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active')
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active')

      currentSlide = (index + slides.length) % slides.length

      slides[currentSlide].classList.add('active')
      if (dots[currentSlide]) dots[currentSlide].classList.add('active')
    }

    function nextSlideAction() {
      if (!isPaused) {
        // Only advance if not paused
        goToSlide(currentSlide + 1)
      }
    }

    function prevSlideAction() {
      goToSlide(currentSlide - 1)
      if (!isPaused) resetInterval() // Clicking prev/next should reset interval if not paused
    }

    function startInterval() {
      clearInterval(slideInterval)
      if (!isPaused) {
        // Only start if not paused
        slideInterval = setInterval(nextSlideAction, intervalTime)
      }
    }

    function resetInterval() {
      clearInterval(slideInterval)
      startInterval()
    }

    function pauseCarousel() {
      isPaused = true
      clearInterval(slideInterval)
      // console.log(`Carousel ${carouselId} paused`);
    }

    function resumeCarousel() {
      isPaused = false
      startInterval()
      // console.log(`Carousel ${carouselId} resumed`);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        pauseCarousel() // User interaction implies they want to pause auto-play temporarily
        nextSlideAction()
        // Optionally resume after a delay, or require another action to resume
        // For now, clicking next/prev keeps it paused until mouseout/touchend
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        pauseCarousel()
        prevSlideAction()
      })
    }

    // Pause on hover/focus for mouse users and keyboard navigation
    if (slidesContainer) {
      // Event listener on the slides wrapper
      slidesContainer.addEventListener('mouseenter', pauseCarousel)
      slidesContainer.addEventListener('mouseleave', resumeCarousel)
      // For keyboard accessibility (when controls are focused)
      carouselElement.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('focus', pauseCarousel)
        btn.addEventListener('blur', resumeCarousel)
      })
    }

    // Pause on touchstart, resume on touchend for touch devices
    // This is a common pattern but can sometimes interfere with scrolling.
    // A more robust solution might involve detecting swipe vs. hold.
    let touchStartX = 0
    let touchEndX = 0

    if (slidesContainer) {
      slidesContainer.addEventListener(
        'touchstart',
        (e) => {
          pauseCarousel()
          touchStartX = e.changedTouches[0].screenX
        },
        { passive: true }
      ) // Passive for better scroll performance

      slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX
        // Basic swipe detection (optional - you can remove if just pause/resume on touch is enough)
        // if (Math.abs(touchEndX - touchStartX) < 10) { // If not a significant swipe
        //    // It was more of a tap/hold
        // }
        // If you want it to resume immediately after touch, uncomment:
        // resumeCarousel();

        // A common UX is to keep it paused if the user touched it,
        // until they interact again or a longer timeout.
        // For simplicity, let's resume if they are not actively touching it.
        // To keep it paused after touch, you might need a different strategy
        // or rely on them clicking a control or waiting for a longer manual timeout.

        // Let's try this: resume after a short delay if no other interaction
        setTimeout(() => {
          if (isPaused) {
            // check if still paused (e.g. by another event)
            // resumeCarousel(); // Decided against auto-resume on touchend for now
            // to be consistent with mouse behavior (pauses until mouseleave)
            // User can swipe or click controls to navigate if paused.
          }
        }, 500) // Small delay before considering resume
      })
    }

    // Initialize first slide
    if (slides.length > 0) {
      slides[0].classList.add('active')
      if (dots.length > 0) dots[0].classList.add('active')
      startInterval() // Start autoplay
    }
  }

  // Initialize all carousels on the page with 5 second interval
  initializeCarousel('homepage-hero-carousel', 5000)
  initializeCarousel('solar-hero-carousel', 5000)
  initializeCarousel('tech-hero-carousel', 5000)
  initializeCarousel('translate-hero-carousel', 5000)
  initializeCarousel('plants-hero-carousel', 5000)

  // --- Scroll-triggered Reveal Elements (using Intersection Observer) ---
  // ... (KEEP AS IS) ...
  const revealElements = document.querySelectorAll('.reveal-on-scroll')
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // observer.unobserve(entry.target);
          } else {
            // entry.target.classList.remove('visible');
          }
        })
      },
      { root: null, threshold: 0.1 }
    )
    revealElements.forEach((el) => {
      revealObserver.observe(el)
    })
  }

  // --- Active Nav Link Highlighter ---
  // ... (KEEP AS IS) ...
  const navLinks = document.querySelectorAll('.main-nav ul li a')
  const currentFullUrl = window.location.href
  const currentPath = window.location.pathname

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href')
    // Handle root path ("/") for index.html
    if (
      (currentPath === '/' || currentPath.endsWith('/index.html')) &&
      linkHref === 'index.html'
    ) {
      link.classList.add('active')
    } else if (linkHref !== 'index.html' && currentFullUrl.includes(linkHref)) {
      // Check if the link's href is part of the current URL (for other pages)
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
  // Explicitly activate index.html if it's the root and no other matches
  if (currentPath === '/' && !document.querySelector('.main-nav ul li a.active')) {
    const homeLink = document.querySelector('.main-nav ul li a[href="index.html"]')
    if (homeLink) homeLink.classList.add('active')
  }

  // --- Set current year in footer ---
  // ... (KEEP AS IS) ...
  const currentYearSpan = document.getElementById('currentYear')
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // --- Basic Form Validation Example ---
  // ... (KEEP AS IS) ...
  const forms = document.querySelectorAll(
    'form.quote-form, form.contact-form, form.newsletter-form'
  )
  forms.forEach((form) => {
    form.addEventListener('submit', function (event) {
      let isValid = true
      const requiredInputs = form.querySelectorAll('[required]')
      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = 'red'
        } else {
          input.style.borderColor = '#ccc'
          if (
            input.type === 'email' &&
            input.value.trim() &&
            !input.value.includes('@')
          ) {
            isValid = false
            input.style.borderColor = 'red'
          }
        }
      })
      if (!isValid) {
        event.preventDefault()
        alert('Please fill out all required fields correctly.')
      }
    })
  })
})
