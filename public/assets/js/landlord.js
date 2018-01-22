$(document).ready(function(){
    //=================Controls page buttons on dashboard=======================
    $("#manage-props-div").css("display", "none");
    $("#manage-apps-div").css("display", "none");

    $("#dash-home").on("click", function(){
        $("#manage-props-div").css("display", "none");
        $("#manage-apps-div").css("display", "none");
        $("#home-div").css("display", "unset");

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Dashboard Home</h3>');
    })

    $("#manage-props").on("click", function(){
        $("#manage-apps-div").css("display", "none");
        $("#home-div").css("display", "none");
        $("#manage-props-div").css("display", "unset");

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Manage Properties</h3>');
    })

    $("#manage-apps").on("click", function(){
        $("#manage-apps-div").css("display", "unset");
        $("#manage-props-div").css("display", "none");
        $("#home-div").css("display", "none");

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Manage Applications</h3>');
    })

    //===============Creates new property and associates with this user======================
    $("#submit-prop-button").on("click", function(){
        event.preventDefault();
        var myid;
        $.get("/api/current_user", function(data){
            myid = data.id;
            var propObj = {
                "name": $("#prop-name").val(),
                "price": $("#prop-price").val(),
                "capacity": parseInt($("#prop-capacity").val()),
                "description": $("#prop-description").val(),
                "LandlordId": myid,
                "Address": {
                    "addressLine1": $("#prop-address1").val(),
                    "city": $("#prop-city").val(),
                       "state": $("#prop-state").val(),
                       "zip": $("#prop-zip").val()
                }
             };

             $.post("/api/properties", propObj, function(data, status){
                console.log(status);
             })

             
        })
        




    })

})