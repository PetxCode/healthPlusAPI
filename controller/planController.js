// import user module
const userModel = require( "../model/userModel" );
// update the plan module
const planModel = require( "../model/planModel" );

// function to create a user
const createPlan = async (req, res) => {
	try {
		// get user by its id.
		const getUser = await userModel.findById( req.params.id );
		// get the data present in the plan schema
		const planData = new planModel(req.body);

		// map the plan to user
		planData.user = getUser;
		// save the action
		planData.save();

		// push the new plan created 
		getUser.plan.push( planData );
		// save the action
		getUser.save();

		// send a response
		res.status(201).json({
			status: "created",
			data: planData,
		} );
		// track available errors
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// ge a single plan
const getUserPlan = async (req, res) => {
	try {
		// find a user
		const getPlan = await userModel.findById( req.params.id ).populate( "plan" );
		// send a response
		res.status(200).json({
			status: "success",
			data: getPlan,
		} );
		// catch available errors
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// function a get a single plan
const getaUserPlan = async (req, res) => {
	try {
		// get plan by id.
		const getPlan = await planModel
			.findById(req.params.planID)
			.populate( "user" );
		// send a response
		res.status(200).json({
			status: "success",
			data: getPlan,
		} );
		// catch any available error
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

// function to update a plan
const updateUserPlan = async (req, res) => {
	const updatePlan = await planModel.findByIdAndUpdate(
		req.params.planID,
		req.body,
		{ new: true }
	);

	// send a response
	res.status(200).json({
		status: "success",
		data: updatePlan,
	});
};

// remove a single plan
const deleteUserPlan = async ( req, res ) => {
	// get user by id
	const getUser = await userModel.findById( req.params.id );
	// get plan by id
	const getPlan = await planModel.findByIdAndDelete(req.params.planID);

	// remove plan from user
	getUser.plan.pull( getPlan );
	// save the action
	getUser.save();

	// send a response
	res.status(200).json({
		status: "success",
		data: getUser,
	});
};

// export all functions
module.exports = {
	createPlan,
	getUserPlan,
	deleteUserPlan,
	updateUserPlan,
	getaUserPlan,
};
