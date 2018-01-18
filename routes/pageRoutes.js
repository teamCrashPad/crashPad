module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index");
    })

    app.get("/landlord", function(req, res){
        res.render("landlord");
    })
}