angular
		.module('PictureService', ['ngCordova'])
		.factory(
				'PictureCaptureUploadService',

				function($cordovaCamera) {

					var serverURL = "http://localhost:8080/LocationCast/rest/conversation/image";

					// Upload image to server
					var upload = function(imageURI) {
						var ft = new FileTransfer();

						var options = new FileUploadOptions();

						options.fileKey = "file";
						options.fileName = 'filename.jpg'; // We will
						// use the
						// name
						// auto-generated
						// by Node
						// at the
						// server
						// side.
						options.mimeType = "image/jpeg";
						options.chunkedMode = false;
						options.params = { // Whatever you populate
							// options.params with, will
							// be available in req.body
							// at the server-side.
							"description" : "Uploaded from my phone"
						};

						ft.upload(imageURI, serverURL, function(e) {
							console.log("Image URI" + imageURI);
						}, function(e) {
							alert("Upload failed");
						}, options);
					},

					// Take a picture using the camera or select one
					// from the library
					takePicture = function() {
						var options = {
							quality : 45,
							targetWidth : 1000,
							targetHeight : 1000,
							destinationType : Camera.DestinationType.FILE_URI,
							encodingType : Camera.EncodingType.JPEG,
							sourceType : Camera.PictureSourceType.CAMERA
						};

						$cordovaCamera.getPicture(function(imageURI) {
							console.log(imageURI);
							upload(imageURI);
						}, function(message) {
							// We typically get here because the use
							// canceled the photo operation. Fail
							// silently.
						}, options);

						return false;

					};
					 
					return {
					        
					        takePicture : takePicture
					        
					};

				});