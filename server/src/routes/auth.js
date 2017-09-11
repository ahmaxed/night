import express from 'express';
import UserModel from '../models/users';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  return UserModel.find({
   $or: [
    {username: identifier},
    {email: identifier}
   ]
 }).then(user => {

   if (user.length > 0){
     if (bcrypt.compareSync(password, user[0].pass_digest)) {
       const token = jwt.sign({
         id: user[0]._id,
         username: user[0].username
       }, config.jwtSecret);
       res.json({token});
     } else {
       res.status(401).json({ errors: { form: 'Invalid Credentials'}});
     }
   } else {
     res.status(401).json({ errors: { form: 'Invalid Credentials'}});
   }

 });
});

export default router;
