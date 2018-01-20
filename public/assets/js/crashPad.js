$(function() {
    $(".application-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var tenantInfo = {
            firstName: $("#fname").val().trim(),
            lastName: $("#lname").val().trim(),
            phone: $("#phn").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/??", {
            type: "POST",
            data: tenantInfo
        }).then(
            function() {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
// Make sure we wait to attach our handlers until the DOM is fully loaded.
