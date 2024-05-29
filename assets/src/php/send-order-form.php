<?php
/////////////////// Send message  ///////////////////////

if ($_SERVER['REQUEST_METHOD']=='POST') {

  foreach($_POST as $key => $value) {
    $value=trim($value); // remove spaces at the beginning and at the end of the variable
    $_POST[$key]=$value; // all changes are written to the $_POST array

    // Next nothing goes into the file, that's why we don't create $msg[$key] array
  }

  // then we make various checks
  // the most important thing is that the $err variable is not empty for any errors
  // that is the $err variable is an error flag and contains all error messages at the same time
  $err=0;
  if (strlen($_POST["phone"]) > 18  || strlen($_POST["phone"]) < 18) $err=1;
  $phone_ok = (preg_match("/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/", $_POST["phone"]));
  if (!$phone_ok && $_POST["phone"]) $err=1;

  if ($err) {
    exit(json_encode(["error" => "Сообщение не отправлено. Форма заполнена некорректно."]));
  }

  // If there are no errors, then ...
  if (!$err) {

    $mail="Сообщение с http://".$_SERVER['HTTP_HOST']."\n";
    $mail.="Тел.: ".$_POST['phone']."\n";
    $mail.="Страница запроса: ".$_SERVER['HTTP_REFERER']."\n";
    $mail.="Отвечать бессмысленно, с сайта http://".$_SERVER['HTTP_HOST']." приходит только номер телефона!!!";

    $to="info@vextor.ru, vladax@list.ru, vladax@yandex.ru";
    $subject="=?UTF-8?B?" . base64_encode("Сообщение с ".$_SERVER['HTTP_HOST'])."?=";
    $headers="Content-type: text/plain; charset=UTF-8 \r\n" . // !inmortant fir the correct charset displaying
             "From: <info@vextor.ru>";

    if(mail($to, $subject, $mail, $headers)) {
      exit(json_encode(["success" => "Сообщение отправлено.", "error" => ""]));
    } else {
      exit(json_encode(["error" => "Сообщение не отправлено. Форма заполнена некорректно."]));
    }
  }
}