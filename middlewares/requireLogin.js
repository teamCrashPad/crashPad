
module.exports = (req, res, next) => {
	req.session.returnTo = req.path; 
	if (!req.user) {
		return res.status(401).redirect('/login');
	}

	next();
}