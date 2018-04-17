var db = require("../models");
var Sequelize = require('sequelize');
var zipcode = require('zipcodes');

var Op = Sequelize.Op;

module.exports = function(app) {
  app.get("/api/properties", function(req, res) {
    db.Property.findAll({
      include: [db.Landlord, db.Address, db.Application]
    }).then(function(dbProperty) {
      res.json(dbProperty);
    });
  });

  app.get("/api/property/:id", function(req, res) {
    db.Property.findOne({
      include: [db.Landlord, db.Address, db.Application],
      where: {
        id: req.params.id
      }
    }).then(function(dbProperty) {
      //res.json(dbProperty);
      //console.log(dbProperty);
      //console.log("... req user: " + req.user.id);
      res.render("propertyDetail", {
        propId: dbProperty.id,
        name: dbProperty.name,
        price: dbProperty.price,
        capacity: dbProperty.capacity,
        description: dbProperty.description,
        address1: dbProperty.Address.dataValues.addressLine1,
        address2: dbProperty.Address.dataValues.addressLine2,
        city: dbProperty.Address.dataValues.city,
        state: dbProperty.Address.dataValues.state,
        zip: dbProperty.Address.dataValues.zip,
        notApplied: true,
        landlordEmail: dbProperty.Landlord.dataValues.email,
        landlord:
          dbProperty.Landlord.dataValues.firstName +
          " " +
          dbProperty.Landlord.dataValues.lastName,
        user: req.user,
        userProfile: JSON.stringify(req.user, null, "  ")
      });
    });
  });

  app.post("/api/properties", function(req, res) {
    //console.log(req.body);
    db.Property.create(req.body, {
      include: [db.Address]
    }).then(function(dbProperty) {
      res.json(dbProperty);
    });
  });

  app.delete("/api/property/:id", function(req, res) {
    db.Property.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProperty) {
      res.json(dbProperty);
    });
  });

  app.get("/api/property_search/:query?", function(req, res) {
      
    if (req.params.query != null) {
        var userInput= parseInt(req.params.query)
        var zipArray = [];
        var nearby = zipcode.lookup(req.params.query);
        var x = zipcode.radius(req.params.query, 10);
        x.forEach(function(nearbyzip){
            zipArray.push(nearbyzip)
        })

      db.Address.findAll({
        include: [db.Property],
        where: {
          zip: {
            [Op.in]: zipArray
          }
          // zip: req.params.query
        }
      }).then(function(data) {
        //console.log(data);
        data.foundNearby = nearby;
        res.json(data);
      });
    } else {
      db.Address.findAll({
        include: [db.Property]
      }).then(function(data) {
        //console.log(data);
        res.json(data);
      });
    }
  });
  app.get("/api/application_property/:query", function(req, res) {
    db.Property.findOne({
      include: [db.Address],
      where: {
        id: req.params.query
      }
    }).then(function(data) {
      //console.log(data);
      res.json(data);
    });
  });

  app.get("/api/homepage_list", function(req, res) {
    db.Property.findAndCountAll({
      include: [db.Address],
      order: [["id", "DESC"]],
      limit: 3
    }).then(function(data) {
      //console.log(data);
      res.json(data);
    });
  });
};
