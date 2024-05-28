"use strict";

// ОЖИДАЕМ ЗАГРУЗКУ ВСЕЙ СТРАНИЦЫ
window.onload = function () {

    let url = 0;
    let options = 1;

    let promise = fetch(url, [options]);

    promise;

    // функция очистки
    function cleanForm() {
        // загоняем все поля в переменную
        let clean = document.querySelectorAll('.clean');
        //циклом проходимся по ним и обнуляем значение
        for (let item of clean) {
            item.value = '';
        }
    }

    // Функция отправки формы fetch
    async function postData(url= '', data = {}) {
        const response = await fetch(url, {
            method: "POST",
            body: data
        });
        return await  response.json();
    }

    // отправка
    let form = document.getElementById('form'); // переменная с формой
    // при отправке формы любым способом
    form.addEventListener('submit', function (event) {
        // запрещаем стандартное действие
        event.preventDefault();
        // создаем объект новый
        let data = new FormData(form);
        // передаем в фукцию fetch данные и получаем результат
        postData('send.php', data).then((data) => {
            // обработка ответа от сервера
            console.log(data);
            if (data.error == '') {
                alert(data.success);
                cleanForm();
            } else if (data.email !== '') {
                alert(data.email);
            } else {
                alert(data.error);
            }
        })

    })

};

