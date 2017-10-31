'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var authorizationHeader = req.headers['authorization'];
  var token = void 0;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        _users2.default.find({ _id: decoded.id }, 'email timezone username').then(function (user) {
          if (!user) {
            res.status(404).json({ error: 'No such user' });
          } else {
            req.currentUser = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
};