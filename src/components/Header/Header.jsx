// eslint-disable-next-line no-unused-vars
import { HeaderProps, GameHeaderProps, InfoHeaderProps } from "../../@types/Props";
import "./Header.css";

/**
 * App header 
 * Displays the header of the app, with the title, the info button, level and gameover message
 * @param {HeaderProps} props 
 * @returns {JSX.Element}
 */
function Header(props) {
    /**
     * Props
     */
    const { game, setGame, getLevel } = props;

    /**
     * Handle show game state
     * @param {boolean} prop 
     */
    const setShowGame = (prop) => {
        setGame((prev) => ({
            ...prev,
            show: prop,
        }))
    }

    /**
     * Children Props
     */
    const gameHeaderProps = { game, setShowGame, getLevel }
    const infoHeaderProps = { game, setShowGame }

    return (
        <header>
            {
                game.show ? (
                    <GameHeader {...gameHeaderProps} />
                ) : (
                    <InfoHeader {...infoHeaderProps} />
                )
            }
        </header>
    )
}

/**
 * Renders the game header
 * @param {GameHeaderProps} props 
 * @returns {JSX.Element}
 */
function GameHeader(props) {
    /**
     * Props
     */
    const { game, setShowGame, getLevel } = props;

    return (
        <>
            <h1 id="level-title">{
                !game.over ?
                    (!game.started ? ("Press Start") : ("Level " + getLevel))
                    :
                    ("Game Over")
            }</h1>

            {game.over && 
                <h2 id="level-subtitle">Press Start to play again</h2>
            }

            <div className="info" onClick={() => setShowGame(false)}>
                <p>i</p>
            </div>
        </>
    )
}

/**
 * Renders the info header
 * @param {InfoHeaderProps} props 
 * @returns {JSX.Element}
 */
function InfoHeader(props) {
    /**
     * Props
     */
    const { setShowGame } = props;

    return (
        <>
            <h1 id="level-title">Never played Simon?</h1>

            <div className="close" onClick={() => setShowGame(true)}>
                <p>x</p>
            </div>
        </>
    )
}


export default Header;

