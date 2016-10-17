var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/UrlShortener');
mongoose.promise = global.Promise;

module.exports = {mongoose: mongoose};