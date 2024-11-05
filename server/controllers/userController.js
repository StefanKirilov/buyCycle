const router = require('express').Router();
const userService = require('../services/userService');

const path = require('path');
const fs = require('fs');
// const { deleteFile } = require('../index');

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

router.delete('/:fileName',async (req, res) => { 
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;

    const image = req.params.fileName;

    const filePath = path.join(`${process.cwd()}`, 'Images', image);

    // console.log(filePath);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error while deleting file:", err);
        } else {
            console.log(`File ${image} deleted successfully`);
        }
    });
    
    
    await userService.deleteImage(image, userId);

    res.status(204).json({ok: true});
});

router.post('/owner', async (req, res, next) => {
    const userId = req.body;   

    const result = await userService.getProfile(userId.id)
    .then(user => { res.status(200).json(user) })
    .catch(next); 

    return result;
});

router.get('/profile', async (req, res, next) => {
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;

    const result = await userService.getProfile(userId)
    .then(user => { res.status(200).json(user) })
    .catch(next); 

    return result;
});

router.put('/profile', async (req, res, next) => {
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;
    const { email, username, image } = req.body;

    const token = await userService.updateProfile(userId, email, username, image);

    // res.cookie('auth', token, { httpOnly: true })

    res.json(token);
});


module.exports = router;