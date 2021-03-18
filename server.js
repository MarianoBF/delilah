const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

const app = express();

connectionString = "mongodb+srv://delilah:pnlNVo6s8GWSqRpr@cluster0.4aoof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


MongoClient.connect(connectionString, {
    useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('delilah-db')
        const productCollection = db.collection('products')
        app.use(bodyParser.urlencoded({ extended: true}))
        app.get("/", (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })
        app.get("/a", (req, res) => {
            const listProd = db.collection('products').find().toArray()
            .then(results => {
                console.log(results)
            })
            .catch(console.error)
        })
        app.post("/addProduct", (req, res) => {
            productCollection.insertOne(req.body)
                .then(result=> {
                    console.log(result)
                    res.redirect('/')
                })
            res.send("envío exitoso")
        })
        app.listen(3000, function() {
            console.log('Escuchando en 3000')
        })

    })
    .catch(console.error)


