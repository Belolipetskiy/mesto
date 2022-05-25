import {
    Card
} from './Card.js';
import {
    FormValidator
} from './FormValidator.js';

const popupProfile = document.querySelector('.popup_profile');
const btnEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = popupProfile.querySelector('.popup__form');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const inputNameProfile = popupProfile.querySelector('.popup__input_profile_name');
const inputAboutProfile = popupProfile.querySelector('.popup__input_profile_about');
const profileName = document.querySelector('.profile__info-title');
const profileAbout = document.querySelector('.profile__info-subtitle');

const popupAddCard = document.querySelector('.popup_add-card');
const btnAddCard = document.querySelector('.profile__add-card');
const formEditCard = popupAddCard.querySelector('.popup__form');
const listContainer = document.querySelector('.element-grid');
const nameInputCard = document.querySelector('.popup__input_card_name');
const linkInputCard = document.querySelector('.popup__input_card_link');

const popupOpenCard = document.querySelector('.popup_open-card');
const cardBigImage = popupOpenCard.querySelector('.popup__image');
const cardBigTitle = popupOpenCard.querySelector('.popup__image-title');

const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const cardFormValidator = new FormValidator(config, formEditCard);
const profileFormValidator = new FormValidator(config, formEditProfile);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

function openModalWindow(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
}

// функция закрытия popup
function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closeByOverlay);
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closeModalWindow(popupOpened);
    }
}

function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closeModalWindow(evt.currentTarget)
    }
}

function handlePhotoClick(item) {
    cardBigImage.src = item.link;
    cardBigImage.alt = item.name;
    cardBigTitle.textContent = item.name;
    openModalWindow(popupOpenCard);
}

function createCard(item) {
    const card = new Card(item, '.card-template', handlePhotoClick);
    const cardElement = card.generateCard();
    return cardElement;
}

initialCards.forEach((item) => {
    listContainer.append(createCard(item));
});

btnAddCard.addEventListener('click', () => {
    cardFormValidator.disableSubmitButton();
    cardFormValidator.clearError();
    openModalWindow(popupAddCard);
});

formEditCard.addEventListener('submit', evt => {
    evt.preventDefault();
    listContainer.prepend(createCard({
        name: nameInputCard.value,
        link: linkInputCard.value
    }));
    formEditCard.reset();
    closeModalWindow(popupAddCard);
});

btnEditProfile.addEventListener('click', () => {
    inputNameProfile.value = `${profileName.textContent}`;
    inputAboutProfile.value = `${profileAbout.textContent}`;
    profileFormValidator.clearError();
    openModalWindow(popupProfile);
});

buttonClosePopupProfile.addEventListener('click', () => {
    closeModalWindow(popupProfile);
});

formEditProfile.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = inputNameProfile.value;
    profileAbout.textContent = inputAboutProfile.value;
    closeModalWindow(popupProfile);
});