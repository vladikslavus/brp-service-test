import IMask from "imask";

  const orderForm          = document.querySelector(".order-form");
  const orderFormInputs    = document.querySelectorAll(".order-form input");
  const orderFormName      = document.querySelector(".order-form__name");
  const orderFormPhone     = document.querySelector(".order-form__phone");
  const orderFormMessage   = document.querySelector(".order-form__message");

  const nameError          = document.querySelector(".order-form__name-error");
  const nameErrorImg       = document.querySelector(".order-form__name-error-img");

  const phoneError         = document.querySelector(".order-form__phone-error");
  const phoneErrorImg      = document.querySelector(".order-form__phone-error-img");

  const messageError       = document.querySelector(".order-form__message-error");
  const messageErrorImg    = document.querySelector(".order-form__message-error-img");

  const namePlaceholder    = document.querySelector(".order-form__name-placeholder");
  const phonePlaceholder   = document.querySelector(".order-form__phone-placeholder");
  const messagePlaceholder = document.querySelector(".order-form__message-placeholder");

  const submitBtn = document.querySelector(".order-form__button");

  const sendMessageUrl = "/php/send-order-form.php";

  let errorFlag = true; // Проверяем как откработали проверочные функции nameCheck(),
                        // которые возвращают true/false и присваиваем флагу false, если ошибок нет
  // submitBtn.disabled = "disabled";

// ОЖИДАЕМ ЗАГРУЗКУ ВСЕЙ СТРАНИЦЫ
window.onload = function () {

  const maskOptions = {
    mask: "+7 (000) 000-00-00",
    startsWith: "7",
    lazy: false,
    country: "Russia",
  };
  const mask = IMask(orderFormPhone, maskOptions);

  // РАБОТА С ПЛЕЙСХОЛДЕРАМИ, МАСКА ТЕЛЕФОНА
  // if(orderFormName.value.trim() !== "") namePlaceholder.classList.add("phMove");
  // if(orderFormPhone.value.trim() !== "") phonePlaceholder.classList.add("phMove");
  // if(orderFormMessage.value.trim() !== "") messagePlaceholder.classList.add("phMove");

  console.log('p p p p p p p p p p p p p p p p p p p p p p p p p p p p p p', orderFormPhone.value.trim());

  if(trim(orderFormName.addEventListener("focus", (e) => {
    namePlaceholder.classList.add("phMove");
  })));

  orderFormName.addEventListener("blur", (e) => {
    if (e.target.value.trim() !== "") namePlaceholder.classList.remove("phMove");
  });
  namePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormName.focus();
  });  

  orderFormPhone.addEventListener("focus", (e) => {
    phonePlaceholder.classList.add("phMove");
  });
  orderFormPhone.addEventListener("blur", (e) => {
    // console.log("mask.unmaskedValue.length:", mask.unmaskedValue.length);
    if (mask.unmaskedValue.length < 1) {
      phonePlaceholder.classList.remove("phMove");
    }
  });
  phonePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    e.target.focus();
  });
  
  orderFormMessage.addEventListener("focus", (e) => {
    messagePlaceholder.classList.add("phMove");
  });

  orderFormMessage.addEventListener("blur", (e) => {
    if (orderFormMessage.value.length < 1) {
      messagePlaceholder.classList.remove("phMove");
    }
  });
  messagePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormMessage.focus();
  });



  // ОБРАБОТКА ОШИБОК
  // orderFormName.value = "";
  // orderFormPhone.value = "";
  // mask.updateValue();
  // orderFormMessage.value = "";

  function nameCheck() {
    let orderFormNameValue = orderFormName.value.trim();
    if (orderFormNameValue.length < 2) {
      nameError.style.opacity = "1";
      if (nameError.classList.contains("no-before")) {
        nameError.classList.remove("no-before");
        nameErrorImg.setAttribute("src", "/img/contacts/exclamation.svg");
      }
      return false;
    } else if (orderFormNameValue.length >= 2) {
      nameErrorImg.setAttribute("src", "/img/contacts/checked.svg");
      nameError.classList.add("no-before");
      return true;
    }
  }
  function phoneCheck() {
    let orderFormPhoneValue = orderFormPhone.value.trim();
    if (orderFormPhoneValue.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) == null) {
      phoneError.style.opacity = "1";
      if (phoneError.classList.contains("no-before")) {
        phoneError.classList.remove("no-before");
        phoneErrorImg.setAttribute("src", "/img/contacts/exclamation.svg");
      }
      return false;
    } else if (orderFormPhoneValue.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) != null) {
      phoneErrorImg.setAttribute("src", "/img/contacts/checked.svg");
      phoneError.classList.add("no-before");
      return true;
    }
  }
  function messageCheck() {
    let orderFormMessageValue = orderFormMessage.value.trim();
    if (orderFormMessageValue.length < 10) {
      messageError.style.opacity = "1";
      if (messageError.classList.contains("no-before")) {
        messageError.classList.remove("no-before");
        messageErrorImg.setAttribute("src", "/img/contacts/exclamation.svg");
      }
      return false;
    } else if (orderFormMessageValue.length >= 10) {
      messageErrorImg.setAttribute("src", "/img/contacts/checked.svg");
      messageError.classList.add("no-before");
      return true;
    }
  }

  // function validate(input) {
  //   if ($(input).attr("name") == "name") {}
  // }



  orderFormName.addEventListener("keyup", (e) => {
    nameCheck();
    console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN", e.target, e.target.getAttribute('name'));
  });
  orderFormName.addEventListener("blur", (e) => {
    nameCheck();
  });

  orderFormPhone.addEventListener("focus", (e) => {
    mask.updateValue();
  });
  orderFormPhone.addEventListener("keyup", (e) => {
    phoneCheck();
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", e.target, e.target.getAttribute('name'));
  });
  orderFormPhone.addEventListener("blur", (e) => {
    phoneCheck();    
  });

  orderFormMessage.addEventListener("keyup", (e) => {
    messageCheck();
    console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", e.target, e.target.getAttribute('name'));
  });
  orderFormMessage.addEventListener("blur", (e) => {
    messageCheck();
  });  

  // AJAX
  // функция очистки
  function cleanForm() {
    orderFormName.value = "";
    orderFormPhone.value = "+7 (___) ___-__-__";
    mask.updateValue();
    orderFormMessage.value = "";
    orderFormMessage.classList.remove("no-before");

    nameError.style.opacity = "0";
    phoneError.style.opacity = "0";
    messageError.style.opacity = "0";
  }

  // Функция отправки формы fetch
  async function postData(sendMessageUrl, data = {}) {
    const response = await fetch(sendMessageUrl, {
      method: "POST",
      body: data,
    });
    return await response.json();
  }

  // отправка
  // при отправке формы любым способом
  orderForm.addEventListener("submit", function (e) {
    // запрещаем стандартное действие
    e.preventDefault();
    // создаем объект новый
    let data = new FormData(orderForm);

    // передаем в фукцию fetch данные и получаем результат
    postData("/php/send-order-form.php", data).then((data) => {
      // обработка ответа от сервера
      console.log(data);
      if (data.error == "") {
        alert(data.success);
        cleanForm();
      } else {
        alert(data.error);
      }
    });
  });
};