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

/*$(document).ready( function(){
alert("testER");


    //.css('color', 'red');
    // console.log($(this).children('.counter'));


/*
$('new-tweet').click(function(){
  alert('clicked');
});
$('new-tweet').val('something');
$('new-tweet').trigger('click');
  $( 'new-tweet .textarea').click( function(){
    alert( "user clicked new tweet");
  });
    $( 'new-tweet .textarea').val('TESTER');
    $( 'new-tweet .textarea').trigger('click')


});
*/
/*
$( 'new-tweet .textarea').bind('mouseenter click', function() {
  alert('TSETERRRR');
});

$ ('new-tweet').bind('change', function(){
alert('TESTERRRRRRR!!!')
});

onekeyup onchange

$ ('new-tweet textarea').on('onchange', function(){
alert('TESTERRRRRRR!!!')
});

$ ('new-tweet textarea').bind('change', function(){
  //this.textarea = 'abCedfg';
  alert('new TEST');
});
$( "new-tweet .textarea").bind( "change keydown keyup blur keypress"), function(){
  alert( "user clicked new tweet");
}

    //console.log(this);
    //console.log(140 - $(this).val().length);
    //console.log(this.value.length);
    //$('.counter').html(140 - $(this).val().length);
    //console.log($(this).next().next().next().html);
    //console.log($(this).parent().find('.counter').html(140 - this.value.length));
*/