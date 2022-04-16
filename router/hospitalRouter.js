const express = require("express");
const router = express.Router();

const {
	createHospital,
	getHospital,
	updateHospital,
	deleteHospital,
	getAHospital,
} = require("../controller/hospitalController");

router.route("/user/:id/hospital").post(createHospital).get(getHospital);

router
	.route("/user/:id/hospital/:HospitalID")
	.patch(updateHospital)
	.get(getAHospital)
	.delete(deleteHospital);

module.exports = router;
