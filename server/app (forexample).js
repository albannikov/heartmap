const req = require('express/lib/request');
const http = require('http');
const https = require('https');
const url = require('url');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// var corsOptions = { 
//   origin: "http://xn--80ajpgfvob8ef.xn--p1ai"   // Разрешаем запросы от сюда
// };
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://xn--80ajpgfvob8ef.xn--p1ai');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const mysql = require('mysql');

//Параметры БД -->
const conn = mysql.createConnection({
    host: "localhost",
    user: "admin",
    database: "bd_name",
    password: "pass"
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
 
/*
* Роутер для тартовой страницы
* по умолчанию выводим последние 20 записей
*/
app.get("/", (req, res) => {
  console.error("получили гет");
  let query = "SELECT * FROM points ORDER BY DATE DESC LIMIT 20";
  conn.query(query, (err, result, field) => {
      res.json(result);
      res.end();
    }
 );
});

/*
* Роутер для фильтра по дате и типу
*/
app.get("/query", function(request, res){
    let tipe = request.query.tipe;          //тип инцидента
    let dateFrom = request.query.dateFrom;  //Дата От
    let dateTo = request.query.dateTo;      //Дата До
    let sql = "";

    if (tipe == 'all') {
      sql = "SELECT * FROM points WHERE DATE BETWEEN'" + dateFrom + "' AND '" + dateTo + "' ORDER BY DATE DESC"; //Формируем строку запроса
    }
    else {
      sql = "SELECT * FROM points WHERE TIPE = '" + tipe + "' AND DATE BETWEEN'" + dateFrom + "' AND '" + dateTo + "' ORDER BY DATE DESC"; //Формируем строку запроса
    };            
    conn.query(sql, (err, result, field) => { 
    res.json(result); // Взвращаем ответ
    res.end();
});
});

/*
* Роутер для добавления в БД
*/
app.get("/ins", function(request, res){
  let tipe = request.query.tipe;            //тип инцидента
  let number = request.query.number;        //Номер инцидента
  let date = request.query.date;            //Дата инцидента
  let width = request.query.width;          //Широта
  let long = request.query.long;            //Долгота
  let alt = request.query.alt;              //Описание 
  let sql = "";                             //Сначала объявим переменную, только потом наполним, иначе не работает
  sql = "INSERT INTO points (TIPE, INCIDENT, DATE, LOCATION_WIDTH, LOCATION_LONG, DESCRIPTION) VALUES ('" + tipe + "','" + number + "','" + date + "','" + width + "','" + long + "','" + alt + "')"; //Формируем строку запроса           
  conn.query(sql, (err, result, field) => {
  res.json(result); // Взвращаем ответ
  res.end();
});
});

/*
* Роутер для удаления записей
*/
app.get("/del", function(request, res){
  let id = request.query.id;             
  let sql = "";  
  sql = "DELETE FROM points WHERE id = " + id; //Формируем строку запроса

  conn.query(sql, (err, result, field) => {
    res.json(result); // Взвращаем ответ
    res.end();
  });
});

/*
* Роутер для получения данных о всех пользователя
* Нужен для аутентификации
*/
app.get("/users", (req, res) => {  
let query = "SELECT * FROM users";
conn.query(query, (err, result, field) => {
  res.json(result);
});
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

