'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const headerBurger = document.querySelector('.header__burger');
  const dropdownHeaderMenu = document.querySelector('.dropdown-header-menu');
  const headerMenu = document.querySelector('.header-menu');
  const dropdownHeaderMenuList = dropdownHeaderMenu.querySelector('.dropdown-header-menu__list');
  const container = document.querySelector('.container');
  const searchBlock = document.querySelector('.search-block');
  const searchBlockForm = searchBlock.querySelector('.search-form');
  const headerSearchIcon = document.querySelector('.header__search-icon');
  const headerMenuLi = headerMenu.querySelectorAll('li');
  const dropdownHeaderMenuLi = dropdownHeaderMenuList.querySelectorAll('li');
  const exapmleLink = document.querySelectorAll('.exl');
  const modal = document.querySelectorAll('.modal');
  const modalClose = document.querySelectorAll('[data-close]');

  searchBlockForm.style.width = container.clientWidth + 'px';

  window.addEventListener('resize', () => {
    searchBlockForm.style.width = container.clientWidth + 'px';
  });

  headerSearchIcon.addEventListener('click', function () {
    searchBlock.classList.add('search-block__active');
    searchBlockForm.classList.add('search-form__active');
    document.body.style.overflow = 'hidden';
    searchBlock.addEventListener('click', (e) => {
      if (e.target === searchBlock) {
        searchBlock.classList.remove('search-block__active');
        searchBlockForm.classList.remove('search-form__active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  // Функция для поиска

  modalClose.forEach(function (item) {
    item.addEventListener('click', closeModal);
  });

  modal.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target === item) {
        closeModal();
      }
    });
  });
  //Функции для закрытия модальных окон

  exapmleLink.forEach(function (item) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('exl-modal');
    });
  });
  // Функция для тестовых ссылок

  headerMenu.firstElementChild.classList.add('header-menu__item-active');
  removeActiveItem(headerMenu);
  dropdownHeaderMenuList.firstElementChild.classList.add('header-menu__item-active');
  removeActiveItem(dropdownHeaderMenuList);
  // Удаляемо клас активности

  headerBurger.addEventListener('click', function (e) {
    dropdownHeaderMenu.classList.toggle("dropdown-header-menu_active");
    e.currentTarget.classList.toggle("header__burger_active");
    window.addEventListener('click', function (e) {
      let target = e.target.closest(e.target.tagName);
      if (!target.matches('.dropdown-header-menu') && !target.matches('.dropdown-header-menu__list') && !target.matches('.header__burger') && !target.matches('.header__burger > span')) {
        dropdownHeaderMenu.classList.remove("dropdown-header-menu_active");
        headerBurger.classList.remove("header__burger_active");
      }
    });
  });
  // Активирует бургер

  window.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && searchBlock.classList.contains('search-block__active')) {
      searchBlock.classList.remove('search-block__active');
      searchBlockForm.classList.remove('search-form__active');
      document.body.style.overflow = 'auto';
    }
  });
  // Escape Функции

  // <Проверяет поддержку браузера картинок с форматом webp>
  function testWebP(callback) {

    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {

    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
  // </Проверяет поддержку браузера картинок с форматом webp>


  function openModal(modalName) {
    let targetModal = document.querySelector(`.${modalName}`);
    targetModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.forEach(function (item) {
      item.classList.remove('show');
    });
    document.body.style.overflow = 'auto';
  }

  function removeActiveItem(item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      if (e.target && e.target.closest('li')) {
        headerMenuLi.forEach(function (item) {
          item.classList.remove('header-menu__item-active');
        });
        dropdownHeaderMenuLi.forEach(function (item) {
          item.classList.remove('header-menu__item-active');
        });
        e.target.closest('li').classList.add('header-menu__item-active');
      }
    });
  }

  //description-slider

  const descriptionSlider = document.querySelector('.description-slider__body'),
    descriptionSliderInner = descriptionSlider.querySelector('.description-slider__inner'),
    descriptionSliderSlides = descriptionSlider.querySelectorAll('.description-slider__slide'),
    descriptionSliderNext = descriptionSlider.querySelector('.description-slider__next'),
    descriptionSliderPrev = descriptionSlider.querySelector('.description-slider__prev'),
    circle = descriptionSlider.querySelector('.description-slider__bg-block > img'),
    width = parseFloat(window.getComputedStyle(container).width) - (parseInt(window.getComputedStyle(container).paddingLeft) * 2);
  let descriptionSliderOffset = 0;

  descriptionSliderInner.style.width = (descriptionSliderSlides.length * 100) + '%';

  descriptionSliderNext.addEventListener('click', () => {
    if (descriptionSliderOffset == (descriptionSliderSlides.length - 1) * +parseInt(width)) {
      descriptionSliderOffset = 0;
    } else {
      descriptionSliderOffset += parseInt(width);
    }

    descriptionSliderInner.style.transform = `translateX(-${descriptionSliderOffset}px)`;
  });

  descriptionSliderPrev.addEventListener('click', () => {
    if (descriptionSliderOffset == 0) {
      descriptionSliderOffset = (descriptionSliderSlides.length - 1) * +parseInt(width);
    } else {
      descriptionSliderOffset -= parseInt(width);
    }

    descriptionSliderInner.style.transform = `translateX(-${descriptionSliderOffset}px)`;
  });

  //description-slider

  //futured-tabs

  const futuredBlock = document.querySelector('.futured-block');
  const futuredBlockBody = futuredBlock.querySelector('.futured-block-tabs__body');
  const futuredTabsNavigation = futuredBlock.querySelector('.futured-block-tabs-navigation');
  const futuredTabsNavigationItem = futuredBlock.querySelectorAll('.futured-block-tabs-navigation__item');
  const futuredTabsElementItems = futuredBlock.querySelectorAll('.futured-block-tabs-element-item');
  let futuredTabsElements = [];
  const futuredNavigationActiveLine = document.createElement('span');

  futuredTabsNavigation.prepend(futuredNavigationActiveLine);
  futuredNavigationActiveLine.style.cssText = `
    position: absolute;   
    bottom: -8px;
    left: 0;
    z-index: 5;
    height: 1px;
    background: #E2B024;
    border-radius: 2px;
    width: ${window.getComputedStyle(futuredTabsNavigationItem[0]).width};
    transition: all 0.8s ease;
  `;

  futuredTabsNavigationItem.forEach((item, index) => {
    if (item.dataset.vinesType.toLowerCase().substr(1) == 'all') {
      futuredTabsElements[index] = document.querySelector('.futured-block-tabs__element');
    } else {
      const newTabsElement = document.createElement('ul');
      newTabsElement.classList.add('futured-block-tabs-element', 'futured-block-tabs__element');
      newTabsElement.id = item.dataset.vinesType.substr(1);
      futuredBlockBody.append(newTabsElement);
      futuredTabsElements[index] = newTabsElement;
    }
  });

  futuredTabsElementItems.forEach((item) => {
    const tabsBlockTo = document.querySelector(`#${item.dataset.vineType}`);
    const tabsItem = document.createElement('li');

    tabsItem.classList.add('futured-block-tabs-element-item', 'futured-block-tabs-element__item');
    tabsItem.dataset.vineType = item.dataset.vineType;
    tabsItem.innerHTML = item.innerHTML;
    tabsBlockTo.append(tabsItem);
  });

  const showFuturedTab = function (link) {
    const activeTab = document.querySelector(link);

    futuredTabsElements.forEach((item) => {
      item.style.display = 'none';
    });

    activeTab.style.display = 'grid';
  };

  futuredTabsElements[0].style.display = 'grid';

  futuredTabsNavigation.addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
      showFuturedTab(e.target.dataset.vinesType);

      futuredNavigationActiveLine.style.width = window.getComputedStyle(e.target).width;
      futuredNavigationActiveLine.style.left = `${e.target.offsetLeft}px`;
    }
  });


  //futured-tabs

  //reviews-slider

  const reviewsBlock = document.querySelector('.reviews-block');
  const reviewsBlockWrapper = reviewsBlock.querySelector('.reviews-block__slider-wrapper');
  const reviewsBlockInner = reviewsBlock.querySelector('.reviews-block__slider-inner');
  const reviewsBlockSlides = reviewsBlock.querySelectorAll('.reviews-block__slide');
  const reviewsDots = [];
  let reviewsBlockOffset = 0;
  let slideIndex = 1;

  reviewsBlockInner.style.width = (reviewsBlockSlides.length) * 100 + '%';

  const reviewIndicators = document.createElement('ol');
  reviewIndicators.classList.add('reviews-block__buttons');
  reviewsBlockWrapper.append(reviewIndicators);

  for (let i = 0; i < reviewsBlockSlides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('reviews-block__button');
    dot.dataset.index = i + 1;
    if (i == 0) {
      dot.style.background = '#E2B024';
    }
    reviewIndicators.append(dot);
    reviewsDots.push(dot);
  }

  let reviewsBlockInterval = setInterval(reviewsNextAnimation, 5000);

  reviewsBlockSlides.forEach((item) => {
    item.addEventListener('mouseup', () => {
      reviewsNextAnimation();
      reviewsBlockInterval = setInterval(reviewsNextAnimation, 5000);
    });

    item.addEventListener('mousedown', () => {
      clearInterval(reviewsBlockInterval);
    });
  });

  reviewIndicators.addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
      slideIndex = e.target.dataset.index;
      clearInterval(reviewsBlockInterval);
      reviewsBlockInterval = setInterval(reviewsNextAnimation, 5000);
      reviewsChangeDot();
      reviewsBlockOffset = +parseInt(width) * (slideIndex - 1);
      reviewsBlockInner.style.transform = `translateX(-${reviewsBlockOffset}px)`;
    }
  });

  function reviewsNextAnimation() {
    if (reviewsBlockOffset == (reviewsBlockSlides.length - 1) * +parseInt(width)) {
      reviewsBlockOffset = 0;
    } else {
      reviewsBlockOffset += parseInt(width);
    }

    if (slideIndex == reviewsBlockSlides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    reviewsChangeDot();

    reviewsBlockInner.style.transform = `translateX(-${reviewsBlockOffset}px)`;
  }

  function reviewsChangeDot() {
    reviewsDots.forEach(item => item.style.background = '#ffffff');
    reviewsDots[slideIndex - 1].style.background = '#E2B024';
  }

  //reviews-slider

});