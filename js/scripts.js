const cards = document.getElementById('cards');
let cardList = document.getElementsByClassName('card-default');
let cardArray = Array.from(cardList);
let timer = document.getElementById('time');
let refreshBtn = document.getElementById('refresh');
let li = document.getElementsByTagName('li');
let i = document.getElementsByTagName('i');
let img = document.getElementsByTagName('img');
let totalStars = document.getElementsByClassName('star-img');
let removedStars = document.getElementsByClassName('remove-star');
let moves = document.getElementById('moves');
let closeBtn = document.getElementById('close');
let modal = document.getElementById('modal');
let liMatch = document.getElementsByClassName("match");
let playAgainBtn = document.getElementById("play-again");
let totalClicks = 0;
let cardMatch = [];
let winArray = [];
let totalTime;

// shuffles cards on page load
window.onload = function(event) {
  refresh();
}
// attach an image based on the class the card is assigned. done onload
cardArray.forEach(function(card) {
  let imageContainer = card.querySelector('i');
  let className = imageContainer.className;
  let img = document.createElement("img");
  img.src = `images/${className}.png`;
  imageContainer.appendChild(img);
})

// adds class on click to show the image of the card
// pushes className of image to an array
cardArray.forEach(function(card) {
  card.addEventListener("click", function(e) {
    let clickedCard = e.target.closest("li");
    clickedCard.classList.add("card-image");
    // pushes the specific class of the card to an array to compare later;
    let imageContainer = card.querySelector('i');
    let className = imageContainer.className;
    cardMatch.push(className);
    clickTracker();
    startTimer();
    checkCompare();
    points();
    win();
  });
});

// checks to see if 2 cards have been turned over to do the comparison
function checkCompare() {
  if (cardMatch.length === 2) {
    compareCards();
  }
}

// compares the cards to either assign as a match or turnover
function compareCards() {
   if (cardMatch[0] === cardMatch[1]) {
     assignMatch();
     cardMatch=[];
  } else {
    setTimeout(function(){
      turnOver();
      cardMatch=[];
    }, 500);
  }
}

// assign Match class to cards with an image on the board and don't have match already
function assignMatch() {
  for (card=0; card < cardArray.length; card++) {
    if ((cardArray[card].classList.contains("match") === false) && (cardArray[card].classList.contains("card-image"))) {
      cardArray[card].classList.add("match");
    }
  }
}

//turn cards back over to not show the image if there's no match
function turnOver(card) {
  for (card=0; card < cardArray.length; card++) {
    if (cardArray[card].classList.contains("match") === false) {
      cardArray[card].classList.remove("card-image");
    }
  }
}

// turns any card with an image back over - used for full refresh and not just while trying to match
function turnOverAny(card) {
  for (card=0; card < cardArray.length; card++) {
    cardArray[card].classList.remove("card-image");
  }
}

// tracks the total number of clicks
function clickTracker() {
  totalClicks += 1;
  moves.innerHTML = `${totalClicks} Moves`;
}

//remove a the star that's at the end of the array
function removeLastSar() {
  let lastStar = totalStars.length - 1;
  totalStars[lastStar].classList.add("remove-star");
  totalStars[lastStar].classList.remove("star-img");
}

function resetStars() {
  for (star=0; star < removedStars.length; star++) {
    removedStars[star].classList.add("star-img");
    removedStars[star].classList.remove("remove-star");
  }
}

function resetCards() {
  for (card=0; card < cardArray.length; card++) {
    cardArray[card].classList.remove("match");
  }
}

// adjusts to number of stars based on the number of clicks
function points() {
  if (totalClicks === 25) {
    removeLastSar();
  } else if (totalClicks === 40) {
    removeLastSar();
  } else if (totalClicks === 50) {
    removeLastSar();
  }
}

function win() {
  if (cardList.length === liMatch.length) {
    stopTimer();
    displayModal();
  }
}

closeBtn.addEventListener("click", dismissModal);
playAgainBtn.addEventListener("click", refresh);

function dismissModal() {
  modal.style.display = "none";
}

function displayModal() {
  document.getElementById("modal-win-message").textContent =
  `You're a winner! Your score was ${totalStars.length} stars
  and was completed in ${timer.innerHTML}. `
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function startTimer() {
  if (totalClicks === 1)
  getTime();
}

//tracks from when the current date is and takes difference to calculate the amount of time it's taking
function getTime() {
  let start = Date.now();
  totalTime = setInterval(function() {
     let difference = Date.now() - start;
     formatTime(difference);
   })
}

// formatTime function from https://www.youtube.com/watch?v=jRhB1IG7uAw
// formats time into minutes and seconds
function formatTime(milliSeconds) {
  let time = new Date(milliSeconds);
  let seconds = time.getSeconds().toString();
  let minutes = time.getMinutes().toString();

  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }

  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
   timer.innerHTML = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(totalTime);
}


function resetTimer() {
  timer.innerHTML = "00:00";
}

function refresh() {
  dismissModal();
  resetCards();
  turnOverAny();
  resetStars();
  shuffleCardsDOM();
  stopTimer();
  resetTimer();
  totalClicks = 0;
  moves.innerHTML = `${totalClicks} Moves`;
}

refreshBtn.addEventListener("click", refresh);

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

function shuffleCardsDOM() {
  let nodes = cards.children, card = 0;
  nodes = Array.prototype.slice.call(nodes);
  nodes = shuffle(nodes);
  for (card=0; card < nodes.length; card++) {
    cards.appendChild(nodes[card]);
  }
}
