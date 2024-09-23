import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codingninjas2k16@gmail.com',
        pass: 'slwvvlczduktvhdj'
    }
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'codingninjas2k16@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};