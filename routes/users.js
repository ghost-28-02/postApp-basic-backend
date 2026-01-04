const express = require('express');
const router = express.Router();

const {
    loginUser,
    registerUser,
    getProfile,
    updateProfile
} = require("../controllers/userControllers");

const {protect} = require("../middleware/authMiddleware");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;