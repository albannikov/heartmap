/* 
* Функция проверки авторизован ли пользователь
* выносим её в отдельный скрипт, чтобы вызвать его в самом начале index файла
*/

async function getAuthStatus(){
    let response = await fetch('http://localhost:3000/loginstatus'); // Получим статус авторизации пользователя
    let result = await response.json();
    if (result == 0) {                                               // Если не авторизован, отправим его на страницу логина
        window.location.replace("http://localhost:4000/login.html");
    } 
  };

getAuthStatus();