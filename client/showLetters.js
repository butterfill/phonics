

var nof_letters_initially = 5;

Session.setDefault('nof_letters', nof_letters_initially);

Session.setDefault('letter_sequence', phonics.create_letter_array(nof_letters_initially));


var set_new_letters = function() {
  var nof_letters = Session.get('nof_letters');
  Session.set('letter_sequence', phonics.create_letter_array(nof_letters));
};

var refresh_btns = function() {
  var letter_sequence = Session.get('letter_sequence')
  var $btns = $('button.letter');
  $btns.show(); //in case hidden earlier
  for( var letter_idx=0; letter_idx < letter_sequence.length; letter_idx++ ) {
    var letter = letter_sequence[letter_idx];
    $btns.eq(letter_idx).text(letter);
  }
  for( var btns_idx = letter_sequence.length; btns_idx < $btns.length; btns_idx++ ) {
    $btns.eq(btns_idx).hide();
  }
};

Template.showLetters.onRendered(refresh_btns);

Template.showLetters.events({
  'click button.new-letters' : function(event, template) {
    set_new_letters();
    refresh_btns();
  },
  'click button.more-letters' : function(event, template) {
    var nof_letters = Session.get('nof_letters');
    Session.set('nof_letters',nof_letters+1);
    $('button.fewer-letters').prop('disabled',false);
    if( nof_letters+1 == 12 ) {
      $('button.more-letters').prop('disabled',true);
    }
    set_new_letters();
    refresh_btns();
  },
  'click button.fewer-letters' : function(event, template) {
    var nof_letters = Session.get('nof_letters');
    Session.set('nof_letters',nof_letters-1);
    $('button.more-letters').prop('disabled',false);
    if( nof_letters-1 == 1 ) {
      $('button.fewer-letters').prop('disabled',true);
    }
    set_new_letters();
    refresh_btns();
  },
});


Template.letter.events({
  'click button.letter' : function(event, template) {
    // var letter = event.target.textContent;
    var letter = $(event.target).text();
    window.res = event; //debug only
    phonics.play_sound_for_letter(letter);
  }
});
