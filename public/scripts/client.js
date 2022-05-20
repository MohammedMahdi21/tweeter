/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
$(document).ready(function () {


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $('#tweets-section').prepend(createTweetElement(tweet))
    }
  }

  const createTweetElement = function (tweet) {
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
            ${tweet.created_at}
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`)


    return $tweet;
  }

  renderTweets(data);
})