 const req = require('express/lib/request');
const http = require('http');
const url = require('url');
// 

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4000"
};
 app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "admin_heartmap",
    password: ""
});

conn.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
 conn.query("SET SESSION wait_timeout = 604800"); // Чтобы не ложилось соединение поставим таймаут
 



 
app.get("/", (req, res) => {
let query = "SELECT * FROM points";
conn.query(query, (err, result, field) => {
    //console.log("возвращаем - " + result);
    res.json(result);
});
  
// Обработчик запросов
app.get("/query", function(request, res){
    //   if (err) {
    //       return res.status(400).json({error: err.message})
    //   };
    let tipe = request.query.tipe;          //тип инцидента
    let dateFrom = request.query.dateFrom;  //Дата От
    let dateTo = request.query.dateTo;      //Дата До
    let sql = "SELECT * FROM points WHERE TIPE = '" + tipe + "' AND DATE BETWEEN'" + dateFrom + "' AND '" + dateTo + "'"; //Формируем строку запроса
    console.log("Пришел запрос на бэк");
    console.log("Выполняем такой запрос:");
    console.log(sql);
      // Коннектимся -->
conn.query(sql, (err, result, field) => {
    console.log("возвращаем - " + result);
    res.json(result); // Взвращаем ответ
});
// result = [{"id":1,"TIPE":"Snow","DATE":"10.05.2022","LOCATION_WIDTH":62.13134,"LOCATION_LONG":77.457443,"DESCRIPTION":"5 мкр"},{"id":3,"TIPE":"Snow","DATE":"12.05.2022","LOCATION_WIDTH":62.13134,"LOCATION_LONG":77.45744,"DESCRIPTION":"Гора снега в 6 мкр"},{"id":6,"TIPE":"Snow","DATE":"15.05.2022","LOCATION_WIDTH":62.127172,"LOCATION_LONG":77.452864,"DESCRIPTION":"Центр5"},{"id":8,"TIPE":"Snow","DATE":"17.05.2022","LOCATION_WIDTH":62.127172,"LOCATION_LONG":77.452864,"DESCRIPTION":"Центр5"}];
// res.json(result); // Взвращаем ответ
});


});

//тестовый, потом уберу
app.get("/snow", (req, res) => {
    // BD Connect -->
let query = "SELECT * FROM points WHERE TIPE = 'snow'";
conn.query(query, (err, result, field) => {
    res.json(result);
});
  
});


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

