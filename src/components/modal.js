function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  modalWindow.classList.remove("popup_is-animated");
  const closeButton = modalWindow.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(modalWindow));
  document.addEventListener("keydown", (evt) =>
    handleEscapeButton(evt, modalWindow)
  );
  modalWindow.addEventListener("click", (evt) => {
    if (!evt.target.closest(".popup__content")) {
      closeModal(modalWindow);
    }
  });
}

function handleEscapeButton(evt, modalWindow) {
  if (evt.key === "Escape") {
    closeModal(modalWindow);
  }
}

function closeModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) =>
    handleEscapeButton(evt, modalWindow)
  );
}

export { openModal, closeModal };
