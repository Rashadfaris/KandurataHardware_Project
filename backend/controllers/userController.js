import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 }); // Exclude password field for security
        res.json({ success: true, users }); // Ensure 'users' is sent in the response
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error fetching users' });
    }
};


const deleteUser = async (req, res) => {
    try {
      const { id } = req.params; // Get user ID from request params
      await userModel.findByIdAndDelete(id);
      res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error deleting user" });
    }
  };

  const getUserCount = async (req, res) => {
    try {
        const userCount = await userModel.countDocuments(); // Get total count of users
        res.json({ success: true, count: userCount });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error fetching user count' });
    }
};
  
export { loginUser, registerUser,getAllUsers,deleteUser,getUserCount};