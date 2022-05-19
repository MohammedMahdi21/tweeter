// This file will be responsible for the character counter feature for the tweet text area

$(document).ready(function () {
  $("#tweet-text").on("input", function () {

    const form = $(this).closest("form");
    const counter = form.find(".counter");
    let inputLength = $("textarea").val().length;
    const remainingLength = 140 - inputLength;
    counter.text(remainingLength);

    // Add property 'color' (which has a red value of red) to change the counter's colour to 'red' if the counter is below 0.
    if (remainingLength < 0) {
      counter.css("color", "red");

    } else {
      counter.css("color", "");
    }
  })
});