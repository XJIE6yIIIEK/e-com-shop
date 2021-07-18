require('dotenv').config();
var express = require('express');
var sequelize = require('./db');
var models = require('./models/models');
var cors = require('cors');
var router = require('./routes/routes');
var ErrorHandler = require('./middleware/middleware');
var dbInit = require("./db_init");

var PORT = process.env.PORT || 5000;

var app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(ErrorHandler);

var start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch(e) {
        console.log(e.message);
    }
}

start().then(() => dbInit(sequelize));