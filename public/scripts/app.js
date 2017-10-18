/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
createTweetElement that takes in a tweet object and is responsible for
returning a tweet <article> element containing the entire HTML structure of the tweet.

*/
function createTweetElement(objTweet){

  let $tweet = $('<article>').addClass('tweet')
  .append('<header><h2>Tweet User</h2> <h3>@TweetUser</h3></header>')
  .append('<img class = \'profile-pic\' src=\'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png\'>')
  .append('<p>Tweet message here</p>')
  .append('<footer>10 days ago</footer>');
  // let $tweet = $('<article />', {
  //   header: 'Tweet User @TweetUser',
  //   text: 'Tweet message here',
  //   footer: '10 days ago'
  // });


return ($tweet);
}

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


console.log(tweetData)


$(document).ready( function(){
 $('#tweets-container').append($tweet);

});