require('dotenv').config();
var express = require('express');
var cors = require('cors');

var SwaggerUI = require('swagger-ui-express');
var SwaggerJSDoc = require('swagger-jsdoc');

var sequelize = require('./db');
var models = require('./models/models');
var router = require('./routes/routes');
var ErrorHandler = require('./middleware/middleware');
var dbInit = require("./db_init");

var PORT = process.env.PORT || 5000;

var swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Com shop API",
            version: "1.0.0",
            description: "Руководство по использованию REST методов электронного магазина"
        },
        servers: [{
            url: "http://localhost:" + PORT + "/api/"
        }]
    },
    apis: ["./routes/*.js"]
}
var swaggerDocSpecs = SwaggerJSDoc(swaggerOption);


var app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocSpecs));
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