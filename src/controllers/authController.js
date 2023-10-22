const { Router } = require('express');
const passport = require('passport');
const userService = require('../services/users.service');
const { comparePassword } = require('../utils/bcrypt.util');
const { generateToken } = require('../utils/jwt.util');

const router = Router();

router.get('/login', async (req, res) => {
    try {
        res.render(
            'login',
            {
                style: 'home.css',
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    };
});

router.get('/register', async (req, res) => {
    res.render(
        'register',
        {
            style: 'home.css',
        }
    )
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ status: 'error', error: 'Ivalid credentials' });
        }

        if (!comparePassword(password, user.password)) {
            return res
                .status(400)
                .json({ status: 'error', error: 'Invalid credentials' });
        }

        req.user = {
            first_name: user.first_name,
            email: user.email,
            role: user.role,
        }

        const token = generateToken(user._id);

        res
            .cookie('authToken', token, { maxAge: 30000, httpOnly: true })
            .json({ status: 'success', payload: req.user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error.' })
    }
})

router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/login' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', payload: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

module.exports = router;