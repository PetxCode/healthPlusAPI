const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
// const path = require("path")
const userModel = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/user/create", upload, async (req, res) => {
	try {
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

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

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

		res.status(201).json({
			status: "created",
			data: createUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

router.patch("/user/:id", async (req, res) => {
	try {
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

		const findUser = await userModel.findById(req.params.id);

		if (findUser) {
			await cloudinary.uploader.destroy(findUser.avatarID);
			const image = await cloudinary.uploader.upload();
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

			res.status(201).json({
				status: "updated",
				data: updateUser,
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

module.exports = router;
