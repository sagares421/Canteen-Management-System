const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

const config = require('./_config');
const routes = require('./web/routes');

// Connecting to MongoDB
mongoose.connect(config.db.url, { useCreateIndex: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    console.log('Connected to DB');
});

// Cofigure middlewares
app.use(helmet())
app.use(cors());
app.use(compression());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Adding Web API routes
routes(app);

// Error handler, required as of 0.3.0
app.use(function (err, req, res, next) {
    res.status(400).json({
        success: false,
        error: err
    });
});

// 404 Route
app.all('*', (req,res)=>{
    res.status(404).json({
        success: false,
        message: 'API/Resource not available'
    });
});

// Running App on port based on NODE_ENV
app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))
