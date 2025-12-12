// Intersection Observer for scroll-triggered animations (client-side only)
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        // Add delay based on index for staggered effect
        setTimeout(() => {
          element.classList.add('animate-fade-in-up');
          element.style.opacity = '1';
        }, index * 100);
        fadeObserver.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe sections and timeline items for scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items
    const timelineItems = document.querySelectorAll('#timeline .relative');
    timelineItems.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      fadeObserver.observe(element);
    });

    // Animate section headings
    const sectionHeadings = document.querySelectorAll('section[id] > div > h2');
    sectionHeadings.forEach(heading => {
      const element = heading as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      fadeObserver.observe(element);
    });
  });
}

