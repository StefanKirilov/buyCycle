const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAll = () => Comment.find();

exports.create = (commentData) => Comment.create(commentData);

exports.getOne = (commentId) => Comment.findById(commentId);

exports.update = (commentId,commentData) => Comment.findByIdAndUpdate(commentId,commentData);

exports.delete = (commentId) => Comment.findByIdAndDelete(commentId);

exports.like = async (commentId, userId) =>{
    const comment = await Comment.findById(commentId);
    // const user = await User.findById(userId);

    comment.likes.push(userId);
    // user.likedHouses.push(bookingId);

    await comment.save();
    // await user.save();

    return;
};

exports.unlike = async (commentId, userId) =>{
    const comment = await Comment.findById(commentId);
    // const user = await User.findById(userId);

    comment.likes.pull(userId);
    // user.likedHouses.pull(bookingId);

    await comment.save();
    // await user.save();

    return;
};

// exports.addComment = async (sushiId, commentData) =>{
//     const sushi = await Sushi.findById(sushiId);
//     sushi.commentList.push(commentData);
//     await sushi.save();

//     return sushi;
// };


// exports.deleteComment = async (sushiId, commentId) =>{
//     const sushi = await Sushi.findById(sushiId);
//     const comment = sushi.commentList.filter(x => x._id.toString() === commentId)[0];
    
//     sushi.commentList.pull(comment);
//     await sushi.save();

//     return sushi;
// };