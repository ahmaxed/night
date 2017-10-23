import express from 'express';
import authenticate from '../middlewares/authenticate';
import userModel from '../models/users';
import barModel from '../models/bars';
import axios from 'axios';

let router = express.Router();

router.put('/lastSearch',authenticate,(req,res) => {
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
        var barsWithAttendees = {};
        var businessesSearched = 0;

        response.data.businesses.forEach(business => {          
          barModel.findOne({ 'barId' : business.id }).then(bar => {
          	if(bar) {
              barsWithAttendees[business.id] = bar;
            }

            businessesSearched++;

            if (businessesSearched === response.data.businesses.length) { 
              res.json([response.data.businesses, barsWithAttendees]);
            }
          });
        });
      }).catch(err => {
        console.log('error');
        res.status(500).json({ error: err });

      }); //end axios.get.catch
    } //end if/else
  }); //end userModel.find
}); //end router.put


export default router;