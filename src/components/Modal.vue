<script setup >
/*
* Получаем широту и долготу из координат
*/
// function getCoords() {
//   let coords = document.getElementById("coordinates").value.split( "," ); // Получили координаты точки
//   let width = coords[0]; 
//   let long = coords[1]; 
//   let tipe = document.getElementById("tipes-add").value; // Получили категорию
//   let incNumber = document.getElementById("incNumber").value; // Получили номер инцидента

// }
  

async function insertPoint() {
  let coords = document.getElementById("coordinates").value.split( "," ); // Получили координаты точки
  let width = coords[0]; 
  let long = coords[1]; 
  let tipe = document.getElementById("tipes-add").value; // Получили категорию
  let incNumber = document.getElementById("incNumber").value; // Получили номер инцидента
    
    let queryParams = "http://localhost:8081/ins?tipe=" + tipe + "&number=" + incNumber + "&date=" + DateAdd + "&width=" + width + "&long=" + long + "&alt=TEST";
                    // http://localhost:8081/ins?tipe=Snow&number=123&date=2022-08-09&width=62.131244&long=77.462228&alt=test
            
    const response = await fetch(queryParams);      
    const data = await response.json();
    
  }


  
  





</script>

<script>
 export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
    
  };



/*
* для ДатаПикера используем библиотеку daterangepicker.com
* -BEGIN- Получаем значение из Datepicker
*/

$(function() { 
  $('input[name="datefilter-add-point"]').daterangepicker({
       singleDatePicker: true,
       "drops": "up",
       "showDropdowns": true,
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

  $('input[name="datefilter-add-point"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY'));
       window.DateAdd = picker.startDate.format('YYYY-MM-DD'); 
  });

  $('input[name="datefilter-add-point"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

});
// -END- Получаем значение из Datepicker



</script>
<template>

  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Добавление записи о новом инциденте

            <button
              type="button"
              class="btn-close-window"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">

 <div class="container">
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Пожалуйста,</strong> увеличьте карту до масштаба, позволяющего точно нанести координаты добавляемой геолокации
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
</div>

 <div class="container">   
    <div id="map" style="width: 100%; height: 470px;"></div>
 </div>

<input id="coordinates" class="coordinates">

  <div class="container">
  <div class="row add-form align-items-end">
    <div class="col-sm-3">
       <div class="hint-add">Категория</div>
      <select name="tipes-add" id="tipes-add" class="tipes-add">
            <option value="Snow">Снег</option>
            <option value="Trash">Мусор</option>          
      </select>
    </div>
    <div class="col-sm-3">
      <div class="hint-add">Дата</div>
      <input type="text" name="datefilter-add-point" class="datefilter-add-point" value="" />
    </div>
    <div class="col-sm-3">
      <div class="hint-add">Номер инцидента</div>
      <input id="incNumber" class="incNumber">
    </div>
    <div class="col-sm-3 d-grid">
         <!-- <button type="button" class="btn btn-primary btn-lg">Добавить запись</button> -->
         <button id="getCoords" @click="insertPoint" class="btn btn-primary">Добавить запись</button>


    </div>
  </div>
  </div>


<!-- <iframe src="./src/components/coordinates.html" width="468" height="60" align="left">
    Ваш браузер не поддерживает плавающие фреймы!
 </iframe> -->

          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <!-- I'm the default footer! -->
<!-- 
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Закрыть без сохранения
            </button> -->
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #0f5132;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close-window {
    border: none;
    /* font-size: 20px; */
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #0f5132;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>