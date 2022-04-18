// import hospital module
const hospitalModel = require( "../model/hospitalModel" );
// import user module
const userModel = require( "../model/userModel" );

// function to create user
const createHospital = async (req, res) => {
	try {
		// get user by their id
		const getUser = await userModel.findById( req.params.id );
		// create new hospital
		const createHospital = new hospitalModel(req.body);

		// the specific user content is tied to the found user
		createHospital.user = getUser;
		// save the create action
		createHospital.save();
		// push the saved user to the hospital
		getUser.hospital.push( createHospital );
		// save the action
		getUser.save();

		// send a response
		res.status(200).json({
			status: "success",
			data: createHospital,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function to get all hospital
const getHospital = async (req, res) => {
	try {
		// track a single user with id
		const getUser = await userModel
			.findById(req.params.id) 
			.populate("hospital"); // show the actual data and not id of the hospital found

		// send a response
		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function to update a hospital
const updateHospital = async (req, res) => {
	try {
		// update the user
		const getUser = await hospitalModel.findByIdAndUpdate(
			req.params.HospitalID,
			req.body,
			{ new: true }
		);

		// send a response
		res.status(200).json({
			status: "success",
			data: getUser,
		} );
		// catch( available errors)
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function ot get a hospital
const getAHospital = async (req, res) => {
	try {
		// get hospital by its id.
		const getUser = await hospitalModel
			.findById(req.params.HospitalID)
			.populate("user");

		// send a response
		res.status(200).json({
			status: "success",
			data: getUser,
		} );
		// track for errors
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};


// function to delete a hopital
const deleteHospital = async (req, res) => {
	try {
		// get the user
		const getUser = await userModel.findById(req.params.id);

		// remove hospital
		const removeHospital = await hospitalModel.findByIdAndDelete(
			req.params.HospitalID
		);

		// remove the deleted data from hospital
		getUser.hospital.pull(removeHospital);
		getUser.save();

		// send a response
		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// export the necessary functions
module.exports = {
	createHospital,
	getHospital,
	updateHospital,
	deleteHospital,
	getAHospital,
};
