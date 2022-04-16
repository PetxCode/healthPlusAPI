const mongoose = require("mongoose");

const planModel = mongoose.Schema(
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

module.exports = mongoose.model("plans", planModel);
