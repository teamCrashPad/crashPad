var db = require("../models");

module.exports = function (app) {
    app.get("/api/application", function (req, res) {
    });

    app.get("/api/fillapp/:tenantId", function (req, res) {
        db.ApplicationTemplate.findOne({
            include: [db.Tenant, db.Property],
            where: {
                id: req.params.id
            }
        }).then(function (dbApplication) {
            res.render("appicationDetail", {
                appId: dbApplication.id
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
