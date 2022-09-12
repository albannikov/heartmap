const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require('cross-fetch');
// Or just: import 'cross-fetch/polyfill';

(async () => {
  try {
    const res = await fetch('http://localhost:8081/users');

    if (res.status >= 400) {
      throw new Error("Сервер не ответил");
    }
    const user = await res.json();

    console.log(user);
  } catch (err) {
    console.error(err);
  }
})();


const userDB = {
  id: 136345,
  username: '123',
  password: '123',
};

async function getUsers() {
const repsponse = await fetch('http://localhost:8081/users');
const data = await repsponse.json();
console.log (data);
};


globalThis.userID = '';
passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user);
  done(null, user.id);
  userID = user;

});

passport.deserializeUser(function(id, done) {
  console.log('Десериализация: ', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'username' }, function(
    username,
    password,
    done
  ) {
    if (username === userDB.username && password === userDB.password) {
      return done(null, userDB);
    } else {
      return done(null, false);
    }
  })
);