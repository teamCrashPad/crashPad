$(document).ready(function () {
    $("#submit-app-button").on("click", function() {
        event.preventDefault();

        var havePets = $('#petsCheckBox').is(":checked");
        var smokes = $('#smokesCheckBox').is(":checked");
        var comments = $("#comment").val();

        console.log("Pets: " + havePets);
        console.log("smokes: " + smokes);
        console.log("Comments: " + comments);
    });

});