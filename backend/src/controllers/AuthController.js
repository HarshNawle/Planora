import bcrypt, { hash } from "bcrypt";
import User from "../models/user";

const createToken = (email , userId ) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
}

export const signup = async (req, res, next) => {
    try {
        const { email, name , password } = req.body;
        
        const user = await User.findOne({email});
        

        if(user) {
            res.status(400).json({message: "Email address already in use"});
        }

        res.cookie("jwt", createToken(email, user._id), {
            maxAge, secure:true, sameSite: "none"
        });

        const salt = await bcrypt.gensalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashPassword,
            name,
        });

        // TODO: sent to email
        
        res.status(201).json({
            message: "Verification code sent to your email. Please and verify your account"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const login = () => {
    
};