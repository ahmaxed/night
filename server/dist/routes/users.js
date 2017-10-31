'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../shared/validations/signup');

var _signup2 = _interopRequireDefault(_signup);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function validateInput(data, otherValidations) {
  var _otherValidations = otherValidations(data),
      errors = _otherValidations.errors;

  return _users2.default.find({
    $or: [{ username: data.username }, { email: data.email }]
  }).then(function (user) {
    if (user.length) {
      if (user[0].username === data.username) {
        errors.username = 'Username has been taken';
      }
      if (user[0].email === data.email) {
        errors.email = 'Email is already registered';
      }
    }
    return {
      errors: errors,
      isValid: (0, _isEmpty2.default)(errors)
    };
  });
}

router.get('/:identifier', function (req, res) {
  return _users2.default.find({
    $or: [{ username: req.params.identifier }, { email: req.params.identifier }]
  }).then(function (user) {
    res.json({ user: user });
  });
});

router.post('/', function (req, res) {
  validateInput(req.body, _signup2.default).then(function (_ref) {
    var errors = _ref.errors,
        isValid = _ref.isValid;

    if (isValid) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password,
          timezone = _req$body.timezone,
          email = _req$body.email;

      var pass_diest = _bcrypt2.default.hashSync(password, 10);

      var newUser = new _users2.default({
        username: username,
        email: email,
        timezone: timezone,
        pass_digest: pass_diest
      });

      newUser.save(function (err) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.json({ success: true });
        }
      });
    } else {
      res.status(400).json(errors);
    }
  });
});

exports.default = router;