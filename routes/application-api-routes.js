var db = require("../models");
var requireLogin = require('../middlewares/requireLogin');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = function (app) {
    app.get("/api/findApplicationTemplate/:tenantId", function (req, res) {
        db.ApplicationTemplate.findAll({
            include: [db.Tenant],
            where: {
                "TenantId": req.params.tenantId,
            }
        }).then(function(data){
            console.log(data);
            res.json(data);
        })
    });

    app.get("/api/fillApplication/:propId", requireLogin, function (req, res) {
        var propId = req.params.propId;
        localStorage.setItem("CPADpropId", propId);
        var myId = req.user.id;

        db.Application.find({
            where: {
                "TenantId": myId,
                "PropertyId": propId
            }
        }).then(function(dbApplication) {
            if (dbApplication == null) {
                console.log("NOT already applied....");
                db.ApplicationTemplate.findOrCreate({
                    where: {
                        "TenantId": myId
                    }
                }).then(function (dbApplicationTemplate) {
                    //console.log("...dbApplicationTemplate: ");
                    //console.log(dbApplicationTemplate);
                    //res.json(dbApplicationTemplate);
                    res.render("applicationDetail", {
                        mycomments: dbApplicationTemplate[0].comments,
                        pets: dbApplicationTemplate[0].havePets,
                        smokes: dbApplicationTemplate[0].isSmoker,
                        propIdNum: propId,
                        user: req.user,
                        userProfile: JSON.stringify(req.user, null, '  ')

                    });
                });
            } else {
                res.render("propertyDetail", {
                    alreadyAppliedMsg: "You have already Applied to this Property",
                    notApplied: false,
                    user: req.user,
                    userProfile: JSON.stringify(req.user, null, '  ')

                });
            }
        }, function (error) {
            db.ApplicationTemplate.findOrCreate({
                where: {
                    "TenantId": myId
                }
            }).then(function (dbApplicationTemplate) {
                //console.log("...dbApplicationTemplate: ");
                //console.log(dbApplicationTemplate);
                //res.json(dbApplicationTemplate);
                res.render("applicationDetail", {
                    mycomments: dbApplicationTemplate[0].comments,
                    pets: dbApplicationTemplate[0].havePets,
                    smokes: dbApplicationTemplate[0].isSmoker,
                    propIdNum: propId,
                    user: req.user,
                    userProfile: JSON.stringify(req.user, null, '  ')

                });
            });
        });
        //console.log("filling app....myID: " + myId);
    });

    app.put("/api/updateTemplate", function (req, res) {
        console.log("... updating template ....");
        console.log(req.body);
        var myId = req.user.id;
        var mydata = {
            havePets: req.body.havePets,
            isSmoker: req.body.isSmoker,
            comments: req.body.comments
        };
        db.ApplicationTemplate.update(
            mydata,
            {
                where: {
                    tenantId: myId
                }
            }).then(function (dbApplicationTemplate) {
            res.json(dbApplicationTemplate);
        });
    });

    app.post("/api/submitApplication", function (req, res) {
        //console.log(req.body);
        var myId = req.user.id;
        var propId = localStorage.getItem("CPADpropId");
        var myApplication = {
            "TenantId": myId,
            "PropertyId": propId
        };
        db.Application.create(myApplication).then(function (dbApplication) {
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
