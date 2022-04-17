const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
	const authToken = req.headers.authorization;
	if (authToken) {
		const token = authToken.split(" ")[1];
		if (token) {
			jwt.verify(token, "ThisisTheTimeEver", (err, payload) => {
				if (err) {
					res.status(500).json({ message: err.message });
				} else {
					req.user = payload;
					next();
				}
			});
		} else {
			res.status(500).json({ message: "token isn't correct" });
		}
	} else {
		res
			.status(500)
			.json({ message: "You are not Authorized for thisi Action" });
	}
};

module.exports = verify;
