<script setup>

import { fetchNewData } from '/Develop/heartmap-v2-4/yaheartmap';
  import { ref, reactive, onMounted } from 'vue';
  import Button from './Button.vue';
  import Modal  from './Modal.vue';
 import { useSnackbar } from "vue3-snackbar"; //Библиотека уведомлений, взял тут: https://craigrileyuk.github.io/vue3-snackbar/
 import VueTableLite from 'vue3-table-lite' //Библиотека таблицы, взял тут:  https://linmasahiro.github.io/vue3-table-lite/dist/#include




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

  
  const count = ref(0);
  const name = ref("");
  const posts = ref([]);
  const loading = ref(false);
  const modalState = reactive({
    loading: false,
    isVisible: false,
  })

 

  window.coordinates = [];

  // Methods
  /**
   * Get server data
   * 
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
      }, 50);
  }

  //   async function getSnow() {

  //   loading.value = true;
  //   const repsponse = await fetch('http://localhost:8081/snow');
  //   const data = await repsponse.json();
  //   posts.value = data;
  //   coordinates = [];
    
  //   for (let i = 0; i < data.length; 	i++) {    
  //     coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
  //   }  

  //   console.log("Отправляем с HelloWorld " + coordinates);
  //     setTimeout(() => {
  //       loading.value = false;
  //     }, 50);
      
  // }

window.DatePickerState = 0;

      async function getQuery() {
        if (DatePickerState == 0) {           
            snackbar.add({
            "type": "warning",
            "title": "Ошибка",
            "text": "Укажите диапазон дат",
            "group": "5bfb7ed",
            "duration": 7000,
            "count": 1
          })
          return;
        } 

    loading.value = true;
    let queryParams = "http://localhost:8081/query?tipe=" + tipeEvent + "&dateFrom=" + DateStart + "&dateTo=" + DateEnd;
    const response = await fetch(queryParams);      
    const data = await response.json();

    posts.value = data;
    coordinates = [];

    for (let i = 0; i < data.length; 	i++) {    
      coordinates.push([data[i]['LOCATION_WIDTH'], data[i]['LOCATION_LONG']]);  
    }  

    console.log("Отправляем с HelloWorld " + coordinates);
      setTimeout(() => {
        loading.value = false;
      }, 500);
      
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
  async function closeModal() {
      await getData();
    modalState.isVisible = false;
  
  }

  /**
   * 
   */
  function onClick() {
    console.log("Click");
  }


  onMounted(async () => {
    await getData();
  });
const snackbar = useSnackbar();


async function delPoint(clicked_id) {
   console.log(clicked_id); //пол
 
    let queryParams = "http://localhost:8081/del?id=" + clicked_id;
            
    const response = await fetch(queryParams);      
    const data = await response.json();
    if (data.affectedRows == 1) {
      snackbar.add({
            "type": "success",
            "title": "Успешно",
            "text": "запись успешно удалена",
            "group": "5bfb7ed",
            "duration": 7000,
            "count": 1
          }) 
    }   
    
    //
    
  }

</script>

<script type="text/javascript">




export default {
    methods: {    
/*
* Метод для форматирования даты, которую получаю из базы и вывожу в таблицу,
* взял от сюда https://jerickson.net/how-to-format-dates-in-vue-3/
*/

        formatDate(dateString) {      
            const date = new Date(dateString);
                // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
        }
    }
}


/*
* для ДатаПикера используем библиотеку daterangepicker.com
* -BEGIN- Получаем значение из Datepicker
*/

