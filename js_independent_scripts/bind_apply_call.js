var pokemon = {
  firstname: 'Pika',
  lastname: 'Chu ...',
  other: 'Other Pokemon ...',
  getPokeName: function() {
      var fullname = this.firstname + ' ' + this.lastname;
      return fullname;
  },
  getOtherPokeName: function() {
    var fullname = this.firstname + ' ' + this.lastname + ' ' + this.other;
    return fullname;
  }
};

var pokemonNameBind = function(snack, hobby) {
  this.getPokeName = function () {
    return 'Charmidar ... ';
  }
  console.log('************ USING BIND ***********');
  console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
  this.getOtherPokeName && console.log(this.getOtherPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var pokemonNameCall = function(snack, hobby) {
  this.getPokeName = function () {
    return 'Charmidar ... ';
  }
  console.log('************ USING CALL ***********');
  console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
  console.log(this.getOtherPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var pokemonNameApply = function(snack, hobby) {
  this.getPokeName = function () {
    return 'Charmidar ... ';
  }
  console.log('************ USING APPLY ***********');
  console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
  console.log(this.getOtherPokeName() + ' loves ' + snack + ' and ' + hobby);
};

pokemonNameBind('sushi', 'dancing');
pokemonNameBind.bind(pokemon)('sushi', 'dancing');
pokemonNameCall.call(pokemon, 'egg', 'reading');
pokemonNameApply.apply(pokemon, ['apple', 'gardening']);
