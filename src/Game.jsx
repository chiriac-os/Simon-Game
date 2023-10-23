import { useState, useRef } from "react";

function Game() {
    /**
     * State
     */
    const [started, setStarted] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [gamePattern, setGamePattern] = useState([]);

    /**
     * Refs
     */
    const level = useRef(0)
    const red = useRef(null);
    const blue = useRef(null);
    const green = useRef(null);
    const yellow = useRef(null);

    /**
     * Game variables
     */
    const btnRefs = [red, blue, green, yellow];
    const buttonColors = ['red', 'blue', 'green', 'yellow'];
    let userClickedPattern = []; // Saves the user clicked color pattern

    /**
     * Starts the game
     */
    const handleStart = () => {
        if (!started) {
            nextSequence();
            setStarted(true);
        }
        if (gameover) setGameover(false);
    }


    /**
     * Start over function restarts the values
     */
    const startOver = () => {
        setStarted(false);
        setGamePattern([]);
        level.current = 0;
    }

    /**
     * Handles click event over the colors
     * @param {MouseEvent} event 
     */
    const handleBtn = (event) => {
        // Do something only if the game has started
        if (started) {
            // Get user's choise and pushed in the user pattern 
            const userChosenColor = event.target.id;
            userClickedPattern.push(userChosenColor);

            // Call linked audio and animation for the user clicked color
            playSound(userChosenColor);
            animatePress(userChosenColor);

            // Check game pattern
            checkAnswer(userClickedPattern.length - 1);
        }
    }

    /**
     * Manages the level
     */
    const nextSequence = () => {
        // Increase level
        level.current++;

        // Reset the array for the next level
        userClickedPattern = [];

        // Generates the random number and a random color everytime
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        setGamePattern([...gamePattern, randomChosenColor]);
        
        // Makes the flash animation
        btnRefs.forEach(btnRef => {
            if (btnRef.current.id === randomChosenColor) {
                btnRef.current.classList.remove("show");
                setTimeout(() => {
                    btnRef.current.classList.add("show");
                }, 100);

                clearTimeout();
            }
        });

        // Linked with the play audio function for the random color
        playSound(randomChosenColor);
    }

    /**
     * Check if the given answer is correct, otherwise handles gameover
     * @param {number} currentLevel 
     */
    const checkAnswer = (currentLevel) => {
        // If the last push in the 'gamePattern' and in the 'userClickedPattern' are the same, will continue
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("Success!");

            // If both length are correct, will continue the game with a new random color
            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);

                clearTimeout();
            }
        } else {
            console.log("Wrong!");

            // Play the "wrong" audio
            const audio = new Audio("./src/assets/sounds/wrong.mp3");
            audio.play();

            // Set gameover state
            setGameover(true);

            // Adds to the body a red background for 200ms
            const body = document.body;
            body.classList.add("game-over");
            setTimeout(() => {
                body.classList.remove("game-over");
            }, 200);

            clearTimeout();

            // Call restart function
            startOver();
        }
    }

    /**
     * Plays the correspondent sound
     * @param {string} color 
     */
    const playSound = (color) => {
        // Chooses the right Audio file for each color
        const audio = new Audio('./src/assets/sounds/' + color + '.mp3');
        audio.play();
    }

    /**
     * Animate clicked color
     * @param {string} color 
     */
    const animatePress = (color) => {
        // Add visual effect
        btnRefs.forEach(btnRef => {
            if (btnRef.current.id === color) {
                btnRef.current.classList.add("pressed");
                setTimeout(() => {
                    btnRef.current.classList.remove("pressed");
                }, 100);

                clearTimeout();
            }
        });
    }

    return (
        <>
            <h1 id="level-title">{
                !gameover ? (
                    !started ? ("Press Start") : ("Level " + level.current)
                ) : ("Game Over, Press Start to play again")
            }</h1>

            <div className="container">
                <div className="row">
                    <div type="button" ref={green} id="green" className="btn green fade-in-out show" onClick={handleBtn}></div>
                    <div type="button" ref={red} id="red" className="btn red fade-in-out show" onClick={handleBtn}></div>
                </div>

                <div className="row">
                    <div type="button" ref={yellow} id="yellow" className="btn yellow fade-in-out show" onClick={handleBtn}></div>
                    <div type="button" ref={blue} id="blue" className="btn blue fade-in-out show" onClick={handleBtn}></div>
                </div>
            </div>

            <div className="row">
                {!started || !gameover ? (
                    /* START GAME */
                    <button className="start-button" type="button" value="Start" onClick={handleStart}>
                        Start
                    </button>
                ) : (<>
                    {/* Hide button */}
                </>)}
            </div>

            <div className="instructions">
                <h2 className="how-to-play-title">How to play</h2>
                <ol className="instruction-list">
                    <li className="instruction-list-item">Press the Start button to play.</li>
                    <li className="instruction-list-item">Click with the mouse on the highlighted colour.</li>
                    <li className="instruction-list-item">If it is correct, you get another colour. Remember the sequence and reproduce it again in each level.</li>
                    <li className="instruction-list-item">If you make a mistake, go back to step 1 to restart the game.</li>
                </ol>
            </div>
        </>
    );
}

export default Game;