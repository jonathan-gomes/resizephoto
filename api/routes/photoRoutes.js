'use strict';

module.exports = function(app) {
	var resizePhotos = require('../controllers/resizePhotosController');

	app.route('/listphotos')
		.get(resizePhotos.list_all_photos);

	app.route('/updatephotos')
		.get(resizePhotos.update_photos);

	app.route('/small/:photoId')
		.get(resizePhotos.get_image);
	app.route('/medium/:photoId')
		.get(resizePhotos.get_image);
	app.route('/large/:photoId')
		.get(resizePhotos.get_image);

};
