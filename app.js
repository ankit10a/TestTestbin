const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoDb = require('./configuration/mongodbConnection');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const server = http.createServer(app);

mongoDb();

server.listen(port,()=>{
    console.log(`Server listen on ${port} `)
})

