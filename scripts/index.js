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
const buttonClosePopupCard = popupAddCard.querySelector('.popup__close');
const listContainer = document.querySelector('.element-grid');
const cardTemplate = document.querySelector('.card-template');
const nameInputCard = document.querySelector('.popup__input_card_name');
const linkInputCard = document.querySelector('.popup__input_card_link');
const popupOpenCard = document.querySelector('.popup_open-card');
const cardBig = popupOpenCard.querySelector('.popup__image');
const cardBigTitle = popupOpenCard.querySelector('.popup__image-title');
const buttonClosePopupBigCard = popupOpenCard.querySelector('.popup__close');

function openModalWindow(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
}
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
    if (evt.target) {
        const popupOpened = document.querySelector('.popup_opened');
        closeModalWindow(evt.target);
    }
}
btnAddCard.addEventListener('click', () => {
    clearError(popupAddCard, config, disableSubmitButton);
    openModalWindow(popupAddCard);
});
function render() {
    const drawingElements = initialCards.map(getElement);
    listContainer.append(...drawingElements);
}
function getElement(item) {
    const elementTemplate = cardTemplate.content.cloneNode(true);
    const link = elementTemplate.querySelector('.card__img');
    const name = elementTemplate.querySelector('.card__title');
    const btnRemove = elementTemplate.querySelector('.card__bin');
    const btnCardLike = elementTemplate.querySelector('.card__like');
    link.src = item.link;
    link.alt = item.name;
    name.textContent = item.name;
    btnRemove.addEventListener('click', removeCard);
    btnCardLike.addEventListener('click', () => {
        btnCardLike.classList.toggle('card__like_active')
    });
    link.addEventListener('click', () => {
        cardBig.src = link.src;
        cardBig.alt = link.alt;
        cardBigTitle.textContent = name.textContent;
        openModalWindow(popupOpenCard);
    });
    return elementTemplate;
}
function addCard(evt) {
    const cardElement = getElement({
        name: nameInputCard.value,
        link: linkInputCard.value
    });
    listContainer.prepend(cardElement);
    formEditCard.reset();
}
formEditCard.addEventListener('submit', evt => {
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
btnEditProfile.addEventListener('click', () => {
    inputNameProfile.value = `${profileName.textContent}`;
    inputAboutProfile.value = `${profileAbout.textContent}`;
    clearError(popupProfile, config, disableSubmitButton);
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
buttonClosePopupBigCard.addEventListener('click', () => {
    closeModalWindow(popupOpenCard);
});
render();