// import jsonwebtoken library
const jwt = require( "jsonwebtoken" );

// function to help us verify a user with jwt
const verify = async ( req, res, next ) => {
	// extract the content of the authorization head
	const authToken = req.headers.authorization;
	// validate the authorization head
	if ( authToken ) {
		// split the value of the authorization head by space and grab the string in the second position(i.e index 1). finally store it on the variable name "token".
		const token = authToken.split( " " )[ 1 ];
		// checks if the authorization head contains a token
		if ( token ) {
			// verify the token by sending either an error or the user as the payload
			jwt.verify( token, "ThisisTheTimeEver", ( err, payload ) => {
				// checks for error
				if (err) {
					res.status(500).json({ message: err.message });
				} else {
					req.user = payload;
					next();
				}
			} );
			// return error if there is no token
		} else {
			res.status(500).json({ message: "token isn't correct" });
		}
	} else {
		// throws error if the authorization head is not set
		res
			.status(500)
			.json({ message: "Authorization head is not set." });
	}
};

// export the verification function
module.exports = verify;
