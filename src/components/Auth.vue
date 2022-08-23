<script setup>
 import Button from './Button.vue';
</script>

<script>

async function Auth(){
  let login = document.getElementById("userName").value;
  console.log(login);
  let password = document.getElementById("password").value;
  console.log(password);

    let queryParams = "http://localhost:3000/login?email=test@mail.ru&password=123";
    const response = await fetch(queryParams);      
    const data = await response.json();



      
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


		
      <Button id="buttonFiltrQuery"
        @click="Auth" 
        :variant="'success'" 
        >
        Войти в систему
      </Button>


 


</body>
</template>