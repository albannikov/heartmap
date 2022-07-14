
 const req = require('express/lib/request');
 const http = require('http');
 const url = require('url');
// 
 
// BD Connect -->
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "admin_heartmap",
    password: ""
})

async function main () {
let query = "SELECT * FROM points";
conn.query(query, (err, result, field) => {
    // console.log(err); Ошибки если есть
    console.log(result); //вывод всего запроса 
    // result.json(result);
    //console.log(result[1]['DATE']);
 conn.end();
 return result;
})
}

async function f() {
    let a = await main();
    console.log(a);    
}

f();