$(function() { 
// [moment(), moment()]
  $('input[name="datefilter"]').daterangepicker({
       "showDropdowns": true,
          ranges: {
        'Сегодня': [moment(), moment()],
        'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '7 дней': [moment().subtract(6, 'days'), moment()],
        '30 дней': [moment().subtract(29, 'days'), moment()],
        'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
        'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
         "alwaysShowCalendars": true,
      autoUpdateInput: false,
      locale: {
          "format": "DD.MM.YYYY",
        "separator": " - ",
        "applyLabel": "Выбрать",
        "cancelLabel": "Отмена",
        "fromLabel": "от",
        "toLabel": "до",
        "customRangeLabel": "Вручную",
        "weekLabel": "н",
        "daysOfWeek": [
            "ВС",
            "ПН",
            "ВТ",
            "СР",
            "ЧТ",
            "ПТ",
            "СБ"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
           "firstDay": 1
      }
  });

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));
      window.DateStart = picker.startDate.format('YYYY-MM-DD');
      window.DateEnd = picker.endDate.format('YYYY-MM-DD');
      DatePickerState = 1; // Ставим флаг, что значение получено
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

});
// -END- Получаем значение из Datepicker

// -BEGIN- Получаем значение из Select
window.tipeEvent = "all"; //По умолчанию (до выбора) пусть выбирается всё
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("tipes").onchange = function() {
    tipeEvent = document.getElementById("tipes").value;
  };
});
// -END- Получаем значение из Select









</script>

<template>


    <header class="d-flex flex-wrap justify-content-center py-3 border-bottom header">
      <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src = "logo.png" width="240px" >
        
      </a>

      <ul class="nav nav-pills">
        <!-- <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li> -->
        <li class="nav-item"><a href="#" class="nav-link">Профиль</a></li>
      </ul>
    </header>
    
    <div class="row main-block">


      <div class="col-2 left-menu">

<!--      
 <Button id="buttonFiltrSnow"
    @click="getSnow" 
    :variant="'success'" 
    :disabled="loading"
  >
    Get snow
  </Button> -->

<teleport to="body">
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</teleport>


 <div id="app">  

    <Modal
      v-show="modalState.isVisible"
      @close="closeModal"
    />
  </div>

<div class="container">
 <div class="row">
  <div class="hint">Период</div>

<input type="text" name="datefilter" class="datefilter" value="" />


<!-- BEGIN Выбор типа инцидента -->
<div class="hint">Категория</div>
<select name="tipes" id="tipes" class="tipes">
            <option value="all">Все</option>
            <option value="Snow">Снег</option>
            <option value="Trash">Мусор</option>          
</select>
<!-- END Выбор типа инцидента -->



<Button id="buttonFiltrQuery"
    @click="getQuery" 
    :variant="'success'" 
    :disabled="loading"
  >
 Фильтр
  </Button>

      <Button      
      @click="showModal"
      :variant="'warning'"
    >
     <i class="fa fa-plus" aria-hidden="true"></i> Добавить
    </button>
</div>





<p id="demo"></p>


</div>

      </div>


      <div class="col-10 hero-unit ">   
      <div class="container">

     
        <div id="YMapsID"></div>  


                  


  <div v-if="loading"> 
    <br><div class="spinner-border text-primary" role="status">
      
  <span class="sr-only"></span>
</div>
  </div>
  <div v-else>

<table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead>
        <tr>
           <th> </th>
           <th>Дата</th>
           <th>Номер</th>
           <th width="50%">Описание</th>
           <th> </th>
        </tr>
      </thead>            
      <tbody>
         <tr v-for="post in posts" :key="post.id">          
          <td v-bind:class="post.TIPE"><img v-bind:src="'/src/assets/' + post.TIPE + '.png'" width="20"></td>   <!-- Соответствующая иконка  -->
          <td> {{ formatDate(post.DATE) }}</td>   
          <td>{{ post.INCIDENT }}</td>      
          <td>{{ post.DESCRIPTION }}</td>
          <td width="20" > <button type="button" :id="post.id" @click="delPoint(post.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>  
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
    <!-- <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div> -->
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
          <!-- <h6 class="text-uppercase fw-bold mb-4">
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
          </p> -->
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
        
         <img src = "logo-footer.png" width="180px" >
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <!-- <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            info@example.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p> -->
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <!-- <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div> -->
  <!-- Copyright -->
</footer>
<!-- Footer -->




</template>

<style scoped>
a {
  color: #42b983;
}
</style>
