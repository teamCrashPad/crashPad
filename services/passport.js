const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
const keys = require('../config/keys');

passport.use(
	new Auth0Strategy(
	{
	domain: keys.auth0domain,
	clientID: keys.auth0ClientID,
	clientSecret: keys.auth0ClientSecret,
	callbackURL: '/callback'
}, function(accessToken, refreshToken, profile, done){
	console.log('access token: ', accessToken);
	console.log('refreh token: ', refreshToken);
	console.log('profile: ', profile);

	})
);

