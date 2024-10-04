const router = require('express').Router();
const userService = require('../services/userService');

router.post('/register',async (req, res) => {
    const userData = req.body;
    try {
        const token = await userService.register(userData);
        res.cookie('auth', token, { httpOnly: true });
        res.json(token);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
});

router.post('/login',async (req, res) => {
    const userData = req.body;
    try {
        const token = await userService.login(userData);
        res.cookie('auth', token, { httpOnly: true });
        res.json(token);
    } catch (error) {
        res.status(204).json({ error: error.message });
    }
});

router.get('/logout',async (req, res) => {
    res.clearCookie('auth');
    res.json({ok: true});
});


module.exports = router;