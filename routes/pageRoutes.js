const requireLogin = require('../middlewares/requireLogin');
const requireLandlord = require('../middlewares/requireLandlord');
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
        res.render("landlord");
    })

    app.get("/search/:search_query", function (req, res) {
       var query = req.params.search_query

        res.render("searchresults", {
            searchquery: query
        });
        // res.send(query);

    });

}