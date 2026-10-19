(function () {
  const revealCards = document.querySelectorAll('.about-reveal');
  const storyDialog = document.querySelector('.about-story-dialog');
  const openStoryButton = document.querySelector('[data-open-about-story]');
  const closeStoryButton = document.querySelector('[data-close-about-story]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (storyDialog && openStoryButton && closeStoryButton) {
    openStoryButton.addEventListener('click', () => storyDialog.showModal());
    closeStoryButton.addEventListener('click', () => storyDialog.close());
    storyDialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        storyDialog.close();
      }
    });
    storyDialog.addEventListener('click', event => {
      if (event.target === storyDialog) {
        storyDialog.close();
      }
    });
  }

  if (reducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('about-reveal-visible');
        entry.target.classList.remove('about-reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealCards.forEach(card => {
    card.classList.add('about-reveal-pending');
    observer.observe(card);
  });
})();