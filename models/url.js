var mongoose = require('mongoose');

var Url = mongoose.model('Url',{
  original:{
    type:String,
    required:true,
    minlength: 1,
    trim: true
  },
  short:{
    type:String,
    required: true,
    minLength: 1,
    trim: true
  }
});

module.exports = {Url: Url};