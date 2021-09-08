var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = []; // Saves the last color everytime.
var userClickedPattern = []; // Saves the user clicked color pattern.

var started = false; // The game just start once.
var level = 0; 

// When the start button is clicked, call nextSequence() function.
$('.start-button').click(function(){
    if(!started) {
        nextSequence();
        started = true;
    }
}); 

// Detect the clicked button and store each id in a var.
$('.btn').click(function(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor); // Linked with tha play audio function for the user clicked color.
    animatePress(userChosenColor); // Calls the animation function when the user clicks.

    checkAnswer(userClickedPattern.length - 1); //
})

// Function to check if the answers are correct
function checkAnswer(currentLevel) {
    // If the last push in the 'gamePattern' and in the 'userClickedPattern' are the same, will continue.
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success');

        // If both length are correct, will continue the game with a new random color.
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log('Wrong');

        var audio = new Audio('sounds/wrong.mp3'); // Plays the wrong audio.
        audio.play();

        $('body').addClass('game-over'); // Adds to the body a red background for 200ms.
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').text('Game Over, Press Start to play again'); // Changes the level title.
        
        // Call the restart function.
        startOver();
    }
}

// Start over function restarts the values.
function startOver() {
    started = false;
    level = 0;
    gamePattern = []
}

function nextSequence() {
    userClickedPattern = []; // Reset the array for the next level.

    var randomNumber = Math.floor(Math.random() * 4); // Generates the random number.
    var randomChosenColor = buttonColors[randomNumber]; // Generates a random color everytime.
    gamePattern.push(randomChosenColor);

    // When the game stars, changes <h1> to Level 0. Each time the function is called, the level will increse by 1.
    for (level; level < gamePattern.length; level++) {
        $('#level-title').text('Level ' + level )
    }

    // Makes the flash animation
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Linked with the play audio function for the random color.
    playSound(randomChosenColor);
}

function playSound(name) {

    // Chooses the right Audio file for each color.
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed') // Adds the class 'pressed'.
    
    // Removes the class after 100ms.
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

