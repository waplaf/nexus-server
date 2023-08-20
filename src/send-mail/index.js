"use strict";
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async ( to, subject, html, text = "" ) =>
{
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport( {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bantuc9@gmail.com', // generated ethereal user
            pass: 'cxmcjubyffyxiwam', // generated ethereal password
        },
    } );

    // send mail with defined transport object
    let info = await transporter.sendMail( {
        from: '"bantu C" <fbantuc9@gmail.com>', // sender address
        to,
        subject,
        text,
        html
    } );

    console.log( "Message sent: %s", info.messageId );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log( "Preview URL: %s", nodemailer.getTestMessageUrl( info ) );
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
export { sendMail }
