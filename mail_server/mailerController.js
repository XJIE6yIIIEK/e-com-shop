require('dotenv').config();
var nodemailer = require('nodemailer');

class MailerController {
    static transporter;

    static initialize(server, proto){
        server.addService(proto.OrderService.service, {
            sendOrderDetails: MailerController.sendOrderDetails
        });

        MailerController.transporter = nodemailer.createTransport({
            service: process.env.MAILER_SERVICE,
            auth: {
                user: process.env.MAILER_LOGIN,
                pass: process.env.MAILER_PASSWORD
            }
        });
    }

    static formOrderDetailsMessage(orderDetails){
        var msg = `Детали заказа №${orderDetails.order_id}:\n`;
        msg += `Общая сумма заказа: ${orderDetails.total_price.toFixed(2)} руб.\n`;

        var goods = orderDetails.items;
        
        for(var i = 0; i < goods.length; i++){
            msg += `${i + 1}. [${goods[i].articul}] ${goods[i].type} ${goods[i].name}: ${goods[i].amount} шт. - ${goods[i].price.toFixed(2)} руб/шт.`
        }

        return msg;
    }
    
    static sendOrderDetails(call, callback){
        var orderDetails = call.request.order_details;
        var mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: orderDetails.email,
            subject: `Детали заказа №${orderDetails.order_id}`,
            text: MailerController.formOrderDetailsMessage(orderDetails)
        }

        MailerController.transporter.sendMail(mailOptions, function(error, info){
            if(error){
                callback(null, false);
            } else {
                callback(null, true);
            }
        });
    }
}

module.exports = MailerController;