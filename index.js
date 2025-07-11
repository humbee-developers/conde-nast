// Enhanced Mobile Navigation and Interactions
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.querySelector(".navbar")
  const body = document.body

  // Mobile menu toggle with enhanced animations
  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.contains("active")

    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")

    // Prevent body scroll when menu is open
    if (!isActive) {
      body.style.overflow = "hidden"
      body.style.paddingRight = getScrollbarWidth() + "px"
    } else {
      body.style.overflow = ""
      body.style.paddingRight = ""
    }
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault()

        // Close menu with delay for better UX
        setTimeout(() => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
          body.style.overflow = ""
          body.style.paddingRight = ""
        }, 150)
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.style.overflow = ""
      body.style.paddingRight = ""
    }
  })

  // Enhanced navbar scroll effect
  let lastScrollTop = 0
  let ticking = false

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollDirection = scrollTop > lastScrollTop ? "down" : "up"

    // Enhanced background opacity based on scroll
    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.96)"
      navbar.style.borderBottomColor = "rgba(0, 0, 0, 0.12)"
    } else if (scrollTop > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.94)"
      navbar.style.borderBottomColor = "rgba(0, 0, 0, 0.10)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.92)"
      navbar.style.borderBottomColor = "rgba(0, 0, 0, 0.08)"
    }

    lastScrollTop = scrollTop
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 72 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // Close mobile menu with Escape key
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.style.overflow = ""
      body.style.paddingRight = ""
    }

    // Navigate menu items with arrow keys
    if (navMenu.classList.contains("active")) {
      const focusedElement = document.activeElement
      const menuItems = Array.from(navLinks)
      const currentIndex = menuItems.indexOf(focusedElement)

      if (e.key === "ArrowDown" && currentIndex < menuItems.length - 1) {
        e.preventDefault()
        menuItems[currentIndex + 1].focus()
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault()
        menuItems[currentIndex - 1].focus()
      }
    }
  })

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".hero-title")
  animatedElements.forEach((el) => observer.observe(el))

  // Handle window resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
        body.style.overflow = ""
        body.style.paddingRight = ""
      }
    }, 250)
  })

  // Scroll indicator interaction
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
    })

    // Hide scroll indicator after scrolling
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        if (scrolled > 200) {
          scrollIndicator.style.opacity = "0"
          scrollIndicator.style.transform = `translateX(-50%) translateY(${rate}px)`
        } else {
          scrollIndicator.style.opacity = "1"
          scrollIndicator.style.transform = "translateX(-50%) translateY(0)"
        }
      },
      { passive: true },
    )
  }

  // Utility function to get scrollbar width
  function getScrollbarWidth() {
    const outer = document.createElement("div")
    outer.style.visibility = "hidden"
    outer.style.overflow = "scroll"
    outer.style.msOverflowStyle = "scrollbar"
    document.body.appendChild(outer)

    const inner = document.createElement("div")
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    outer.parentNode.removeChild(outer)

    return scrollbarWidth
  }

  // Performance optimization: Preload critical resources
  function preloadCriticalResources() {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UbgmTMG1ozQRdoOVYHdbNFefcocD4e.png"
    document.head.appendChild(link)
  }

  preloadCriticalResources()

  // Add loading state management
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger hero animation after load
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title")
      if (heroTitle) {
        heroTitle.style.animationPlayState = "running"
      }
    }, 100)
  })
})



// Preload video for better performance
function preloadHeroVideo() {
  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "video"
  link.href = "/placeholder-video.mp4"
  document.head.appendChild(link)
}

preloadHeroVideo()

// Advanced scroll performance optimization
const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll-heavy operations
const throttledScrollHandler = throttle(() => {
  // Additional scroll-based animations can be added here
}, 16) // ~60fps

window.addEventListener("scroll", throttledScrollHandler, { passive: true })
