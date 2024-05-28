<?php
/////////////////// Send message  ///////////////////////

if ($_SERVER['REQUEST_METHOD']=='POST') {

  foreach($_POST as $key => $value) {
    $value=trim($value); // remove spaces at the beginning and at the end of the variable
    // if (get_magic_quotes_gpc()) $value = stripslashes($value); // remove slashes if needed
    $_POST[$key]=$value; // all changes are written to the $_POST array

    // then make changes that will only go into the file,
    // and we don't need to output them in the form.
    // $value=htmlspecialchars($value,ENT_QUOTES); // replace HTML characters with their equivalents
    // $value=str_replace("\r","",$value); // replace all line translations
    // $msg[$key]=$value; // and assign the new values to the elements of the array $msg
  }

  // then we make various checks
  // the most important thing is that the $err variable is not empty for any errors
  // that is the $err variable is an error flag and contains all error messages at the same time
  $err=0;
  if (empty($_POST["name"])) $err=1;
  if (strlen($_POST["name"]) < 2 || strlen($_POST["name"]) > 100) $err=1;
  if (strlen($_POST["phone"]) > 18  || strlen($_POST["phone"]) < 18) $err=1;
  $phone_ok = (preg_match("/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/", $_POST["phone"]));
  if (!$phone_ok && $_POST["phone"]) $err=1;

  if ($err) {
    exit(json_encode(["error" => "Сообщение не отправлено. Форма заполнена некорректно."]));
  }

  // If there are no errors, then ...
  if (!$err) {

    $mail="Сообщение с http://".$_SERVER['HTTP_HOST']."\n";
    $mail.="Имя: ".$_POST['name']."\n";
    $mail.="Тел.: ".$_POST['phone']."\n";
    $mail.="Страница запроса: ".$_SERVER['HTTP_REFERER']."\n";
    $mail.="Отвечать бессмысленно, электронной почты НЕТ, зато есть номер телефона!!!";

    $to="vladax@list.ru, vladax@yandex.ru";
    $subject="=?UTF-8?B?" . base64_encode("Сообщение с ".$_SERVER['HTTP_HOST'])."?=";
    $headers="Content-type: text/plain; charset=UTF-8 \r\n" .
             "From: <info@vextor.ru>";

    if(mail($to, $subject, $mail, $headers)) {
      exit(json_encode(["success" => "Сообщение отправлено.", "error" => ""]));
    } else {
      exit(json_encode(["error" => "Сообщение не отправлено. Форма заполнена некорректно."]));
    }
  }
}