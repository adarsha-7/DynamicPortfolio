const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const Work = require('../models/work');

router.get('/', async (req, res) => {
    try {
        const content = await Content.findOne();
        const works = await Work.find();

        const ret = {
            resume: content.resume,
            about: {
                image: content.about.image,
                description: content.about.description
            },
            works: works
        };
        res.json(ret);
    }
    catch(err) {
        console.error(err);
        res.json({ message: "Error fetching data" });
    }
})

module.exports = router;