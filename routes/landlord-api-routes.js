var db = require("../models");

module.exports = function (app) {
    app.get("/api/landlords", function (req, res) {
        db.Landlord.findAll({include: [db.Property]}).then(function (dbLandlord) {
            res.json(dbLandlord);
        });
    });

    app.get("/api/landlord/:id", function (req, res) {
        db.Landlord.findOne({
            include: [db.Property],
            where: {
                id: req.params.id
            }
        }).then(function (dbLandlord) {
            res.json(dbLandlord);
        });
    });

    app.post("/api/landlords", function (req, res) {
        console.log(req.body);
        db.Landlord.create(req.body).then(function (dbLandlord) {
            res.json(dbLandlord);
        });
    });

    app.delete("/api/landlord/:id", function (req, res) {
        db.Landlord.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbLandlord) {
            res.json(dbLandlord);
        });
    });

};