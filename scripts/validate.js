const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config.inputErrorClass, config.errorClass);
    } else {
        hideInputError(formElement, inputElement, config.inputErrorClass, config.errorClass);
    }
}
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
        });
    });
}
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
}
const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, inactiveButtonClass);
    }
}
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', "");
}
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', "");
}
const clearError = (popup, config, disableSubmitButton) => {
    const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
    const formElement = popup.querySelector(config.formSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config.inputErrorClass, config.errorClass);
    });
}
enableValidation(config);