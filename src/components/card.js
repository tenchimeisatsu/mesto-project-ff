function createCard(cardElement, cardTemplate, handleImageCallback) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardImage.addEventListener("click", () => handleImageCallback(cardElement));
  card.querySelector(".card__title").textContent = cardElement.name;
  deleteButton.addEventListener("click", () => deleteCard(card));
  likeButton.addEventListener("click", handleLikeButton);
  return card;
}

function deleteCard(card) {
  card.remove();
}

function handleLikeButton(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard };
