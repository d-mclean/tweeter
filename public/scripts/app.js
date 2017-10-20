/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
createTweetElement that takes in a tweet object and is responsible for
returning a tweet <article> element containing the entire HTML structure of the tweet.

*/

// String used for displaying messages to the user.
let strMsg = '';

function createTweetElement(objTweet){

  let $tweet = $('<article></article>').addClass('tweet')
  .append(`<header><h2>${escape(objTweet.user.name)}</h2> <h3>${escape(objTweet.user.handle)}</h3></header>`)
  .append(`<img class = \'profile-pic\' src=\'${escape(objTweet.user.avatars.small)}\'>`)
  .append(`<p>${escape(objTweet.content.text)}</p>`)
  .append(`<footer>${escape(dateDiff(objTweet.created_at))}</footer>`)
  .append(`<a class = \'btn-flag ${escape(objTweet._id)}\' href=\'#\' style=\'opacity:0\'>flag</a>`)
  .append(`<a class = \'btn-retweet ${escape(objTweet._id)}\' href=\'#\' style=\'opacity:0\'>retweet</a>`)
  .append(`<a class = \'btn-like ${escape(objTweet._id)}\' href=\'#\' style=\'opacity:0\'>like</a>`);

  // Add hover functionality to display buttons when hovering.
  $tweet.hover(
    function() {
      //$('#tweets-container .btn-flag, .btn-retweet, .btn-like').fadeTo(200,1);
      $(`#tweets-container .${escape(objTweet._id)}`).fadeTo(200,1);
    }, function () {
      $(`#tweets-container .${escape(objTweet._id)}`).fadeTo(200,0);
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

// This function takes a create date and returns a message (string) displaying how old the tweet is.
function dateDiff(dateInput){
  // Get the date difference as a nice looking message from moment.js.
  let strDateDiff = moment(dateInput).fromNow();

  // The fromNow() function only displays in seconds or longer so this while() loop was added
  //  for when a new tweet is entered and displayed in less than one second.  Once we know the
  //  message returned contains the phrase 'ago', it's appropriate to display.
  while (strDateDiff.search('ago') === -1){
    strDateDiff = moment(dateInput).fromNow();
  }

  return strDateDiff;
}

// This function clears out the textarea and resets the character counter after a new tweet.
function resetTweetForm(){
  $('.new-tweet textarea').val('');
  $('.new-tweet .counter').text('140');
}

$(document).ready( function(){

// This snippet of code was modified to act as a flash message for displaying messages to the user.
// Source: https://jsfiddle.net/BaylorRae/vwvAd/
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
  // Get the text of the tweet to validate it.
  let text = $('.new-tweet textarea').val();

  // If there's a problem, let the user know via flash message (string updated here before being displayed).
  if (text.trim() === "" || text === null){
    strMsg = 'What are you humming about? [no text]';
  } else if (text.length > 140){
    strMsg = 'Your tweet exceeds 140 characters!';
  } else {
    strMsg = '';
  }

  $('#status-area').flash_message({
      text: strMsg,
      how: 'append'
  });
});

  // If user submits a tweet, serialize/POST the data but do not leave the page.
  $('.new-tweet form').on("submit", function (event) {
    // Avoid the default behaviour as we want to remain on the main page.
    event.preventDefault();

    // If the flash message is an empty string, i.e. no problems, POST the tweet.
    // Skip POSTing under all other situations (including null/invalid messages).
    switch (strMsg){
      default:
      case 'What are you humming about? [no text]':
      case 'Your tweet exceeds 140 characters!':
        // No op really needed here (i.e. don't POST).
        break;
      case '':
        $.post('/tweets', $(this).serialize());
        loadTweets();
        event.preventDefault();
        // Clear out the tweet info after inserting a new tweet.
        resetTweetForm();
        break;
    }
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