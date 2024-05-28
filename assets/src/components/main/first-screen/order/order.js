import IMask from "imask";

  const orderForm          = document.querySelector(".order-form");
  const orderFormName      = document.querySelector(".order-form__name");
  const orderFormPhone     = document.querySelector(".order-form__phone");

  const nameError          = document.querySelector(".order-form__name-error");
  const nameErrorImg       = document.querySelector(".order-form__name-error-img");

  const phoneError         = document.querySelector(".order-form__phone-error");
  const phoneErrorImg      = document.querySelector(".order-form__phone-error-img");

  const namePlaceholder    = document.querySelector(".order-form__name-placeholder");
  const phonePlaceholder   = document.querySelector(".order-form__phone-placeholder");

  const submitBtn = document.querySelector(".order-form__button");

  const sendMessageUrl = "/php/send-order-form.php";

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
  orderFormName.addEventListener("focus", (e) => {
    namePlaceholder.classList.add("phMove");
  });

  orderFormName.addEventListener("blur", (e) => {
    if (orderFormName.value.trim() === "") namePlaceholder.classList.remove("phMove");
  });
  namePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormName.focus();
  });  

  orderFormPhone.addEventListener("focus", (e) => {
    phonePlaceholder.classList.add("phMove");
  });
  phonePlaceholder.addEventListener("click", (e) => {
    e.target.classList.add("phMove");
    orderFormPhone.focus();
  });
  orderFormPhone.addEventListener("blur", (e) => {
    console.log("mask.unmaskedValue.length:", mask.unmaskedValue.length);
    if (mask.unmaskedValue.length < 1) {
      phonePlaceholder.classList.remove("phMove");
    }
  });  
  



  // ОБРАБОТКА ОШИБОК
  orderFormName.value = "";
  orderFormPhone.value = "";
  orderFormPhone.value = "+7 (___) ___-__-__";
  mask.updateValue();
  orderFormPhone.click();

  function nameCheck() {
    let orderFormNameValue = orderFormName.value.trim();
    if (orderFormNameValue.length < 2) {
      nameError.style.opacity = "1";
      if (nameError.classList.contains("no-before")) {
        nameError.classList.remove("no-before");
        nameErrorImg.setAttribute("src", "/img/order/exclamation.svg");
      }
      return false;
    } else if (orderFormNameValue.length >= 2) {
      nameErrorImg.setAttribute("src", "/img/order/checked.svg");
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
        phoneErrorImg.setAttribute("src", "/img/order/exclamation.svg");
      }
      return false;
    } else if (orderFormPhoneValue.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/) != null) {
      phoneErrorImg.setAttribute("src", "/img/order/checked.svg");
      phoneError.classList.add("no-before");
      return true;
    }
  }

  // function validate(input) {
  //   if ($(input).attr("name") == "name") {}
  // }



  orderFormName.addEventListener("keyup", (e) => {
    nameCheck();
  });
  orderFormName.addEventListener("blur", (e) => {
    nameCheck();
  });

  orderFormPhone.addEventListener("focus", (e) => {
    mask.updateValue();
  });
  orderFormPhone.addEventListener("keyup", (e) => {
    phoneCheck();
  });
  orderFormPhone.addEventListener("blur", (e) => {
    phoneCheck();    
  });

  // AJAX
  // функция очистки
  function cleanForm() {
    orderFormName.value = "";
    orderFormPhone.value = "+7 (___) ___-__-__";
    mask.updateValue();

    namePlaceholder.classList.remove("phMove");
    phonePlaceholder.classList.remove("phMove");

    nameError.style.opacity = "0";
    phoneError.style.opacity = "0";
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
      if (nameCheck() === false) return false;
      if (phoneCheck() === false) return false;
      
      if (data.error == "") {
        alert(data.success);
        cleanForm();
      } else {
        alert(data.error);
      }
    });
  });
};