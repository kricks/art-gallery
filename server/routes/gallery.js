var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

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
  const maxDocumentId = sequenceGenerator.nextId("gallery");

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
  Document.findOne({ id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'})
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Document deleted successfully" });
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
