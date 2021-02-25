import {
    form
} from './constants.js';

class FormValidator {

    constructor({
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
            resetButtonSelector,
            popupSelector,
            addFormSelector,
            editFormSelector,
            avatarFormSelector
        },
        formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._resetButtonSelector = resetButtonSelector;
        this._popupSelector = popupSelector;
        this._addFormSelector = addFormSelector;
        this._editFormSelector = editFormSelector;
        this._avatarFormSelector = avatarFormSelector;
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));

        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
                const buttonElement = formElement.querySelector(this._submitButtonSelector);
                evt.preventDefault();
                this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
            });

            this._setEventListeners(this, formElement);
        });
    };

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const formError = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(errorClass);
    };

    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const formError = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        formError.classList.remove(errorClass);
        formError.textContent = '';
    };

    _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
            this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    };

    _hasInvalidInput(inputList) {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass) {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));

        inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(inputErrorClass)) {
                this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
            }
        })
    }

    _setEventListeners(form, formElement) {
        const inputSelector = this._inputSelector;
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        const errorClass = this._errorClass;
        const inputErrorClass = this._inputErrorClass;
        const inactiveButtonClass = this._inactiveButtonClass;

        document.querySelector(this._addFormSelector).addEventListener('click', function() {
            form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });

        document.querySelector(this._editFormSelector).addEventListener('click', function() {
            form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });

        document.querySelector(this._avatarFormSelector).addEventListener('click', function() {
            form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function() {
                form._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
                form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        });

        formElement.parentElement.querySelector(this._resetButtonSelector).addEventListener('click', function(evt) {
            form._resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
        });

        Array.from(document.querySelectorAll(this._popupSelector)).forEach((overlay) => overlay.addEventListener('click', function(evt) {
            if (evt.target.classList.contains('popup')) {
                form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
                form._resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
            }
        }));

        document.addEventListener('keydown', function(evt) {
            if (evt.key === 'Escape') {
                form._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
                form._resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
            }
        })
    }
}

export const formElement = new FormValidator(form, '.popup__form');
