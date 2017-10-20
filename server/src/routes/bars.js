import express from 'express';
import authenticate from '../middlewares/authenticate';
import userModel from '../models/users';

let router = express.Router();

router.put('/lastSearch',(req,res) => {
  let {lastSearch, _id} = req.body;
  console.log(req.body);
  userModel.findOneAndUpdate({_id:_id},
    {$set:{"lastSearch": lastSearch}}, {new: true},
      function(err, data){
      if(err){
          res.status(400).json({ error: err });
      }else{
        res.json(data);
      }
  });
});


export default router;
