const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");

function createCard(cardElement) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  card.querySelector(".card__title").textContent = cardElement.name;
  deleteButton.addEventListener("click", () => deleteCard(card));
  return card;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((elem) => cardsList.append(createCard(elem)));
