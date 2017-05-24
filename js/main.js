const LETTERS = 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiioooooooooooooooooooooooooooooooooooootttttttttttttttttttttttttttttttttttnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnsssssssssssssssssssssssssssssllllllllllllllllllllllllllllcccccccccccccccccccccccuuuuuuuuuuuuuuuuuuudddddddddddddddddppppppppppppppppmmmmmmmmmmmmmmmhhhhhhhhhhhhhhhgggggggggggggbbbbbbbbbbbfffffffffyyyyyyyyywwwwwwwkkkkkkvvvvvxzjq'.split('');

let score = 0;
let time = 60;
let numbers = [];
let guesses = [];
let letterChoices = [];
let guessInput = document.getElementById('try');
let secondHand = document.querySelector('.second-hand');
let startButton = document.getElementById('load-game');
let guessButton = document.getElementById('guess-button');
let scoreBoard = document.getElementById('score-board');

const wordValue = {"3":100,"4":200,"5":400,"6":800,"7":1600,"8":3200};

startButton.addEventListener("click", loadGame);

function getLetters() {
  while(numbers.length < 8) {
    let randomnumber = Math.floor(Math.random() * 508);
    if(numbers.indexOf(randomnumber) > -1) continue;
    numbers[numbers.length] = randomnumber;
  }

  numbers.forEach(function (x) {
    letterChoices.push(LETTERS[x]);
  })
}

function loadGame() {
  console.log("start game was pressed");
  getLetters();
  let letters = ` <div class="column">${letterChoices[0].toUpperCase()}</div>
                  <div class="column">${letterChoices[1].toUpperCase()}</div>
                  <div class="column">${letterChoices[2].toUpperCase()}</div>
                  <div class="column">${letterChoices[3].toUpperCase()}</div>
                  <div class="column">${letterChoices[4].toUpperCase()}</div>
                  <div class="column">${letterChoices[5].toUpperCase()}</div>
                  <div class="column">${letterChoices[6].toUpperCase()}</div>
                  <div class="column">${letterChoices[7].toUpperCase()}</div>`
  document.getElementById('letter-choices').innerHTML = letters;
  keepTime();
  setInterval(setTime, 1000);
  readyGuess();
}

function readyGuess() {
  guessButton.addEventListener("click", guess);
  guessInput.addEventListener("keydown", function (e) {
    if (13 == e.keyCode) {
      guess();
    }
  });
}

function keepTime() {
  var timer = setInterval(function () {
    if (time >= 0) {
      time--;
      return time;
    } else {
      clearInterval(timer);
      console.log("TIME'S UP! Thanks for playing! Run the file again to start over.");
      // .exit
    }
  }, 1000)
}

function setTime() {
  let secondsDegrees = (-time * 6) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

function addUniqueWord(word) {
  if (guesses.includes(word) == false) {
    guesses.push(word);
    console.log(word);
  } else {
    console.log("You already guessed that!")
  }
}

function guess() {
  let word = guessInput.value;

  addUniqueWord(word);

  if (time > 0) {
    let letterChoicesCopy = letterChoices.slice();

    if ((Word_List.isInList(word)) && (word.length > 2)) {
      let wordLength = word.length;
      let correct = true
      for ( var i = 0; i < wordLength; i++) {

        if (letterChoicesCopy.includes(word[i])) {
          let index = letterChoicesCopy.indexOf(word[i]);
          letterChoicesCopy.splice(index, 1);
        } else {
          console.log("Wrong guess, try again");
          correct = false
          break;
        }
      }
      if (correct) {
        console.log(wordLength);
        score += wordValue[wordLength];
        scoreBoard.innerHTML = score;
        console.log("Current Score Is...", score);
      } else {
        console.log("Sorry, you used the wrong letters!")
      }

    } else {
      console.log("Nice try, not a 3-letter or more word!");
    }

  } else {
    console.log("Total Score is ", score);
    console.log("Sorry, time is up. No more guesses. Please run the file again to start over. Thanks for playing!")
  }

    guessInput.value = "";
  };
