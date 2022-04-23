const mainWrapperElement = document.querySelector('.wrapper');
const videoCoverElement = document.querySelector('.about__video-cover');
const videoContainerElement = document.querySelector('.about__video-container');
const tabsContainerElement = document.querySelector('.subscription__button-list');
const tabsListElement = document.querySelector('.subscription__tab-list');
// const videoElement = document.querySelector('.about__video');

// videoCoverElement.classList.remove('visually-hidden');

// function playVideo(media) {
//   media.click();
// }

mainWrapperElement.classList.remove('wrapper--nojs');

videoContainerElement.addEventListener('click', () => {
  if (!videoCoverElement.classList.contains('visually-hidden')) {
    videoCoverElement.classList.add('visually-hidden');
    // playVideo(videoElement);
  }
});

tabsContainerElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('subscription__button-tab--active') && evt.target.classList.contains('subscription__button-tab')) {
    tabsContainerElement.querySelector('.subscription__button-tab--active').classList.remove('subscription__button-tab--active');
    evt.target.classList.add('subscription__button-tab--active');
    tabsListElement.querySelector('.subscription__card-list--active').classList.remove('subscription__card-list--active');
    document.getElementById(`${evt.target.id}-subscription`).classList.add('subscription__card-list--active');
  }
});
