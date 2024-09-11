import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

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
const editName = editForm.querySelector(".popup__input_type_name");
const editJob = editForm.querySelector(".popup__input_type_description");
const addForm = popupNewCard.querySelector(".popup__form");

editName.value = nameInput.textContent;
editJob.value = jobInput.textContent;
popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");
initialCards.forEach((elem) =>
  cardsList.append(createCard(elem, cardTemplate, handleImagePopup))
);
editButton.addEventListener("click", () => openModal(popupEdit));
addCardButton.addEventListener("click", () => openModal(popupNewCard));
editForm.addEventListener("submit", handleEditFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = editName.value;
  jobInput.textContent = editJob.value;
  closeModal(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const placeName = addForm.querySelector(".popup__input_type_card-name");
  const placeLink = addForm.querySelector(".popup__input_type_url");
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
  const image = popupImage.querySelector(".popup__image");
  const imageCaption = popupImage.querySelector(".popup__caption");
  image.src = cardElement.link;
  image.alt = cardElement.name;
  imageCaption.textContent = cardElement.name;
  openModal(popupImage);
}
