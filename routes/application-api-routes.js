var db = require("../models");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = function (app) {
    app.get("/api/application", function (req, res) {
    });

    app.get("/api/fillApplication/:propId", function (req, res) {
        var propId = req.params.propId;
        localStorage.setItem("CPADpropId", propId);
        //var myId = req.user.id;
        console.log("filling app....");
        var myId = 1;
        db.ApplicationTemplate.findOrCreate({
            include: [db.Tenant],
            where: {
                tenantId: myId
            }
        }).then(function (dbTemplate) {
            console.log("...dbTemplate: ");
            console.log(dbTemplate);
            res.render("applicationDetail", {
                mycomments: dbTemplate.comments,
                pets:  dbTemplate.havePets,
                smokes:  dbTemplate.isSmoker
            });
        });
    });

    app.post("/api/submitApplication", function (req, res) {
        var myId = req.user.id;
        var propId = localStorage.getItem("CPADpropId");
        var myApplication = {
            tenantId: myId,
            propertyId: propId
        };
        //console.log(req.body);
        db.Application.create(myApplication, {include: [db.Tenant, db.Property]}).then(function (dbApplication) {
            res.json(dbApplication);
        });
    });

    app.delete("/api/application/:id", function (req, res) {
        db.Application.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbApplication) {
            res.json(dbApplication);
        });
    });
};
