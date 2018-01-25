
module.exports = (req, res, next) => {
	if (!req.user) {
		req.session.returnTo = req.originalUrl; 
		return res.status(401).redirect('/login');

	}

	next();
}