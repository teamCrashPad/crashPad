const passport = require('passport');

module.exports = function(app){


	app.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  }
);

	app.get('/login', passport.authenticate('auth0', {scope: ['profile', 'email']}), function(req, res){
		res.redirect("/");
	});


};





