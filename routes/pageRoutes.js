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
<<<<<<< HEAD
=======
        var properties;
        var isProperties
>>>>>>> 968d7259db7e02e8b8b8921fd3d343dc0167f539

        db.Property.findAll({
            include: [db.Landlord, db.Address],
            where: {
                LandlordId: req.user.id
            }

<<<<<<< HEAD
        }).then(function(data){
            var isProperties = data.length;
            var properties = data;
=======
        }).then(function (data) {
            isProperties = data.length;
            properties = data;
            console.log(properties);
            console.log(isProperties);
>>>>>>> 968d7259db7e02e8b8b8921fd3d343dc0167f539

            res.render("landlord", {
                name: req.user.firstName,
                properties: properties,
                isProperties: isProperties
<<<<<<< HEAD
                });
            // res.json(properties);
=======
            });
>>>>>>> 968d7259db7e02e8b8b8921fd3d343dc0167f539
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