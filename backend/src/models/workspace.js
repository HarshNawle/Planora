import mongoose, { Schema } from "mongoose";

const workSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        default: "#28A745"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            role: {
                type: String,
                enum: ["owner", "viewer", "admin", "member"],
                default: "member"
            },
            joinedAt: { type: Date, default: Date.now() },
        }
    ],
    project: [{ type: Schema.Types.ObjectId, ref: "user" }]
}, {
    timestamps: true
});

const Workspace = mongoose.model("Workspace", workSpaceSchema);

export default Workspace;
