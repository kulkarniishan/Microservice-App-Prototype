const express = require('express');
const amqp = require('amqplib');
const mongoose = require('mongoose');
const app = express();
const port = PROCESS.ENV.PORT || 8080;
const order = require('./order');

mongoose.connect("mongodb://mongo:27017/order-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log("Order Service DB Connected!");
    })



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});