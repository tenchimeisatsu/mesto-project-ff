(()=>{"use strict";var t="https://nomoreparties.co/v1/wff-cohort-22/",e={headers:{authorization:"b0d43540-4753-4cff-82d8-7e4887ff813c","Content-Type":"application/json"}};function n(t,e){return t.then((function(t){e.name.textContent=t.name,e.about.textContent=t.about,e.avatar.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(t){return console.log(t)}))}function o(n,o,r,c){var u=o.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__delete-button"),a=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-counter"),l=u.querySelector(".card__image");return function(t,e){return e.some((function(e){return e._id===t}))}(c,n.likes)&&a.classList.add("card__like-button_is-active"),s.textContent=n.likes.length,l.src=n.link,l.alt=n.name,l.addEventListener("click",(function(){return r(n)})),u.querySelector(".card__title").textContent=n.name,c===n.owner._id?i.addEventListener("click",(function(){return function(n,o){(function(n){var o=e;return o.method="DELETE",fetch("".concat(t,"cards/").concat(n),o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(o).catch((function(t){return console.log(t)})),n.remove()}(u,n._id)})):i.style.display="none",a.addEventListener("click",(function(o){return function(n,o,r){var c=n.target;c.classList.contains("card__like-button_is-active")?(function(n){var o=e;return o.method="DELETE",fetch("".concat(t,"cards/likes/").concat(n),o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(o).then((function(t){return r.textContent=t.likes.length})).catch((function(t){return console.log(t)})),c.classList.remove("card__like-button_is-active")):(function(n){var o=e;return o.method="PUT",fetch("".concat(t,"cards/likes/").concat(n),o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(o).then((function(t){return r.textContent=t.likes.length})).catch((function(t){return console.log(t)})),c.classList.add("card__like-button_is-active"))}(o,n._id,s)})),u}function r(t){t.classList.add("popup_is-opened"),t.classList.remove("popup_is-animated"),document.addEventListener("keydown",c)}function c(t){var e=document.querySelector(".popup_is-opened");"Escape"===t.key&&u(e)}function u(t){t.classList.add("popup_is-animated"),t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function i(t,e){var n=t.querySelectorAll(e.inputSelector),o=t.querySelector(e.submitButtonSelector);n.forEach((function(t){t.addEventListener("input",(function(t){!function(t,e){var n=t.target;n.validity.valid?a(n,e):function(t,e){t.classList.add(e.inputErrorClass),t.nextElementSibling.textContent=function(t){var e=t.validity;return e.tooShort?"Минимальное количество символов: 2. Длина текста сейчас: 1 символ.":e.typeMismatch?"Введите адрес сайта.":e.patternMismatch?t.dataset.errorMessage:"Вы пропустили это поле."}(t)}(n,e)}(t,e),s(n,o,e)}))}))}function a(t,e){t.classList.remove(e.inputErrorClass),t.nextElementSibling.textContent=""}var s=function(t,e,n){!function(t){return Array.from(t).some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):l(e,n)};function l(t,e){t.disabled=!0,t.classList.add(e.inactiveButtonClass)}function p(t,e){var n=t.querySelector(e.submitButtonSelector);t.querySelectorAll(e.inputSelector).forEach((function(t){return a(t,e)})),l(n,e)}var d,_=document.querySelector("#card-template").content,f=document.querySelector(".places__list"),v=document.querySelector(".popup_type_edit"),m=document.querySelector(".popup_type_edit-avatar"),y=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),h=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),q=v.querySelector(".popup__form"),L=document.querySelector(".profile__description"),b=document.querySelector(".profile__title"),E=q.querySelector(".popup__input_type_name"),g=q.querySelector(".popup__input_type_description"),C=y.querySelector(".popup__form"),j=C.querySelector(".popup__input_type_card-name"),x=C.querySelector(".popup__input_type_url"),P=S.querySelector(".popup__image"),T=S.querySelector(".popup__caption"),B=document.querySelector(".profile__image"),w={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},A=fetch("".concat(t,"users/me"),e).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),D=fetch("".concat(t,"cards"),e).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),N=m.querySelector(".popup__form"),O=N.querySelector(".popup__input"),J=document.querySelector(".profile__edit-avatar-button");function M(t){P.src=t.link,P.alt=t.name,T.textContent=t.name,r(S)}function H(t){t.target.closest(".popup__content")||u(t.target)}function I(t,e){e.textContent=t?"Сохранение...":"Сохранить"}Promise.all([A,D]),A.then((function(t){return d=t._id})).catch((function(t){return console.log(t)})),n(A,{name:b,about:L,avatar:B}),q.addEventListener("submit",(function(o){o.preventDefault();var r,c,i,a=q.querySelector(".popup__button");I(!0,a),n((r=E.value,c=g.value,i=e,i.method="PATCH",i.body=JSON.stringify({name:r,about:c}),fetch("".concat(t,"users/me"),i).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))),{name:b,about:L,avatar:B}).finally((function(){I(!1,a),u(v)}))})),C.addEventListener("submit",(function(n){n.preventDefault();var r,c,i,a=C.querySelector(".popup__button");I(!0,a),(r=j.value,c=x.value,i=e,i.method="POST",i.body=JSON.stringify({name:r,link:c}),fetch("".concat(t,"cards"),i).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){return f.prepend(o(t,_,M,d))})).catch((function(t){return console.log(t)})).finally((function(){I(!1,a),u(y),j.value="",x.value=""}))})),N.addEventListener("submit",(function(n){n.preventDefault();var o=N.querySelector(".popup__button");I(!0,o),function(n){var o=e;return o.method="PATCH",o.body=JSON.stringify({avatar:n}),fetch("".concat(t,"users/me/avatar"),o).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(O.value).then((function(t){return B.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(t){return console.log(t)})).finally((function(){I(!1,o),u(m),O.value=""}))})),v.classList.add("popup_is-animated"),m.classList.add("popup_is-animated"),y.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),D.then((function(t){return t.forEach((function(t){return f.append(o(t,_,M,d))}))})).catch((function(t){return console.log(t)})),v.querySelector(".popup__close").addEventListener("click",(function(){u(v),p(q,w)})),m.querySelector(".popup__close").addEventListener("click",(function(){u(m),p(N,w)})),y.querySelector(".popup__close").addEventListener("click",(function(){u(y),p(C,w)})),S.querySelector(".popup__close").addEventListener("click",(function(){return u(S)})),h.addEventListener("click",(function(){return E.value=b.textContent,g.value=L.textContent,r(v),void p(q,w)})),k.addEventListener("click",(function(){return j.value="",x.value="",r(y),void p(C,w)})),J.addEventListener("click",(function(){return O.value="",r(m),void p(N,w)})),v.addEventListener("click",(function(t){H(t)})),m.addEventListener("click",(function(t){H(t)})),y.addEventListener("click",(function(t){H(t)})),S.addEventListener("click",H),i(q,w),i(C,w),i(N,w)})();