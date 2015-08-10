
Session.setDefault('target_letter', phonics.pick_a_letter());

Session.setDefault('letter_sequence', phonics.create_letter_array(6, Session.get('target_letter')));

/**
 * set a new target and 
 * put a new series of letters into the template
 */
var reset_template = function() {
  $('button.letter').prop('disabled',false); //re-enable any disabled buttons
  $('.the-letters').hide();
  $('.success-message').hide();
  $('.intro-message').show();
  Session.set('target_letter', phonics.pick_a_letter());
  Session.set('letter_sequence', phonics.create_letter_array(6, Session.get('target_letter')));
  $('.the-letters').hide();
  var letter = Session.get('target_letter');
  phonics.play_sound_for_letter(letter, function(){
    $('.intro-message').hide();
    $('.the-letters').show();
  });
};


Template.findTheLetter.onRendered(reset_template);

// Template.findTheLetter.onRendered(function(){
//   console.log('onRendered findTheLetter');
//   $('.the-letters').hide();
//   var letter = Session.get('target_letter');
//   phonics.play_sound_for_letter(letter, function(){
//     $('.the-letters').show();
//   });
//
// });

Template.findTheLetter.events({
  'click button.hear-again' : function(event, template) {
    var letter = Session.get('target_letter');
    phonics.play_sound_for_letter(letter);
  }
});

var letter_idx = 0;
Template.letter2.helpers({
  get_letter : function() {
    //var letter = letters[Math.floor(Math.random()*letters.length)];
    var letter_sequence = Session.get('letter_sequence')
    var letter = letter_sequence[letter_idx];
    letter_idx += 1;
    letter_idx = letter_idx % letter_sequence.length;
    return letter;
  }
});



/**
 *  mark a letter as failed
 */
var mark_letter_failed = function($element) {
  $element.prop('disabled',true);
};

Template.letter2.events({
  'click button.letter' : function(event, template) {
    // first play the letter sound
    var letter = $(event.target).text();
    phonics.play_sound_for_letter(letter, function(){
      //now check if it's right
      var target_letter = Session.get('target_letter');
      if( letter === target_letter ) {
        $('.the-letters').hide();
        $('.success-message').show();
        phonics.play_audio('success', function(){
          reset_template();
        });
      } else {
        phonics.play_audio('failure');
        mark_letter_failed($(event.target));
      }      
    });
    
  }
});
