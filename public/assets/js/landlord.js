$(document).ready(function(){
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
})