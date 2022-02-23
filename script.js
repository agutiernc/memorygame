const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let index = 0

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // gives index to all divs
    newDiv.setAttribute('data-index', index++)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardsPicked = []
let cardsIndex = []
let matchCount = 0

const allCards = document.getElementById('game').children

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  const cardPicked = event.target.className
  
  cardsPicked.push(cardPicked)

  event.target.style.backgroundColor = cardPicked

  const dataIndex = event.target.getAttribute('data-index')

  cardsIndex.push(dataIndex)

  if (cardsPicked.length === 2) {
    findMatch(cardsIndex)
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);

function findMatch(index) {

  if (index[0] === index[1]) {
    setTimeout(() => {
      allCards[index[0]].style.backgroundColor = null
    }, 1000)

    cardsIndex = []
    cardsPicked = []
  } else if (cardsPicked[0] === cardsPicked[1]) {
    matchCount++

    if (matchCount === 5) alert('You won!')
  } else {
    setTimeout(() => {
      allCards[index[1]].style.backgroundColor = null
      allCards[index[0]].style.backgroundColor = null
    }, 1000)
  }

  cardsIndex = []
  cardsPicked = []
}

function resetGame() {
  const resetBtn = document.querySelector('.reset')

  resetBtn.addEventListener('click', function() {
    if (matchCount === 5) {
      for(let i = 0; i < allCards.length; i++) {
        allCards[i].style.backgroundColor = null
      }
  
      matchCount = 0
    } else {
      alert('Game in progress!')
    }
  })
}

// resets game if reset button clicked
resetGame()