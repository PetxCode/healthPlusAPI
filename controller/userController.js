const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
	try {
		const getUsers = await userModel.find();

		res.status(200).json({
			message: "success",
			data: getUsers,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const getUsers = await userModel.findById(req.params.id);

		res.status(200).json({
			message: "success",
			data: getUsers,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const removeUser = async (req, res) => {
	try {
		const getUsers = await userModel.findByIdAndDelete(req.params.id);

		res.status(200).json({
			message: "success",
			data: getUsers,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const signUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const getUser = await userModel.findOne(email);
		if (getUser) {
			const passCheck = await bcrypt.compare(password, getUser.password);

			if (passCheck) {
				const { password, ...info } = getUser._doc;
				const token = jwt.sign(
					{
						_id: getUser._id,
						email: getUser.email,
						fullName: getUser.fullName,
						avatar: getUser.avatar,
						status: getUser.status,
						gender: getUser.gender,
					},
					"ThisisTheTimeEver",
					{ expiresIn: "2d" }
				);

				res.status(200).json({
					message: "welcome back",
					data: { token, ...info },
				});
			} else {
				res.status(500).json({
					message: "password is incorrect",
				});
			}
		} else {
			res.status(500).json({
				message: "email not found",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	signUser,
	getUsers,
	getUser,
	removeUser,
};
