import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import emailHelper from "../utils/emailHelper.js";

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

    const token = generateToken({
      userId: validateUser?._id,
      role: validateUser?.role,
      email: validateUser?.email,
    });

    res.send({
      success: true,
      message: "You have successfully logged-In",
      data: token,
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
    const userId = req.user.userId;
    console.log("user", req.user);
    // remove password from response
    const user = await User.findById(userId);
    if (!user) {
      res.send({
        success: false,
        message: "User Not Found",
      });
    }
    res.send({
      success: true,
      message: "User details fetched Successfully",
      data: {
        name: user?.name,
        role: user?.role,
        email: user?.email,
        _id: user?._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There is no user exists with this ID,  ${error}`,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email == undefined) {
      return res.status(401).json({
        status: "false",
        message: "Please enter the email for forget Password",
      });
    }
    let user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    } else if (user.otp != undefined && user.otpExpiry < Date.now()) {
      return res.json({
        success: false,
        message: "Please use otp sent on mail",
      });
    }
    const otp = Math.floor(Math.random() * 10000 + 90000);
    console.log("otp generated : ", otp);
    const expiry = Date.now() + 5 * 60 * 1000;
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    await emailHelper("otp.html", email, {
      name: user.name,
      otp: otp,
    });
    res.send({
      success: true,
      message: "otp has been sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `There is no user exists with this ID,  ${error}`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, otp } = req.body;
    if (password == undefined || otp == undefined) {
      return res.status(401).json({
        success: false,
        message: "invalid request",
      });
    }
    const user = await User.findOne({ otp: otp });
    if (user == null) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    // validation
    if (Date.now() > user.otpExpriy) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "otp expired",
      });
    } else {
      user.otp = null;
      user.otpExpiry = null;
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(password, salt);
      user.password = updatedPassword;
      await user.save();
    }
    res.send({
      success: true,
      message: "Password reset has been done successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to reset/update password ,  ${error}`,
    });
  }
};
