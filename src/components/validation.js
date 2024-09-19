function enableValidation(formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(
    validationConfig.inputSelector
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      isValid(evt, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function showInputError(input, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);
  input.nextElementSibling.textContent = generateValidationMessage(input);
}

function hideInputError(input, validationConfig) {
  input.classList.remove(validationConfig.inputErrorClass);
  input.nextElementSibling.textContent = "";
}

function isValid(evt, validationConfig) {
  const input = evt.target;
  if (!input.validity.valid) {
    showInputError(input, validationConfig);
  } else {
    hideInputError(input, validationConfig);
  }
}

function generateValidationMessage(input) {
  const state = input.validity;
  if (state.tooShort) {
    return "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (state.typeMismatch) {
    return "Введите адрес сайта.";
  } else if (state.patternMismatch) {
    return input.dataset.errorMessage;
  } else {
    return "Вы пропустили это поле.";
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

function disableButton(buttonElement, validationConfig) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

function clearValidation(profileForm, validationConfig) {
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputElements = profileForm.querySelectorAll(
    validationConfig.inputSelector
  );
  inputElements.forEach((input) => hideInputError(input, validationConfig));
  disableButton(buttonElement, validationConfig);
}

export { enableValidation, clearValidation };
