import express from 'express';
import commonValidations from '../shared/validations/signup';
import UserModel from '../models/users';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data, otherValidations) {

 let { errors } = otherValidations(data);

 return UserModel.find({
  $or: [
   {username: data.username},
   {email: data.email}
  ]
 })
 .then(user => {
    if (user.length) {
     if (user[0].username === data.username) {
      errors.username = 'Username has been taken';
     }
     if (user[0].email === data.email) {
      errors.email = 'Email is already registered';
     }
    }
    return {
     errors,
     isValid: isEmpty(errors)
    }
 });
}

router.get('/:identifier', (req, res) => {
  return UserModel.find({
   $or: [
    {username: req.params.identifier},
    {email: req.params.identifier}
   ]
 }).then(user => {
   res.json({user});
 });
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, timezone, email } = req.body;
      const pass_diest = bcrypt.hashSync(password, 10);

      var newUser = new UserModel ({
        username:username,
        email:email,
        timezone:timezone,
        pass_digest:pass_diest
      });

      newUser.save( function(err){
        if (err) {
          res.status(500).json({ error: err });
        }else{
          res.json({ success: true });
        }
      });
      } else {
        res.status(400).json(errors);
      }
  });
});


export default router;
