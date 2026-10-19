(function () {
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const emptyState = document.querySelector('[data-projects-empty]');
  const dialogs = [...document.querySelectorAll('.project-details-dialog')];
  const openDetailsButtons = [...document.querySelectorAll('[data-open-project-details]')];
  const closeDetailsButtons = [...document.querySelectorAll('[data-close-project-details]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const focusAreas = new Set(projectCards.flatMap(card => card.dataset.focusAreas.split(' ')));
  const recognizedProjects = projectCards.filter(card => card.dataset.recognized === 'true').length;

  document.querySelector('[data-project-total]').textContent = projectCards.length;
  document.querySelector('[data-focus-total]').textContent = focusAreas.size;
  document.querySelector('[data-recognition-total]').textContent = recognizedProjects;

  function applyFilter(filter) {
    let visibleProjects = 0;

    projectCards.forEach(card => {
      const categories = card.dataset.categories.split(' ');
      const matches = filter === 'all' || categories.includes(filter);
      card.hidden = !matches;
      visibleProjects += Number(matches);
    });

    filterButtons.forEach(button => {
      const isActive = button.dataset.projectFilter === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    emptyState.hidden = visibleProjects > 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.dataset.projectFilter));
  });

  function closeDialog(dialog) {
    if (dialog.open) dialog.close();
  }

  openDetailsButtons.forEach(button => {
    const dialog = document.getElementById(button.dataset.projectDialog);
    if (dialog) button.addEventListener('click', () => dialog.showModal());
  });

  closeDetailsButtons.forEach(button => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  dialogs.forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('project-reveal-visible');
          entry.target.classList.remove('project-reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    projectCards.forEach(card => {
      card.classList.add('project-reveal-pending');
      observer.observe(card);
    });
  }
})();