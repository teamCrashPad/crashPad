var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
var exphbs = require("express-handlebars");
var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

//Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./services/passport');



// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
// Static directory
app.use(express.static(path.join(__dirname, '/public')));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
//require("./routes/html-routes.js")(app);
require('./routes/authRoutes')(app);
require('./routes/tenant-api-routes')(app);
require('./routes/landlord-api-routes')(app);
require('./routes/property-api-routes')(app);
require('./routes/pageRoutes')(app);
require('./routes/application-api-routes')(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
