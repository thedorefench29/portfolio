(function () {
  const modal = document.getElementById('certModal');
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const modalDetails = document.getElementById('modalDetails');
  const modalTitle = document.getElementById('modalTitle');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalDate = document.getElementById('modalDate');
  const modalVerification = document.getElementById('modalVerification');
  const modalDescription = document.getElementById('modalDescription');
  const closeButton = document.getElementById('closeCertModal');
  const achievementSlideButtons = document.querySelectorAll('[data-achievement-slide]');
  const achievementSlidePanels = document.querySelectorAll('[data-achievement-slide-panel]');

  function showAchievementSlide(name) {
    if (!achievementSlideButtons.length || !achievementSlidePanels.length) return;

    achievementSlideButtons.forEach(button => {
      const isActive = button.dataset.achievementSlide === name;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    achievementSlidePanels.forEach(panel => {
      panel.hidden = panel.dataset.achievementSlidePanel !== name;
      panel.classList.remove('is-entering');

      if (!panel.hidden) {
        panel.classList.add('is-entering');
      }
    });
  }

  achievementSlideButtons.forEach(button => {
    button.addEventListener('click', () => showAchievementSlide(button.dataset.achievementSlide));
  });

  function openModal(button) {
    const hasCertificateDetails = button.hasAttribute('data-cert-title');
    showAchievementSlide('program');
    modal.classList.remove('is-closing');
    modal.classList.toggle('is-image-only', !hasCertificateDetails);
    modalDetails.hidden = !hasCertificateDetails;

    if (hasCertificateDetails) {
      modalTitle.textContent = button.dataset.certTitle;
      modalCertTitle.textContent = button.dataset.certTitle;
      modalIssuer.textContent = button.dataset.issuer;
      modalDate.textContent = button.dataset.date;
      modalVerification.textContent = button.dataset.verification;
      modalDescription.textContent = button.dataset.description;
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modalImage.src = button.dataset.imageSrc;
    modalImage.alt = `${button.dataset.certTitle || 'Certificate'} preview`;
  }

  function finishModalClose() {
    if (!modal.classList.contains('is-closing')) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modal.classList.remove('is-closing');
  }

  function closeModal() {
    if (modal.getAttribute('aria-hidden') === 'true' || modal.classList.contains('is-closing')) return;
    modal.classList.add('is-closing');
    closeButton.blur();
    window.setTimeout(finishModalClose, 220);
  }

  document.querySelectorAll('.btn-cert').forEach(button => {
    button.addEventListener('click', () => {
      if (button.hasAttribute('data-image-src')) openModal(button);
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener('animationend', event => {
    if (event.target === modal) finishModalClose();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

})();