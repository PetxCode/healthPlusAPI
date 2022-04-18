// import express library
const express = require( "express" );
// import all CRUD functions
const {
	createPlan,
	getUserPlan,
	deleteUserPlan,
	updateUserPlan,
	getaUserPlan,
} = require( "../controller/planController" );
// get the router method from express
const router = express.Router();

// 
router
	.route( "/user/:id/plan" ) // endpoint to access user plan
	.post( createPlan ) // get plan
	.get( getUserPlan ); //get all plans

router
	.route("/user/:id/plan/:planID") // endpoint for accessing single plan
	.get(getaUserPlan) // get a single plan
	.patch(updateUserPlan) // update a single plan
	.delete(deleteUserPlan); // delete a single plan

// export the module(router)
module.exports = router;
