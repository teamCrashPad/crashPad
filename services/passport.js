const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
const keys = require('../config/keys');
var db = require("../models");

passport.serializeUser(function(user, done) {
  done(null, user);
  console.log(user);
});

passport.deserializeUser(function(email, done) {
	db.Tenant.findById(email)
	.then(user => {
		done(null, user);
	});
});

passport.use(
	new Auth0Strategy(
	{
	domain: keys.auth0domain,
	clientID: keys.auth0ClientID,
	clientSecret: keys.auth0ClientSecret,
	callbackURL: '/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){
	// console.log('access token: ', accessToken);
	// console.log('refreh token: ', refreshToken);
	// console.log('profile: ', profile);
	db.Tenant.findOne({where: {email: profile.emails[0].value}})
	.then((existingUser)=>{
		if (existingUser) {
			//already have a record with the given profile email
			console.log("success");
			done(null, existingUser);
			return done(null, profile);
		}else{
			console.log("no tenant with that email");
			//make a new record
			// new User({googleId: profile.id})
			// .save()
			// .then(user => done(null, user));
		}
	})
	
	})
);






