const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	cookieSession = require('cookie-session'),
	bodyParser = require('body-parser');

// Make sure that model class files are run before they are called
require('./models/User');
require('./models/Survey');
require('./services/passport');
const Keys = require('./config/keys');

//**************************************
//		APP & COOKIE SETUP (MIDDLEWARE)
//**************************************
app.use(bodyParser.json());
app.use(
	cookieSession({
		// Time to Expire - 30 days (DD:HH:MM:SS:mS)
		maxAge: 30*24*60*60*1000,
		// Secret - self created
		keys: [Keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Make sure that the below line of code is always after
// defining all the app.use() functions
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//**************************************
//				MONGOOSE SETUP
//**************************************
mongoose.Promise = global.Promise;
const mongoDBURI = Keys.mongoURI || 'mongodb://localhost/feedback_app';
mongoose.connect(mongoDBURI, {useMongoClient: true});

//**************************************
//	         PRODUCTION
//**************************************
if (process.env.NODE_ENV === 'production') {
	// Express wil serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

//**************************************
//				SERVER
//**************************************
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
	console.log('Server Started');
});
