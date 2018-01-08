var request = require('request');
var chai = require('chai');
var expect = chai.expect;
let listPhotosDefSize = 10;
let imgSmallDefSize = "380x240";
let imgMediumDefSize = "384x288";
let imgLargeDefSize = "640x480";
var photosUpdateUrl = "http://localhost:3000/updatephotos";
var listPhotosUrl = "http://localhost:3000/listphotos";
var photosUpdateMsgOK = "Photos updated!";

describe('PhotosUpdate', function() {
  it(photosUpdateUrl + ' should return no error if Photos are successfuly updated', function() {
    request(photosUpdateUrl, function (error, response, body) {
        var photoUpdatedError = "";
        if (error || response.statusCode == 200 || !body.equals(photosUpdateMsgOK)){
            photoUpdatedError = "error";
        }
        expect(photoUpdatedError).to.equal("");
    });
  });
});

describe('ListPhotos', function() {
  it(listPhotosUrl + ' should return an array of ' + listPhotosDefSize +' photos', function() {
    request(photosUpdateUrl, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      expect(jsonBody.length).to.equal(listPhotosDefSize);
    });
  });
});

describe('SmallImage', function() {
  it('Images listed should have an url pointing to a small photo of ' + imgSmallDefSize + ' dimensions', function() {
    request(photosUpdateUrl, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      var imgSize = "";
      Jimp.read(jsonBody[0].smallUrl, function (err, image) {
        imgSize = image.bitmap.width + "x" + image.bitmap.height;
      });
      expect(jsonBody.length).to.equal(imgSmallDefSize);
    });
  });
});

describe('MediumImage', function() {
  it('Images listed should have an url pointing to a medium photo of ' + imgMediumDefSize + ' dimensions', function() {
    request(photosUpdateUrl, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      var imgSize = "";
      Jimp.read(jsonBody[0].mediumUrl, function (err, image) {
        imgSize = image.bitmap.width + "x" + image.bitmap.height;
      });
      expect(jsonBody.length).to.equal(imgMediumDefSize);
    });
  });
});

describe('LargeImage', function() {
  it('Images listed should have an url pointing to a large photo of ' + imgLargeDefSize + ' dimensions', function() {
    request(photosUpdateUrl, function (error, response, body) {
      var jsonBody = JSON.parse(body);
      var imgSize = "";
      Jimp.read(jsonBody[0].largeUrl, function (err, image) {
        imgSize = image.bitmap.width + "x" + image.bitmap.height;
      });
      expect(jsonBody.length).to.equal(imgLargeDefSize);
    });
  });
});