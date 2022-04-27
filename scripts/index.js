const popupProfile = document.querySelector('.popup_profile');
const editProfileBtn = document.querySelector('.profile__edit-button');
const editNameInfo = popupProfile.querySelector('.popup__form-profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const nameInputProfile = popupProfile.querySelector('.popup__input_profile_name');
const aboutInputProfile = popupProfile.querySelector('.popup__input_profile_about');
const profileName = document.querySelector('.profile__info-title');
const profileAbout = document.querySelector('.profile__info-subtitle');

const popupAddCard = document.querySelector('.popup_add-card');
const addCardBtn = document.querySelector('.profile__add-card');
const editNameCard = popupAddCard.querySelector('.popup__form-card');
const buttonClosePopupCard = popupAddCard.querySelector('.popup__close');
const listContainer = document.querySelector('.element-grid');
const cardTemplate = document.querySelector('.card-template');
const nameInputCard = document.querySelector('.popup__input_card_name');
const linkInputCard = document.querySelector('.popup__input_card_link');

const popupOpenCard = document.querySelector('.popup_open-card'); //
const bigCard = popupOpenCard.querySelector('.popup__image'); //
const bigCardTitle = popupOpenCard.querySelector('.popup__image-title'); //
const buttonClosePopupBigCard = popupOpenCard.querySelector('.popup__close');

function openModalWindow(popup) {
    popup.classList.add('popup_opened');
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
}

addCardBtn.addEventListener('click', () => {
    openModalWindow(popupAddCard);
});

function render() {
    const drawingElements = initialCards.map(getElement);
    listContainer.append(...drawingElements);
}

addCardBtn.addEventListener('click', () => {
    openModalWindow(popupAddCard);
});

function render() {
    const drawingElements = initialCards.map(getElement);
    listContainer.append(...drawingElements);
}

function getElement(item) {
    const getElemenTemplate = cardTemplate.content.cloneNode(true);
    const link = getElemenTemplate.querySelector('.card__img');
    const name = getElemenTemplate.querySelector('.card__title');
    const removeButton = getElemenTemplate.querySelector('.card__bin');
    const likeCardBtn = getElemenTemplate.querySelector('.card__like');

    link.src = item.link;
    link.alt = item.name;
    name.textContent = item.name;

    removeButton.addEventListener('click', removeCard);

    likeCardBtn.addEventListener('click', function () {
        likeCardBtn.classList.toggle('card__like_active')
    });

    link.addEventListener('click', function () {

        bigCard.src = link.src;
        bigCard.alt = link.alt;
        bigCardTitle.textContent = name.textContent;

        openModalWindow(popupOpenCard);
    });

    return getElemenTemplate;
}

function addCard(evt) {

    const cardElement = getElement({
        name: nameInputCard.value,
        link: linkInputCard.value
    });

    listContainer.prepend(cardElement);

    nameInputCard.value = '';
    linkInputCard.value = '';
}

editNameCard.addEventListener('submit', evt => {
    evt.preventDefault();

    closeModalWindow(popupAddCard);

    addCard();
});

buttonClosePopupCard.addEventListener('click', () => {
    closeModalWindow(popupAddCard);
});

function removeCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

editProfileBtn.addEventListener('click', () => {
    nameInputProfile.value = `${profileName.textContent}`;
    aboutInputProfile.value = `${profileAbout.textContent}`;

    openModalWindow(popupProfile);
});

buttonClosePopupProfile.addEventListener('click', () => {
    closeModalWindow(popupProfile);
});

editNameInfo.addEventListener('submit', evt => {
    evt.preventDefault();

    profileName.textContent = nameInputProfile.value;
    profileAbout.textContent = aboutInputProfile.value;

    closeModalWindow(popupProfile);
});

buttonClosePopupBigCard.addEventListener('click', () => {
    closeModalWindow(popupOpenCard);
});

render();
