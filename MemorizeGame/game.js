var buttonColours = ["red" ,"blue","green","yellow"];

var gamePattern = [];
var userClickedPattern =[];

var level = 0;
var started = false;

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");//to store the id of the button that got clicked.By using .attr()
  userClickedPattern.push(userChosenColour);//to add variable end of the array userClickedPattern=["red"];

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});//the buttons got clicked ,will get animated and play sound
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();//jump to Restart game
    }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");//to add the class which is located in sytle.css  for selected item by using their id.
//$("#" + currentColor) is provided us to select item
  setTimeout(function () {//to provided us delay implementations
    $("#" + currentColor).removeClass("pressed");//removeClass is provided to remove class which is selected of selected item.
  }, 100);
}
function playSound(name)
{
  var audio = new Audio("sounds/"+ name + ".mp3");//to get audio which is from sounds folder and detact in variable.
  audio.play();//to play audio which was got from sounds folder.
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
