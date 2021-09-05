const express = require("express");
const session = require('express-session')
const path = require("path");

const https = require('https');
const http = require('http');
const fs = require('fs');

const { MongoClient } = require('mongodb');

const bodyParser = require('body-parser').json();
const dotenv = require("dotenv");
//const { title } = require("process");
dotenv.config();

const URL = process.env.mongourl
const mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.port || 3000;
const httpPORT = process.env.httpport || 8080

let collection;
let database;
let info = {}

app = express()

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

async function connect() {
    await mongoClient.connect(); 
    await mongoClient.db("main").command({ ping: 1 });
    console.log("Connected successfully to db and fetched main collection.");
    
    const database = mongoClient.db("main"); 
    collection = database.collection("rickroll");
}
connect().catch(console.dir);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
})

app.get('/posts*', (req, res) => {
    handleRR(req , res);
})

app.get('/news*', (req, res) => {
    handleRR(req , res);
})

app.get('/blogs*', (req, res) => {
    handleRR(req , res);
})

app.get('/data', async (req , res) => {
    const params = req.query
    result = await collection.findOne({_id:params.url})

    res.render('stats', {noClicks: result ? result.value : 0 , title: params.url})
})

app.post('/gen/rr', bodyParser, (req, res) => {
    console.log("Got a request for creating RR!")
    const params = req.body
    
    if (!params.url || !params.title){
        res.status(400).send({error: "bad request"})
    }

    info.url = {title: params.title , description: params.description}
    console.log(info)
    //keep title and descp in an array in {} then use when needed
})

async function create(url , title , descp , result){
    const cDateTime = new Date();
    if (!result){
        await collection.insertOne({_id: url , value:0 , title , description: descp , createDate:cDateTime})
        console.log(`created index for url ${url}!`)
    }
}

async function handleRR(req , res){
    url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`protocol = ${url}`);
    const value = {
        $inc: {
          value: 1
        },
      };
    await collection.updateOne({_id:"TotalRRCount"} , value)

    result = await collection.findOne({_id:url})

    if (result){
        console.log(result)
        console.log("result is valid A^^^^^")
        title = result.title //maybe here
        if (result.description){
            descp = result.description
        } else {
            descp = ""
        }
    } else {
        console.log(`url = ${info.url}`)
        title = info.url.title
        descp = info.url.description || ""
        create(url , title , descp , result)
        //todo - pop url key from info 
    }

    //add count 
    await collection.updateOne({_id:url} , value)

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`lmfao got a person at ${ip}`)

    res.render('rickroll', {title, description: descp});
}

const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname +  '/cert.pem')
};

http.createServer(app).listen(httpPORT, () => {
    console.log(`listening on http://localhost:${httpPORT}`);
});
https.createServer(options , app).listen(PORT, () => {
	console.log(`listening on https://localhost:${PORT}`);
});