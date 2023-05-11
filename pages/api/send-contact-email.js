import nodemailer from 'nodemailer';
import getConfig from "next/config";

export default async (req, res) => {
  const { publicRuntimeConfig } = getConfig();
  const { name, email, phoneNumber, formType, trainingType, numberOfPeople, comments } = req.body;

  try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${publicRuntimeConfig.TEST_EMAIL}`,// your Gmail username
            pass: `${publicRuntimeConfig.TEST_EMAIL_PW}` // your Gmail password or App Password if 2-Step Verification is enabled
        },
    })

    const message = {
      from: `Morgan Safety Services <${publicRuntimeConfig.ADMIN_EMAIL}>`, // replace with your email address
      to: [publicRuntimeConfig.ADMIN_EMAIL, publicRuntimeConfig.TEST_EMAIL], // replace with the recipient email address
      subject: 'Schedule Training / Contact Form Submission',
      html: `    
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Form Type: ${formType}</p>

        ${formType !== 'Contact' && formType !== 'Technical Support' 
        ? `<p>Training Type: ${trainingType}</p><p>Number of People: ${numberOfPeople}</p>` 
        : ''}

        <p>Comments: ${comments}</p>
      `,
    };

    await transporter.sendMail(message);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}