import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useCallback } from "react";

const styles = {}
/**
 * App header 
 * Displays the header of the app, with the title, the info button, level and gameover message
 * @param {*} props 
 * @returns {JSX.Element}
 */
function Header({ game, setGame, getLevel }) {
    /**
     * Handle show game state
     * @param {boolean} prop 
     */
    const setShowGame = useCallback((prop) => {
        setGame((prevGame) => ({
            ...prevGame,
            show: prop,
        }));
    }, [game.show])

    return (
        <View>
            {
                game.show ? (
                    <View>
                        <GameHeader game={game} setShowGame={setShowGame} getLevel={getLevel} />
                    </View>
                ) : (
                    <View>
                        <InfoHeader setShowGame={setShowGame} />
                    </View>
                )
            }
        </View>
    )
}

/**
 * Renders the game header
 * @param {*} props 
 * @returns {JSX.Element}
 */
function GameHeader({ game, setShowGame, getLevel }) {
    return (
        <>
            <Text style={styles.level_title}>{
                !game.over ?
                    (!game.started ? ("Press Start") : ("Level " + getLevel))
                    :
                    ("Game Over")
            }</Text>

            {game.over &&
                <Text style={styles.level_subtitle}>Press Start to play again</Text>
            }
            <TouchableWithoutFeedback style={styles.info} onPress={() => setShowGame(false)}>
                <Text style={styles.info_text}>i</Text>
            </TouchableWithoutFeedback>
        </>
    )
}

/**
 * Renders the info header
 * @param {*} props 
 * @returns {JSX.Element}
 */
function InfoHeader({ setShowGame }) {

    return (
        <>
            <Text style={styles.level_title}>Never played Simon?</Text>

            <TouchableWithoutFeedback style={styles.info} onPress={() => setShowGame(true)}>
                <Text style={styles.info_text}>x</Text>
            </TouchableWithoutFeedback>
        </>
    )
}


export default Header;

