// import mongoose library
const mongoose = require( "mongoose" );

// mongoDB Atlas connection string
const url_online =
	"mongodb+srv://HealthPlusAPI:HealthPlusAPI@cluster0.lzdw3.mongodb.net/HealthPlusAPI?retryWrites=true&w=majority";

// mongDB local connection string
const url = "mongodb://localhost/healthApp";

// connect your application to Atlas
mongoose.connect(url_online).then(() => {
	console.log("database is now connectd");
});

// export the connection created
module.exports = mongoose;
