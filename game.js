var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var selectedButton;
var selectedSound;
var counter;
var level;

$(document).keypress(function() {
  level = 0;
  $("h1").text("Level " + level);
  nextSequence();
});

function nextSequence() {

  level = level + 1;
  $("h1").text("Level " + level);

  counter = 0;

  var randomNumber = Math.floor((Math.random() * 4));
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  selectedButton = "#" + gamePattern[gamePattern.length - 1];
  $(selectedButton).fadeOut(300).fadeIn(300);

  selectedSound = "sounds/" +  gamePattern[gamePattern.length - 1] + ".mp3";
  var audio = new Audio(selectedSound);
  audio.play();


  }

$("div .btn").on("click", function(e){

    if (gamePattern.length == 0) {
      alert("Please select a button for starting the game");
      return;
    }

    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    if (userClickedPattern[counter] === gamePattern[counter]) {
      counter = counter + 1;
    }
    else {

      while (gamePattern.length > 0) {
        gamePattern.pop();
      }

      while (userClickedPattern.length > 0) {
        userClickedPattern.pop();
      }

      $( "body" ).addClass( "game-over" );

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      setTimeout(function(){ $( "body" ).removeClass( "game-over" ); }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      return;

    }

    selectedButton = "#" + userClickedPattern[userClickedPattern.length - 1];
    // $(selectedButton).fadeOut(300).fadeIn(300);
    $(selectedButton).addClass("pressed");
    setTimeout(function(){ $( selectedButton ).removeClass( "pressed" ); }, 100);


    selectedSound = "sounds/" +  userClickedPattern[userClickedPattern.length - 1] + ".mp3";
    var audio = new Audio(selectedSound);
    audio.play();


    if (counter == gamePattern.length && counter == userClickedPattern.length) {

      while(userClickedPattern.length > 0) {
        userClickedPattern.pop();

      }
      setTimeout(function(){ nextSequence(); }, 1000);
    }


});

//ouf
