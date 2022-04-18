// import express library
const express = require( "express" );
// import router from the router module
const router = express.Router();
// import bcrypt for helping up encrypting password
const bcrypt = require( "bcrypt" );
// not used for now
const path = require( "path" );
// import the user module
const userModel = require( "../model/userModel" );
// import cloudinary for helping us store media
const cloudinary = require( "../utils/cloudinary" );
// import the upload function from util module
const upload = require("../utils/multer");

// function to create a user
router.post("/user/create", upload, async (req, res) => {
	try {
		// destructure all the keys from the request body.
		const {
			email,
			status,
			gender,
			familyNumber,
			password,
			avatar,
			avatarID,
			fullName,
		} = req.body;

		// generate a salt
		const salt = await bcrypt.genSalt( 10 );
		// hash the password using the salt generated above
		const hashed = await bcrypt.hash(password, salt);

		// upload an image to cloudinary
		const image = await cloudinary.uploader.upload(req.file.path);

		// create a user with the create() method
		const createUser = await userModel.create({
			email,
			status,
			gender,
			familyNumber,
			password: hashed,
			avatar: image.secure_url,
			avatarID: image.public_id,
			fullName,
		});

		// send a response
		res.status(201).json({
			status: "created",
			data: createUser,
		} );
		// catch any possible error
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

// function to update a user
router.patch("/user/:id", async (req, res) => {
	try {
		// get all keys from the request body
		const {
			email,
			status,
			gender,
			familyNumber,
			password,
			avatar,
			avatarID,
			fullName,
		} = req.body;

		// get a single user by id
		const findUser = await userModel.findById(req.params.id);

		// check if the user exist
		if ( findUser ) {
			// wait for cloudinary to delete the existing file
			await cloudinary.uploader.destroy( findUser.avatarID );
			// upload the updated media
			const image = await cloudinary.uploader.upload();
			// update the user data
			const updateUser = await userModel.findByIdAndUpdate(
				req.params.id,
				{
					status,
					familyNumber,
					avatar: image.secure_url,
					avatarID: image.public_id,
					fullName,
				},
				{ new: true }
			);
			
			// send a response
			res.status(201).json({
				status: "updated",
				data: updateUser,
			});
		}
		// send an error
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

// export the module
module.exports = router;
