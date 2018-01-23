var db = require("../models");

module.exports = function (app) {
    app.get("/api/application", function (req, res) {
    });

    app.get("/api/fillApplication/:propId", function (req, res) {
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
                comments: dbTemplate.comments,
                pets:  dbTemplate.havePets,
                smokes:  dbTemplate.isSmoker
            });
        });
    });

    app.post("/api/application", function (req, res) {
        //console.log(req.body);
        db.Application.create(req.body, {include: [db.ApplicationTemplate, db.Property]}).then(function (dbApplication) {
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
