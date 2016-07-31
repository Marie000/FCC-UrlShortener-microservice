var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var PORT = process.env.PORT || 3000;

var url;

app.get('/',function(req,res){
  res.sendfile('public/index.html')
});

app.get('/new/:url',function(req,res){
  url=req.params.url;
  var isUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if(isUrl.test(url)){
    //generate a random short url
    //store original and short url in database
    res.json({"original url":url})
  } else {res.json("Please enter a valid url")}

});

app.listen(PORT,function(){
  console.log('listening on port '+PORT);
});