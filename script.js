const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const closeLightbox = document.querySelector('.lightbox__close');
const currentYear = document.querySelector('#year');
const contactForm = document.querySelector('.contact-form');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filterValue = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

    galleryItems.forEach((item) => {
      const matches = filterValue === 'all' || item.dataset.category === filterValue;
      item.classList.toggle('is-hidden', !matches);
    });
  });
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!image) return;

    const src = image.getAttribute('src');
    if (lightboxImage && lightbox) {
      lightboxImage.setAttribute('src', src);
      lightbox.classList.add('is-visible');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});

if (closeLightbox && lightbox) {
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('is-visible');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('is-visible');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-visible')) {
    lightbox.classList.remove('is-visible');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');

    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Inquiry sent!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 2000);
    }
  });
}
