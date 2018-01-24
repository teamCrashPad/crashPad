const passport = require('passport');

module.exports = function(app){


	app.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
     req.session.returnTo = null;
     delete req.session.returnTo;
  }
);

	app.get('/login', passport.authenticate('auth0', {scope: ['profile', 'email', 'user_medata']}), function(req, res){
		res.redirect("/");
	});

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });


};





