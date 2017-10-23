import express from 'express';
import authenticate from '../middlewares/authenticate';
import userModel from '../models/users';
import barModel from '../models/bars';
import axios from 'axios';

let router = express.Router();

router.put('/addUser',authenticate,(req,res) => {
  let {yelpId, userId} = req.body;
  console.log(yelpId);

  barModel.findOne({"yelpId":yelpId}, "yelpId", function (err, bar) {
    if (err)
      console.log("error: "+err);
    else {
      if(bar === null){
        var newBar = new barModel ({
          //undefined item in array
          users:[userId],
          yelpId: yelpId
        });
        newBar.save( function(err, bar){
          if (err) {
            res.status(500).json({ error: err });
          }else{
            console.log("newbar " + bar);
            res.json(bar);
          }
        });
      }else{
        console.log(bar);
        bar.users.push(userId);
        bar.save(function(err, bar){
          if (err) {
            res.status(500).json({ error: err });
          }else{
            console.log("Oldbar " + bar);
            res.json(bar);
          }
        });
      }
    }
  })
});

/*router.put('/deleteUser',authenticate,(req,res) => {
  let {yelpId, _id} = req.body;
  console.log(yelpId);

  barModel.findOne({"yelpId":yelpId}, "yelpId", function (err, bar) {
    if (err)
      console.log("error: "+err);
    else {
      bar.users.push(_id);
      bar.save(function(err, bar){
        if (err) {
          res.status(500).json({ error: err });
        }else{
          console.log("Oldbar " + bar);
          res.json(bar);
        }
      });
    });
});*/

router.put('/lastSearch',authenticate,(req,res) => {
  let {lastSearch, _id} = req.body;
  userModel.findOneAndUpdate({_id:_id},
    {$set:{"lastSearch": lastSearch}}, {new: true},
      function(err, data){
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
        axios.get('https://api.yelp.com/v3/businesses/search', config)
          .then(response => {
            res.json(response.data.businesses);
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      }
  });
});





export default router;
