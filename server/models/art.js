var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    imagePath: {type: String}
});

module.exports = mongoose.model('Art', schema);