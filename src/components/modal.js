function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  modalWindow.classList.remove("popup_is-animated");
  document.addEventListener("keydown", handleEscapeButton);
}

function handleEscapeButton(evt) {
  const modalWindow = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(modalWindow);
  }
}

function closeModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeButton);
}

export { openModal, closeModal };
