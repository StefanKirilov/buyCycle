const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const userService = require('./services/userService');

const app = express();

// const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {  
        cb(null, Date.now() + path.extname(file.originalname));  
    }
})

const upload = multer({storage: storage})

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(routes);

// upload the file
app.use("/Images", express.static("Images"));

app.post('/upload',upload.single('file') , async (req, res) => {
    const user = JSON.parse(req.cookies["auth"]);
    const userId = user?._id;

    if (!req.file) {
        console.log("Select image file to upload!");
        return
    }
    if (req.file.mimetype !== 'image/jpeg') {
        console.log("Please select JPG image to upload!"); 
        return
    };

    // res.json(filename);

    const data = req.file.filename;

    // const filename = req.file.filename;

    try {      
        let user = await userService.uploadImage(data, userId)
        console.log(user);
        
        res.json(user);
    } catch (error) {
        console.log(error.message);
    }

});

// const deleteFile = (filename) => {
//     const filePath = path.join(__dirname, 'Images', filename);

//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error("Error while deleting file:", err);
//         } else {
//             console.log(`File ${filename} deleted successfully`);
//         }
//     });
// };

// module.exports = { deleteFile }

mongoose.connect('mongodb://localhost:27017/buyCycle')
.then(() => console.log('DB connected'));

app.listen(5000, () => console.log('Sever is running on port 5000'));