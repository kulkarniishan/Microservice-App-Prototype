const express = require('express');
const amqp = require('amqplib');
const mongoose = require('mongoose');
const app = express();
const port = PROCESS.ENV.PORT || 8080;
const Product = require('./product');
var order;

var channel, connection;
app.use(express.json());


mongoose.connect("mongodb://mongo:27017/product-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log("Order Service DB Connected!");
    })

connect = async () => {
    try {
        const amqpServer = "amqp://guest:guest@rabbitmq-service:5672/";
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("PRODUCT");

        // channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        // console.log(`Job Sent Successfully ${message.number}`);
    } catch (error) {
        console.log(error);
    }
}

connect();

app.get('/health', (req, res) => {
    res.send('this is working');
});

app.post('/buy', (req, res) => {
    Product.find({ _id: { $in: req.body._id } })
        .then((Products) => {
            console.log(products);
            channel.sendToQueue(
                "ORDER",
                Buffer.from(JSON.stringify({
                    products
                }))
            )

            channel.consume("PRODUCT", (data) => {
                console.log('Consuming PRODUCT service')
                order = JSON.parse(data.content);
                console.log(order)
                channel.ack(data)
                res.json(order)
            })
        })
        .catch(err => res.status(500).send({ msg: "An Error Occured" }));
});

app.post('/create', (req, res) => {
    const { name, description, price } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
    })

    newProduct.save();

    return res.json(newProduct);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});