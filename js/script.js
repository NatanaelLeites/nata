// DOM Elements
const menuBtn = document.getElementById("menuBtn")
const menuIcon = document.getElementById("menuIcon")
const mobileNav = document.getElementById("mobileNav")
const contactForm = document.getElementById("contactForm")

// Mobile Menu Toggle
menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active")

  if (mobileNav.classList.contains("active")) {
    menuIcon.className = "fas fa-times"
  } else {
    menuIcon.className = "fas fa-bars"
  }
})

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll(".header__mobile-link")
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active")
    menuIcon.className = "fas fa-bars"
  })
})

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]')
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
const animatedElements = document.querySelectorAll(
  ".section__title, .about__content, .project-card, .skill-category, .contact__content",
)
animatedElements.forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// Animate skill bars when skills section is visible
const skillsSection = document.getElementById("skills")
const skillBars = document.querySelectorAll(".skill-item__progress")

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width + "%"
          }, 200)
        })
        skillsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.3 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Contact form handling
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Enviando..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("¡Mensaje enviado correctamente! Te responderé pronto.")
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(3, 7, 18, 0.95)"
  } else {
    header.style.backgroundColor = "rgba(3, 7, 18, 0.8)"
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero__content")
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate hero elements
  const heroTitle = document.querySelector(".hero__title")
  const heroSubtitle = document.querySelector(".hero__subtitle")
  const heroButtons = document.querySelector(".hero__buttons")
  const heroSocial = document.querySelector(".hero__social")

  if (heroTitle) {
    setTimeout(() => (heroTitle.style.opacity = "1"), 300)
    setTimeout(() => (heroSubtitle.style.opacity = "1"), 600)
    setTimeout(() => (heroButtons.style.opacity = "1"), 900)
    setTimeout(() => (heroSocial.style.opacity = "1"), 1200)
  }
})

// Initialize hero animations
document.addEventListener("DOMContentLoaded", () => {
  const heroElements = document.querySelectorAll(".hero__title, .hero__subtitle, .hero__buttons, .hero__social")
  heroElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
  })
})

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero__title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 100);
//         }, 1000);
//     }
// });
