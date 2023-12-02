const butttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let gameOver = false;

$(document).ready(function () {
  $(document).keydown(function () {
    if (!started) {
      started = true;

      gameStart();

      $(".btn").on("click", function (e) {
        let userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer();

        if (!gameOver) {
          gameStart();
        }
      });
    }
  });
});

function checkAnswer() {
  let wrongSound = new Audio("./sounds/wrong.mp3");

  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      flag = i;

      wrongSound.play();
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);

      startOver();
    }
  }
}

function gameStart() {
  let colour = "";

  if (userClickedPattern.length === 0) {
    colour = nextSequence();
    setTimeout(
      function () {
        $("#level-title").text("Level " + level);
        $("#" + colour).fadeOut(50);
        $("#" + colour).fadeIn(50);
        playSound(colour);
      },
      level === 1 ? 0 : 1000
    );
  }

  if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    gameStart();
  }
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = butttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  level++;

  return randomChosenColour;
}

function startOver() {
  gameOver = true;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(randomColour) {
  let sound = new Audio("./sounds/" + randomColour + ".mp3");
  sound.play();
}
