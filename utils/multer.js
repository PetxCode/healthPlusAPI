// import multer library for local media storage
const multer = require( "multer" );
// import the path module
const path = require( "path" );


// function to store our media
const storage = multer.diskStorage( {
	// storage destination
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	// filename configuration
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round( Math.random() * 1e9 );
		const extensionName = path.extname( file.originalname );
		if ( extensionName === 'jpg' || extensionName === 'jpeg' || extensionName === 'png' ) {
			cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
		} else {
			cb( null, 'Unsupported File Formate', false)
		}
	},
});

// function to upload images to the storage created above/desired location
const upload = multer({ storage: storage }).single("avatar");

// export the upload function
module.exports = upload;
