'use strict';
var request = require('request');
var mongoose = require('mongoose');

var Jimp = require("jimp");

var fs = require('fs');
var PhotoData = mongoose.model('PhotoData');
var Photo = mongoose.model('Photos');

let imgServerUrl = 'http://54.152.221.29/images.json';


exports.list_all_photos = function(req, res) {
  Photo.find({}, function(err, photo) {
    if (err)
      res.send(err);
    res.json(photo);
  });
};


exports.get_image = function(req, res) {
  PhotoData.findById(req.params.photoId, function(err, photo_data) {
    if (err){
      res.send(err);
    }else{
      var photoBase64;
      var reqUrl = req.url;
      if(reqUrl.includes("small")){
        photoBase64 = photo_data.small;
      }else if(reqUrl.includes("medium")){
        photoBase64 = photo_data.medium;
      }else if(reqUrl.includes("large")){
        photoBase64 = photo_data.large;
      }
      showImage(res, photoBase64);
    }
  });
};

function showImage(res, imageSource){
    var img = new Buffer(imageSource.replace("data:image/jpeg;base64,",""), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img); 
}


exports.update_photos = function(req, res) {
  
  var urlReq = req.protocol + '://' + req.get('host');

  var resizeSmall = function(imgUrl){
    Jimp.read(imgUrl, function (err, image) {
      image.resize(320, 240)
        .getBase64(Jimp.MIME_JPEG, function(err, src){
          resizeMedium(imgUrl, src);
        })
    });
  };

  var resizeMedium = function(imgUrl, small){
    Jimp.read(imgUrl, function (err, image) {
      image.resize(384, 288)
        .getBase64(Jimp.MIME_JPEG, function(err, src){
          resizeLarge(imgUrl, small, src);
        })
    });
  };

  var resizeLarge = function(imgUrl, small, medium){
    Jimp.read(imgUrl, function (err, image) {
      image.resize(640,480)
      .getBase64(Jimp.MIME_JPEG, function(err, src){
          create_a_photo(imgUrl, small, medium, src);
        })
    });
  };

	var create_a_photo = function(imageUrl, small, medium, large) {
    var new_photo_data = new PhotoData();
    new_photo_data.url = imageUrl;
    new_photo_data.small = small;
    new_photo_data.medium = medium;
    new_photo_data.large = large;
    new_photo_data.save(function(err, photo_data) {
        if (err){
          res.send(err);
        }
        var new_photo = new Photo();

        new_photo.url = photo_data.url;
        new_photo.smallUrl = urlReq+"/small/"+photo_data.id.toString();
        new_photo.smallFormat = "JPG 320x240";

        new_photo.mediumUrl = urlReq+"/medium/"+photo_data.id.toString();
        new_photo.mediumFormat = "JPG 384x288";

        new_photo.largeUrl = urlReq+"/large/"+photo_data.id.toString();
        new_photo.largeFormat = "JPG 640x480";

        new_photo.save(function(err, photo) {
            if (err){
              res.send(err);
            }
        });
    });
  };

  Photo.remove({}, function(err) { 
    console.log('photos removed') 
  });

  PhotoData.remove({}, function(err) { 
    console.log('photo data removed') 
  });

	request(imgServerUrl, function (error, response, body) {
    var msg = "Photos updated!";
	  if (!error && response.statusCode == 200) {
		  var jsonBody = JSON.parse(body);
      for(var i = 0; i < jsonBody.images.length; i++){
        var img = jsonBody.images[i];
        resizeSmall(img.url);
      }
	  }else{
      msg = "Error retrieving photos";
    }
    res.send(msg);
	});
};