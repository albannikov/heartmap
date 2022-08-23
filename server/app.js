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
// let query = "SELECT * FROM points ORDER BY DATE DESC";
let query = "SELECT * FROM points ORDER BY DATE DESC LIMIT 20";

conn.query(query, (err, result, field) => {
    //console.log("возвращаем - " + result);
    res.json(result);
    res.end();
});
  
// Обработчик запросов
app.get("/query", function(request, res){
    let tipe = request.query.tipe;          //тип инцидента
    let dateFrom = request.query.dateFrom;  //Дата От
    let dateTo = request.query.dateTo;      //Дата До
    
    console.log ("ТИП =====" + tipe);
    let sql = "";
    if (tipe == 'all') {
      sql = "SELECT * FROM points WHERE DATE BETWEEN'" + dateFrom + "' AND '" + dateTo + "' ORDER BY DATE DESC"; //Формируем строку запроса
    }
    else {
      sql = "SELECT * FROM points WHERE TIPE = '" + tipe + "' AND DATE BETWEEN'" + dateFrom + "' AND '" + dateTo + "' ORDER BY DATE DESC"; //Формируем строку запроса
    };
    
    console.log("Пришел запрос на бэк");
    console.log("Выполняем такой запрос:");
    console.log(sql);
      // Коннектимся -->
conn.query(sql, (err, result, field) => {
    console.log("возвращаем - " + result);
    res.json(result); // Взвращаем ответ
    res.end();
});
});

// Обработчик запросов
app.get("/ins", function(request, res){
  let tipe = request.query.tipe;            //тип инцидента
  let number = request.query.number;        //Номер инцидента
  let date = request.query.date;            //Дата инцидента
  let width = request.query.width;          //Широта
  let long = request.query.long;            //Долгота
  let alt = request.query.alt;              //Описание
 
  let sql = "";  
    sql = "INSERT INTO points (TIPE, INCIDENT, DATE, LOCATION_WIDTH, LOCATION_LONG, DESCRIPTION) VALUES ('" + tipe + "','" + number + "','" + date + "','" + width + "','" + long + "','" + alt + "')"; //Формируем строку запроса
           
// Коннектимся -->
conn.query(sql, (err, result, field) => {
  console.log("возвращаем - " + result);
  res.json(result); // Взвращаем ответ
  res.end();
});
});


app.get("/del", function(request, res){
  let id = request.query.id;            //тип инцидента 
  let sql = "";  
    sql = "DELETE FROM points WHERE id = " + id; //Формируем строку запроса
        console.log('Вот такой вот запрос - ' + sql);   
// Коннектимся -->
conn.query(sql, (err, result, field) => {
  console.log("возвращаем - " + result);
  res.json(result); // Взвращаем ответ
  res.end();
});
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

