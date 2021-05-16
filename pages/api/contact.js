// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID =
  '672997406811-6uv9ebs938l4o88ogk6uqp8p8u6gh1pq.apps.googleusercontent.com';
const CLIENT_SECRET = 'H4Nk7Fm3QrLvFhJWXqVE-6lz';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04WwGhBmr6uBtCgYIARAAGAQSNwF-L9Ir1AnZyagHh0w9tDsNffcN1pha-wppihq4AhJxAZVvdyfFp8K8_ckTJfyt6p7SnnXXWBk';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.user_email,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: email,
      to: 'johnrudolphlee@gmail.com',
      subject: `Email from johnrudol.ph`,
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
