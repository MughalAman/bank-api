const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import routes
const accountsRoute = require('./routes/accounts');

//Middleware
app.use('/accounts', accountsRoute);

//Db connection
mongoose.connect(process.env.db_conn, { useNewUrlParser: true, useUnifiedTopology:true, poolSize: 10} ,() => {
    console.log('Connected to database!');
});

//LISTEN TO THE SERVER
app.listen(8000);