const mongoose = require("mongoose");

const url_online =
	"mongodb+srv://HealthPlusAPI:HealthPlusAPI@cluster0.lzdw3.mongodb.net/HealthPlusAPI?retryWrites=true&w=majority";

const url = "mongodb://localhost/healthApp";

mongoose.connect(url_online).then(() => {
	console.log("database is now connecetd");
});

module.exports = mongoose;
