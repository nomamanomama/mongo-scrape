//console.log("loading app.js");

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var newRow = $("<row>");
    newRow.append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    newRow.append("<button data-id='" + data[i]._id + "' class='btn btn-primary savearticle'>Save Article</button>"); 
    newRow.append("<hr>");
    $("#articles").append(newRow);
    //console.log("appending article #" + i);
  }
});




// Whenever someone clicks a button with class savearticle 
$(document).on("click", ".savearticle", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/savearticle/" + thisId,
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      
    });
});



$("#scrapeNewArticles").on("click", function(e){
  $.ajax({
    method: "GET",
    url: "/scrape"})
    .then(function(data){
      if(data){
        //alert("Scrape complete");
        $("#scrape-message").text("New articles added.");
      }
      else {
        $("#scrape-message").text("Oops. Something went wrong. No articles were found.");
      }
      $("#scrapeModal").modal('show');
    })

});

$(".close-scrape").on("click", function (e) {
  location.reload();
});
