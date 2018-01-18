const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
const keys = require('../config/keys');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
	new Auth0Strategy(
	{
	domain: keys.auth0domain,
	clientID: keys.auth0ClientID,
	clientSecret: keys.auth0ClientSecret,
	callbackURL: '/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){
	console.log('access token: ', accessToken);
	console.log('refreh token: ', refreshToken);
	console.log('profile: ', profile);
	return done(null, profile);
	})
);

passport.use(
	new Auth0Strategy(
	{
	domain: keys.auth0domainManager,
	clientID: keys.auth0ClientIDManager,
	clientSecret: keys.auth0ClientSecretManager,
	callbackURL: '/landlord/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){
	console.log('access token: ', accessToken);
	console.log('refreh token: ', refreshToken);
	console.log('profile: ', profile);
	return done(null, profile);
	})
);




