import "../pages/index.css";
import { createCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getMainUserPromise,
  getCardsPromise,
  patchMainUserPromise,
  postNewCardPromise,
  patchNewAvatarPromise,
} from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
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
const avatarContainer = document.querySelector(".profile__image");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const mainUserPromise = getMainUserPromise();
const cardsPromise = getCardsPromise();
const editAvatarForm = popupEditAvatar.querySelector(".popup__form");
const avatarLink = editAvatarForm.querySelector(".popup__input");
const avatarEditButton = document.querySelector(".profile__edit-avatar-button");
let userId;

Promise.all([mainUserPromise, cardsPromise])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    nameInput.textContent = userInfo.name;
    jobInput.textContent = userInfo.about;
    avatarContainer.style.backgroundImage = `url(${userInfo.avatar})`;
    cards.forEach((elem) =>
      cardsList.append(createCard(elem, cardTemplate, handleImagePopup, userId))
    );
  })
  .catch((err) => console.log(err));

editForm.addEventListener("submit", handleEditFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
popupEdit.classList.add("popup_is-animated");
popupEditAvatar.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");
popupEdit.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupEdit);
});
popupEditAvatar.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupEditAvatar);
});
popupNewCard.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupNewCard);
});
popupImage
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupImage));
editButton.addEventListener("click", () => handleOpenEditPopup());
addCardButton.addEventListener("click", () => handleOpenAddPopup());
avatarEditButton.addEventListener("click", () => handleOpenEditAvatarPopup());
popupEdit.addEventListener("click", (evt) => {
  handleCloseOutsideWindow(evt);
});
popupEditAvatar.addEventListener("click", (evt) => {
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

function handleOpenEditAvatarPopup() {
  avatarLink.value = "";
  openModal(popupEditAvatar);
  clearValidation(editAvatarForm, validationConfig);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = editForm.querySelector(".popup__button");
  renderLoading(true, submitButton);
  setMainUser(patchMainUserPromise(editNameInput.value, editJobInput.value), {
    name: nameInput,
    about: jobInput,
    avatar: avatarContainer,
  }).finally(() => {
    renderLoading(false, submitButton);
    closeModal(popupEdit);
  });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addForm.querySelector(".popup__button");
  renderLoading(true, submitButton);
  const newCardPromise = postNewCardPromise(placeName.value, placeLink.value);
  newCardPromise
    .then((obj) =>
      cardsList.prepend(createCard(obj, cardTemplate, handleImagePopup, userId))
    )
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, submitButton);
      closeModal(popupNewCard);
      placeName.value = "";
      placeLink.value = "";
    });
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

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = editAvatarForm.querySelector(".popup__button");
  renderLoading(true, submitButton);
  const newAvatarPromise = patchNewAvatarPromise(avatarLink.value);
  newAvatarPromise
    .then(
      (obj) => (avatarContainer.style.backgroundImage = `url(${obj.avatar})`)
    )
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, submitButton);
      closeModal(popupEditAvatar);
      avatarLink.value = "";
    });
}

function renderLoading(isLoading, buttonElement) {
  buttonElement.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

function setMainUser(promise, userObject) {
  return promise
    .then((obj) => {
      userObject.name.textContent = obj.name;
      userObject.about.textContent = obj.about;
      userObject.avatar.style.backgroundImage = `url(${obj.avatar})`;
    })
    .catch((err) => console.log(err));
}

enableValidation(validationConfig);
