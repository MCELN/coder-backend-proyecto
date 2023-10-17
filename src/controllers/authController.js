const { Router } = require('express');
const passport = require('passport');

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

router.post('/register', passport.authenticate('register', { failureRedirect: '/login' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', payload: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

module.exports = router;