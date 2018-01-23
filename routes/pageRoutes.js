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
<<<<<<< HEAD
=======
=======
        
>>>>>>> f7ce9f6e125fd68224a92d097ecf6663edded819
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
<<<<<<< HEAD
                isProperties: isProperties
<<<<<<< HEAD
                });
            // res.json(properties);
=======
=======
                isProperties: isProperties,
                user: req.user,
                userProfile: JSON.stringify(req.user, null, '  ')
    
>>>>>>> f7ce9f6e125fd68224a92d097ecf6663edded819
            });
>>>>>>> 968d7259db7e02e8b8b8921fd3d343dc0167f539
        });



    })

    app.get("/search/:search_query", function (req, res) {
        var query = req.params.search_query

        res.render("searchresults", {
            searchquery: query,
            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')

        });



        // res.send(query);

    });

}