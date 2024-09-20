const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22/",
  properties: {
    headers: {
      authorization: "b0d43540-4753-4cff-82d8-7e4887ff813c",
      "Content-Type": "application/json",
    },
  },
};

function handleResponse(promise) {
  return promise.then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getMainUserPromise() {
  return handleResponse(fetch(`${config.baseUrl}users/me`, config.properties));
}

function getCardsPromise() {
  return handleResponse(fetch(`${config.baseUrl}cards`, config.properties));
}

function patchMainUserPromise(newName, newAbout) {
  const patchProperties = structuredClone(config.properties);
  patchProperties["method"] = "PATCH";
  patchProperties["body"] = JSON.stringify({
    name: newName,
    about: newAbout,
  });
  return handleResponse(fetch(`${config.baseUrl}users/me`, patchProperties));
}

function postNewCardPromise(cardName, cardUrl) {
  const postProperties = structuredClone(config.properties);
  postProperties["method"] = "POST";
  postProperties["body"] = JSON.stringify({
    name: cardName,
    link: cardUrl,
  });
  return handleResponse(fetch(`${config.baseUrl}cards`, postProperties));
}

function deleteCardPromise(cardId) {
  const deleteProperties = structuredClone(config.properties);
  deleteProperties["method"] = "DELETE";
  return handleResponse(
    fetch(`${config.baseUrl}cards/${cardId}`, deleteProperties)
  );
}

function putLikeCardPromise(cardId) {
  const putProperties = structuredClone(config.properties);
  putProperties["method"] = "PUT";
  return handleResponse(
    fetch(`${config.baseUrl}cards/likes/${cardId}`, putProperties)
  );
}

function deleteLikeCardPromise(cardId) {
  const deleteProperties = structuredClone(config.properties);
  deleteProperties["method"] = "DELETE";
  return handleResponse(
    fetch(`${config.baseUrl}cards/likes/${cardId}`, deleteProperties)
  );
}

function patchNewAvatarPromise(avatarLink) {
  const patchProperties = structuredClone(config.properties);
  patchProperties["method"] = "PATCH";
  patchProperties["body"] = JSON.stringify({
    avatar: avatarLink,
  });
  return handleResponse(
    fetch(`${config.baseUrl}users/me/avatar`, patchProperties)
  );
}

export {
  getMainUserPromise,
  getCardsPromise,
  patchMainUserPromise,
  postNewCardPromise,
  deleteCardPromise,
  putLikeCardPromise,
  deleteLikeCardPromise,
  patchNewAvatarPromise,
};
