$(document).ready(function () {
    $("#submit-app-button").on("click", function () {
        event.preventDefault();

        var havePets = $('#petsCheckBox').is(":checked");
        var smokes = $('#smokesCheckBox').is(":checked");
        var comments = $("#comment").val();

        var template = {
            havePets: havePets,
            isSmoker: smokes,
            comments: comments
        };

        console.log("Pets: " + havePets);
        console.log("smokes: " + smokes);
        console.log("Comments: " + comments);

        updateTemplate(template);

    });

    function updateTemplate(template) {
        $.ajax({
            method: "PUT",
            url: "/api/updateTemplate",
            data: template
        })
            .done(function () {
                postAppliction();
            });
    }

    function postAppliction() {
        $.ajax({
            method: "POST",
            url: "/api/submitApplication"
        })
            .done(function () {
                window.location.href = "/";
            });
    }

});