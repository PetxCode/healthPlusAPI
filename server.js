// import express library
const express = require("express");
// connect to mongoDB using mongoose ODM
const mongoose = require("mongoose");
// Not relevant here for now
const path = require( "path" );
// defined port for local connection
const port = 3345;
// create and instance of express
const app = express();
// import the database module
require("./utils/database");

// express middleware that allows the creation of new object
app.use(express.json());

// All base route module
app.use("/api", require("./postPatch/uploadedFile"));
app.use("/api", require("./router/userRouter"));
app.use("/api", require("./router/planRouter"));
app.use("/api", require("./router/hospitalRouter"));

// allow the router to listen to the port specified
app.listen(port, () => {
	console.log("server is now connected...!");
});
