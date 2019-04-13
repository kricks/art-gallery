
var Sequence = require('../models/sequence');

var maxArtId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      ////console.log(sequence);
      sequenceId = sequence._id;
      maxArtId = sequence.maxArtId;

    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "arts":
    maxArtId++;
      updateObject = {maxArtId: maxArtId};
      nextId = maxArtId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function (err) {
      if (err) {
        ////console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
