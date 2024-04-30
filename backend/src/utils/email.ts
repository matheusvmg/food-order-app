import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SENDER_HOST,
  port: Number(process.env.EMAIL_SENDER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SENDER_AUTH_USER,
    pass: process.env.EMAIL_SENDER_AUTH_PASS,
  },
});

export const sendResetPasswordEmail = (
  receiver: string,
  token: string
): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: '"Food Order App 🍔" <matheusvmg@gmail.com>',
    to: receiver,
    subject: "Restaurar senha ✔",
    text: `Clique nesse link para restaurar sua senha: http://localhost:3000/reset-password/${token}`,
  });
};
