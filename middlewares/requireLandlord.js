module.exports = (req, res, next) => {
	if (!req.user.isLandlord) {
		return res.status(401).send({ error: 'Access Denied'});
	}

	next();
}