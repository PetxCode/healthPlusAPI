const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3345;
const app = express();
require("./utils/database");

app.use(express.json());

app.use("/api", require("./postPatch/uploadedFile"));
app.use("/api", require("./router/userRouter"));
app.use("/api", require("./router/planRouter"));
app.use("/api", require("./router/hospitalRouter"));

app.listen(port, () => {
	console.log("server is now connected...!");
});
