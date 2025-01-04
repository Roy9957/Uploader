// express, multer ও cors ইমপোর্ট করা
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// express অ্যাপ্লিকেশন তৈরি
const app = express();

// CORS কনফিগারেশন
app.use(cors());

// ফাইল আপলোডের জন্য স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // ফাইলটি কোথায় সংরক্ষণ হবে
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalnam>
    }
});

// multer মিডলওয়্যার ব্যবহার করা
const upload = multer({ storage: storage });

// ফাইল আপলোডের রুট
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.json({ message: 'File uploaded successfully', file:>
});

// ফাইল ডাউনলোডের রুট
app.get('/getFile', (req, res) => {
    const filePath = `uploads/${req.query.filename}`;
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// সার্ভার চালু
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
