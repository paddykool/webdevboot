var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isKeyPressed = false;
var level = 0;

function nextSequence() {
  // get a random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]
  console.log("randomChosenColour: " + randomChosenColour);

  // update game pattern
  gamePattern.push(randomChosenColour);
  console.log("gamePattern: " + gamePattern);

  setTimeout(function() {
    playSound(randomChosenColour)

    var button = "#" + randomChosenColour;
    $(button).fadeOut(300).fadeIn(300);

    $("h1").text("Level " + level);
    level += 1;
  }, 1000);

}


// detect which button was clicked
$(".btn").click(function(event) {
  // var userChosenColour = event.target.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);

  nextSequence();
})

// detect start key pressed
$("body").keypress(function() {
  if (isKeyPressed === false) {
    isKeyPressed = true;
    nextSequence();
  }

});

// play the audio for the colour
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3")
  sound.play();
}

// button flashs when user clicked
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed")
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100)
}

// check answer
function checkAnswer(level) {
  gamePatternLevel = gamePattern[level - 1];
  userPatternLevel = userClickedPattern[level - 1];
  console.log("gamePatternLevel: " + gamePatternLevel);
  console.log("userPatternLevel: " + userPatternLevel);
  if (gamePatternLevel == userPatternLevel) {
    console.log("correct")
  } else {
    console.log("wrong");
    playWrongSound();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}

function playWrongSound() {
  var wrongSound = new Audio("sounds/wrong.mp3")
  wrongSound.play();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  isKeyPressed = false;
  level = 0;
}
