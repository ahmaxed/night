import express from 'express';
import authenticate from '../middlewares/authenticate';
import userModel from '../models/users';
import barModel from '../models/bars';
import axios from 'axios';
import { without } from 'lodash';

let router = express.Router();

router.put('/addUser',authenticate,(req,res) => {
  let {yelpId, userId} = req.body;

  barModel.findOne({"yelpId":yelpId}, function (err, bar) {
    if (err)
      es.status(500).json({ error: err });
    else {
      if(bar === null){
        var newBar = new barModel ({
          users:[userId],
          yelpId: yelpId
        });
        newBar.save( function(err, bar){
          if (err) {
            res.status(500).json({ error: err });
          }else{
            res.json(bar);
          }
        });
      }else{
        // should check if already does not exist first
        bar.users.push(userId);
        bar.save(function(err, bar){
          if (err) {
            res.status(500).json({ error: err });
          }else{
            res.json(bar);
          }
        });
      }
    }
  })
});

// remove bar if no user exist
router.put('/removeUser',authenticate,(req,res) => {
  let {yelpId, userId} = req.body;
  barModel.findOne({"yelpId":yelpId}, function (err, bar) {
    if (err)
      res.status(500).json({ error: err });
    else if (bar){
      var updated = without(bar.users, userId);
      bar.users = without(bar.users, userId);
      bar.save(function(err, bar){
        if (err) {
          res.status(500).json({ error: err });
        }else{
          res.json(bar);
        }
      });
    }else{
      res.status(500).json({ error: "user non existance" });
    }
  });
});

router.put('/lastSearch',(req,res) => {
  let {lastSearch, _id} = req.body;

  userModel.findOneAndUpdate({_id:_id}, {$set:{"lastSearch": lastSearch}}, {new: true}, function(err, data){
    if(err){
      res.status(400).json({ error: err });
    }else{
      var config = {
        headers: {
          'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
        },
        params:{
          location: lastSearch,
          term: "bars"
        },
      };

      axios.get('https://api.yelp.com/v3/businesses/search', config).then(response => {
        var barsInDB = {};
        var responsesChecked = 0;

        response.data.businesses.forEach(business => {
          barModel.findOne({ 'yelpId' : business.id }).then(bar => {
          	if(bar) {
              barsInDB[business.id] = bar;
            }else{
              barsInDB[business.id] = {yelpId: business.id, users: []}
            }

            responsesChecked++;

            if (responsesChecked === response.data.businesses.length) {
              res.json([response.data.businesses, barsInDB]);
            }
          });
        });
      }).catch(err => {
        res.status(500).json({ error: err });

      });
    }
  });
});


export default router;
