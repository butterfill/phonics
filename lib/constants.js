

phonics = {};

phonics.letters = ['a','c','d','e','i','m','o','s','t']

phonics.play_sound_for_letter = function(letter, callback) {
  // new Audio('/audio/'+letter+'.mp3').play();
  var sound = new Howl({
    urls: ['/audio/'+letter+'.mp3', '/audio/'+letter+'.ogg'],
    autoplay: true,
    loop: false,
    volume: 1,
    onend: callback
  });
  return sound;
};
// play a named sound, e.g phonics.play('success')
phonics.play_audio = phonics.play_sound_for_letter;

/**
 * returns a random letter
 */
phonics.pick_a_letter = function() {
  return phonics.letters[Math.floor(Math.random()*phonics.letters.length)];
}

/**
 * creates an array of randomly selected letters
 */
phonics.create_letter_array = function(lngth, required_letter) {
  var res = [];
  for(var i = 0; i<lngth; i++) {
    res.push(phonics.pick_a_letter());
  }
  if( required_letter !== undefined ) {
    // have to check that required_letter is among the letters selected
    if( res.indexOf(required_letter) === -1 ) {
      // required_letter is not among the letters selected
      var insert_at = Math.floor(Math.random()*res.length);
      res[insert_at] = required_letter;
    }
  }
  return res;
};


