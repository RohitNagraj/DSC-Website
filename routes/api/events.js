const express = require('express');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require('path');

const router = express.Router();

//Event model
const Event = require('../../models/Event');


cloudinary.config({
    cloud_name: 'developer-student-club',
    api_key: '222673867535157',
    api_secret: '5WtW2gQdTnH6Z-UjNmTzCRGQ4Qs'
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});


const parser = multer({ storage: storage });
// app.post('/api/images', parser.single("image"), (req, res) => {
//     console.log(req.file) // to see what is returned to you
//     const image = {};
//     image.url = req.file.url;
//     image.id = req.file.public_id;
//     Image.create(image) // save image information in database
//         .then(newImage => res.json(newImage))
//         .catch(err => console.log(err));
// });

const { ensureAuthenticated } = require('../../config/auth');


// @route   GET /events
// @desc    Get all events
// @access  Public
router.get('/events', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        //.then(events => res.json(events))
        .then(res.render("event.ejs",{
            name:Event.find()[0]["contact"]["name"],
            date:Event.find()[0]["date"]
            
        }))
        .catch(err => res.status(404).json(err))
});


// @route   POST api/events
// @desc    Add new post
// @access  Private
router.post('/', parser.single("image"), ensureAuthenticated, (req, res) => {
    console.log(req.file); // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;

    const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        day: req.body.day,
        venue: req.body.venue,
        host: req.body.host,
        description: req.body.description,
        contact: {
            name: req.body.contact_name,
            phone: req.body.contact_phone,
            email: req.body.contact_email
        },
        image: {
            url: req.file.url,
            id: req.file.public_id
        }
    });
    newEvent.save()
        .then(event => res.json(event))
        .catch(err => res.json(err));

});

// @route   DELETE api/events
// @desc    Delete a post
// @access  Private
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ Success: true })))
        .catch(err => res.status(404).json({ Success: false }))
});

module.exports = router;
