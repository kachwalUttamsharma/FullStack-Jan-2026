import User from "../models/User.js";

export const register  = async (req, res) => {
    try {
    const {name, email, password, role} = req?.body;
    // validation 
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: `User already exists ${email}`
        })
    }

    await User.create({
        name,
        email,
        password,
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

