import Queue from "bull";
import nodemailer from "nodemailer";
import redisConnection from "../http/config/redis";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailQueue = new Queue("mailQueue", {
  redis: {
    host: redisConnection.options.host as string,
    port: redisConnection.options.port as number,
  },
});

mailQueue.process(async (job) => {
  const { to, subject, body } = job.data;

  try {
    await transporter.sendMail({
      from: '"Gym Ops" <no-reply@gymops.com>',
      to,
      subject,
      text: body,
    });
  } catch (error) {
    console.error(`Erro ao enviar email: ${error}`);
  }
});

export default mailQueue;
