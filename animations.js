// Animation functionality for the website
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Counter animation function
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      // Format number with commas for thousands
      element.textContent = current.toLocaleString() + '+';

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString() + '+';
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Initialize counter animations for stats
  function initCounterAnimations() {
    const statItems = document.querySelectorAll('.stat-item h3');

    statItems.forEach((statElement, index) => {
      // Get the target number from the text content
      const targetText = statElement.textContent;
      const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));

      if (targetNumber > 0) {
        // Set initial state to 0
        statElement.textContent = '0+';

        // Create a wrapper element for the stat item to observe
        const statWrapper = statElement.closest('.stat-item');
        if (statWrapper) {
          // Add animation class
          statWrapper.classList.add('scroll-animate', `stagger-delay-${(index % 4) + 1}`);

          // Create a new observer specifically for counter animations
          const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';

                // Add a small delay for each stat item
                setTimeout(() => {
                  animateCounter(statElement, targetNumber);
                }, index * 200);
              }
            });
          }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

          counterObserver.observe(statWrapper);
        }
      }
    });
  }

  // Page load animations
  function initPageLoadAnimations() {
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('animate-on-load');
    }

    // Animate main sections on page load with delays
    const sections = [
      '.meet_our_alumina',
      '.online-courses-promo',
      '.events-section',
      '.course-subscription',
      '.education-events',
      '.latest-blog-posts',
      '.photo-gallery',
      '.our-staff'
    ];

    sections.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.classList.add('animate-on-load', `animate-delay-${index % 5}`);
        }, 350 * index);
      }
    });
  }

  // Initialize scroll animations
  function initScrollAnimations() {
    // Add scroll animation classes to elements
    const animatedElements = document.querySelectorAll(`
      .event-item,
      .blog-post,
      .staff-card,
      .testimonial,
      .promo-text,
      .promo-image,
      .video-section,
      .gallery-img:not(.hidden)
    `);

    animatedElements.forEach((element, index) => {
      // Add appropriate animation class based on element type
      if (element.classList.contains('event-item') ||
          element.classList.contains('blog-post') ||
          element.classList.contains('staff-card')) {
        element.classList.add('scroll-animate', `stagger-delay-${(index % 8) + 1}`);
      } else if (element.classList.contains('testimonial')) {
        element.classList.add('scroll-animate-left', `stagger-delay-${(index % 4) + 1}`);
      } else {
        element.classList.add('scroll-animate-scale', `stagger-delay-${(index % 6) + 1}`);
      }

      // Observe the element
      observer.observe(element);
    });

    // Special handling for gallery images
    const galleryImages = document.querySelectorAll('.gallery-img:not(.hidden)');
    galleryImages.forEach((img, index) => {
      img.classList.add('scroll-animate-scale', `stagger-delay-${(index % 8) + 1}`);
      observer.observe(img);
    });
  }

  // Initialize animations when page loads
  initPageLoadAnimations();

  // Initialize scroll animations after a delay to ensure all elements are loaded
  setTimeout(initScrollAnimations, 1000);

  // Initialize counter animations for about page stats
  setTimeout(initCounterAnimations, 1500);

  // Re-initialize animations on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-observe elements after resize
      const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-scale, .scroll-animate-left, .scroll-animate-right');
      animatedElements.forEach(element => {
        element.classList.remove('animate');
        observer.observe(element);
      });

      // Reset counter animations
      const statElements = document.querySelectorAll('.stat-item h3');
      statElements.forEach(element => {
        const targetText = element.dataset.original || element.textContent;
        const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
        element.textContent = '0+';
        delete element.closest('.stat-item').dataset.animated;
      });
    }, 250);
  });
});
