"use server";

import nodemailer from "nodemailer";

export const sendEmail = async ({
  to, subject, body
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const { SEND_MAIL_ACTIVATED, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  if (SEND_MAIL_ACTIVATED !== "true") return;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST || "",
    port: SMTP_PORT ? parseInt(SMTP_PORT, 10) : 0,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    }
  });
  // try {
  //    const testResult = await transport.verify();
  //    console.log(testResult);
  // } catch (error) {
  //    console.error({ error });
  //    return;
  // }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
    // logger('system', `Email sent to ${to}`);
  } catch (error) {
    console.error(error);
    // logger('error', error);
  }

  /*
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY environment variable is not set");
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    to: to.toLowerCase().trim(),
    from: process.env.EMAIL_FROM,
    subject: subject.trim(),
    text: text.trim(),
  };

  try {
    const [response] = await sgMail.send(message);

    if (response.statusCode !== 202) {
      throw new Error(`SendGrid API returned status code ${response.statusCode}`);
    }

    return {
      success: true,
      messageId: response.headers['x-message-id'],
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    }
  }
  */
};