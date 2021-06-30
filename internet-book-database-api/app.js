const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const cors = require('cors');

const app=express().use('*', cors());

app.use(express.json({limit: '50mb'}));
app.use(express.static('public'));
// app.use("/images", express.static(path.join("images")));
mongoose.connect('mongodb+srv://martin:hnermVp7i7UKs8WK@cluster0.esvau.mongodb.net/BookDataBase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(e => {
        console.log(e);
        console.log('Connection failed!');
    });


app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
module.exports = app;