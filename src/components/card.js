import {
  deleteCardPromise,
  putLikeCardPromise,
  deleteLikeCardPromise,
} from "./api";

function createCard(cardElement, cardTemplate, handleImageCallback, userId) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");
  const cardImage = card.querySelector(".card__image");
  if (hasUserLike(userId, cardElement.likes)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeCounter.textContent = cardElement.likes.length;
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardImage.addEventListener("click", () => handleImageCallback(cardElement));
  card.querySelector(".card__title").textContent = cardElement.name;
  if (userId === cardElement.owner._id) {
    deleteButton.addEventListener("click", () =>
      deleteCard(card, cardElement._id)
    );
  } else {
    deleteButton.style.display = "none";
  }
  likeButton.addEventListener("click", (evt) =>
    handleLikeButton(evt, cardElement._id, likeCounter)
  );
  return card;
}

function deleteCard(card, cardId) {
  deleteCardPromise(cardId).catch((err) => console.log(err));
  card.remove();
}

function handleLikeButton(evt, cardId, counterElement) {
  const likeButton = evt.target;
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLikeCardPromise
    : putLikeCardPromise;
  likeMethod(cardId)
    .then((obj) => {
      counterElement.textContent = obj.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

function hasUserLike(userId, likesList) {
  return likesList.some((like) => {
    return like._id === userId;
  });
}

export { createCard };
