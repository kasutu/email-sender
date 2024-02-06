"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const orders_1 = require("./orders");
// Replace these values with your email configuration
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'pssenoreply@gmail.com',
        pass: 'okic szxv hapw ixxg',
    },
};
// Replace these values with your email content
const emailContent = {
    subject: 'PSSE Merch Update: Item Arrived in Storage',
    body: `
Dear [customerName],

Greetings from PSSE! 

We are excited to let you know that your Item is now in storage and is being sorted for release. 

Here are the details of your order:

=====================
Order ID: [orderId]
---------------------
[items]
---------------------
Total: P[total]
Payment Status: [paymentStatus]
=====================

**Please keep your Order ID handy when you collect your order.

Our team is preparing your order for release. Hang tight! We'll be sending another email your way with release details soon.

If you have any questions or concerns about your order, don't hesitate to get in touch with our customer support at [Customer Support Email/Phone].

Thank you for supporting PSSE. We value your patronage and look forward to serving you again.



Best regards,
PSSE Merch Team
  `,
};
// Function to send emails
function sendEmail(toEmail, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport(emailConfig);
        const mailOptions = {
            from: emailConfig.auth.user,
            to: toEmail,
            subject: subject,
            text: body,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log(`Email sent to ${toEmail}: ${info.messageId}`);
        }
        catch (error) {
            console.error(`Error sending email to ${toEmail}:`, error);
        }
    });
}
// Loop through the list of customer orders and send emails
const sendEmailsToCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const order of yield (0, orders_1.getOrders)()) {
        // Generate items string
        const itemsString = order.items
            .map((item) => `${item.quantity}x ${item.name}(P${item.price} each) ${item.discount > 0 ? `with ${item.discount}% discount` : ''} subtotal: P${item.subtotal}`)
            .join('\n');
        // Replace placeholder values in the email body
        const personalizedBody = emailContent.body
            .replace('[customerName]', order.customerName.split(',').reverse().join(' ')) // Replace with actual customer name
            .replace('[orderId]', order.orderId) // Replace with actual order ID
            .replace('[items]', itemsString) // Replace with actual items string
            .replace('[total]', order.total.toString()) // Replace with actual total
            .replace('[paymentStatus]', order.paymentStatus) // Replace with actual payment status
            .replace('[Customer Support Email/Phone]', 'psse.cpu@gmail.com'); // Replace with actual support contact
        yield sendEmail(order.email, emailContent.subject, personalizedBody);
    }
});
sendEmailsToCustomers();
