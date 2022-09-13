<script setup>
import Button from './Button.vue';
import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/
 
 const snackbar = useSnackbar();



async function Auth(){
  let login = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  let response = await fetch('http://localhost:3000/login?username=' + login + '&password=' + password, {
  method: 'POST'
});

let result = await response.json();

  // console.log(result.status);
  if (result.status == 'authYes') {
    // console.log('Успешно ' + result.email);
    window.location.replace("http://localhost:4000/");
  } 
  
  if (result.status == 'authNone') {
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



(function() {
  document.addEventListener('keydown', function(e) {
 if (event.keyCode == 13) {
      Auth();
    }
  });
})();

  
</script>



<template>
    <body class="authBody">
      <div class="authBodyBack">
      

 
<teleport to="body">
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</teleport>
		

</div>
      <div class="loginForm">


	<div class="logo"></div>
	
			<label>Логин</label>
			<p><input class="loginInput" type ="login" id="userName" name="login" required></p>
		

			<label>Пароль</label>
			<p><input class="loginInput" type="password" id ="password" name="password" required></p>


<div class="div_center">
      <Button class="loginButton"
        @click="Auth" 
        :variant="'btn btn-primary btn-lg'" 
        >
        Войти в систему
      </Button>
</div>
<div class="copyright">
  Аналитическая информационная система "Умные карты"
  </div>
      </div>


</body>
</template>