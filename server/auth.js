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
      maxAge: 1,
    },
    resave: false,
    saveUninitialized: false,
  })
);

require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());

// Создадим глобально пользователя, чтобы оперировать статусами из разных роутов
globalThis.currentUser = {
  username: null,
  status: 'authNone'
};

/*
* Роутер для аутентификации
*/
app.post('/login', (req, res, next) => { 
  passport.authenticate('local', function(err, user) {
    if (user) {                                       //Если все нормально
      currentUser.username = req.query.username;
      currentUser.status = 'authYes';   
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

/*
* Роутер для проверки статуса аутентификации
*/
app.get('/loginstatus', (req, res, next) => {   
       if (currentUser.username == null) {
        res.json(0);} else {
          res.json(req.session);          
        }
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

/*
* Роутер для логаута
*/
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      console.log(err);
    }
    req.session = null;
    currentUser.username = null;
    res.json(0);  
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));