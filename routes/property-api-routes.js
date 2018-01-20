var db = require("../models");

module.exports = function (app) {
    app.get("/api/properties", function (req, res) {
        db.Property.findAll({include: [db.Landlord, db.Application]}).then(function (dbProperty) {
            res.json(dbProperty);
        });
    });

    app.get("/api/property/:id", function (req, res) {
        db.Property.findOne({
            include: [db.Landlord, db.Application],
            where: {
                id: req.params.id
            }
        }).then(function (dbProperty) {
            //res.json(dbProperty);
            res.render("propertyDetail", {name: dbProperty.name});
        });
    });

    app.post("/api/properties", function (req, res) {
        console.log(req.body);
        db.Property.create(req.body,{include: [db.Landlord, db.Address]}).then(function (dbProperty) {
            res.json(dbProperty);
        });
    });

    app.delete("/api/property/:id", function (req, res) {
        db.Property.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbProperty) {
            res.json(dbProperty);
        });
    });

};