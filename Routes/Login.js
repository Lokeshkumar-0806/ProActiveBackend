const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../Models/User');

const JWT_SECRET = 'ProactiveSecretKey';

router.post('/loginuser', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const payload = {
            user: {
                id: userData.id,
            },
        };

        const authToken = jwt.sign(payload, JWT_SECRET);
        return res.status(200).json({
            message: 'Login successful',
            authToken,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;