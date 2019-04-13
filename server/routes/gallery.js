const express = require('express');
const router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');
const Art = require('../models/art');
const multer = require("multer");

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.post('/', (req, res, next) => {
  const maxArtId = sequenceGenerator.nextId("arts");
  //console.log('req in gallery', req);
  const gallery = new Art({
    id: maxArtId,
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    imgagFile: req.body.imgagFile
  });

  gallery.save()
    .then(createdArt => {
      //console.log('createdArt in gallery', createdArt);
      res.status(201).json({
        message: 'Art added successfully',
        id: createdArt
      });
    })
    .catch(error => {
      //console.log("ERROR IN GALLERY",error);
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  console.log("PUT MSG", req.body);
  const gallery = Art;
   gallery.findOne({ id: req.params.id })
    .then(gallery => {
      const updated = {
        id: req.body.id,
        imagePath: req.body.imagePath,
        title: req.body.title,
        description: req.body.description,
        imageFile: req.body.imgagFile
      }
      console.log("updated", updated);
      gallery.updateOne({ id: req.params.id }, {imagePath: req.body.imagePath}, {title: req.body.title}, {description: req.body.description})
        .then(result => {
          res.status(204).json({
            message: 'Art updated successfully'})
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Art not found.',
        error: { gallery: 'Art not found'}
      });
    });
});

router.get('/', (req, res, next) => {
  Art.find()
    .then(gallery => {
      //console.log('fish');
      //console.log(gallery);
      res.status(200).json({
        message: 'Art fetched successfully',
        gallery: gallery
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.get("/:id", (req, res, next) => {
  //console.log('GET MSG', )
  Art.findById(req.params.id).then(art => {
    if (art) {
      res.status(200).json(art);
    } else {
      res.status(404).json({ message: "Art not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Art.deleteOne({ id: req.params.id }).then(result => {
    //console.log(result);
    res.status(200).json({ message: "Art deleted!" });
  });
});

module.exports = router;
