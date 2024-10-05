const router = require('express').Router();
const commentService = require('../services/commentService');

router.get('/',async (req, res) => {
    const comments = await commentService.getAll();
    res.json(comments);
});

router.post('/',async (req, res) => {
    const newComment = req.body.comment;
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;
    const username = user?.username;
    const date = new Date().toISOString();


    const comment = await commentService.create({ owner: userId, username: username, comment: newComment, date: date});

    res.json(comment);
});

router.put('/:commentId',async (req, res) => {
    const commentId = req.params.commentId;
    const commentData = req.body;
    const date = new Date().toISOString();
    const data = {...commentData, date: date}
    
    const comment = await commentService.update(commentId, data);

    res.json(comment);
});

router.delete('/:commentId',async (req, res) => {
    const commentId = req.params.commentId;
    await commentService.delete(commentId);

    res.status(204).json({ok: true});
});

router.get('/:commentId/like', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const commentId = req.params.commentId;
    const userId = user?._id;


    try {
        await commentService.like(commentId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:commentId/unlike', async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);

    const commentId = req.params.commentId;
    const userId = user?._id;

    try {
        await commentService.unlike(commentId, userId);
        res.status(204).json({ok: true});
    } catch (error) {
        console.log(error.message);
    }
});



module.exports = router;