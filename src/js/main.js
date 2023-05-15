let Search = document.querySelector('.header__btn');
let searchForm = document.querySelector('.header__form');
let closeForm = document.querySelector('.header__form-btn');

Search.addEventListener('click', function () {
  searchForm.classList.add('header__form-show');
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
});

closeForm.addEventListener('click', function () {
  searchForm.classList.remove('header__form-show')
});

let burger = document.querySelector('.header__burger')
let menu = document.querySelector('.header__nav')

burger.addEventListener('click', function () {
  menu.classList.toggle('header__nav-open');
  document.body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger--active');
})


function init() {
  let map = new ymaps.Map('map', {
    center: [55.76721728442396, 37.63100008592224],
    zoom: 15
  });

  let placemark = new ymaps.Placemark([55.76938256898189, 37.638521000000004], {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'images/map-img.svg',
      iconImageSize: [15, 15],
      iconImageOffset: [-10, -18]
    });

  map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  map.geoObjects.add(placemark);

    map.geoObjects.events.add('click', function (e) {
      console.log(shopPlacemark.properties.get('balloonContent'))
    })
}


ymaps.ready(init);

let closeMap = document.querySelector('.contacts__map-btn');
let mapDescr = document.querySelector('.contacts__descr')

closeMap.addEventListener('click', function () {
  mapDescr.classList.add('contacts__descr-close')
  closeMap.classList.add('contacts__descr-close')
})
