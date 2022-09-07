const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDB = {
  id: 136345,
  username: '123',
  password: '123',
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