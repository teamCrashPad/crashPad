$(document).ready(function () {
    $("#applyFor").on("click", function () {
        var propId = $(this).attr("data-id");
        console.log(".... Clicked on apply for Prop #: " + propId);
        $.get("/api/current_user", function(data){
            myid = data.id;
            var propObj = {
                "PropertyId": propId,
                "TenantId": myid
                }
            };

            $.get("/api/properties", propObj, function(data, status){
                console.log(status);
            });
        });
    });
});
