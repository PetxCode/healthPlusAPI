// import user module
const userModel = require( "../model/userModel" );
// import bcrypt module from encrypting password
const bcrypt = require( "bcrypt" );
// import jsonwebtoken library
const jwt = require("jsonwebtoken");

// create a function to users
const getUsers = async (req, res) => {
	try {
		// get all users
		const getUsers = await userModel.find();

		// send response
		res.status(200).json({
			message: "success",
			data: getUsers,
		} );
		// catch all available response
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function to get a single user
const getUser = async (req, res) => {
	try {
		// get a user by id
		const getUsers = await userModel.findById(req.params.id);

		// send a response
		res.status(200).json({
			message: "success",
			data: getUsers,
		} );
		// catch any available response
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function to remove user
const removeUser = async (req, res) => {
	try {
		// remove user by id
		const getUsers = await userModel.findByIdAndDelete(req.params.id);

		// send a response
		res.status(200).json({
			message: "success",
			data: getUsers,
		} );
		// catch any available error
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function to sign in user`
const signUser = async (req, res) => {
	try {
		// extract email, password from the request body
		const { email, password } = req.body;
		// get one user by email
		const getUser = await userModel.findOne( email );
		// checks if there is a user
		if ( getUser ) {
			// compare the current password and the stored password
			const passCheck = await bcrypt.compare(password, getUser.password);

			// checks if there is a match in the password
			if ( passCheck ) {
				// modify the old user data with the current password and all initial keys 
				const { password, ...info } = getUser._doc;
				// create a sign in
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

				// send a response
				res.status(200).json({
					message: "welcome back",
					data: { token, ...info },
				} );
				// incorrect password
			} else {
				res.status(500).json({
					message: "password is incorrect",
				});
			}
			// Could not find email
		} else {
			res.status(500).json({
				message: "email not found",
			});
		}
		// catch all errors
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
