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
  .append(`<header><h2>${escape(objTweet.user.name)}</h2> <h3>${escape(objTweet.user.handle)}</h3></header>`)
  .append(`<img class = \'profile-pic\' src=\'${escape(objTweet.user.avatars.small)}\'>`)
  .append(`<p>${escape(objTweet.content.text)}</p>`)
  .append(`<footer>${escape(dateDiff(objTweet.created_at))}</footer>`)
  .append('<a class = \'btn-flag\' href=\'#\' style=\'opacity:0\'>flag</a>')
  .append('<a class = \'btn-retweet\' href=\'#\' style=\'opacity:0\'>retweet</a>')
  .append('<a class = \'btn-like\' href=\'#\' style=\'opacity:0\'>like</a>');
  // let $tweet = $('<article />', {
  //   header: 'Tweet User @TweetUser',
  //   text: 'Tweet message here',
  //   footer: '10 days ago'
  // });

  // Add hover functionality to display buttons when hovering.
  $tweet.hover(
    function() {
      $('#tweets-container .btn-flag, .btn-retweet, .btn-like').fadeTo(200,1);
    }, function () {
      $('#tweets-container .btn-flag, .btn-retweet, .btn-like').fadeTo(200,0);
    });


  return ($tweet);
}

// This function takes an array of tweet objects and appends each one into the #tweets-container.
function renderTweets(arrTweets){
  let sorted = arrTweets.sort(function (a, b) {
          if (a.created_at > b.created_at) {
                return -1;
              }
            if (a.created_at < b.created_at) {
               return 1;
            }

            return 0;
  });

         var str = '';

        $.each(sorted, function(index, value) {
          //str += ' ' + value.created_at;
          let eleTweet = createTweetElement(value);
          $('#tweets-container').append(eleTweet);
        });

  // for (let i = 0; i < arrTweets.length; i++){
  //   let eleTweet = createTweetElement(arrTweets[i]);
  //   $('#tweets-container').append(eleTweet);
  // }

/*
  jQuery.each(arrTweets, function (i, tweet) {

    let eleTweet = createTweetElement(arrTweets[i]);
    $('#tweets-container').append(eleTweet);
  });
  */
}

// This function removes all tweets on screen (i.e. before reloading after a new tweet).
function removeTweets(){
  $('#tweets-container .tweet').remove();
}

// This function sanitizes user input to prevent XSS.
function escape (strInput){
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(strInput));
  return div.innerHTML;
}

function dateDiff(dateInput){
  let msDiff = Date.now() - dateInput;

  return Math.floor(msDiff / 86400000) + " days ago";
}

// Fake data taken from tweets.json
var data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


$(document).ready( function(){


// Source: https://jsfiddle.net/BaylorRae/vwvAd/
// - displays the flash message but this code should be moved
// - maybe try moving to the form submit stuff??
(function($) {
    $.fn.flash_message = function(options) {

      options = $.extend({
        text: 'Done',
        time: 1000,
        how: 'before',
        class_name: ''
      }, options);

      return $(this).each(function() {
        if( $(this).parent().find('.flash_message').get(0) )
          return;

        var message = $('<span />', {
          'class': 'flash_message ' + options.class_name,
          text: options.text
        }).hide().fadeIn('fast');

        $(this)[options.how](message);

        message.delay(options.time).fadeOut('normal', function() {
          $(this).remove();
        });

      });
    };
})(jQuery);

$('.new-tweet input').click(function() {

    $('#status-area').flash_message({
        text: 'Error!',
        how: 'append'
    });
});
  //$.post('/tweets/', $('#new-tweet .form').serialize());
  // If user submits a tweet, serialize/POST the data but do not leave the page.
  $('.new-tweet form').on("submit", function (event) {

    // TODO: add data validation/sanitize input; also validate msg length.
    if (this.text.value === "" || this.text.value === null){
      console.log("invalid input");
      event.preventDefault();
    }

    $.post('/tweets', $(this).serialize());
    loadTweets();
    event.preventDefault();
  })

  // Added function here from the exercises (w3d3)
  function loadTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function(results){
        //console.log(results);
        removeTweets();
        //jsonTweets = $.parseJSON(results);
        //jsonTweets = JSON.parse(results);
        renderTweets(results);
      }
    })
  }

  loadTweets();

  //renderTweets(jsonTweets);

  // Event handler controlling the 'compose tweet' form.  When Compose is clicked,
  //  the form is displayed (or hidden) and the focus is set to the textarea.
  $('.compose-button').click(function() {
    $('.new-tweet').slideToggle('slow', function() {
        $(".new-tweet textarea").focus();
    });
  });

});
/*------------------TEST INDIVIDUAL TWEETS-----------------------------------------------
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
*/
