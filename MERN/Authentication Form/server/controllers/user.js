import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please enter all the fields.");
        }

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            res.status(400);
            throw new Error("User already exists!");
        }

        // Regular expression to enforce name complexity
        const nameRegex = /^(?=(?:\S+\s*){3,20}$)[A-Za-z\s]{3,20}$/;

        // Check if name meets complexity requirements
        if (!nameRegex.test(name)) {
            res.status(400)
            throw new Error("Name should be only alphabetic characters and length between 3 and 20 characters");
        }

        // Regular expression to enforce password complexity
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/;

        // Check if password meets complexity requirements
        if (!passwordRegex.test(password)) {
            res.status(400)
            throw new Error('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number and atleast 1 special character.');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: passwordHash,
        });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            user.password = undefined;

            res.status(200).json({ token, user, msg: "Registration Successfull!" });
        }
    } catch (error) {
        res.status(500).json( error.message );
    }
}

//Login
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400)
            throw new Error("Invalid credentials.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400)
            throw new Error("Invalid credentials.");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = undefined;

        res.status(200).json({ token: token, user: user, msg: "Login Successfull!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};