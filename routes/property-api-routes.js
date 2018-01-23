var db = require("../models");

module.exports = function (app) {
    app.get("/api/properties", function (req, res) {
        db.Property.findAll({include: [db.Landlord, db.Address, db.Application]}).then(function (dbProperty) {
            res.json(dbProperty);
        });
    });

    app.get("/api/property/:id", function (req, res) {
        db.Property.findOne({
            include: [db.Landlord, db.Address, db.Application],
            where: {
                id: req.params.id
            }
        }).then(function (dbProperty) {
            //res.json(dbProperty);
            //console.log(dbProperty);
            //console.log("... req user: " + req.user.id);
            res.render("propertyDetail", {
                name: dbProperty.name,
                price: dbProperty.price,
                capacity:  dbProperty.capacity,
                address1:  dbProperty.Address.dataValues.addressLine1,
                address2:  dbProperty.Address.dataValues.addressLine2,
                city:  dbProperty.Address.dataValues.city,
                state:  dbProperty.Address.dataValues.state,
                zip:  dbProperty.Address.dataValues.zip,
                landlordEmail:  dbProperty.Landlord.dataValues.email,
                landlord:  dbProperty.Landlord.dataValues.firstName + " " + dbProperty.Landlord.dataValues.lastName
            });
        });
    });

    app.post("/api/properties", function (req, res) {
        //console.log(req.body);
        db.Property.create(req.body,{include: [db.Address]}).then(function (dbProperty) {
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

    app.get("/api/property/:city",function(req, res){
        db.Property.findAll({
            include: [db.Address],
            where: {
                city: query
            }

        }).then(function (data) {
            console.log(data)
            res.json(data);
        });

    })

};