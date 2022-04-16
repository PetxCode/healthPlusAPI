const hospitalModel = require("../model/hospitalModel");
const userModel = require("../model/userModel");

const createHospital = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);
		const createHospital = new hospitalModel(req.body);

		createHospital.user = getUser;
		createHospital.save();

		getUser.hospital.push(createHospital);
		getUser.save();

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

const getHospital = async (req, res) => {
	try {
		const getUser = await userModel
			.findById(req.params.id)
			.populate("hospital");

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

const updateHospital = async (req, res) => {
	try {
		const getUser = await hospitalModel.findByIdAndUpdate(
			req.params.HospitalID,
			req.body,
			{ new: true }
		);

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

const getAHospital = async (req, res) => {
	try {
		const getUser = await hospitalModel
			.findById(req.params.HospitalID)
			.populate("user");

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

const deleteHospital = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);

		const removeHospital = await hospitalModel.findByIdAndDelete(
			req.params.HospitalID
		);

		getUser.hospital.pull(removeHospital);
		getUser.save();

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

module.exports = {
	createHospital,
	getHospital,
	updateHospital,
	deleteHospital,
	getAHospital,
};
