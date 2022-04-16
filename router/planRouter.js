const express = require("express");
const {
	createPlan,
	getUserPlan,
	deleteUserPlan,
	updateUserPlan,
	getaUserPlan,
} = require("../controller/planController");
const router = express.Router();

router.route("/user/:id/plan").post(createPlan).get(getUserPlan);

router
	.route("/user/:id/plan/:planID")
	.get(getaUserPlan)
	.patch(updateUserPlan)
	.delete(deleteUserPlan);

module.exports = router;
