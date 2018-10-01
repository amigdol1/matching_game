"use strict";

var game = {
  numberOfSets: 8,
  numberOfCardsPerSet: 2,
  sets: [],
  cards: [],
  // function called for game setup
  setup: function() {
    // creates the number of sets for the game
    for (var i=0; i < this.numberOfSets; i++ ) {
      var set = {
        id: i,
        cards: []
      }
      // creates the cards per set
      for (var n=0; n < this.numberOfCardsPerSet; n++) {
        var card = {
          set: set
        }
        // pushes to a specific set
        set.cards.push(card);
        // pushes to the card array to refer to later for shuffling
        this.cards.push(card);
      }
      // pushes sets
      this.sets.push(set);
    }
  }
};

game.setup();

for (var i=0; i < game.cards.length; i++) {
  var card = game.cards[i];
  console.log(card.set.id);
}
