const jwt = require('jsonwebtoken');

// 1. Login Check
const protect = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Token failed" });
    }
};

// 2. 👇 Admin Check (New)
const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Admin hai, jane do
    } else {
        res.status(403).json({ message: "Access Denied: Admins Only" });
    }
};

module.exports = { protect, adminOnly };