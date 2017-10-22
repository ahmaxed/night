import express from 'express';
import authenticate from '../middlewares/authenticate';
import userModel from '../models/users';
import axios from 'axios';

let router = express.Router();

router.put('/lastSearch',authenticate,(req,res) => {
  let {lastSearch, _id} = req.body;
  let apiRes;
  console.log(lastSearch);
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
            console.log(response.data.businesses);
            apiRes = response.data.businesses;
            res.json(response.data.businesses);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
  });
});





export default router;
