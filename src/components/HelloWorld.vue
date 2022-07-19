<script setup>
import { ref, onMounted } from 'vue';
import Button from './Button.vue';


defineProps({
  msg: String
});
//
const count = ref(0);
const name = ref("");
const posts = ref([]);
const loading = ref(false);
// const db = await fetch('./server');

window.coordinates = [];

async function getData() {
  loading.value = true;
  const repsponse = await fetch('http://localhost:8081/');
  const data = await repsponse.json();
  console.log(data);
  posts.value = data;
  // coordinates = "[";
// let data = [62.134265, 77.458448];
for (let i = 0; i < data.length; 	i++) { 
  
   coordinates += [parseFloat(data[i]['LOCATION_WIDTH']), parseFloat(data[i]['LOCATION_LONG'])];  
  // $coordinates [] = [(float)$row["LOCATION_WIDTH"], (float)$row["LOCATION_LONG"]]; // наполняем многомерный массив   
}  
// coordinates += "]";
// coordinates = coordinates.slice(0, -2) + ']';

console.log("Отправляем с HelloWorld" + coordinates);
//  window.globalVar = "I am global";

  setTimeout(() => {
    loading.value = false;
  }, 500);
}


function onClick() {
  console.log("Click");
}

onMounted(async () => {
  await getData();
})


</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->


    <div class="row main-block">
      <div class="col-2 left-menu">
        Боковое меню
      </div>
      <div class="col-10 hero-unit">      
      <div class="container">   
        <div id="YMapsID"></div>  
<button class="btn btn-primary" id="buttonFiltr">Button</button>  
  
  <Button 
    @click="getData" 
    :variant="'success'" 
    :disabled="loading"
  >
    Get data
  </Button>

  

  <div v-if="loading"> 
    <h3>Загузка</h3>
  </div>
  <div v-else>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>Дата</th>
          <th>Тип</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.DATE }}</td>
          <td>{{ post.TIPE }}</td>
          <td>{{ post.DESCRIPTION }}</td>
        </tr>
<!-- DATE: "16.05.2022"
DESCRIPTION: "5 мкр"
LOCATION_LONG: 77.457443
LOCATION_WIDTH: 62.13134
TIPE: "Trash"
id: 1 -->
      </tbody>
    </table>
  </div>
  

</div>
</div>
</div>




</template>

<style scoped>
a {
  color: #42b983;
}
</style>
