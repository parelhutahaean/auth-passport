var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var util = require('../helpers/util.js');
var passport = require('passport');
var passwordHash = require('password-hash');
var Strategy = require('passport-local').Strategy;
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World Yes');
});

passport.use(new Strategy(
  function(username, password, done) {
    console.log(username);
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, { message: 'Incorrect username.' });
      }
      if (passwordHash.verify(password, user.password) == false) {
        return done(null, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.post('/api/users', util.isValidAdmin, userController.createUser);
router.get('/api/users', util.isValidAdmin, userController.getAllUsers);
router.get('/api/users/:id', util.isValidUserOrAdmin, userController.getOneUser);
router.put('/api/users/:id', util.isValidAdmin, userController.updateUser);
router.delete('/api/users/:id', util.isValidAdmin, userController.deleteUser);
router.post('/signup', userController.signUp);
router.post('/signin', passport.authenticate('local', {session: false}), userController.signIn);
/*passport.authenticate('local', {session: false}),*/

module.exports = router;
