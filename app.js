const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoDb = require('./configuration/mongodbConnection.js');
const controller = require('./controller/index')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api',controller);
const server = http.createServer(app);

mongoDb();

server.listen(port,()=>{
    console.log(`Server listen on ${port} `)
})

