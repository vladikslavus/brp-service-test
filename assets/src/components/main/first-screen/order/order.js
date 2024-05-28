import IMask from "imask";

  const orderForm          = document.querySelector(".order-form");
  const orderFormPhone     = document.querySelector(".order-form__phone");

  const phoneError         = document.querySelector(".order-form__phone-error");
  const phoneErrorImg      = document.querySelector(".order-form__phone-error-img");
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
  orderFormPhone.value = "";
  orderFormPhone.value = "+7 (___) ___-__-__";
  mask.updateValue();
  orderFormPhone.click();

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
    orderFormPhone.value = "+7 (___) ___-__-__";
    mask.updateValue();

    phonePlaceholder.classList.remove("phMove");

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