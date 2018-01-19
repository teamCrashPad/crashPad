module.exports = (req, res, next) => {
	if (req.user.isLandlord == "true") {
		next();
		
	}else{
		return res.status(401).send({ error: 'Access Denied'});
	}

	
}