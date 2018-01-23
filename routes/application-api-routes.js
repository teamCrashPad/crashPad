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
        }).then(function (dbApplicationTemplate) {
            //console.log("...dbApplicationTemplate: ");
            //console.log(dbApplicationTemplate);
            //res.json(dbApplicationTemplate);
            res.render("applicationDetail", {
                mycomments: dbApplicationTemplate[0].comments,
                pets:  dbApplicationTemplate[0].havePets,
                smokes:  dbApplicationTemplate[0].isSmoker
            });
        });
    });

    app.post("/api/submitApplication", function (req, res) {
        //console.log(req.body);
        db.Application.create(myApplication, {include: [db.Tenant, db.Property]}).then(function (dbApplication) {
            var myId = req.user.id;
            var propId = localStorage.getItem("CPADpropId");
            var myApplication = {
                tenantId: myId,
                propertyId: propId
            };
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
