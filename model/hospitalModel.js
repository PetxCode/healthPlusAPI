// mongoose: An ODM the provides seamless connection between our app and mongoDB 
const mongoose = require( "mongoose" );

// create hospital schema
const hospitalModel = mongoose.Schema(
	{
		name: {
			type: String,
		},

		// a pointer/container to an array of users
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

// export the hospital module.
module.exports = mongoose.model("hospitals", hospitalModel);
