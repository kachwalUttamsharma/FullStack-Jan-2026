import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req?.body;
    // validation
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: `User already exists ${email}`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const updatedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: updatedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Registration of user failed with error ${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req?.body;

    // validate if email exists
    const validateUser = await User.findOne({ email: email });

    if (!validateUser) {
      return res.send({
        success: false,
        message: "user does not exists, please register",
      });
    }

    // validate password
    const validatePassword = await bcrypt.compare(
      password,
      validateUser?.password,
    );

    if (!validatePassword) {
      return res.send({
        success: false,
        message: "please enter valid password",
      });
    }

    res.send({
      success: true,
      message: "You have successfully logged-In",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Login failed with error ${error}`,
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // remove password from response
    const user = await User.findById(userId);
    if(!user) {
        res.send({
            success: false,
            message: "User Not Found"
        })
    }
    res.send({
        success: true,
        message: "User details fetched Successfully",
        data: {
            name: user?.name,
            role: user?.role,
            email: user?.email,
            _id: user?._id 
        }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There is no user exists with this ID,  ${error}`,
    });
  }
};
