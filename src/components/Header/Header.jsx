// eslint-disable-next-line no-unused-vars
//import { HeaderProps, GameHeaderProps, InfoHeaderProps } from "../../@types/Props";
//import "./Header.css";
import { View, Text } from "react-native";
import { useCallback } from "react";
//import styles from "./Header.module.css";

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
        <header>
            {
                game.show ? (
                    <GameHeader game={game} setShowGame={setShowGame} getLevel={getLevel} />
                ) : (
                    <InfoHeader setShowGame={setShowGame} />
                )
            }
        </header>
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
            <View style={styles.info} onClick={() => setShowGame(false)}>
                <Text style={styles.info_text}>i</Text>
            </View>
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

            <View style={styles.info} onClick={() => setShowGame(true)}>
                <Text style={styles.info_text}>x</Text>
            </View>
        </>
    )
}


export default Header;

