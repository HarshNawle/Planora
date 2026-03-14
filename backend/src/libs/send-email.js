import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = process.env.FROM_EMAIL;

export const sendEmail = async (to, subject, html) => {
    const msg = {
        to,
        from: `Planora <${fromEmail}>`,
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending email:");
        if (error.response) {
            console.error("Status code:", error.code);
            console.error("Response body:", error.response.body); // <- key line
        } else {
            console.error(error);
        }
        return false;
    }
};