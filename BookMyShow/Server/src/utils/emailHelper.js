import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const replaceContent = (content, metaData) => {
  return Object.keys(metaData).reduce((updatedContent, key) => {
    return updatedContent.replace(
      new RegExp(`#{${key}}`, "g"),
      metaData[key]
    );
  }, content);
};

const emailHelper = async (templateName, receiverEmail, metadata) => {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    // utils/email_templates/ticketTemplate.html
    let content = await fs.promises.readFile(templatePath, "utf-8");
    content = replaceContent(content, metadata);
    const emailDetails = {
      from: process.env.GMAIL_APP_USER,
      to: receiverEmail,
      subject: "Mail from scaler bookmyshow app",
      html: content,
    };

    await transport.sendMail(emailDetails);
    console.log("Email sent successfully")
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Template file not found:", error.message);
    } else if (error.response?.body) {
      console.error("Error sending email:", error.response.body);
    } else {
      console.error("Error occurred:", error.message);
    }
  }
};

export default emailHelper;
