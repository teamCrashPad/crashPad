const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
const keys = require('../config/keys');
var db = require("../models");
var request = require("request");



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	 if(user.isLandlord){
		db.Landlord.findOne({where: {email: user.email}})
		.then(user => {
			
			done(null, user);
		});
	}else{
		db.Tenant.findOne({where: {email: user.email}})
		.then(user => {
			console.log(user);
			done(null, user);
		});
	}
	
});


passport.use(
	new Auth0Strategy(
	{
	domain: keys.auth0domain,
	clientID: keys.auth0ClientID,
	clientSecret: keys.auth0ClientSecret,
	callbackURL: '/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){

	var email = profile.emails[0].value;
	var user_medata ="";
	request({ method: 'POST',
  url: keys.auth0TokenURL,
  headers: { 'content-type': 'application/json' },
  body: 
   { grant_type: 'client_credentials',
     client_id: keys.auth0ClientID,
     client_secret: keys.auth0ClientSecret,
     audience: keys.auth0Audience },
  json: true }, function (error, response, body) {
  if (error) throw new Error(error);

  //get request to get users metadata with given access_token
  request({ method: 'GET',
  url: keys.auth0EmailURL,
  qs: { email: email },
  headers: { authorization: 'Bearer '+ body.access_token} }, function (error, response, bod) {
	 if (error) throw new Error(error);
	 var body = JSON.parse(bod);

	 var isLandlord = body[0].user_metadata.is_landlord;
	 var fname = body[0].user_metadata.fname;
	 var lname = body[0].user_metadata.lname;

	 //finding user in DB
	 if(isLandlord == "true"){
	 	db.Landlord.findOne({where: {email: profile.emails[0].value}})
	 	.then((existingUser)=>{
		if (existingUser) {
			//already have a record with the given profile email

			done(null, existingUser);
			
		}else{
			console.log("no Landlord with that email");
			//make a new record
			const landlord = db.Landlord.build({
				firstName : fname,
				lastName : lname,
				email: profile.emails[0].value,
				isLandlord: isLandlord 
				
			});
			// save new Landlord
			landlord.save()
			 .then(user => done(null, user));

			}
		
		})
	 }else {
		 	db.Tenant.findOne({where: {email: profile.emails[0].value}})
		.then((existingUser)=>{
			if (existingUser) {

				//already have a record with the given profile email
				done(null, existingUser);
				
			}else{
				
				//make a new record
				const tenant = db.Tenant.build({
					email: profile.emails[0].value,
					firstName: fname,
					lastName: lname

				});
				
				tenant.save()
				 .then(user => done(null, user));

			}
			
		})
	 }

	 
 });
})
	
	
	})
);






