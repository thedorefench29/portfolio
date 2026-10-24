(function () {
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const emptyState = document.querySelector('[data-projects-empty]');
  const dialogs = [...document.querySelectorAll('.project-details-dialog')];
  const openDetailsButtons = [...document.querySelectorAll('[data-open-project-details]')];
  const closeDetailsButtons = [...document.querySelectorAll('[data-close-project-details]')];
  const videoDialog = document.querySelector('#stylehair-video');
  const projectVideo = videoDialog ? videoDialog.querySelector('video') : null;
  const photoDialog = document.querySelector('#stylehair-photo');
  const photoPreview = photoDialog ? photoDialog.querySelector('.project-photo-preview') : null;
  const photoButtons = [...document.querySelectorAll('[data-open-project-photo]')];
  const cardPhotoButtons = [...document.querySelectorAll('.stylehair-media-pair [data-open-project-photo]')];
  const photoCount = photoDialog ? photoDialog.querySelector('[data-project-photo-count]') : null;
  const previousPhotoButton = photoDialog ? photoDialog.querySelector('[data-previous-project-photo]') : null;
  const nextPhotoButton = photoDialog ? photoDialog.querySelector('[data-next-project-photo]') : null;
  let currentPhotoIndex = 0;
  let photoSlideTimer;
  let cardPhotoIndex = 0;
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

  function loadProjectVideos(dialog) {
    dialog.querySelectorAll('[data-project-video-frame]').forEach(frame => {
      frame.src = frame.dataset.videoSrc;
    });
  }

  openDetailsButtons.forEach(button => {
    const dialog = document.getElementById(button.dataset.projectDialog);
    if (dialog) button.addEventListener('click', () => {
      loadProjectVideos(dialog);
      dialog.showModal();
    });
  });

  closeDetailsButtons.forEach(button => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  document.querySelectorAll('[data-open-project-video]').forEach(button => {
    button.addEventListener('click', () => {
      if (videoDialog && !videoDialog.open) {
        loadProjectVideos(videoDialog);
        videoDialog.showModal();
      }
    });
  });

  document.querySelectorAll('[data-close-project-video]').forEach(button => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  function showProjectPhoto(index) {
    if (!photoPreview || !photoCount || photoButtons.length === 0) return;
    currentPhotoIndex = (index + photoButtons.length) % photoButtons.length;
    const button = photoButtons[currentPhotoIndex];
    photoPreview.src = button.dataset.photoSrc;
    photoPreview.alt = button.dataset.photoAlt;
    photoCount.textContent = `${currentPhotoIndex + 1} of ${photoButtons.length}`;
  }

  function startProjectPhotoSlideshow() {
    window.clearInterval(photoSlideTimer);
    photoSlideTimer = window.setInterval(() => {
      showProjectPhoto(currentPhotoIndex + 1);
    }, 5000);
  }

  function showCardPhoto(index) {
    if (cardPhotoButtons.length === 0) return;
    cardPhotoIndex = (index + cardPhotoButtons.length) % cardPhotoButtons.length;
    cardPhotoButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === cardPhotoIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-hidden', String(!isActive));
      button.tabIndex = isActive ? 0 : -1;
    });
  }

  if (cardPhotoButtons.length > 0) {
    showCardPhoto(0);
    window.setInterval(() => showCardPhoto(cardPhotoIndex + 1), 5000);
  }

  photoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (!photoDialog || !photoPreview || photoDialog.open) return;
      const cardIndex = cardPhotoButtons.indexOf(button);
      showProjectPhoto(cardIndex >= 0 ? cardPhotoIndex : index);
      photoDialog.showModal();
      startProjectPhotoSlideshow();
    });
  });

  previousPhotoButton?.addEventListener('click', () => {
    showProjectPhoto(currentPhotoIndex - 1);
    startProjectPhotoSlideshow();
  });

  nextPhotoButton?.addEventListener('click', () => {
    showProjectPhoto(currentPhotoIndex + 1);
    startProjectPhotoSlideshow();
  });

  document.querySelectorAll('[data-close-project-photo]').forEach(button => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  dialogs.forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      dialog.querySelectorAll('[data-project-video-frame]').forEach(frame => {
        frame.removeAttribute('src');
      });
    });
  });

  if (videoDialog && projectVideo) {
    videoDialog.addEventListener('close', () => {
      projectVideo.pause();
      projectVideo.currentTime = 0;
    });
  }

  if (photoDialog && photoPreview) {
    photoDialog.addEventListener('click', event => {
      if (event.target === photoDialog) closeDialog(photoDialog);
    });

    photoDialog.addEventListener('close', () => {
      window.clearInterval(photoSlideTimer);
      photoPreview.removeAttribute('src');
      photoPreview.alt = '';
      photoCount.textContent = '';
    });
  }

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