const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTER (Updated) ---
const registerUser = async (req, res) => {
    try {
        const { username, email, password, age, gender } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 👇 LOGIC: Agar ye Kinwo bhai hain, to Admin bana do
        const isAdmin = email === "kinwo@gmail.com";

        await User.create({ 
            username, email, password: hashedPassword, age, gender, isAdmin 
        });

        res.status(201).json({ message: "User Registered" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// --- LOGIN (Updated) ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });

            // 👇 isAdmin frontend ko bhej rahe hain
            res.json({
                message: "Login Success",
                user: { 
                    id: user._id, 
                    username: user.username, 
                    email: user.email, 
                    isAdmin: user.isAdmin 
                }
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// --- GET PROFILE ---
const getUserProfile = async (req, res) => {
    // Middleware se req.user mila hai (Token decode karke)
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
};

// --- LOGOUT ---
const logoutUser = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out" });
};

// 👇 --- NEW: GET ALL USERS (For Admin Dashboard) ---
const getAllUsers = async (req, res) => {
    try {
        // Sirf ye 4 fields chahiye aapko
        const users = await User.find({}).select('username email age gender createdAt');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, getAllUsers };