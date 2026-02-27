<script setup>
 import router from '../router.js'
/* Функция разлогинивания */
async function AuthExit(){
  let response = await fetch('http://localhost:3000/logout', {  
  credentials: "include"
});
  let result = await response.json();
if (result == 0) {    
  router.push('login');
} 
}
</script>

<template>
        <header class="d-flex flex-wrap justify-content-center py-3 border-bottom header">      
        <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <div class="logo"></div>     
        </a>      

            <button class="btn-exit action-map-panel btn btn-light btn-rounded" @click="AuthExit"><i class="fa-solid fa-power-off" style="color: #003899;"></i> Выход</button>       
 

    </header>   
</template>