const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");

function createCard(cardElement) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = cardElement.link;
  card.querySelector(".card__image").alt = cardElement.name;
  card.querySelector(".card__title").textContent = cardElement.name;
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

function deleteCard() {
  this.parentNode.remove();
}

initialCards.forEach(function (elem) {
  cardsList.append(createCard(elem));
});
