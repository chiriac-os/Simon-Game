import { useState, useMemo } from "react";

import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import Info from "./components/Info/Info";

/**
 * Root function. This is the main component that handles the game or the info board by passing props.
 * @returns {JSX.Element}
 */
function Root() {
    /**
     * Hooks
     */
    const [game, setGame] = useState({
        show: true,
        started: false,
        over: false,
    })
    const [level, setLevel] = useState(0);

    /**
     * Level getter
     * @returns {number}
     */
    const getLevel = useMemo(() => {
        return level;
    }, [level]);

    /**
     * Increments the level
     */
    const nextLevel = () => {
        setLevel((prev) => prev + 1);
    }

    /**
     * Sets the level to 0
     */
    const resetLevel = () => {
        setLevel(0);
    }

    const headerProps = { game, setGame, getLevel }
    const gameProps = { game, setGame, getLevel, nextLevel, resetLevel }

    return (
        <>
            <Header {...headerProps} />
            <main>
                {
                    game.show ? (
                        <Game {...gameProps} />
                    ) : (
                        <Info />
                    )
                }
            </main>
        </>
    )
}

export default Root;