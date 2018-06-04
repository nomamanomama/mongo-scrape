
$.ajax({
    method: "GET",
    url: "/saved"
})
    .then(function (data) {
        if (data) {
        }
})


// Grab the articles as a json
$.getJSON("/saved", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        $("#articles").append("<button data-id='" + data[i]._id + "' class='btn btn-primary showarticle'>Article Notes</button>")
            .append("<button data-id='" + data[i]._id + "' class='btn btn-primary deletearticle'>Remove from Saved</button>");

        //console.log("appending article #" + i);
    }
});