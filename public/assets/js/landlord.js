$(document).ready(function(){
    //=================Controls page buttons on dashboard=======================
    $("#manage-props-div").hide();
    $("#manage-apps-div").hide();
    $("#modal-app-details-body").children().hide();

    $("#dash-home").on("click", function(){
        $("#manage-props-div").hide();
        $("#manage-apps-div").hide();
        $("#home-div").show();

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Dashboard Home</h3>');
    })

    $("#manage-props").on("click", function(){
        $("#manage-apps-div").hide();
        $("#home-div").hide();
        $("#manage-props-div").show();

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Manage Properties</h3>');
    })

    $("#manage-apps").on("click", function(){
        $("#manage-apps-div").show();
        $("#manage-props-div").hide();
        $("#home-div").hide();

        $(".panel-heading").html('<h3><span class="glyphicon glyphicon-dashboard"></span> Manage Applications</h3>');
    })

    $(document).on("click", ".property-row", function(){
        $("#prop-detail-title").html($(this).attr("data-name"));
        $("#modal-prop-details-body").html(`<p id="prop-id-paragraph" data-id="${$(this).attr("data-id")}"><b>Property ID: </b>${$(this).attr("data-id")}</p> <p><b>Address</b>: ${$(this).attr("data-address")}</p> <p><b>City: </b>${$(this).attr("data-city")}</p> <p><b>State: </b>${$(this).attr("data-State")}</p> <p><b>Zip Code: </b>${$(this).attr("data-zip")}</p> <p><b>Price: </b>${$(this).attr("data-price")}</p> <p><b>Capacity: </b>${$(this).attr("data-capacity")}</p> <p><b>Description: </b>${$(this).attr("data-description")}</p>`);
    })

    $(document).on("click", "#app-span", function(){
        $(`.application-view-button-${$(this).attr("data-index")}`).show();
    })

    $('#modal-app-details').on('hidden.bs.modal', function () {
        $("#modal-app-details-body").children().hide();
        $(".application-modal-footer").html("");
      })

    $("#view-details-page-button").on("click", function(){
        // /api/property/id
        window.location.href = `/api/property/${$("#prop-id-paragraph").attr("data-id")}`;
    })

    $(document).on("click", ".view-apps-btn", function(){
        $.get(`/api/findApplicationTemplate/${$(this).attr("data-tenantId")}`, function(data){
            console.log(data);
            $("#modal-app-details-body").children().hide();
            $("#modal-app-details-body").append(`<p><b>Name:</b> ${data[0].Tenant.firstName} ${data[0].Tenant.lastName}</p><p><b>Email: </b>${data[0].Tenant.email}</p></p><p><b>Pets: </b>${data[0].havePets}</p></p><p><b>Smoker: </b>${data[0].isSmoker}</p></p><p><b>Comments: </b>${data[0].comments}</p><hr />`);
            $(".application-modal-footer").append('<button class="btn btn-danger">Reject</button>')
            $(".application-modal-footer").append('<button class="btn btn-success" style="float:right">Accept</button>')
            
        })
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