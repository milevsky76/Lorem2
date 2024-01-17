const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.contains("menu__icon--active") ? closeMenu() : openMenu();
  });
}

function closeMenu() {
  document.body.classList.remove('lock');
  menuIcon.classList.remove('menu__icon--active');
  menuBody.classList.remove('menu__body--active');
}

function openMenu() {
  document.body.classList.add('lock');
  menuIcon.classList.add('menu__icon--active');
  menuBody.classList.add('menu__body--active');
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto], .footer__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(evt) {
    const menuLink = evt.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      if (menuIcon && menuIcon.classList.contains('menu__icon--active')) {
        closeMenu();
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      evt.preventDefault();
    }
  }
}

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 && menuIcon && menuIcon.classList.contains('menu__icon--active')) {
    closeMenu();
  };
});

const servicesAccordion = document.querySelector('.services__accordion');
servicesAccordion.querySelectorAll('.accordion__trigger').forEach(item => {
  item.addEventListener('click', (e) => {
    const activeItem = e.target.closest('.accordion__item');
    if (!activeItem) return;
    toggleAccordion(activeItem, servicesAccordion);
  });
});

const questionsAccordion = document.querySelector('.questions__accordion');
questionsAccordion.querySelectorAll('.accordion__trigger').forEach(item => {
  item.addEventListener('click', (e) => {
    const activeItem = e.target.closest('.accordion__item');
    if (!activeItem) return;
    toggleAccordion(activeItem);
  });
});

function toggleAccordion(currentItem, accordion = null) {
  const isOnlyOne = accordion ? true : false;
  const currentButton = currentItem.querySelector('.accordion__trigger');
  const currentContent = currentItem.querySelector('.accordion__content');
  const currentPanelIsOpened = currentButton.getAttribute('aria-expanded');

  if (currentPanelIsOpened === 'true') {
    currentButton.setAttribute('aria-expanded', false);
    currentContent.setAttribute('aria-hidden', true);
  } else {
    if (isOnlyOne) {
      let activeButton = accordion.querySelector('.accordion__trigger[aria-expanded="true"]');

      if (activeButton) {
        activeButton.setAttribute('aria-expanded', false);
        activeButton.nextElementSibling.setAttribute('aria-hidden', true);
      }
    }

    currentButton.setAttribute('aria-expanded', true);
    currentContent.setAttribute('aria-hidden', false);
  }
}

const swiper = new Swiper('.slider', {
  navigation: {
    nextEl: '.slider__next',
    prevEl: '.slider__prev'
  },
  pagination: {
    el: '.slider__pagination',
    clickable: true
  },
  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },
  slidesPerView: 1,
  watchOverflow: true,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000
  },
  speed: 300
});