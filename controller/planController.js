const userModel = require("../model/userModel");
const planModel = require("../model/planModel");

const createPlan = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);
		const planData = new planModel(req.body);

		planData.user = getUser;
		planData.save();

		getUser.plan.push(planData);
		getUser.save();

		res.status(201).json({
			status: "created",
			data: planData,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const getUserPlan = async (req, res) => {
	try {
		const getPlan = await userModel.findById(req.params.id).populate("plan");
		res.status(200).json({
			status: "success",
			data: getPlan,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const getaUserPlan = async (req, res) => {
	try {
		const getPlan = await planModel
			.findById(req.params.planID)
			.populate("user");
		res.status(200).json({
			status: "success",
			data: getPlan,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// const updateUserPlan = async (req, res) => {
// 	try {
// 		const getPlan = await planModel.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true,
// 		});
// 		res.status(200).json({
// 			status: "success",
// 			data: getPlan,
// 		});
// 	} catch (err) {
// 		res.status(500).json({
// 			message: err.message,
// 		});
// 	}
// };

// const deleteUserPlan = async (req, res) => {
// 	try {
// 		const getUser = await userModel.findById(req.params.id);
// 		const deletePlan = await planModel.findByIdAndDelete(req.body.planID);

// 		getUser.plan.pull(deletePlan);
// 		getUser.save();

// 		res.status(201).json({
// 			status: "deleted",
// 			data: getUser,
// 		});
// 	} catch (err) {
// 		res.status(500).json({
// 			message: err.message,
// 		});
// 	}
// };

const updateUserPlan = async (req, res) => {
	const updatePlan = await planModel.findByIdAndUpdate(
		req.params.planID,
		req.body,
		{ new: true }
	);

	res.status(200).json({
		status: "success",
		data: updatePlan,
	});
};

const deleteUserPlan = async (req, res) => {
	const getUser = await userModel.findById(req.params.id);
	const getPlan = await planModel.findByIdAndDelete(req.params.planID);

	getUser.plan.pull(getPlan);
	getUser.save();

	res.status(200).json({
		status: "success",
		data: getUser,
	});
};

module.exports = {
	createPlan,
	getUserPlan,
	deleteUserPlan,
	updateUserPlan,
	getaUserPlan,
};
