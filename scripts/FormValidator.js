export class FormValidator {
    _config
    _formElement
    _buttonElement
    _inputList

    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(config.submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = () => {
        return Array.from(this._inputList).some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    clearError = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }

    disableSubmitButton = () => {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', "");
    }

    enableSubmitButton = () => {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled', "");
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
}