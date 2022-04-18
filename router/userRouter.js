// import express library
const express = require( "express" );
// get Router() method from express
const router = express.Router();
// import all the CRUD functions
const {
	signUser,
	getUsers,
	getUser,
	removeUser,
} = require("../controller/userController");


router
	.route( "/user" ) // endpoint for all registered users
	.get( getUsers ); // get all users

router
	.route( "/user/signin" ) // endpoint for login user in/ given access to user
	.post( signUser ); // log users in

router
	.route( "/user/:id" ) // endpoint to access a single user
	.get( getUsers ) // get a single user
	.delete( removeUser ); // delete a user

// export the router created.
module.exports = router;
