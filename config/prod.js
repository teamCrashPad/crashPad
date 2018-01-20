module.exports = {
	auth0domain: process.env.AUTH0_DOMAIN,
	auth0ClientID: process.env.AUTH0_CLIENT_ID,
	auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
	cookieKey: 'ihsfjhsdfsdjhfsjdhfjshdfjkshdfksskdhfjksd',
	auth0Audience: 'https://crash-pad-dev.auth0.com/api/v2/',
	auth0TokenURL: 'https://crash-pad-dev.auth0.com/oauth/token',
	auth0EmailURL: 'https://crash-pad-dev.auth0.com/api/v2/users-by-email'
	//add uri and cookie key if needed
}