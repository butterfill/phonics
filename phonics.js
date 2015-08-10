Router.route('/', function(){
  this.render('mainMenu');
});

Router.route('/showLetters', function(){
  this.render('showLetters');
});

Router.route('/findTheLetter');