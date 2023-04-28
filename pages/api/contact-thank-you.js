import nodemailer from 'nodemailer';
import getConfig from "next/config";

export default async (req, res) => {
  const { publicRuntimeConfig } = getConfig();
  const { name, email, form_type } = req.body;

  let html
  switch (form_type) {
    case 'Schedule Training':
      html = `
        <p>Dear ${name},</p>
        <p>Thank you for your interests in our MSHA safety training!</p>
        <p>We have received your submission and we will review it shortly. If we require any further information from you, we will be in touch via the contact details you provided.</p>
        <p>Thank you once again for considering us and we look forward to connecting with you soon.</p>
        </br> 
        <p>Best regards,</p>
        <p><strong>Morgan Safety Services</strong></p>
      `
      break
    case 'Contact':
      html = `
        <p>Dear ${name},</p>
        <p>Thank you for taking the time to fill out our contact form and we appreciate your interest in our services.</p>
        <p>Your submission has recieved and we will review it shortly. We will be in touch soon!</p>
        </br> 
        <p>Best regards,</p>
        <p><strong>Morgan Safety Services</strong></p>
      `
      break
    case 'Technical Support':
      html = `
        <p>Dear ${name},</p>
        <p>Thank you for taking the time to fill out our technical support form.</p>
        <p>We have received your submission and we will review it soon. If we require any further information from you, we will be in touch via the contact details you provided.</p>
        <p>Thank you once again for reaching out with issues or questions you are having with the website. Any technical issues on our end will be addressed shortly.</p>
        </br> 
        <p>Best regards,</p>
        <p><strong>Morgan Safety Services</strong></p>
      `
      break
  }

  try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${publicRuntimeConfig.TEST_EMAIL}`,// your Gmail username
            pass: `${publicRuntimeConfig.TEST_EMAIL_PW}` // your Gmail password or App Password if 2-Step Verification is enabled
        },
    })

    const message = {
      from: `Morgan Safety Services <${publicRuntimeConfig.TEST_EMAIL}`, // replace with your email address
      to: email, // replace with the recipient email address
      subject: `${form_type}: Thank you!`,
      html: html
    };

    await transporter.sendMail(message);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}