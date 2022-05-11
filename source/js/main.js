import Glide from '@glidejs/glide';

const mainWrapperElement = document.querySelector('.wrapper');
const videoCoverElement = document.querySelector('.about__video-cover');
const videoContainerElement = document.querySelector('.about__video-container');
const tabsContainerElement = document.querySelector('.subscription__button-list');
const tabsListElement = document.querySelector('.subscription__tab-list');
const videoElement = document.querySelector('.about__video');
const leftArrowElement = document.querySelector('.feedback__button-left');
const rightArrowElement = document.querySelector('.feedback__button-right');
const nameInputElement = document.querySelector('input[name="name"]');
const phoneInputElement = document.querySelector('input[name="phone"]');
const submitButtonElement = document.querySelector('.form__button');
const coachesContainerElement = document.querySelector('.coaches__slides');
const leftCoachButtonElement = document.querySelector('.coaches__button-left');
const rightCoachButtonElement = document.querySelector('.coaches__button-right');

const nameInputRe = /[A-Za-zA-Яа-яЁё0-9\s]$/;
const phoneInputRe = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{1,10}$/;

const collectionOfComments = document.querySelectorAll('.feedback__slide');

mainWrapperElement.classList.remove('wrapper--nojs');
videoCoverElement.classList.remove('visually-hidden');
videoElement.removeAttribute('controls');

function playVideo(media) {
  if (!videoCoverElement.classList.contains('visually-hidden')) {
    videoCoverElement.classList.add('visually-hidden');
    media.play();
    media.setAttribute('controls', 'controls');
  }
}

const isSpaceKey = (evt) => (
  evt.key === ' '
);

const onLabelSpaceKeydown = (evtSpaceKeydown) => {
  if (isSpaceKey(evtSpaceKeydown)) {
    playVideo(videoElement);
  }
};

videoContainerElement.addEventListener('click', () => {
  playVideo(videoElement);
});

videoContainerElement.addEventListener('keydown', onLabelSpaceKeydown);


tabsContainerElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('subscription__button-tab--active') && evt.target.classList.contains('subscription__button-tab')) {
    tabsContainerElement.querySelector('.subscription__button-tab--active').classList.remove('subscription__button-tab--active');
    evt.target.classList.add('subscription__button-tab--active');
    tabsListElement.querySelector('.subscription__card-list--active').classList.remove('subscription__card-list--active');
    document.getElementById(`${evt.target.id}-subscription`).classList.add('subscription__card-list--active');
  }
});


const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 4,
  gap: 40,
  breakpoints: {
    1199: {
      perView: 2,
      gap: 30,
    },
    767: {
      perView: 1,
      gap: 0,
    },
  },
});

glide.mount();

const feedback = new Glide('.glide--feedback', {
  type: 'slider',
  perView: 1,
});

feedback.mount();

if (collectionOfComments.length < 2) {
  leftArrowElement.classList.add('visually-hidden');
  rightArrowElement.classList.add('visually-hidden');
} else {
  leftArrowElement.classList.remove('visually-hidden');
  rightArrowElement.classList.remove('visually-hidden');

  feedback.on('move.after', function () {
    if (collectionOfComments[0].classList.contains('glide__slide--active')) {
      leftArrowElement.setAttribute('disabled', 'disabled');
    } else {
      leftArrowElement.removeAttribute('disabled');
    }
    if (collectionOfComments[collectionOfComments.length - 1].classList.contains('glide__slide--active')) {
      rightArrowElement.setAttribute('disabled', 'disabled');
    } else {
      rightArrowElement.removeAttribute('disabled');
    }
  });
}

coachesContainerElement.addEventListener('keydown', function (evt) {
  const cardsCollection = coachesContainerElement.querySelectorAll('.coaches__info-wrapper');
  if (evt.target.classList.contains('coaches__info-wrapper')) {
    for (let card of cardsCollection) {
      card.setAttribute('tabindex', '-1');
    }
  } else {
    for (let card of cardsCollection) {
      card.setAttribute('tabindex', '0');
    }
  }
});

const handleFocusListener = (element) => {
  element.addEventListener('focus', function () {
    coachesContainerElement.classList.add('coaches__arrows-active');
  });
};

const handleBlurListener = (element) => {
  element.addEventListener('blur', function () {
    coachesContainerElement.classList.remove('coaches__arrows-active');
  });
};

handleFocusListener(leftCoachButtonElement);
handleFocusListener(rightCoachButtonElement);
handleBlurListener(leftCoachButtonElement);
handleBlurListener(rightCoachButtonElement);

const validateInput = (element, re, text) => {
  element.addEventListener('input', () => {
    const nameInputArray = element.value.split(' ');

    if (element.value.endsWith(' ')) {
      nameInputArray.pop();
    }

    const booleanNameInputArray = nameInputArray.map((nameValidity) =>
      re.test(nameValidity)
    );

    nameInputArray.forEach((word) => {

      if (!re.test(word) || booleanNameInputArray.includes(false)) {
        element.setCustomValidity(text);
        submitButtonElement.setAttribute('disabled', 'disabled');
      } else {
        element.setCustomValidity('');
        submitButtonElement.removeAttribute('disabled');
      }
      element.reportValidity();
    });
  });
};

validateInput(nameInputElement, nameInputRe, 'Здесь могут быть только буквы и цифры');
validateInput(phoneInputElement, phoneInputRe, 'Здесь могут быть только цифры');
