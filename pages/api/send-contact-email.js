import nodemailer from 'nodemailer'
import { sendText } from 'textbelt'
import 'dotenv/config'

export default async (req, res) => {
  const { 
    name, 
    email, 
    phoneNumber, 
    formType, 
    trainingType, 
    numberOfPeople, 
    comments 
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.ADMIN_EMAIL}`,// your Gmail username
            pass: `${process.env.ADMIN_EMAIL_PW}` // your Gmail password or App Password if 2-Step Verification is enabled
        },
    })

    const message = {
      from: `Morgan Safety Services <${process.env.ADMIN_EMAIL}>`, // replace with your email address
      to: [ process.env.ADMIN_EMAIL, process.env.CSR_EMAIL ], // replace with the recipient email address
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

    const messageSMS = `
      <b>MSS New Contact</b> 
    
      Name: ${name}
      Email: ${email}
      Phone: ${phoneNumber}
      Form Type: ${formType}

      Message: ${message}
    `

    // Send SMS Message to Admin numbers
    sendText('4174029696', messageSMS, undefined, function(err) {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}