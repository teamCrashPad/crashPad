$(function () {
    $(".searchProperty").on("click", function (event) {
// Make sure to preventDefault on a submit event.
//this won't be in a form
//event.preventDefault();
        var propId = $("#propertyId").val().trim();

        var property;
        $.get("/api/property/propId", function (data) {
            property = data;
        });
    });
});
