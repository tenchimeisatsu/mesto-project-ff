const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22/",
  properties: {
    headers: {
      authorization: "b0d43540-4753-4cff-82d8-7e4887ff813c",
      "Content-Type": "application/json",
    },
  },
};

function getMainUserPromise() {
  return fetch(`${config.baseUrl}users/me`, config.properties).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getCardsPromise() {
  return fetch(`${config.baseUrl}cards`, config.properties).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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

function patchMainUserPromise(newName, newAbout) {
  const patchProperties = config.properties;
  patchProperties["method"] = "PATCH";
  patchProperties["body"] = JSON.stringify({
    name: newName,
    about: newAbout,
  });
  return fetch(`${config.baseUrl}users/me`, patchProperties).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function postNewCardPromise(cardName, cardUrl) {
  const postProperties = config.properties;
  postProperties["method"] = "POST";
  postProperties["body"] = JSON.stringify({
    name: cardName,
    link: cardUrl,
  });
  return fetch(`${config.baseUrl}cards`, postProperties).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function deleteCardPromise(cardId) {
  const deleteProperties = config.properties;
  deleteProperties["method"] = "DELETE";
  return fetch(`${config.baseUrl}cards/${cardId}`, deleteProperties).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  );
}

function putLikeCardPromise(cardId) {
  const putProperties = config.properties;
  putProperties["method"] = "PUT";
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, putProperties).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  );
}

function deleteLikeCardPromise(cardId) {
  const deleteProperties = config.properties;
  deleteProperties["method"] = "DELETE";
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, deleteProperties).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  );
}

function patchNewAvatarPromise(avatarLink) {
  const patchProperties = config.properties;
  patchProperties["method"] = "PATCH";
  patchProperties["body"] = JSON.stringify({
    avatar: avatarLink,
  });
  return fetch(`${config.baseUrl}users/me/avatar`, patchProperties).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  );
}

export {
  getMainUserPromise,
  getCardsPromise,
  setMainUser,
  patchMainUserPromise,
  postNewCardPromise,
  deleteCardPromise,
  putLikeCardPromise,
  deleteLikeCardPromise,
  patchNewAvatarPromise,
};
