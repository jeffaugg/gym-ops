import Queue from "bull";
import nodemailer from "nodemailer";
import redisConnection from "../http/config/redis";
import dotenv from "dotenv";
import AppError from "../../errors/AppError";

const emailPass = process.env.EMAIL_PASS?.replace(/-/g, " ");

dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: emailPass,
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
    throw new AppError("Error sending email", 500);
  }
});

export default mailQueue;
