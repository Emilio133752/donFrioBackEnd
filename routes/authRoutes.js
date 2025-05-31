const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers } = require('../controllers/authController');
const authMiddleware  = require('../middleware/authMiddleware')


const router = express.Router();

router.get('/me', authMiddleware, getUserProfile);
router.get('/usuarios', getAllUsers); 
router.post('/register', registerUser);


router.post('/login', loginUser);

module.exports = router;
