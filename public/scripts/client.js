/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
$(document).ready(function() {
  // Add an event listener for submit and prevent its default behaviour.
  $("#tweet-box").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $("textarea");

    if (!validateTweet(tweetText.val())) {
      return
    }
    $.post("/tweets", $(this).serialize())
      .then((result) => {
        loadTweets(result);
      });

    tweetText.val("");
    const counter = $(this).find(".counter");
    counter.text("140");

  });

  // Define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page.
  const loadTweets = function() {
    $.get("http://localhost:8080/tweets")
      .then(function (morePost) {
        renderTweets(morePost)
      })
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const userTweet = $(createTweetElement(tweet));
      userTweet.find(".article-body div").text(tweet.content.text);
      $('#tweet-container').prepend(userTweet);
    }

  };

  const createTweetElement = function(tweet) {
    let $tweet = $(` <article class="article-tweet">
        <header>
          <div class="header-top">
            <div>
              <img src="${tweet.user.avatars}">
              <span>${tweet.user.name}</span>
            </div>
            <div>${tweet.user.handle}</div>
          </div>
          
          <div class="article-body">
          <div></div>
          </div>
        </header>

      
        <footer>
          <div>
            ${timeago.format(tweet.created_at)}
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);

    return $tweet;

  };

  // Displaying Validation Errors With jQuery, If the user submits a tweet that fails validation, an error message slides into view.
  const validateTweet = function(tweet) {
    if (tweet === "" || tweet === null) {
      $('#formError').text("Cannot post an empty tweet");
      $('#formError').slideDown();
      return false;
    } else if (tweet.length > 140) {
      $('#formError').text("Maximum characters up to 140");
      $('#formError').slideDown();
      return false;
    } else {
      return true;
    }
  }
  loadTweets()

});