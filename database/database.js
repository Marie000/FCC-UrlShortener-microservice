var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UrlShortener');
mongoose.promise = global.Promise;

module.exports = {mongoose: mongoose};