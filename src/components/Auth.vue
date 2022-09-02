<script setup>
import Button from './Button.vue';
import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/
 
 const snackbar = useSnackbar();



async function Auth(){
  let login = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  let response = await fetch('http://localhost:3000/login?email=' + login + '&password=' + password, {
  method: 'POST'
});

let result = await response.json();

  // console.log(result.status);
  if (result.status == 'authYes') {
    // alert('Успешно ' + result.email);
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

  
</script>



<template>
    <body align='center'>
        <header>
		<h1>Авторизация</h1>
	</header>	
				
			<label>Логин</label>
			<input type ="login" id="userName" name="login" required>
			<br><br>

			<label>Пароль</label>
			<input type="password" id ="password" name="password" required>
			<br><br>

<teleport to="body">
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</teleport>
		
      <Button id="buttonFiltrQuery"
        @click="Auth" 
        :variant="'success'" 
        >
        Войти в систему
      </Button>


 


</body>
</template>