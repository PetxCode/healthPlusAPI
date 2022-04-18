// import cloudinary library to help store media on its cloud
const cloudinary = require( "cloudinary" ).v2;

// configuration for cloudinary
cloudinary.config({
	cloud_name: "dry8nywub",
	api_key: "629241972579982",
	api_secret: "Pc2-culzxkssn7oX8SIZoMLR6vc",
});

// export the configuration made
module.exports = cloudinary;
