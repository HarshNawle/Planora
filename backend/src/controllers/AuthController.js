import bcrypt, { hash } from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import Verification from "../models/verification.js";
import { sendEmail } from "../libs/send-email.js";

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

export const signup = async (req, res, next) => {
    try {
        const { email, fullName, password } = req.body;

        const user = await User.findOne({ email });


        if (user) {
            res.status(400).json({ message: "Email address already in use" });
        }

        // res.cookie("jwt", createToken(email, user._id), {
        //     maxAge, secure:true, sameSite: "none"
        // });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashPassword,
            fullName,
        });

        const verificationToken = jwt.sign(
            { userId: newUser._id, property: "email-verification" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: maxAge }
        );

        await Verification.create({
            userId: newUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + maxAge),
        });


        // send email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`
        const emailSubject = "Verify your email";

        const isEmailSent = await sendEmail(email, emailSubject, emailBody);

        if(!isEmailSent) {
            return res.status(500).json({
                message: "Failed to send verification email",
            })
        }

        res.status(201).json({
            message: "Verification code sent to your email. Please and verify your account"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = () => {

};