(function () {
  const revealItems = document.querySelectorAll('.learning-reveal');
  const imageFrames = document.querySelectorAll('[data-image-frame]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  imageFrames.forEach(frame => {
    const image = frame.querySelector('img');
    image.addEventListener('error', () => frame.classList.add('is-fallback'), { once: true });
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('learning-reveal-visible');
          entry.target.classList.remove('learning-reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
      item.classList.add('learning-reveal-pending');
      observer.observe(item);
    });
  }
})();