import User from "../models/user.js";
import bcrypt from "bcrypt"

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if(!user) {
            return res.status(404).json({  message: "User not found" });
        }
        delete user.password;

        res.status(200).json(user);
    } catch (error) {
        console.log("Error fetching user profile: ", error);
        res.status(500).json({ message: "Server error" })
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, profilePicture } = req.body();

        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.fullName = fullName;
        user.profilePicture = profilePicture;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log("Error fetching user profile: ", error);
        res.status(500).json({ message: "Server error" })
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user._id).select("+password");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and password do not match" });
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if(!isPasswordValid) {
            return req.status(403).json({ message: "Invalid old password" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.log("Error fetching user profile: ", error);
        res.status(500).json({ message: "Server error" })
    }
};



