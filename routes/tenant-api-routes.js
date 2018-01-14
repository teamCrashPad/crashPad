var db = require("../models");

module.exports = function (app) {
    app.get("/api/tenants", function (req, res) {
        db.Tenant.findAll({include: [db.TenantInfo, db.Application]}).then(function (dbTenant) {
            res.json(dbTenant);
        });
    });

    app.get("/api/tenant/:id", function (req, res) {
        db.Tenant.findOne({
            include: [db.TenantInfo, db.Application],
            where: {
                id: req.params.id
            }
        }).then(function (dbTenant) {
            res.json(dbTenant);
        });
    });

    app.post("/api/tenants", function (req, res) {
        db.Tenant.create(req.body).then(function (dbTenant) {
            res.json(dbTenant);
        });
    });

    app.delete("/api/tenant/:id", function (req, res) {
        db.Tenant.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTenant) {
            res.json(dbTenant);
        });
    });

};