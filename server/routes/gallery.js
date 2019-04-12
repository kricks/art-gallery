const express = require('express');
const router = express.Router();
// var sequenceGenerator = require('./sequenceGenerator');
const Art = require('../models/art');
const multer = require("multer");

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

// router.get('/', (req, res, next) => {
//   Art.find()
//     .then(art => {
//       res.status(200).json({
//         message: 'art fetched successfully',
//         art: art
//       });
//     })
//     .catch(error => {
//       returnError(res, error);
//     });
//   }
// );

router.post('/', (req, res, next) => {
  // const maxDocumentId = sequenceGenerator.nextId("documents");

  const gallery = new Art({
    id: req.body.id,
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    imgagFile: req.body.imgagFile
  });

  gallery.save()
    .then(createdArt => {
      res.status(201).json({
        message: 'Art added successfully',
        id: createdArt
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  gallery .findOne({ id: req.params.id })
    .then(gallery => {
      gallery.id = req.body.id,
      gallery.imagePath = req.body.imagePath,
      gallery.title = req.body.title,
      gallery.description = req.body.description,
      gallery.imageFile = req.body.imgagFile

      gallery.updateOne({ id: req.params.id }, gallery)
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

// router.delete("/:id", (req, res, next) => {
//   Art.findOne({ id: req.params.id })
//     .then(gallery => {
//       Art.deleteOne({ id: req.params.id })
//         .then(result => {
//           res.status(204).json({ message: "Art deleted successfully" });
//         })
//         .catch(error => {
//           returnError(res, error);
//         })
//     })
//     .catch(error => {
//       returnError(res, error);
//     });
// });


// const fileType = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = fileType[file.type];
//     let error = new Error("Invalid file type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, 'server/images');
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = fileType[file.type];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });

// router.post('/', multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     const url = req.protocol + "://" + req.get("host");
//     const gallery = new Art({
//       imagePath: url + "/images/" + req.filename,
//       title: req.body.title,
//       description: req.body.description
//     });
//     gallery.save().then(createdArt => {
//       res.status(201).json({
//         message: "Art added successfully",
//         gallery: {
//           ...createdArt,
//           id: createdArt.id
//         }
//       });
//     });
//   }
// );

// router.put( "/:id", multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename
//     }
//     const gallery = new Art({
//       id: req.body.id,
//       imagePath: imagePath,
//       title: req.body.title,
//       description: req.body.description
//     });
//     console.log(gallery);
//     Art.updateOne({ id: req.params.id }, gallery).then(result => {
//       res.status(200).json({ message: "Update successful!" });
//     });
//   }
// );

// router.get('/', (req, res, next) => {
//   Art.find().then(documents => {
//     console.log('fishsticks');
//       console.log(documents);
//     res.status(200).json({
//       message: "SOmething fetched successfully!",
//       gallery: documents
//     });
//   });
// });


router.get('/', (req, res, next) => {
  Art.find()
    .then(gallery => {
      console.log('fish');
      console.log(gallery);
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
    console.log(result);
    res.status(200).json({ message: "Art deleted!" });
  });
});

module.exports = router;
