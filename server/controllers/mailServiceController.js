require('dotenv').config();
var {Users} = require('../models/models');

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

class MailerController {
    static client;

    static initialize(){
        const PROTO_PATH = __dirname + process.env.MAILER_PROTO_PATH;
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

        MailerController.client = new mail_proto.OrderService(process.env.MAILER_SERVICE_ADDRESS + ':' + process.env.MAILER_SERVICE_PORT, grpc.credentials.createInsecure());
    }

    static async sendOrderDetails(order, n_user){
        var userInfo = await Users.findOne({
            where: {
                id: n_user
            }
        });

        order.email = userInfo.e_mail;

        MailerController.client.sendOrderDetails({order_details: order}, function(error, response){
            if(error){
                console.log(error);
            } else {
                console.log(response);
            }
        });
    }
}

module.exports = MailerController;