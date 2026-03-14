import bcrypt, { hash } from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import Verification from "../models/verification.js";
import { sendEmail } from "../libs/send-email.js";
import { aj } from "../libs/arcjet.js";

// const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

export const signup = async (req, res, next) => {
    try {
        const { email, fullName, password } = req.body;

        const decision = await aj.protect(req, { email }); // Deduct 5 tokens from the bucket
        console.log("Arcjet decision", decision.isDenied());

        if (decision.isDenied()) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid email address" }));
        }
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
            { userId: newUser._id, purpose: "email-verification" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        await Verification.create({
            userId: newUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });


        // send email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`
        const emailSubject = "Verify your email";

        const isEmailSent = await sendEmail(email, emailSubject, emailBody);

        if (!isEmailSent) {
            return res.status(500).json({
                message: "Failed to send verification email",
            })
        }

        res.status(201).json({
            message: "Verification code sent to your email. Please and verify your account",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = () => {

};

export const verifyEmail = async () => {
    try {
        const { token } = req.body;
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!payload) {
            return res.status(401).json({ message: "Unaithorized" })
        }

        const { userId, purpose } = payload;

        if(purpose !== "email-verification") {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const verification = await Verification.findOne({
            userId, token
        });

        if(!verification) {
            return res.status(401).json({ message: "Unaithorized" })
        }

        const isTokenExpired = verification.expiresAt < new Date();

        if(isTokenExpired) {
            return res.status(401).json({ message: "Token expired" })
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(401).json({ message: "Unaithorized" })
        }

        if(user.isEmailVerified) {
            return res.status(400).json({ message: "Email already verified" })
        }

        user.isEmailVerified = true;
        await user.save();

        await Verification.findByIdAndDelete(verification._id);

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
};