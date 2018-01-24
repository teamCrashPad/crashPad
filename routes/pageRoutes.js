const requireLogin = require('../middlewares/requireLogin');
const requireLandlord = require('../middlewares/requireLandlord');
var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        // res.render("index");
        res.render('index', {
            layout: 'homepage',
            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')
        });

    })

    app.get("/landlord", requireLogin, requireLandlord, function (req, res) {

        db.Property.findAll({
            include: [db.Landlord, db.Address],
            where: {
                LandlordId: req.user.id
            }

        }).then(function (data) {
            var isProperties = data.length;
            var properties = data;

            res.render("landlord", {
                name: req.user.firstName,
                properties: properties,
                isProperties: isProperties,
                user: req.user,
                userProfile: JSON.stringify(req.user, null, '  ')

            });
            // res.json(properties);
        });

    })

    app.get("/search/:search_query?", function (req, res) {
        var query = req.params.search_query
        

        res.render("searchresults", {
            searchquery: query,
            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')

        });

        // res.send(query);

    });

}