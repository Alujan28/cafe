// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
  
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll(".bar")
        if (hamburger.classList.contains("active")) {
          bars[0].style.transform = "translateY(8px) rotate(45deg)"
          bars[1].style.opacity = "0"
          bars[2].style.transform = "translateY(-8px) rotate(-45deg)"
        } else {
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          hamburger.click()
        }
      })
    })
  
    // Testimonial Slider
    const slides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
  
    if (slides.length > 0 && dots.length > 0) {
      let currentSlide = 0
  
      // Function to change slide
      function changeSlide(n) {
        slides[currentSlide].classList.remove("active")
        dots[currentSlide].classList.remove("active")
  
        currentSlide = (n + slides.length) % slides.length
  
        slides[currentSlide].classList.add("active")
        dots[currentSlide].classList.add("active")
      }
  
      // Event listeners for controls
      if (prevBtn) {
        prevBtn.addEventListener("click", () => changeSlide(currentSlide - 1))
      }
  
      if (nextBtn) {
        nextBtn.addEventListener("click", () => changeSlide(currentSlide + 1))
      }
  
      // Event listeners for dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => changeSlide(index))
      })
  
      // Auto slide change
      setInterval(() => {
        changeSlide(currentSlide + 1)
      }, 5000)
    }
  
    // Form Validation
    const forms = document.querySelectorAll("form")
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
        const inputs = form.querySelectorAll("input, textarea")
  
        inputs.forEach((input) => {
          if (input.hasAttribute("required") && !input.value.trim()) {
            isValid = false
            input.classList.add("error")
  
            // Add error message if it doesn't exist
            let errorMsg = input.nextElementSibling
            if (!errorMsg || !errorMsg.classList.contains("error-message")) {
              errorMsg = document.createElement("div")
              errorMsg.classList.add("error-message")
              errorMsg.textContent = "This field is required"
              input.parentNode.insertBefore(errorMsg, input.nextSibling)
            }
          } else {
            input.classList.remove("error")
  
            // Remove error message if it exists
            const errorMsg = input.nextElementSibling
            if (errorMsg && errorMsg.classList.contains("error-message")) {
              errorMsg.remove()
            }
          }
        })
  
        if (isValid) {
          // Show success message
          const successMsg = document.createElement("div")
          successMsg.classList.add("success-message")
          successMsg.textContent = "Form submitted successfully!"
          form.appendChild(successMsg)
  
          // Reset form
          form.reset()
  
          // Remove success message after 3 seconds
          setTimeout(() => {
            successMsg.remove()
          }, 3000)
        }
      })
    })
  
    // Star Rating System
    const stars = document.querySelectorAll(".star-rating i")
    if (stars.length > 0) {
      stars.forEach((star, index) => {
        star.addEventListener("click", () => {
          // Reset all stars
          stars.forEach((s) => s.classList.remove("active"))
  
          // Activate clicked star and all stars before it
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add("active")
          }
  
          // Set hidden input value
          const ratingInput = document.querySelector('input[name="rating"]')
          if (ratingInput) {
            ratingInput.value = index + 1
          }
        })
      })
    }
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".service-card, .menu-card, .offer-card, .value-card, .team-member, .review-card",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll(
      ".service-card, .menu-card, .offer-card, .value-card, .team-member, .review-card",
    )
    elementsToAnimate.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "all 0.5s ease"
    })
  
    // Run animation on page load and scroll
    animateOnScroll()
    window.addEventListener("scroll", animateOnScroll)
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}