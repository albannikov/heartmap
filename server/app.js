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
app.get("/", (req, res) => {
    // BD Connect -->
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "admin_heartmap",
    password: ""
})


let query = "SELECT * FROM points";
conn.query(query, (err, result, field) => {
    // console.log(err); Ошибки если есть
    //  console.log(result); //вывод всего запроса 
    //console.log(result[1]['DATE']);
    // let a = result[1]['DATE'];
    res.json(result);
    // console.log(fields);
});
  
});
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
// BD Connect -->
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "admin_heartmap",
    password: ""
})


let query = "SELECT * FROM points";
conn.query(query, (err, result, field) => {
    // console.log(err); Ошибки если есть
     console.log(result); //вывод всего запроса 
    //console.log(result[1]['DATE']);
    // console.log(fields);
});
*/