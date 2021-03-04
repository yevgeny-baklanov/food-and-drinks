'use strict';

window.addEventListener('DOMContentLoaded', function() {
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

headerSearchIcon.addEventListener('click', function() {
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

window.addEventListener('keydown', (e) => {
  if (e.code == 'Escape' && searchBlock.classList.contains('search-block__active')) {
    searchBlock.classList.remove('search-block__active');
    searchBlockForm.classList.remove('search-form__active');
    document.body.style.overflow = 'auto';
  }
});
  

modalClose.forEach(function(item) {
  item.addEventListener('click', closeModal);
});

exapmleLink.forEach(function(item) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('exl-modal');
  });
});

modal.forEach(function(item) {
  item.addEventListener('click', function(e) {
    if (e.target === item) {
      closeModal();
    }
  });
});

headerMenu.firstElementChild.classList.add('header-menu__item-active');
removeActiveItem(headerMenu);

dropdownHeaderMenuList.firstElementChild.classList.add('header-menu__item-active');
removeActiveItem(dropdownHeaderMenuList);

headerBurger.addEventListener('click', function(e) {
  dropdownHeaderMenu.classList.toggle("dropdown-header-menu_active");
  e.currentTarget.classList.toggle("header__burger_active");
});

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
}else{
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
  modal.forEach(function(item) {
    item.classList.remove('show');
  });
  document.body.style.overflow = 'auto';
}

function removeActiveItem(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target && e.target.closest('li')) {
      headerMenuLi.forEach(function(item) {
        item.classList.remove('header-menu__item-active');
      });
      dropdownHeaderMenuLi.forEach(function(item) {
        item.classList.remove('header-menu__item-active');
      });
      e.target.closest('li').classList.add('header-menu__item-active');
    }
  });
}

});

