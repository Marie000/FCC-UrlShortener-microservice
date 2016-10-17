var express = require('express');
var app = express();
var validUrl = require('valid-url');
var {database} = require('./database/database');
var bodyParser = require('body-parser');
var {Url} = require('./models/url');

var PORT = process.env.PORT || 3000;

var url;

app.get('/',function(req,res){
  res.sendfile('public/index.html')
});

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
    // NOTE: need to fix it so the app doesn't accidentally create the same 
    // short url twice. 
      var newKey = Math.floor(Math.random()*10000)+1;
      shortUrl = encode(newKey);
      var newUrl = new Url({
        original:url,
        short:shortUrl
      });
      newUrl.save();
      res.send('your short url: https://supertiny-url.herokuapp.com/'+newUrl.short)

  } else {
    res.send("Please enter a valid url")}

});

app.get('/:short',function(req,res){
  var short = req.params.short;
  var retrievedUrl;
  Url.findOne({short:short}).then(function(url){
    console.log(url.original);
    retrievedUrl=url.original;
    res.redirect(url.original);
  })
    //.catch(e){
    //res.send(e)
  //}

});

app.listen(PORT,function(){
  console.log('listening on port '+PORT);
});