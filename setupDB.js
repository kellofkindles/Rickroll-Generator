const express = require("express");

const { MongoClient } = require('mongodb');

const dotenv = require("dotenv");
dotenv.config();

let collection;
let database;

const URL = process.env.mongourl
const mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    await mongoClient.connect(); 
    await mongoClient.db("main").command({ ping: 1 });
    console.log("Connected successfully to db and fetched main collection.");
    
    const database = mongoClient.db("main"); 
    collection = database.collection("rickroll");

    check().catch(console.dir)
}
connect().catch(console.dir);

// Main //

async function check(){
    globalRRCount = await collection.findOne({_id:"TotalRRCount"});

    if (!globalRRCount){
        await collection.insertOne({_id:"TotalRRCount", value:0})
        console.info("created Total RR Count index.")
    } else {
        console.info("DB check completed, everything seems to be in order. If you would like to reset data please pass in xxxxx")
    }
}
