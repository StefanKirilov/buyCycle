const Cycle = require('../models/Cycle');
const User = require('../models/User');

exports.getAll = () => Cycle.find();

exports.create = (data) => Cycle.create(data);

exports.getOne = (cycleId) => Cycle.findById(cycleId);

exports.update = (cycleId,data) => Cycle.findByIdAndUpdate(cycleId,data);

exports.delete = (cycleId) => Cycle.findByIdAndDelete(cycleId);

exports.like = async (cycleId, userId) =>{
    const cycle = await Cycle.findById(cycleId);
    // const user = await User.findById(userId);

    cycle.likes.push(userId);
    // user.likedHouses.push(bookingId);

    await cycle.save();
    // await user.save();

    return;
};

exports.unlike = async (cycleId, userId) =>{
    const cycle = await Cycle.findById(cycleId);
    // const user = await User.findById(userId);

    cycle.likes.pull(userId);
    // user.likedHouses.pull(bookingId);

    await cycle.save();
    // await user.save();

    return;
};

// exports.addComment = async (cycleId, commentData) =>{
//     const cycle = await Cycle.findById(cycleId);
//     cycle.commentList.push(commentData);
//     await cycle.save();

//     return cycle;
// };


// exports.deleteComment = async (cycleId, commentId) =>{
//     const cycle = await Cycle.findById(cycleId);
//     const comment = cycle.commentList.filter(x => x._id.toString() === commentId)[0];
    
//     cycle.commentList.pull(comment);
//     await cycle.save();

//     return cycle;
// };