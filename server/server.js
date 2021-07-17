require('dotenv').config();
var express = require('express');
var sequelize = require('./db');
var models = require('./models/models');
var cors = require('cors');
var router = require('./routes/routes');
var errorHandler = require('./middleware/middleware');

var PORT = process.env.PORT || 5000;

var app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

var start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch(e) {
        console.log(e.message);
    }
}

start();