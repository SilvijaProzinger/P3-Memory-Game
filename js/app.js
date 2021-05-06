const memoryGame = (function(){
  // Create an array that lists all cards and html for stars
  const cardList = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
    deck = document.querySelector(".deck"); // Create deck that holds all the cards
    stars = document.querySelector(".stars");
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    // Modal variables
    modal = document.getElementById("modal");
    replay = document.querySelector("#replay");

  // Create an empty array for opened cards
  let openedCards = [];
    matchedCards = [];
    moveCounter = document.querySelector(".moves"); 
    moves = 0;

    // Timer variables
    timer = document.querySelector(".timer")
    second = 0;
  let startTime;

  // Shuffle function from http://stackoverflow.com/a/2450976
  const shuffle = array => {
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

  // Timer function by SLaks from: https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
  const timerStart = () => {
    second = 0;
    startTime = setInterval(function(){
    second = second + 1;
    timer.innerHTML = second;
    },1000);
  }

  // Create cards and add them to the deck
  const start = () => {
    for(let i = 0; i < cardList.length; i++) {
      let card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `<i class="${cardList[i]}"></i>`;
      deck.appendChild(card);

      // Invoke clickOnCards function
      clickOnCards(card);
    }

    // Enable the timer to reset to 0 when the game is restarted
    resetTimer(startTime);
    second = 0;
    timer.textContent =`${second}`;
    timerStart();
  }

  // Invoke the shuffle function
  shuffle(cardList);

  // Create the main game function
  const clickOnCards = card => {

    // Create card click event
    card.addEventListener("click", function(){  

    // Add an if statement so that we can't open more than two cards at the same time
    if (openedCards.length === 0 || openedCards.length === 1){
      secondCard = this;
      firstCard = openedCards[0];

      //We have opened card
      if (openedCards.length === 1){
        card.classList.add("open","show","disable");
        openedCards.push(this);

        //We invoke the function to compare two cards
        check(secondCard, firstCard);
      } else {
        //We don't have opened cards
        card.classList.add("open","show","disable");
        openedCards.push(this);
      }
    }
    });
  }

  // Create the function which compares two cards
  const check = (secondCard, firstCard) => {
    if (secondCard.innerHTML === firstCard.innerHTML){

    //Cards match
    secondCard.classList.add("match");
    firstCard.classList.add("match");
    matchedCards.push(secondCard,firstCard);
    openedCards = [];

    //If the game is over run the popup
    gameOver();

    } else {

      //Wait for 500 miliseconds before closing the cards
      setTimeout(function(){
        secondCard.classList.remove("open", "show", "disable");
        firstCard.classList.remove("open", "show", "disable");
        openedCards = [];
        }, 500);
    }
    countMoves() 
    rating()  
  };

  // Create moves counter
  const countMoves = () => {
    moves++;
    moveCounter.innerHTML = moves;
  }

  // Create star rating
  const rating = () => {
    if (moves <= 12) {
      stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    } else if (moves > 12 && moves <= 17) {
      stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    } else if (moves > 17){
      stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
    }
  }

  // Create the game over modal
  const gameOver = () => {
    if(matchedCards.length === cardList.length){
      clearInterval(startTime);

      // Define final variables
      let timeScore = timer.innerHTML;
        movesScore = moveCounter.innerHTML;
        starsScore = stars.innerHTML;

      // Show the modal
      modal.classList.add("show");

      // Show the final variables
      document.getElementById("timeScore").innerHTML = second;
      document.getElementById("movesScore").innerHTML = moves;
      document.getElementById("starsScore").innerHTML = stars.innerHTML;
      replay.addEventListener("click",function(){
        deck.innerHTML = "";
        openedCards = [];
        matchedCards = [];
        moves = 0;
        moveCounter.innerHTML = 0;
        stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        start();
        modal.classList.remove("show");
      });
    }
  }

  // Create the restart button
  const restart = document.querySelector(".restart");

  restart.addEventListener("click", function(){
    deck.innerHTML = "";
    openedCards = [];
    matchedCards = [];
    moves = 0;
    moveCounter.innerHTML = 0;
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    shuffle(cardList);
    start();
  });

  // Resets the timer when the game is restarted
  const resetTimer = timer => {
    if (timer) {
      clearInterval(timer);
    }
  }

  return {
    start: start
  }
})()

memoryGame.start()


