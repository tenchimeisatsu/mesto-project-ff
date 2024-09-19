import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editForm = popupEdit.querySelector(".popup__form");
const jobInput = document.querySelector(".profile__description");
const nameInput = document.querySelector(".profile__title");
const editNameInput = editForm.querySelector(".popup__input_type_name");
const editJobInput = editForm.querySelector(".popup__input_type_description");
const addForm = popupNewCard.querySelector(".popup__form");
const placeName = addForm.querySelector(".popup__input_type_card-name");
const placeLink = addForm.querySelector(".popup__input_type_url");
const imageElement = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

editForm.addEventListener("submit", handleEditFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);
popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");
initialCards.forEach((elem) =>
  cardsList.append(createCard(elem, cardTemplate, handleImagePopup))
);
popupEdit.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupEdit);
  clearValidation(editForm, validationConfig);
});
popupNewCard.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupNewCard);
  clearValidation(addForm, validationConfig);
});
popupImage
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupImage));
editButton.addEventListener("click", () => handleOpenEditPopup());
addCardButton.addEventListener("click", () => handleOpenAddPopup());
popupEdit.addEventListener("click", (evt) => {
  handleCloseOutsideWindow(evt);
});
popupNewCard.addEventListener("click", (evt) => {
  handleCloseOutsideWindow(evt);
});
popupImage.addEventListener("click", handleCloseOutsideWindow);

function handleOpenEditPopup() {
  editNameInput.value = nameInput.textContent;
  editJobInput.value = jobInput.textContent;
  openModal(popupEdit);
  clearValidation(editForm, validationConfig);
}

function handleOpenAddPopup() {
  placeName.value = "";
  placeLink.value = "";
  openModal(popupNewCard);
  clearValidation(addForm, validationConfig);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = editNameInput.value;
  jobInput.textContent = editJobInput.value;
  closeModal(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  cardsList.prepend(
    createCard(
      {
        name: placeName.value,
        link: placeLink.value,
      },
      cardTemplate,
      handleImagePopup
    )
  );
  closeModal(popupNewCard);
  placeName.value = "";
  placeLink.value = "";
}

function handleImagePopup(cardElement) {
  imageElement.src = cardElement.link;
  imageElement.alt = cardElement.name;
  imageCaption.textContent = cardElement.name;
  openModal(popupImage);
}

function handleCloseOutsideWindow(evt) {
  if (!evt.target.closest(".popup__content")) {
    closeModal(evt.target);
  }
}

enableValidation(editForm, validationConfig);
enableValidation(addForm, validationConfig);
