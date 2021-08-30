const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/premiere-league-matches';
const cors = require('cors');
// const url = 'mongodb://mongo:27017/sample';

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected');
})

app.use(cors());
app.use(express.json());

const router = require('./routes/routes');
app.use('/routes', router);

app.listen(5000, () => {
    console.log('Server created');
})
