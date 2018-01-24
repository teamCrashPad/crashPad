
module.exports = (req, res, next) => {
	req.session.returnTo = req.originalUrl; 
	if (!req.user) {
		return res.status(401).redirect('/login');
	}

	next();
}