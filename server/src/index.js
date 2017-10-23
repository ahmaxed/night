import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import users from './routes/users';
import auth from './routes/auth';
import bars from './routes/bars';


require('dotenv').config();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/night', { useMongoClient: true });

let app = express();

app.use(bodyParser.json());
console.log(process.env.JWT_SECRET);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bars', bars);

app.listen(port, () => console.log('Running on port: ' + port));
