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

router.get('/profile', async (req, res, next) => {
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;

    const result = await userService.getProfile(userId)
    .then(user => { res.status(200).json(user) })
    .catch(next); 

    // console.log(result);

    return result;
});

router.put('/profile', async (req, res, next) => {
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;
    const { email, username } = req.body;

    const token = await userService.updateProfile(userId, email, username);

    // res.cookie('auth', token, { httpOnly: true })

    res.json(token);
});


module.exports = router;