$(document).ready(function () {
    $("#applyFor").on("click", function () {
        var propId = $(this).attr("data-id");
        console.log(".... Clicked on apply for Prop #: " + propId);
        $.get("/api/application/" + propId, function (data) {
            console.log("Application", data);
            application = data;
        });
    });
});
