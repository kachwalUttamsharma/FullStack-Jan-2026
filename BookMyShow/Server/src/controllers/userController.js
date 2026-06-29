import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register  = async (req, res) => {
    try {
    const {name, email, password, role} = req?.body;
    // validation 
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(200).json({
            success: false,
            message: `User already exists ${email}`
        })
    }

    const salt = await bcrypt.genSalt(10);
    const updatedPassword = await bcrypt.hash(password, salt);

    await User.create({
        name,
        email,
        password : updatedPassword,
        role
    })

    res.status(201).json({
        success: true,
        message: "User registered Successfully"
    })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Registration of user failed with error ${error}`
        })
    }
};

const login = () => {};

