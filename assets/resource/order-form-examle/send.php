<?php

/***   Получаем данные из формы отправленные скриптом ***/
// перед присвоением в переменную, проверяем есть ли данные
if (!empty($_POST["name"])) $name = $_POST['name'];
if (!empty($_POST["email"])) $email = $_POST['email'];
if (!empty($_POST["text"])) $text = $_POST['text'];

/***   Проверка данных ***/
// валидация почты
$OK = false;
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $OK = true;
} else {
    $OK = false;
    $result['email'] = 'Неверный адрес электронной почты';
}

/***   Отправка данных ***/
if ($OK) {
    // отправка

    // если отправка успешна
    $result['error'] = "";
    $result['success'] = 'Сообщение отправлено';
} else {
    $result['error'] = 'Сообщение не отправлено';
}

/***   Возврат результата отправки ***/
header('Content-Type: application/json');
echo json_encode($result);