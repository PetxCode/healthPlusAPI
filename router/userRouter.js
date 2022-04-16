const express = require("express");
const router = express.Router();
const {
	signUser,
	getUsers,
	getUser,
	removeUser,
} = require("../controller/userController");

router.route("/user").get(getUsers);

router.route("/user/signin").post(signUser);

router.route("/user/:id").get(getUsers).delete(removeUser);

module.exports = router;
