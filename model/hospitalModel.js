const mongoose = require("mongoose");

const hospitalModel = mongoose.Schema(
	{
		name: {
			type: String,
		},

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

module.exports = mongoose.model("hospitals", hospitalModel);
