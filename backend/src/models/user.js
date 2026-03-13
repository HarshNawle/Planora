import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true, select: false },
    profilePicture: { type: String, required: false, select: false },
    isEmailVerified: { type: String, required: false, select: false },
    lastLogin: { type: String, required: false, select: false },
    is2FAEnabled: { type: String, required: false, select: false },
    twoFAOtp: { type: String, select: false },
    twoFAOtpExpires: { type: Date, select: false  }
},
{
    timestamps: true,
});

const User = mongoose.model("User" , userSchema);

export default User;