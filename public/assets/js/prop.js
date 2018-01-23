$(document).ready(function () {
    $("#applyFor").on("click", function () {
        var propId = $(this).attr("data-id");
        console.log(".... Clicked on apply for Prop #: " + propId);
    });
});
