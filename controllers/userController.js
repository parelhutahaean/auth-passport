const User = require('../models/user.js');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');


let methods = {}

methods.createUser = function(req,res,next) {
  User.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    role: req.body.role
  })
  .then(function(data) {
    res.json(data);
  })
}

methods.getAllUsers = function(req,res,next) {
  User.find()
  .then(function(data) {
    res.json(data);
  })
}

methods.getOneUser = function(req,res,next) {
  User.findById(req.params.id)
  .then(function(data) {
    res.json(data);
  })
}

methods.updateUser = function(req,res,next) {
  User.findById(req.params.id)
  .then(function(data) {
    data.username = req.body.username || data.username; // username change must be followed by password change
    data.password = passwordHash.generate(req.body.password) || data.password;
    data.role = req.body.role || data.role;
    data.save()
    .then(data_ => {
      res.json(data_);
    })
  })
}

methods.deleteUser = function(req,res,next) {
  User.findById(req.params.id)
  .then(function(data) {
    res.json(data);
    data.remove();
  })
}

methods.signUp = function(req,res,next) {
  User.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    role: 'user'
  })
  .then(function(data) {
    res.json(data)
  })
}

methods.signIn = (req,res,next) => {
  var object = req.user;
  if (object.hasOwnProperty('message')) {
    res.send(message);
  } else {
    var token = jwt.sign({
      username : object.username,
      role : object.role
    }, 'secret', {
      expiresIn : '3h'
    })
    res.send(token);
  }
}

module.exports = methods;
