var express = require('express');
var app = express();
var validUrl = require('valid-url');
var {database} = require('./database/database');
var bodyParser = require('body-parser');
var {Url} = require('./models/url');

var PORT = process.env.PORT || 3000;

var url;

app.use(express.static('public'));


var encode = function(num){
  var list = "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  var base = list.length;
  var newNum = '';
  while(num){
    var remainder = num%base;
    num = Math.floor(num / base);
    newNum = newNum + list[remainder].toString()
  }
  return newNum;
};

app.get('/new/:url*',function(req,res){
  url = req.originalUrl.substring(5);
  var shortUrl;
  if(validUrl.isUri(url)){
    // generate a random short url
    // NOTE: my way of generating unique short urls is really not ideal.
    // in the future, I should save and update an index in the database instead. 
    var getShortUrl = function() {
      var newKey = Math.floor(Math.random() * 10000) + 1;
      shortUrl = encode(newKey);
      Url.findOne({short: shortUrl}).then(function (storedurl) {
        if (storedurl) {
          getShortUrl();
        } else {
          var newUrl = new Url({
            original: url,
            short: shortUrl
          });
          newUrl.save().then(function (newurl) {
            res.send('your short url: https://supertiny-url.herokuapp.com/' + newurl.short)
          }, function (error) {
            res.send('could not create a short url: ' + error);
          })
        }
      });
    }
    getShortUrl();



  } else {
    res.send("Please enter a valid url")}

});

app.get('/:short',function(req,res){
  var short = req.params.short;
  Url.findOne({short:short}).then(function(url){
    res.redirect(url.original);
  }).catch(function(e){
    res.send("could not redirect you: "+e)
  });

});

app.listen(PORT,function(){
  console.log('listening on port '+PORT);
});