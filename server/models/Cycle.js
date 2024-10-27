const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name should be minimum 3 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    condition: {
        type: String,
        required: [true, 'Цondition place number is required'],
    },
    place: {
        type: String,
        required: [true, 'Populated place number is required'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    image: [
        {
        type: String,
        required: [true, 'Image is required'],
    }],
    email: {
        type: String,
    },
    date: {
        type: String,
    },
    reviews: {
        type: Number,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    commentList: [
        {
            user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            },
            username: {
                type: String,
             },
            comment: {
                type: String,
                required: [true, 'Comment is required'],
            },
            date: {
                type: String,
            },
        }
    ],
});

const Cycle = mongoose.model('Cycle', cycleSchema);

module.exports = Cycle;