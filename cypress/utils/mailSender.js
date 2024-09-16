const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const formatTestName = require('./formatTestName');
const  {format} = require('date-fns')

require('dotenv').config();


// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'mail.appdevs.team', // Replace with your SMTP host
    port: 465, // Replace with your SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'noreply@appdevs.team', // Replace with your email
        pass: process.env.EMAIL_PASSWORD,    // Replace with your email password or app-specific password
    },
});

console.log("🚀 ~ pass:", process.env.EMAIL_PASSWORD)
// Function to send an email with HTML content
function sendHtmlReport(filePath, fileName, recipientEmail) {
    // Read the HTML content from the file
    const htmlContent = fs.readFileSync(filePath, 'utf8');

    // get current date and time
    const currentDateTime = format(new Date(), 'dd MMM yyyy hh:mm a')
    // Define the email options
    const mailOptions = {
        from: '"Zahid Hasan" <zahid@appdevs.team>', // Sender address
        to: recipientEmails.join(','),                           // List of recipients
        subject: `${fileName} ${currentDateTime}`,             // Subject line
        html: htmlContent,                            // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Error sending email: ${error}`);
        }
        console.log(`Email sent: ${info.response}`);
    });
}

// Directory paths
const htmlDir = path.join(__dirname, '../../cypress/CustomReport/Html');
console.log("🚀 ~ htmlDir:", htmlDir)

// List all HTML files in the Html directory
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

// list of recipients
const recipientEmails = ['zahidappdevs@gmail.com','zahidcse98@gmail.com','zahidhasanshs2014@gmail.com',]

// Send each HTML report as an email
htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    const fileName = formatTestName(file);
    sendHtmlReport(filePath, fileName, recipientEmails); // Replace with the recipient's email
});
