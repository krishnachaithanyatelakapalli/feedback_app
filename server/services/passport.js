const passport = require('passport'),
			GoogleStrategy = require('passport-google-oauth20').Strategy,
      mongoose = require('mongoose');

// This is to pull a specific class from mongoose
const User = mongoose.model('users');
const keys = require('../config/keys');

// console.log("[Client ID]",keys.googleClientID);
// console.log("[Client Secret]",keys.googleClientSecret);

//*******************************************************
//              PASSPORT INITIALIZATION
//*******************************************************
passport.serializeUser((user, done) => {
  // console.log('serialize: ' + user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log('deserialize: ' + id);
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

// 'GoogleStrategy' requires 'Client ID' and 'Client Secret' as
// parameters.
passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true // proxy is 'true' to remove the error caused by http and https
	},
	// Make sure that version of node is above v8
	async (accessToken, refreshToken, profile, done) => {
		console.log('profile: ' + profile);
    // MongoDB actions are done asynchronously
    // callback is given in terms of 'Promise'
		// console.log(profile);
    const existingUser = await User.findOne({googleID: profile.id});
    if(existingUser){
      // we already have the user
      // 'done' requires 2 arguments
      // 'error', 'user-record'
      done(null, existingUser);
    } else {
      // we don't have the user and have to create a new one
			// creation of new user here is also done using Promise
      const user = await new User({
				googleID: profile.id,
				name: profile.displayName
			}).save()
			done(null, user);
    }
	}
));
