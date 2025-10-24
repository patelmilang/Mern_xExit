import nodemailer from "nodemailer";

export const MailService = {
  async sendNotification(to, subject, text) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text });
  }
};
