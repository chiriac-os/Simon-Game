import { useState, useRef, useCallback } from 'react';
import { View, Button, TouchableHighlight } from 'react-native';
const styles = {};

/**
 * Renders the game component
 * @param {*} props
 * @returns {JSX.Element}
 */
function Game({ game, setGame, nextLevel, resetLevel }) {
    /**
     * Hooks
     */
    const [gamePattern, setGamePattern] = useState([]);
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
     * State manager
     * Set the started game state
     * @param {boolean} prop 
     */
    const setStarted = useCallback((prop) => {
        setGame((prev) => ({
            ...prev,
            started: prop,
        }))
    }, [game.started])

    /**
     * State manager
     * Set the gameover state
     * @param {boolean} prop 
     */
    const setGameover = useCallback((prop) => {
        setGame((prev) => ({
            ...prev,
            over: prop,
        }))
    }, [game.over])

    /**
     * Starts the game
     */
    const handleStart = () => {
        if (!game.started) {
            nextSequence();
            setStarted(true);
        }
        if (game.over) setGameover(false);
    }

    /**
     * Start over function restarts the values
     */
    const startOver = () => {
        setStarted(false);
        setGamePattern([]);
        resetLevel();
    }

    /**
     * Handles click event over the colors
     * @param {MouseEvent} event 
     */
    const handleBtn = (event) => {
        // Do something only if the game has started
        if (!game.started) return


        // Get user's choise and pushed in the user pattern 
        const userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        // Call linked audio and animation for the user clicked color
        playSound(userChosenColor);
        animatePress(userChosenColor);

        // Check game pattern
        checkAnswer(userClickedPattern.length - 1);

    }

    /**
     * Manages the level
     */
    const nextSequence = () => {
        // Increase level
        nextLevel();

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
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button title='' ref={green} style={[styles.btn, styles.green, styles.fade_in_out, styles.show]} onPress={handleBtn} />
                    <Button title='' ref={red} style={[styles.btn, styles.red, styles.fade_in_out, styles.show]} onPress={handleBtn} />
                </View>

                <View style={styles.row}>
                    <Button title='' ref={yellow} style={[styles.btn, styles.yellow, styles.fade_in_out, styles.show]} onPress={handleBtn} />
                    <Button title='' ref={blue} style={[styles.btn, styles.blue, styles.fade_in_out, styles.show]} onPress={handleBtn} />
                </View>
            </View>

            <View style={styles.row}>
                {!game.started ? (
                    <>
                        {/* Start Game */}
                        <Button sytle={styles.start_button} type="button" title="Start" onPress={handleStart} />
                    </>
                ) : (
                    <>
                        {/* Restart Game */}
                        <Button style={styles.start_button} type="button" title="Restart" onPress={startOver} />
                    </>
                )}
            </View>
        </>
    )
}

export default Game;