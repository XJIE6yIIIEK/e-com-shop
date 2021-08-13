require('dotenv').config();
const PROTO_PATH = __dirname + process.env.MAILER_PROTO_PATH;

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const MailerController = require('./mailerController');
var packageDefinition = protoLoader.loadSync( 
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
var mail_proto = grpc.loadPackageDefinition(packageDefinition).mailservice;

var start = async () => {
    var server = new grpc.Server();
    MailerController.initialize(server, mail_proto);
    server.bindAsync(process.env.MAILER_ADDRESS + ':' + process.env.MAILER_PORT, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

start();