// import mongoose library
const mongoose = require( "mongoose" );

// user schema
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
		// a pointer/container referencing to the "plan" schema
		plan: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "plans",
			},
		],
		// a pointer/container referencing to the "hospital" schema
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

// export user model
module.exports = mongoose.model("users", userModel);
