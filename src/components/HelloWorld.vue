<script setup>
  import { ref, reactive, onMounted } from 'vue';

  // Components
  import Button from './Button.vue';
  import Modal  from './Modal.vue';

  // Props
  const props = defineProps({
    msg: String
  });

  // Data
  const settings = {
    // apiKey: '',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1',
  };

  const coords = ref([
    54.82896654088406,
    39.831893822753904
  ]);
  const count = ref(0);
  const name = ref("");
  const posts = ref([]);
  const loading = ref(false);
  const modalState = reactive({
    loading: false,
    isVisible: false,
  })

  // const db = await fetch('./server');

  window.coordinates = [];


 

  // Methods
  /**
   * Get server data
   */
  async function getData() {
    // coordinates = [];
    loading.value = true;
    const repsponse = await fetch('http://localhost:8081/');
    const data = await repsponse.json();
    console.log(data);
    posts.value = data;
    // coordinates = "[";
    // let data = [62.134265, 77.458448];
    coordinates = [];
    
    for (let i = 0; i < data.length; 	i++) {    
      coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
    }  

    console.log("Отправляем с HelloWorld " + coordinates);
      setTimeout(() => {
        loading.value = false;
      }, 300);
  }

  /**
   * 
   */
  const toggleModal = () =>  {
    modalState.isVisible = !modalState.isVisible;
  }

  /**
   * 
   */
  const showModal = () =>  {
    modalState.isVisible = true;
  }

  /**
   * 
   */
  const closeModal = () => {
    modalState.isVisible = false;
  }

  const onMapClick = (e) => {
    if (e.originalEvent) {
      coords.value = e.get('coords');
    }
  };
  /**
   * 
   */
  function onClick() {
    console.log("Click");
  }

  onMounted(async () => {
    // await getData();
  });
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->

  <header class="d-flex flex-wrap justify-content-center py-3 border-bottom header">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <img src = "logo.png" width="250px" >
      
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
        variant="success" 
        :disabled="loading"
      >
        Get data
      </Button>

      <Button id="buttonFiltr"
        variant="success" 
        :disabled="loading"
        @click="showModal"
      >
        Добавить точку
      </Button>

      <Modal
        v-show="modalState.isVisible"
        @close="closeModal"
      />
    </div>

    <div class="col-10 hero-unit">      
      <div class="container">
        <yandex-map 
          :coords="coords" 
          :settings="settings" 
          :zoom="13"
          @click="(e) => onMapClick(e)"
        >
          <ymap-marker 
            marker-id="123" 
            :coords="coords"
            hint-content="some hint"
          ></ymap-marker>
        </yandex-map>
      <!-- <div id="YMapsID"></div>   -->

        <div v-if="loading"> 
          <br>
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
        <div v-else>
          <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
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


    </section>
    <!-- Section: Social media -->

    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
    

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
          
          <img src = "bear.png" width="150px" >
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
.ymap-container {
  height: 600px;
}
a {
  color: #42b983;
}
</style>
