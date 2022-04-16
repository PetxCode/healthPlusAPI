const mongoose = require("mongoose");

const userModel = mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		status: {
			type: String,
		},
		password: {
			type: String,
		},
		gender: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		plan: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "plans",
			},
		],
		hospital: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "hospitals",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userModel);
