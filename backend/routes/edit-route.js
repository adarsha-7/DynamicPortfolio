const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Content = require('../models/content');
const Work = require('../models/work');
require('dotenv').config();

router.post('/about-text', (req, res) => {
    Content.findOneAndUpdate(
        { },
        { $set: { "about.description": req.body.newText } },
        { new: true }
    )
    .then((content) => {
        res.json({ text: content.about.description });
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    }) 
})

cloudinary.config({
    cloud_name: 'dqff5xmgb',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const upload = multer({ storage: multer.memoryStorage() });

router.post('/about-image', upload.single('newImage'), (req, res) => {

    cloudinary.uploader.upload_stream({ 
        resource_type: 'image', 
        folder: 'portfolio-about-image' 
    }, 
    (err, result) => {
        if(err) { 
            console.error(err);
            return res.json({ error: 'Upload failed' });
        }

        const imageURL = result.secure_url;
        Content.findOneAndUpdate(
            { },
            { $set: { "about.image": imageURL } },
            { new: true }
        )
        .then((content) => {
            console.log("Upload successful: ", content.about.image);
            res.json({ image: content.about.image });
        })
        .catch((err) => {
            console.error(err);
            res.json(err);
        })
    }).end(req.file.buffer);
});

/*
if we were using diskStorage instead of memoryStorage

const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  }
}) });

router.post('/about-image', upload.single('newImage'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, { resource_type: 'image' }, (err, result) => {
        if (err) { 
            console.error(err);
            return res.json({ error: 'Upload failed' });
        }
        res.json({ image: result.secure_url });
    });
});

*/

router.put('/update-work', (req, res) => {
    Work.findOneAndUpdate(
        { title: req.body.title },
        { title: req.body.newTitle, description: req.body.newDescription, position: req.body.newPosition },
        { new: true }
      )
    .then((work) => {
        res.json(work);
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    }); 
});

router.get('/next-position', (req, res) => {
    Work.findOne()
    .sort({ position: 1 })
    .then((work) => {
        const lowestPosition = work ? work.position : 0;
        res.json({ nextPosition: lowestPosition });
    });
});


router.post('/add-work', (req, res) => {
    Work.create(req.body)
    .then((work) => {
        Work.updateMany(
            { title: { $ne: work.title } },            
            { $inc: { position: 1 } }            
        )
        .catch((err) => {
            console.error(err);
            res.json(err);
        }); 
        res.json(work);
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    }); 
})

router.delete('/delete-work', (req, res) => {
    Work.findOneAndDelete({ title: req.body.title })
    .then((work) => {
        Work.updateMany(
            { position: { $gt: work.position } },
            { $inc: { position: -1 } }            
        )
        .catch((err) => {
            console.error(err);
            res.json(err);
        }); 
        res.json(work);
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    }); 
});
module.exports = router;