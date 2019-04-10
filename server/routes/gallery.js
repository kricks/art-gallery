var express = require('express');
var router = express.Router();
// var sequenceGenerator = require('./sequenceGenerator');

const Gallery = require('../models/art');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Gallery.find()
    .then(documents => {
      res.status(200).json({
        message: 'Gallery fetched successfully',
        documents: documents
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.post('/', (req, res, next) => {
  // const maxDocumentId = sequenceGenerator.nextId("gallery");

  const gallery = new Gallery({
    id: maxGalleryId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  gallery.save()
    .then(createdGallery => {
      res.status(201).json({
        message: 'Gallery added successfully',
        documentId: createdDocument
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Gallery.findOne({ id: req.params.id })
    .then(document => {
      gallery.name = req.body.name;
      gallery.description = req.body.description;
      gallery.url = req.body.url;

      Gallery.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Gallery updated successfully'})
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Gallery not found.',
        error: { document: 'Gallery not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
    Gallery.findOne({ id: req.params.id })
    .then(document => {
        Gallery.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Gallery deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
