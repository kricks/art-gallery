var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String},
    imagePath: {type: String},
    title: {type: String},
    description: {type: String}
});

module.exports = mongoose.model('art', schema);