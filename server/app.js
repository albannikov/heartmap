 const req = require('express/lib/request');
const http = require('http');
const url = require('url');
// 


    http.createServer(function(request, response){
// BD Connect -->
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "admin_heartmap",
    password: ""
})


conn.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.error('BD --- OK');
    }
});

let query = "SELECT * FROM points";
conn.query(query, (err, result, field) => {
    // console.log(err); Ошибки если есть
     console.log(result); //вывод всего запроса     
     
    //console.log(result[1]['DATE']);
    // console.log(fields);
});

conn.end (function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.error('BD --- CLOSED');
    }
});
// homepage (req, res);
          response.end();
         
    }).listen(3000);
    

// function homepage (req, res) {
//     res.end("homepage");
// }





