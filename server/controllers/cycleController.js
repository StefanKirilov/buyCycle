const router = require('express').Router();
const cycleServices = require('../services/cycleServices');

router.get('/', async (req, res) => {
    const cycles = await cycleServices.getAll();
    res.json(cycles);
});

router.post('/', async (req, res) => {
    const cycleData = req.body;
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;
    const date = new Date().toISOString();

    const cycles = await cycleServices.create({
        name: cycleData.form.name, description: cycleData.form.description, price: cycleData.form.price,
        condition: cycleData.form.condition, place: cycleData.form.place, phone: cycleData.form.phone, type: cycleData.form.type, image: cycleData.images,
        email: cycleData.email,date: date, owner: userId
    });

    res.json(cycles);

});

router.get('/:cycleId', async (req, res) => {
    const cycleId = req.params.cycleId;
    const cycle = await cycleServices.getOne(cycleId);

    res.json(cycle);
});

router.put('/:cycleId', async (req, res) => {
    const cycleId = req.params.cycleId;
    const cycleData = req.body;
    const cycle = await cycleServices.update(cycleId, cycleData);

    res.json(cycle);
});

router.delete('/:cycleId', async (req, res) => {
    const cycleId = req.params.cycleId;
    await cycleServices.delete(cycleId);

    res.status(204).json({ ok: true });
});

router.get('/:cycleId/like', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const cycleId = req.params.cycleId;
    const userId = user?._id;


    try {
        await cycleServices.like(cycleId, userId);
        res.status(204).json({ ok: true });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:cycleId/unlike', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const cycleId = req.params.cycleId;
    const userId = user?._id;

    try {
        await cycleServices.unlike(cycleId, userId);
        res.status(204).json({ ok: true });
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:cycleId/comments', async (req, res) => {
    const cycleId = req.params.cycleId;
    const { comment, username } = req.body;
    const user = req.cookies["auth"]?._id;
    const date = new Date().toISOString();

    try {
        await cycleServices.addComment(cycleId, { user, comment, username, date });
        res.status(204).json({ ok: true });
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/:cycleId/deleteComment', async (req, res) => {

    const cycleId = req.params.cycleId;
    const { elementId } = req.body;
    try {
        await cycleServices.deleteComment(cycleId, elementId);
        res.status(204).json({ ok: true });
    } catch (error) {
        console.log(error.message);
    }
});



module.exports = router;