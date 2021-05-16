// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });

export default async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.user_email,
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: email,
      to: `${process.env.email_recipient}`,
      subject: 'email submission from you personal website',
      html: `<p>You have a new mail from ${email}</p></br>
      <p><strong>Name: </strong>${name}</p></br>
      <p><strong>Message: </strong>${message}</p>`
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(req.body);
};
