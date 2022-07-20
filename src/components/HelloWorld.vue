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
   
   coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
  // $coordinates [] = [(float)$row["LOCATION_WIDTH"], (float)$row["LOCATION_LONG"]]; // наполняем многомерный массив   
  
}  
// coordinates += "]";
// coordinates = coordinates.slice(0, -2) + ']';

console.log("Отправляем с HelloWorld " + coordinates);
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

    <header class="d-flex flex-wrap justify-content-center py-3 border-bottom header">
      <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src = "logo.png" width="50px" >
        <span class="fs-4">АИС "Тепловая карта"</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
      </ul>
    </header>
    
    <div class="row main-block">


      <div class="col-2 left-menu">
        
 <Button id="buttonFiltr"
    @click="getData" 
    :variant="'success'" 
    :disabled="loading"
  >
    Get data
  </Button>



  
      </div>


      <div class="col-10 hero-unit">      
      <div class="container">   
        <div id="YMapsID"></div>  

  
 

  

  <div v-if="loading"> 
    <br><div class="spinner-border text-primary" role="status">
  <span class="sr-only"></span>
</div>
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



  <!-- Footer -->
<footer class="text-center text-lg-start bg-light text-muted">
  <!-- Section: Social media -->
  <section
    class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <!-- Left -->
    <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <!-- Left -->

    <!-- Right -->
    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->

  <!-- Section: Links  -->
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Company name
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" class="text-reset">Angular</a>
          </p>
          <p>
            <a href="#!" class="text-reset">React</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Vue</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Laravel</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            info@example.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  <!-- Copyright -->
</footer>
<!-- Footer -->


</template>

<style scoped>
a {
  color: #42b983;
}
</style>
