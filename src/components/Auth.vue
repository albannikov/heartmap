<script setup>
import Button from './Button.vue';
import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/ 
import router from '../router.js';
const snackbar = useSnackbar();


/* Функция аутентификации. Получим статус переменной с бэкенда и обработаем */

async function Auth(){
  let login = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  let response = await fetch('http://localhost:3000/login?username=' + login + '&password=' + password, {
  method: 'POST',
  credentials: "include"
});
let result = await response.json();
// console.log('сервер ответил - ' + result);
  if (result != 'authNone') {   
     router.replace({ path: '/' });    
    console.log('Успешно');
    setTimeout(() => {
      window.location.reload(true);
    }, 500);         
  }   
  if (result == 'authNone') {
     snackbar.add({
            "type": "error",
            "title": "Ошибка",
            "text": "Не верный логин или пароль",
            "group": "5bfb7ed",
            "duration": 7000,
            "count": 1
          });

    return;
  }    
  }

(function() { //Это чтобы логиниться по нажатию Enter
  document.addEventListener('keydown', function(e) {
 if (event.keyCode == 13) {
      Auth();
    }
  });
})();  
</script>

<template>
      <div id="stars-container">
        <div id='stars'></div>
			<div id='stars2'></div>
			<div id='stars3'></div>
   

      <div class="loginForm">
        <div class="logo"></div>	
        <label>Логин</label>
        <p><input class="loginInput" type ="login" id="userName" name="login" required></p>
        <label>Пароль</label>
        <p><input class="loginInput" type="password" id ="password" name="password" required></p>
          <div class="div_center">
            <Button class="loginButton"
              @click="Auth" 
              :variant="'btn btn-dark btn-lg'"
              >Войти в систему
            </Button>
          </div>
          <div class="copyright">АИС «Умные карты»</div>
        </div>

	
</div>
</template>

<style lang="scss" scoped>

.logo {
  margin: auto;  /* Magic! */
	width: 240px;
	height: 100px;
	background-image: url(../img/bear.png);
  background-position: top center;
	background-size: 140px;
	background-repeat: no-repeat;

}


.loginForm {  
  text-align:center;
	border: 1px solid;
  border-radius: 5px;
	border-color: rgb(136, 136, 136);
	width: fit-content;
	padding: 30px 45px 10px 45px;
	/* border-radius: 10px; */
	background-color: rgba(255, 255, 255, 0.9);
	// backdrop-filter: blur(150px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	box-shadow: 0 0 150px rgba(255, 255, 255, 0.2);
}

.loginInput {
	height: 38px;
	/* border-radius: 5px; */
	border: 1px solid;
	border-color: rgb(136, 136, 136);
	width: 100%;	
	font-size: 18px;
	margin-bottom: 20px;
}

.loginButton {
	margin-bottom: 30px;
}

@mixin translate50
{
  -webkit-transform: translate(-50, -50%);
  -ms-transform: translate(-50, -50%);
  -o-transform: translate(-50, -50%);
  transform: translate(-50, -50%);
}

@mixin roundedCorners
{
  -webkit-border-radius: 50%; 
  -moz-border-radius: 50%; 
  border-radius: 50%;
}

@mixin rotateBase
{
  -webkit-transform: rotate3d(-1, 1, 0, 0deg);
  -ms-transform: rotate3d(-1, 1, 0, 0deg);
  -o-transform: rotate3d(-1, 1, 0, 0deg);
  transform: rotate3d(-1, 1, 0, 0deg);
}

@mixin rotateRight
{
  -webkit-transform: rotate3d(-1, 1, 0, 30deg);
  -ms-transform: rotate3d(-1, 1, 0, 30deg);
  -o-transform: rotate3d(-1, 1, 0, 30deg);
  transform: rotate3d(-1, 1, 0, 30deg);
}

@mixin rotateLeft
{
  -webkit-transform: rotate3d(-1, 1, 0, -30deg);
  -ms-transform: rotate3d(-1, 1, 0, -30deg);
  -o-transform: rotate3d(-1, 1, 0, -30deg);
  transform: rotate3d(-1, 1, 0, -30deg);
}

// n is number of stars generated
@function generateStars ($n)
{ 
  $value: '#{0} #{random(2000)}px #{random(2000)}px #FFF';

  @for $i from 2 through $n
  {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }

  @return unquote($value);
}

$stars-small:  generateStars(700);
$stars-medium: generateStars(200);
$stars-big:    generateStars(100);

body
{
  overflow: hidden;
}

#stars-container
{
  height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #191F24 100%);
  overflow: hidden;
  @include translate50;
}
    
#stars
{
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $stars-small;
  animation : animateStars 28.5s ease-in-out infinite;
  @include roundedCorners;

  &::after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $stars-small;
    @include roundedCorners;
  }
}
    
#stars2
{
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $stars-medium;
  animation : animateStars 30s ease-in-out infinite;
  @include roundedCorners;
    
  &::after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $stars-medium;
    @include roundedCorners;
  }
}
    
#stars3
{
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: $stars-big;
  animation : animateStars 31.5s ease-in-out infinite;
  @include roundedCorners;
    
  &:after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $stars-big;
    @include roundedCorners;
  }
}

@keyframes animateStars
{
  0%{@include rotateBase;}
  25%{@include rotateRight;}
  50%{@include rotateBase;}
  75%{@include rotateLeft;}
  100%{@include rotateBase;}
}

.copyright{
  color: #383838;
  position: relative;
  display: block;
  font-size: 13px;
}
</style>