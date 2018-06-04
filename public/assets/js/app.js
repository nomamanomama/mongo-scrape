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




// Whenever someone clicks a p tag
$(document).on("click", ".showarticle", function() {
  // Empty the notes from the note section
  $("#modal-savednotes").empty();
  $("#modal-note").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      $("#savenote").data("id", thisId);
      // The title of the article
      $("#modal-note").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#modal-note").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#modal-note").append("<textarea id='bodyinput' name='body'></textarea>");
      
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#modal-savednotes").text(data.note.title);
        // Place the body of the note in the body textarea
        $("#modal-savednotes").val(data.note.body);
      }
    });
  $("articleNotesModal").modal('show');
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

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#modal-note").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$("#scrapeNewArticles").on("click", function(e){
  $.ajax({
    method: "GET",
    url: "/scrape"})
    .then(function(data){
      if(data){
        alert("Scrape complete");
        $("#scrapeModal").modal('show');
      }
    })

});
