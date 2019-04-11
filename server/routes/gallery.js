const express = require('express');
const router = express.Router();
// var sequenceGenerator = require('./sequenceGenerator');
const Gallery = require('../models/art');
const multer = require("multer");

const fileType = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// function returnError(res, error) {
//   res.status(500).json({
//     message: 'An error occurred',
//     error: error
//   });
// }

// router.get("", (req, res, next) => {
//   Gallery.find().then(documents => {
//     res.status(200).json({
//       message: "Gallery fetched successfully!",
//       gallery: documents
//     });
//   });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = fileType[file.type];
    let error = new Error("Invalid file type");
    if (isValid) {
      error = null;
    }
    cb(error, 'server/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = fileType[file.type];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const gallery = new Gallery({
      imagePath: url + "/images/" + req.file.filename,
      title: req.body.title,
      description: req.body.description
    });
    gallery.save().then(createdArt => {
      res.status(201).json({
        message: "Art added successfully",
        gallery: {
          ...createdArt,
          id: createdArt.id
        }
      });
    });
  }
);

router.put( "/:id", multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const gallery = new Gallery({
      id: req.body.id,
      imagePath: imagePath,
      title: req.body.title,
      description: req.body.description
    });
    console.log(gallery);
    Gallery.updateOne({ _id: req.params.id }, gallery).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Gallery.find().then(art => {
    res.status(200).json({
      message: "Gallery fetched successfully!",
      gallery: art
    });
  });
});

router.get("/:id", (req, res, next) => {
  Gallery.findById(req.params.id).then(art => {
    if (art) {
      res.status(200).json(art);
    } else {
      res.status(404).json({ message: "Gallery not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Gallery.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Gallery deleted!" });
  });
});

module.exports = router;
