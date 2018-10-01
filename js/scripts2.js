"use strict";

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function calculateScore(numberOfMoves) {
  if (numberOfMoves < 25) {
    return 3;
  } else if (numberOfMoves < 40) {
    return 2;
  } else {
    return 1;
  }
}

function allCardsMatch(cards) {
  return cards.every(function(card) {
    return card.set == cards[0].set;
  })
}

var game = {
  numberOfSets: 2,
  numberOfCardsPerSet: 2,
  sets: [],
  cards: [],
  cardsInCurrentMove: [],
  startTime: 0,
  numberOfMoves: 0,
  // function called for game setup
  setup: function() {
    // creates the number of sets for the game
    for (var i=0; i < this.numberOfSets; i++ ) {
      var set = {
        id: i,
        // cards: [],
        matched: false
      }
      // creates the cards per set
      for (var n=0; n < this.numberOfCardsPerSet; n++) {
        var card = {
          set: set
        }
        // pushes to a specific set
        // set.cards.push(card);
        // pushes to the card array to refer to later for shuffling
        this.cards.push(card);
      }
      // pushes sets
      this.sets.push(set);
    }
    this.cards = shuffle(this.cards);
    this.startTime = Date.now();
    this.numberOfMoves = 0;
    this.cardsInCurrentMove = [];
  },
  addCardToMove: function(card) {
    this.numberOfMoves += 1;
    this.cardsInCurrentMove.push(card);
    if (this.cardsInCurrentMove.length === this.numberOfCardsPerSet) {
      if (allCardsMatch(this.cardsInCurrentMove)) {
        console.log("you found a match");
        this.cardsInCurrentMove[0].set.matched = true;
      };
      this.cardsInCurrentMove = [];
    };
    if (this.allSetsMatched()) {
      console.log(`Youve won the game in ${this.numberOfMoves} moves!`);
      console.log(`Your score is ${calculateScore(this.numberOfMoves)}!`);
    }
  },
  allSetsMatched: function() {
    return this.sets.every(function(set) {
      return set.matched === true;
    })
  },
  gameDuration: function() {
    return Date.now() - this.startTime;  
  }
};


game.setup();
window.game = game;
