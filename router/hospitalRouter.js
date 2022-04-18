// import express library
const express = require( "express" );
// get the Router() method from express
const router = express.Router();

// import all the CRUD functions needed.
const {
	createHospital,
	getHospital,
	updateHospital,
	deleteHospital,
	getAHospital,
} = require("../controller/hospitalController");

router
	.route( "/user/:id/hospital" ) // endpoint to access hospital
	.post( createHospital ) // create hospital
	.get( getHospital ); //get all hospitals

router
	.route("/user/:id/hospital/:HospitalID") // endpoint to access a single hospital
	.patch(updateHospital) // update a hospital
	.get(getAHospital) // get a hospital
	.delete(deleteHospital); //delete a hospital

// export this module(router)
module.exports = router;
