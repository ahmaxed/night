'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _bars = require('../models/bars');

var _bars2 = _interopRequireDefault(_bars);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//add user to bar in DB, create new barModel if bar doesn't exist in DB yet
router.put('/addUser', _authenticate2.default, function (req, res) {
  var _req$body = req.body,
      yelpId = _req$body.yelpId,
      userId = _req$body.userId;


  _bars2.default.findOne({ "yelpId": yelpId }, function (err, bar) {
    if (err) es.status(500).json({ error: err });else {
      if (bar === null) {
        var newBar = new _bars2.default({
          users: [userId],
          yelpId: yelpId
        });
        newBar.save(function (err, bar) {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            res.json(bar);
          }
        });
      } else {
        // should check if already does not exist first
        bar.users.push(userId);
        bar.save(function (err, bar) {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            res.json(bar);
          }
        });
      }
    }
  });
});

//remove user from bar, and remove bar from DB if no user exist
router.put('/removeUser', _authenticate2.default, function (req, res) {
  var _req$body2 = req.body,
      yelpId = _req$body2.yelpId,
      userId = _req$body2.userId;


  _bars2.default.findOne({ "yelpId": yelpId }, function (err, bar) {
    if (err) res.status(500).json({ error: err });else if (bar) {
      var updated = (0, _lodash.without)(bar.users, userId);
      bar.users = (0, _lodash.without)(bar.users, userId);
      bar.save(function (err, bar) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.json(bar);
        }
      });
    } else {
      res.status(500).json({ error: "user non existance" });
    }
  });
});

router.put('/lastSearch', function (req, res) {
  var _req$body3 = req.body,
      lastSearch = _req$body3.lastSearch,
      _id = _req$body3._id;


  _users2.default.findOneAndUpdate({ _id: _id }, { $set: { "lastSearch": lastSearch } }, { new: true }, function (err, data) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      var config = {
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        },
        params: {
          location: lastSearch,
          term: "bars"
        }
      };

      _axios2.default.get('https://api.yelp.com/v3/businesses/search', config).then(function (response) {
        var barsInDB = {};
        var responsesChecked = 0;

        response.data.businesses.forEach(function (business) {
          _bars2.default.findOne({ 'yelpId': business.id }).then(function (bar) {
            if (bar) {
              barsInDB[business.id] = bar;
            } else {
              barsInDB[business.id] = { yelpId: business.id, users: [] };
            }

            responsesChecked++;

            if (responsesChecked === response.data.businesses.length) {
              res.json([response.data.businesses, barsInDB]);
            }
          });
        });
      }).catch(function (err) {
        res.status(500).json({ error: err });
      });
    }
  });
});

exports.default = router;