import nodemailer from 'nodemailer';
import { Item, getOrders } from './orders';

interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailContent {
  subject: string;
  body: string;
}

// Replace these values with your email configuration
const emailConfig: EmailConfig = {
  service: 'gmail',
  auth: {
    user: 'pssenoreply@gmail.com',
    pass: 'okic szxv hapw ixxg',
  },
};

// Replace these values with your email content
const emailContent: EmailContent = {
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
async function sendEmail(
  toEmail: string,
  subject: string,
  body: string
): Promise<void> {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to: toEmail,
    subject: subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${toEmail}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email to ${toEmail}:`, error);
  }
}

// Loop through the list of customer orders and send emails
const sendEmailsToCustomers = async () => {
  for (const order of await getOrders()) {
    // Generate items string
    const itemsString = order.items
      .map(
        (item: Item) =>
          `${item.quantity}x ${item.name}(P${item.price} each) P${item.subtotal}`
      )
      .join('\n');

    // Replace placeholder values in the email body
    const personalizedBody = emailContent.body
      .replace(
        '[customerName]',
        order.customerName.split(',').reverse().join(' ')
      ) // Replace with actual customer name
      .replace('[orderId]', order.orderId) // Replace with actual order ID
      .replace('[items]', itemsString) // Replace with actual items string
      .replace('[total]', order.total.toString()) // Replace with actual total
      .replace('[paymentStatus]', order.paymentStatus) // Replace with actual payment status
      .replace('[Customer Support Email/Phone]', 'psse.cpu@gmail.com'); // Replace with actual support contact

    await sendEmail(order.email, emailContent.subject, personalizedBody);
  }
};

sendEmailsToCustomers();
