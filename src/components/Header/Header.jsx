import "./Header.css";

/**
 * App header 
 * Displays the header of the app, with the title, the info button, level and gameover message
 * @param {HeaderProps} param0 
 * @returns {JSX.Element}
 */
function Header({ game, setGame, getLevel }) {
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
 * @param {GameHeaderProps} param0 
 * @returns {JSX.Element}
 */
function GameHeader({ game, setShowGame, getLevel }) {
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
 * @param {InfoHeaderProps} param0 
 * @returns {JSX.Element}
 */
function InfoHeader({ setShowGame }) {
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

