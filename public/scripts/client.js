/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
$(document).ready(function() {

  // Add an event listener for submit and prevent its default behaviour.
  $("#tweet-box").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("textarea").val();
    const tweetLength = $("textarea").val().length;

    if (tweetText === "" || tweetText === null){
      return alert("Cannot post an empty tweet")
    } else if (tweetLength > 140){
      return alert("Maximum characters up to 140")
    } else {
    $.post("/tweets", $(this).serialize())
      .then(() => {
        console.log("post done");
      });
    }
  });

  // Define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page.
  const loadTweets = function() {
    $.get("http://localhost:8080/tweets")
    .then(function (morePost) {
      console.log('Success: ', morePost);
      renderTweets(morePost)
    })
  } 
  

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-container').prepend(createTweetElement(tweet));
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
          <div>
            ${tweet.content.text}
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
loadTweets()
});