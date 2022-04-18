// import mongoose library
const mongoose = require( "mongoose" );

// creating a planSchema
const planModel = mongoose.Schema(
	{
		name: {
			type: String,
		},

		// a pointer/container for users schema
		user: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
	},
	{
		timestamps: true,
	}
);

// export the planeModel
module.exports = mongoose.model("plans", planModel);
