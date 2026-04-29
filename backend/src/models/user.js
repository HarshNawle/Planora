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
    fullName: { type: String, required: true, },
    profilePicture: { type: String, required: false, },
    isEmailVerified: { type: String, required: false,  },
    lastLogin: { type: String, required: false, },
    is2FAEnabled: { type: String, required: false,  },
    twoFAOtp: { type: String,  },
    twoFAOtpExpires: { type: Date, }
},
{
    timestamps: true,
});

const User = mongoose.model("User" , userSchema);

export default User;