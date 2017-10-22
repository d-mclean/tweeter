/*  20171020 DM
    This script handles the character counter for tweets in order to do some
      basic error handling (i.e. flag red if there's no text or > 140 letters).
*/

$(document).ready( function(){
  $('textarea').on('input', function(){

    // Get the size of the tweet.
    let iSize = 140 - this.value.length;

    // Find the counter span and update the current value.
    $(this).parent().find('.counter').html(iSize).removeClass('red black').addClass(function() {
      //  If the input exceeds the limit, add the red class, otherwise use black class.
      if (iSize < 0) {
        return 'red';
      } else {
        return 'black';
      }
    });
  });

});