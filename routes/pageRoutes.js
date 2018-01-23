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
        var properties;
        var isProperties

        db.Property.findAll({
            include: [db.Landlord],
            where: {
                LandlordId: req.user.id
            }

        }).then(function (data) {
            isProperties = data.length;
            properties = data;
            console.log(properties);
            console.log(isProperties);

            res.render("landlord", {
                name: req.user.firstName,
                properties: properties,
                isProperties: isProperties
            });
        });



    })

    app.get("/search/:search_query", function (req, res) {
        var query = req.params.search_query

        res.render("searchresults", {
            searchquery: query
        });



        // res.send(query);

    });

}