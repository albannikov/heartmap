const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const cors = require("cors"); 
const app = express();
var corsOptions = {
  origin: "http://localhost:4000" // разрешаем запросы с 4000 порта
};
 app.use(cors(corsOptions));



const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  // console.log(req.session);
  // console.log(session.passport.user);
  res.json(currentUser);

});
// window.email = '';

globalThis.currentUser = {
  email: null,
  status: 'authNone'
};




app.post('/login', (req, res, next) => {   

  passport.authenticate('local', function(err, user) {
    if (user) {                                       //Если все нормально
      currentUser.email = req.query.email;
      currentUser.status = 'authYes';   
      // console.log(isAuthenticated.status);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      currentUser.status = 'authNone';
      res.json(currentUser);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
       
      }
      res.json(currentUser);
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

app.get('/admin', auth, (req, res) => {
  res.send('Admin page!');
});

app.get('/logOut', (req, res) => {
  req.logOut;
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



// Passport также предоставляет возможность защитить доступ к маршруту, 
// доступ к которому необходимо ограничить для анонимных пользователей. 
/* Получение домашней страницы */
// app.get('/admin', isAuthenticated, function(req, res){
//   res.render('app.js', { user: req.user });
// });

// Так как любое связующее программное обеспечение базируется
// на вызовах next(), если пользователь аутентифицирован:
// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
//   console.log(isAuthenticated);
// }