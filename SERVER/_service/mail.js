const nodemailer = require('nodemailer');
const config = require('../_config');

let mailer = nodemailer.createTransport({
    pool: config.mail.pool,
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
        user: config.mail.email,
        pass: config.mail.password
    }
}
)

const sendUserDetails = (email, data) => {
    const mailOptions = {
        from: config.mail.email,
        to: email,
        subject: 'Temporary Login Code',
        template: 'forgotpassword',
        context: data
    };

    mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
}

module.exports = {
    sendUserDetails
}