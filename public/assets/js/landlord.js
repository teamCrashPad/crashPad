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

    $(document).on("click", ".property-row", function(){
        $("#prop-detail-title").html($(this).attr("data-name"));
        $("#modal-prop-details-body").html(`<p id="prop-id-paragraph" data-id="${$(this).attr("data-id")}"><b>Property ID: </b>${$(this).attr("data-id")}</p> <p><b>Address</b>: ${$(this).attr("data-address")}</p> <p><b>City: </b>${$(this).attr("data-city")}</p> <p><b>State: </b>${$(this).attr("data-State")}</p> <p><b>Zip Code: </b>${$(this).attr("data-zip")}</p> <p><b>Price: </b>${$(this).attr("data-price")}</p> <p><b>Capacity: </b>${$(this).attr("data-capacity")}</p> <p><b>Description: </b>${$(this).attr("data-description")}</p>`);
    })

    $("#view-details-page-button").on("click", function(){
        // /api/property/id
        window.location.href = `/api/property/${$("#prop-id-paragraph").attr("data-id")}`;
    })

    $(document).on("click", "#success-ok-button", function(){
        location.reload();
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
                if (status === "success"){
                    $("#add-prop-modal-body").html("<h3>SUCCESS!</h3>");
                    $("#add-prop-modal-footer").html('<button type="button" class="btn btn-primary" id="success-ok-button">Continue</button>')
                    
                }
                else{
                    alert("Oops, something went wrong. Please reload the page and try again.");
                }
             })

             
        })
        




    })

})