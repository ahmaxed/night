'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  var _req$body = req.body,
      identifier = _req$body.identifier,
      password = _req$body.password;


  return _users2.default.find({
    $or: [{ username: identifier }, { email: identifier }]
  }).then(function (user) {

    if (user.length > 0) {
      if (_bcrypt2.default.compareSync(password, user[0].pass_digest)) {
        var token = _jsonwebtoken2.default.sign({
          id: user[0]._id,
          username: user[0].username,
          lastSearch: user[0].lastSearch
        }, process.env.JWT_SECRET);
        res.json({ token: token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

exports.default = router;