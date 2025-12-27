const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, getAllUsers } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

// 👇 Admin Route (Do guards hain: Login hona chahiye + Admin hona chahiye)
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;